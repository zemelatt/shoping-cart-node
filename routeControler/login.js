const { query } = require("../my database/mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { checkBodyToLogin } = require("../method/userValidator");
const { log } = require("console");

const getUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (checkBodyToLogin({ email })) {
      res.send({ errMessage: "insert email and password", token: null });
      return;
    }

    await query(
      `SELECT *
      FROM users WHERE email=?`,
      [email],
      async (err, result2) => {
        if (result2.length < 1) {
          console.log("wrong email");
          res.status(500).send({ errMessage: "Unregistered email addresss" });
          return;
        }
        let ismatch = await bcrypt.compare(password, result2[0]?.password);
        console.log(ismatch);
        if (ismatch) {
          jwt.sign(
            { result2 },
            "privatekey",
            { expiresIn: "1h" },
            (err, token) => {
              if (err) {
                console.log(err);
                res.status(500).send({ errMessage: "Internal server error" });
              }

              if (result2[0]?.role == "admin") {
                res.send({
                  token: token,
                  errMessage: "Password does not match",
                  role: result2[0]?.role,
                });
              }
              res.send({
                token: token,
                errMessage: "Password does not match",
                role: result2[0]?.role,
              });
            }
          );
        } else {
          res
            .status(200)
            .send({ errMessage: "Password does not match", token: null });
        }
      }
    );
  } catch (error) {}
};
module.exports = {
  getUser,
};
