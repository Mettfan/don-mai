const express = require("express");
const getMostSoldProducts = require("../Controllers/AnalyticController/getMostSoldProducts");
const router = express.Router();


router.get("/analytic/mostSold", getMostSoldProducts)



module.exports = router;
