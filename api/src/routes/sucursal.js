const express = require("express");
const getSucursal = require("../Controllers/SucursalControllers/getSucursal");
const postSucursal = require("../Controllers/SucursalControllers/postSucursal");
const putSucursal = require("../Controllers/SucursalControllers/putSucursal");
const addUserToSucursal = require("../Controllers/SucursalControllers/addUserToSucursal");
const getUserSucursal = require("../Controllers/SucursalControllers/getUserSucursal");
const addProductToSucursal = require("../Controllers/SucursalControllers/addProductToSucursal");
const router = express.Router();

router.put("/sucursales", putSucursal);
router.post("/sucursales", postSucursal);
router.get("/sucursales", getSucursal);
router.post("/sucursales/add/user", addUserToSucursal);
router.get("/sucursales/get/user", getUserSucursal);
router.post("/sucursales/add/product", addProductToSucursal);

module.exports = router;
