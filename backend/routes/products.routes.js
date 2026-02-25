// backend/routes/products.routes.js
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");
const validateProduct = require("../middleware/validateProduct");

const productController = require("../controllers/productController");

// GET público (catálogo)
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);

// CRUD protegido (solo trabajador)
router.post("/", authMiddleware, requireRole("trabajador"), validateProduct, productController.createProduct);
router.put("/:id", authMiddleware, requireRole("trabajador"), validateProduct, productController.updateProduct);
router.delete("/:id", authMiddleware, requireRole("trabajador"), productController.deleteProduct);

module.exports = router;