const express = require("express");
const getProduct = require("../Controllers/ProductControllers/getProduct");
const router = express.Router();

const postProduct = require("../Controllers/ProductControllers/postProduct");
const putProduct = require("../Controllers/ProductControllers/putProduct");
const deleteProduct = require("../Controllers/ProductControllers/deleteProduct");

router.put("/products/update", putProduct);
router.post("/products/upload", postProduct);
router.post("/products/delete", deleteProduct);
router.get("/products", getProduct);

module.exports = router;
