const express = require("express");
const router = express.Router();
const createPreference = require('../Controllers/MercadoPagoControllers/Checkout')
const updatePlan = require("../Controllers/MercadoPagoControllers/updatePlan")

router.post("/pago/create_preference", createPreference);
router.get("/payment/success", updatePlan)

module.exports = router;
