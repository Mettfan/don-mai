const express = require("express");
const getIncome = require("../Controllers/AnalyticController/getIncome");
const getMostBoughtProducts = require("../Controllers/AnalyticController/getMostBoughtProduct");
const getMostSoldProducts = require("../Controllers/AnalyticController/getMostSoldProducts");
const getOutcome = require("../Controllers/AnalyticController/getOutCome");
const router = express.Router();


router.get("/analytic/mostSold", getMostSoldProducts)
router.get("/analytic/mostBought", getMostBoughtProducts)
router.get("/analytic/income", getIncome)
router.get("/analytic/outcome", getOutcome)



module.exports = router;
