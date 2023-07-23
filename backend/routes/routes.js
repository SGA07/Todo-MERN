const express = require("express");
const {
  registerUser,
  authUser,
  todoUser,
} = require("../controllers/userControllers");

const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router.post("/todo", todoUser);

module.exports = router;
