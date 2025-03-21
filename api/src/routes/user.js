const express = require("express");
const getUser = require("../Controllers/UserControllers/getUser");
const postUser = require("../Controllers/UserControllers/postUser");
const putUser = require("../Controllers/UserControllers/putUser");
const getAllUsers = require("../Controllers/UserControllers/getAllUsers");
const getUserTickets = require("../Controllers/UserControllers/getUserTicket");
const { deleteUser } = require("../Controllers/UserControllers/deleteUser");
const assignSucursalToAdmin = require("../Controllers/UserControllers/assignSucursalToAdmin");
const removeSucursalFromAdmin = require("../Controllers/UserControllers/removeSucursalFromAdmin");
const assignUserToSucursal = require("../Controllers/UserControllers/assignUserToSucursal");
const removeUserFromSucursal = require("../Controllers/UserControllers/removeUserFromSucursal");
const authenticate = require("../Middleware/auth");

const router = express.Router();

router.put("/users", putUser);
router.put("/users/assignSucursalToAdmin", assignSucursalToAdmin);
router.put("/users/assignUserToSucursal", assignUserToSucursal);
router.post("/users", postUser);
router.get("/users", getUser);
router.get("/users/getAllUsers", getAllUsers);
router.get("/users/allTickets", authenticate, getUserTickets);
router.delete("/deleteUser/:userId", authenticate, deleteUser);
router.delete("/users/removeSucursalFromAdmin", removeSucursalFromAdmin);
router.delete("/users/removeUserFromSucursal", removeUserFromSucursal);

module.exports = router;