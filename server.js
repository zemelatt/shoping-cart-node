const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql2");
const cors = require("cors");
const router = require("./router/route");
const session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
const multer = require("multer");
const path = require("path");
const passport = require("passport");
const fileupload = require("express-fileupload");
// var sessionStore = new MySQLStore(
//   {
//     expiration: 10800000,
//     createDatabaseTable: false,
//     schema: {
//       tableName: "sessiontb1",
//       columnNames: {
//         session_id: "session_id",
//         expires: "expires",
//         data: "data",
//       },
//     },
//   },
//   sessionStore
// );
app.use(
  session({
    key: "keyin",
    secret: "my secret",
    // store: 'sessionStore',
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
// app.use(fileupload());
// app.use(connectFlash());

app.use(passport.initialize());
app.use(passport.session());
app.use(require("connect-flash")());
app.use(function (req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

app.get("*", function (req, res, next) {
  res.locals.cart = req.session.cart;
  //res.locals.user = req.user || null;
  next();
});
// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../src/uploads"); // Define the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    ); // Define the filename for uploaded files
  },
});
const upload = multer({ storage: storage });
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
