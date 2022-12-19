const express = require("express");
const { getMyChats } = require("../controllers/chatController");
const router = express.Router();
const { isAuth } = require("..//middleware/isAuth");

router.get("/myChats", isAuth, getMyChats);

module.exports = router;
