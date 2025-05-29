const express = require("express");
const router = express.Router();
const createPreference = require('../Controllers/MercadoPagoControllers/Checkout')
const updatePlan = require("../Controllers/MercadoPagoControllers/updatePlan")
const paymentCart = require("../Controllers/MercadoPagoControllers/PaymentCart");

router.post("/pago/create_preference", createPreference);
router.post('/pago/cart_preference', paymentCart);
router.get("/payment/success", updatePlan);

module.exports = router;
