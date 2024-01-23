const express = require("express");
const { handleRoot } = require("../controllers/root");

const {
  getAllUsers,
  createUsers,
  checkUser,
  getOneUser,
  getOneUserById,
  checkUserId,
  updateUserById,
  deleteUserById,
  resetPasswordUserById,
  changePasswordUserById,
} = require("../controllers/users");
const {
  createProducts,
  getAllProducts,
  checkProductById,
  getProductById,
} = require("../controllers/product");
const validation = require("../middleware/validation");
const {
  getAllOrders,
  createOrder,
  updateTransactionStat,
  errorOrder,
} = require("../controllers/order");
const { authorize } = require("../middleware/authorize");

const router = express.Router();

router.get("/", handleRoot);

router.get("/users", getAllUsers);
router.get("/user/:_id", checkUserId, getOneUserById);

router.post("/signIn", checkUser, getOneUser);

router.post("/users", createUsers);

router.put("/user/:_id", checkUserId, updateUserById);
router.put("/reset/:_id", checkUserId, changePasswordUserById);

router.delete("/user/:_id", checkUserId, deleteUserById);

router.post("/products", validation, createProducts);

router.get("/products", getAllProducts);

router.get("/product/:_id", checkProductById, getProductById);

router.get("/orders/:_id", getAllOrders);

router.post("/orders", authorize, createOrder);

router.put("/orders/:userId", updateTransactionStat);

router.put("/orders/error/:userId", errorOrder);

module.exports = router;
