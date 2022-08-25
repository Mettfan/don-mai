const express = require("express");
const getUser = require("../Controllers/UserControllers/getUser");
const postUser = require("../Controllers/UserControllers/postUser");
const putUser = require("../Controllers/UserControllers/putUser");
const router = express.Router();

router.put("/users", putUser);
router.post("/users", postUser);
router.get("/users", getUser);

module.exports = router;
