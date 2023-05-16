const express = require("express");
const getProduct = require("../Controllers/ProductControllers/getProduct");
const router = express.Router();

const postProduct = require("../Controllers/ProductControllers/postProduct");
const putProduct = require("../Controllers/ProductControllers/putProduct");
const deleteProduct = require("../Controllers/ProductControllers/deleteProduct");
const addProductStock = require("../Controllers/ProductControllers/addProductStock");
const getTotalInvested = require("../Controllers/ProductControllers/getTotalInvested");
const sellProducts = require("../Controllers/ProductControllers/sellProducts");
const deleteProductStock = require("../Controllers/ProductControllers/deleteProductStock");
const addProductToUser = require("../Controllers/ProductControllers/addProductToUser");
const getUserProduct = require("../Controllers/ProductControllers/getUserProducts");
const deleteUserProduct = require("../Controllers/ProductControllers/deleteUserProduct");
 
router.post("/delete/product/stock", deleteProductStock);
router.post("/product/sell", sellProducts);
router.get("/product/invest", getTotalInvested);
router.put("/add/product/stock", addProductStock);
router.put("/products/update", putProduct);
router.post("/products/upload", postProduct);
router.post("/products/delete", deleteProduct);
router.get("/products", getProduct);
router.post("/product/add/user", addProductToUser);
router.get("/product/get/user", getUserProduct);
router.delete("/product/delete/user", deleteUserProduct);

module.exports = router;
