const Product = require('../models/Product'); 

// 1. OBTENER PRODUCTOS (CON FILTROS Y PAGINACIÓN)
exports.getProducts = async (req, res) => {
    try {
        // Extraigo los parámetros que el frontend me mande por la URL. 
        // Si no me mandan nada, por defecto asumo que quieren la página 1 y máximo 10 productos.
        const { page = 1, limit = 10, category } = req.query;

        // Construyo mi filtro de búsqueda vacío al inicio
        let query = {};
        
        // Si el usuario seleccionó una categoría (ej. "Moda"), la agrego al filtro
        if (category) {
            query.category = category; 
        }

        // Calculo cuántos productos debo saltarme. 
        // Ejemplo: Si estoy en la página 2 y el límite es 10, me salto los primeros 10.
        const skip = (page - 1) * limit;

        // Voy a la base de datos, aplico el filtro, me salto los necesarios y limito la cantidad
        const products = await Product.find(query)
                                      .skip(skip)
                                      .limit(parseInt(limit));

        // Cuento el total de productos que coinciden con el filtro para saber cuántas páginas existen
        const total = await Product.countDocuments(query);

        // Devuelvo la respuesta al frontend en formato JSON, incluyendo toda la metadata de paginación
        res.json({
            totalItems: total,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            products // Aquí va el arreglo con las prendas
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error obteniendo los productos' });
    }
};

// 2. CREAR PRODUCTO (Protegido por middlewares en las rutas)
exports.createProduct = async (req, res) => {
    try {
        const { name, price, category } = req.body;
        const newProduct = new Product({ name, price, category });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto' });
    }
};

// 3. ACTUALIZAR PRODUCTO
exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar' });
    }
};

// 4. ELIMINAR PRODUCTO
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar' });
    }
};