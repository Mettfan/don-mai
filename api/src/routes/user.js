const express = require("express");
const getUser = require("../Controllers/UserControllers/getUser");
const postUser = require("../Controllers/UserControllers/postUser");
const putUser = require("../Controllers/UserControllers/putUser");
const getAllUsers = require("../Controllers/UserControllers/getAllUsers");
const router = express.Router();

router.put("/users", putUser);
router.post("/users", postUser);
router.get("/users", getUser);
router.get("/users/getAllUsers", getAllUsers)

module.exports = router;