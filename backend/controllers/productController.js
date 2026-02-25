const Product = require("../models/Product");

/**
 * GET con paginación + filtros:
 * /api/products?page=1&limit=8&category=calzado&search=adidas
 */
async function getProducts(req, res) {
  const page = Math.max(parseInt(req.query.page || "1", 10), 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit || "8", 10), 1), 50);

  const category = (req.query.category || "").trim();
  const search = (req.query.search || "").trim();

  const filter = {};
  if (category) filter.category = category;

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { brand: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } }
    ];
  }

  const total = await Product.countDocuments(filter);
  const totalPages = Math.max(Math.ceil(total / limit), 1);

  const items = await Product.find(filter)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({ page, limit, total, totalPages, items });
}

async function getProductById(req, res) {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ message: "Producto no encontrado" });
  res.json(p);
}

async function createProduct(req, res) {
  const p = await Product.create(req.body);
  res.status(201).json({ message: "Producto creado", product: p });
}

async function updateProduct(req, res) {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ message: "Producto no encontrado" });

  Object.assign(p, req.body);
  await p.save();

  res.json({ message: "Producto actualizado", product: p });
}

async function deleteProduct(req, res) {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ message: "Producto no encontrado" });

  await p.deleteOne();
  res.json({ message: "Producto eliminado" });
}

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };