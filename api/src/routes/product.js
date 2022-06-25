const express = require("express");
const router = express.Router();

const postProduct = require("../Controllers/ProductControllers/postProduct");

router.post("/products/upload", postProduct);

module.exports = router;
