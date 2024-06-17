const express = require("express");
const getUser = require("../Controllers/UserControllers/getUser");
const postUser = require("../Controllers/UserControllers/postUser");
const putUser = require("../Controllers/UserControllers/putUser");
const getAllUsers = require("../Controllers/UserControllers/getAllUsers");
const getUserTickets = require("../Controllers/UserControllers/getUserTicket");
const { deleteUser } = require("../Controllers/UserControllers/deleteUser");
const authenticate = require("../Middleware/auth");

const router = express.Router();

router.put("/users", putUser);
router.post("/users", postUser);
router.get("/users", getUser);
router.get("/users/getAllUsers", getAllUsers);
router.get("/users/allTickets", authenticate, getUserTickets);
router.delete("/deleteUser/:userId", authenticate, deleteUser);

module.exports = router;