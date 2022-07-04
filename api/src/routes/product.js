const express = require("express");
const getProduct = require("../Controllers/ProductControllers/getProduct");
const router = express.Router();

const postProduct = require("../Controllers/ProductControllers/postProduct");
const putProduct = require("../Controllers/ProductControllers/putProduct");

router.put("/products/update", putProduct);
router.post("/products/upload", postProduct);
router.get("/products", getProduct);

module.exports = router;
