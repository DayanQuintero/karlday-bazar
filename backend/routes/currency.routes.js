const router = require("express").Router();
const { getCurrency } = require("../controllers/currencyController");

router.get("/", getCurrency);

module.exports = router;