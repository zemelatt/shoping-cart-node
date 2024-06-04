const { query } = require("../my database/mysql");

const addProduct = async (req, res) => {
  try {
    if (req.file && req.body !== undefined) {
      const { name, description, catagory, price } = req.body;
      const { filename } = req.file;
      await query(
        `INSERT INTO products (id,title,description,catagory,price,img) VALUES(null,?,?,?,?,?)`,
        [name, description, catagory, price, filename],
        (err, result) => {
          if (err) {
            res.status(500).send({ errorMessage: "Error inserting product" });
          }

          res.status(201).send({ successMsg: "New product added" });
        }
      );
    }
    console.error("Request body or file is missing");
    res.status(400).send({ errorMessage: "Request body or file is missing" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ errorMessage: "Internal server error" });
  }
};

const getAllProduct = async (req, res) => {
  try {
    var getSql = "select * from products";
    query(getSql, (err, result2) => {
      if (err) throw err;
      res.send(result2);
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ errorMessage: "Internal server error" });
  }
};

const getOneProduct = async (req, res) => {
  try {
    if (req.params !== undefined) {
      const { id } = req.params;
      query(`select * from products where id=${id}`, (err, result) => {
        if (err) throw err;
        res.send(result);
      });
    }
    //res.status(400).send({ errorMessage: "Request body or file is missing" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ errorMessage: "Internal server error" });
  }
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const withImg = `UPDATE products SET title=?, description=?, catagory=?, price=?, img=? WHERE id=?`;
    const withOutImg =
      "UPDATE products SET title=?,description=?,catagory=?,price=? WHERE id=?";
    const { name, description, catagory, price } = req.body;
    const sql = req.file == undefined ? withOutImg : withImg;
    const values = [name, description, catagory, price, id];

    if (req.file !== undefined) {
      const { filename } = req.file;
      values.splice(4, 0, filename);
    }

    await query(sql, values, (err, result) => {
      if (err) throw Error(err);
      res.status(201).send({ successMsg: " product updated successfuly" });
    });
  } catch (error) {
    res.status(500).send({ errorMessage: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (typeof id == "number") {
      query(`DELETE FROM products where id=?`, [id], (err, result) => {
        if (err) throw err;
        res.status(201).send({ successMsg: "Delete product successfuly" });
      });
    }
  } catch (error) {
    res.status(500).send({ errorMessage: "Internal server error" });
  }
};
module.exports = {
  getAllProduct,
  getOneProduct,
  editProduct,
  addProduct,
  deleteProduct,
};
