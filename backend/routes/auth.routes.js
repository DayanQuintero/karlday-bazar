const express = require("express");
const router = express.Router();

const { validateRegister, validateLogin } = require("../middleware/validate");
const authController = require("../controllers/authController");

// POST /api/auth/register
router.post("/register", validateRegister, authController.register);

// POST /api/auth/login
router.post("/login", validateLogin, authController.login);

module.exports = router;