const express = require("express");
const router = express.Router();
const { upload } = require("../imgUploader/uploader");
const {
  addProduct,
  getAllProduct,
  getOneProduct,
  editProduct,
  deleteProduct,
} = require("../routeControler/products");

const { toCart } = require("../routeControler/toCart");
const { getUser } = require("../routeControler/login");
const { addNewUser } = require("../routeControler/addNewUser");
const {
  addCatagory,
  getAllCatagory,
  getOne,
  editCatagory,
  deleteCatagory,
} = require("../routeControler/catagory");

router.get("/products", getAllProduct);
router.post("/add/products", upload.single("myPhoto"), addProduct);
router.get("/add/to/cart/products/:id", toCart);
router.post("/login", upload.single("myPhoto"), getUser);
router.post("/new/user", addNewUser);
router.post("/add/catagory", addCatagory);
router.get("/all/catagory", getAllCatagory);
router.get("/add/catagory/:id", getOne);
router.put("/edit/catagory/:id", editCatagory);
router.delete("/delete/catagory/:id", deleteCatagory);
router.get("/products/:id", getOneProduct);
router.put("/edit/product/:id", upload.single("myPhoto"), editProduct);
router.delete("/delete/product/:id", deleteProduct);
module.exports = router;
