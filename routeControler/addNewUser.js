const { query } = require("../my database/mysql");
const bcrypt = require("bcrypt");

const { checkBodyToRegister } = require("../method/userValidator");
const { genSaltSync } = require("bcryptjs");

const addNewUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (checkBodyToRegister({ userName, email })) {
      return;
    }
    const checkUser = await query(
      `SELECT * FROM users where email='${email}'`,
      (err, result) => {
        if (result?.length > 0) {
          res
            .status(200)
            .send({ errMessage: "The email addres is already used" });
          return;
        }
        const hashPassword = bcrypt.hashSync(password, genSaltSync(10));
        query(
          `INSERT INTO users (id,userName,email,password) VALUES(null,?,?,?)`,
          [userName, email, hashPassword],
          (err, result) => {
            if (err) throw Error(err);

            res.status(201).send("New product created");
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  addNewUser,
};
