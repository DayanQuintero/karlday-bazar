const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
// Importo a mis dos guardias de seguridad
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

// RUTA PÚBLICA: Cualquiera puede VER el catálogo
// (No agrego middleware aquí para que sea como una tienda real)
router.get('/', productController.getProducts);

// RUTAS PROTEGIDAS: Solo el ADMIN puede crear, editar o borrar
// Primero pasa verifyToken (¿quién eres?) y luego verifyAdmin (¿eres jefe?)

// Crear producto
router.post('/', verifyToken, verifyAdmin, productController.createProduct);

// Editar producto (necesitas el ID)
router.put('/:id', verifyToken, verifyAdmin, productController.updateProduct);

// Eliminar producto (necesitas el ID)
router.delete('/:id', verifyToken, verifyAdmin, productController.deleteProduct);

module.exports = router;