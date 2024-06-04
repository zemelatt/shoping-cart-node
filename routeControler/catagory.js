const { query } = require("../my database/mysql");
const { checkBodyToCatagory } = require("../method/userValidator");
const addCatagory = async (req, res) => {
  try {
    const { title } = req.body;
    if (req.body !== undefined && checkBodyToCatagory({ title })) {
      return;
    }
    const checkUser = await query(
      `SELECT * FROM catagory where title='${title}'`,
      (err, result) => {
        if (result?.length > 0) {
          console.log("already add");
          res
            .status(200)
            .send({ errMessage: "This catagory is already added" });
          return;
        }

        query(
          `INSERT INTO catagory (id,title) VALUES(null,?)`,
          [title],
          (err, result) => {
            if (err) throw Error(err);
            console.log("addd");
            res.status(201).send({ successMsg: "New catagory added" });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({ errorMessage: "Internal server error" });
  }
};
const getAllCatagory = async (req, res) => {
  try {
    query(`SELECT * FROM catagory`, (err, result) => {
      res.status(200).send(result);
    });
  } catch (error) {}
};
const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    query(`SELECT * FROM catagory WHERE id=${id};`, (err, result) => {
      if (err) throw err;

      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).send({ errorMessage: "Internal server error" });
  }
};
const editCatagory = async (req, res) => {
  try {
    const { title } = req.body;
    const { id } = req.params;
    await query(
      `UPDATE catagory SET title =? WHERE id=?`,
      [title, id],
      (err, result) => {
        if (err) throw Error(err);

        res.status(201).send("OK");
      }
    );
  } catch (error) {
    res.status(500).send({ errorMessage: "Internal server error" });
  }
};
const deleteCatagory = (req, res) => {
  try {
    const id = Number(req.params.id);
    if (typeof id == "number") {
      query(`DELETE FROM catagory where id=?`, [id], (err, result) => {
        if (err) throw err;
        res.status(201).send({ successMsg: "Delete catagory successfuly" });
      });
    }
    // res.status(400).send({ errorMessage: "parms are not number" });
  } catch (error) {
    res.status(500).send({ errorMessage: "Internal server error" });
  }
};
module.exports = {
  addCatagory,
  getAllCatagory,
  getOne,
  editCatagory,
  deleteCatagory,
};
