const User = require("../models/User");

/**
 * Yo creo un nuevo trabajador desde el backend (CRUD real).
 * Requiere que el que llama sea "trabajador" o "admin" (lo controlamos en rutas).
 */
async function createWorker(req, res) {
  const { name, email, password, role } = req.body;

  const finalRole = role || "trabajador";
  if (!["trabajador", "admin"].includes(finalRole)) {
    return res.status(400).json({ message: "Rol inválido para worker" });
  }

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "Ese correo ya existe" });

  const user = await User.create({ name, email, password, role: finalRole });

  res.status(201).json({
    message: "Trabajador creado",
    worker: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
}

async function listWorkers(req, res) {
  const workers = await User.find({ role: { $in: ["trabajador", "admin"] } }).select("-password");
  res.json({ total: workers.length, workers });
}

async function updateWorker(req, res) {
  const { id } = req.params;
  const { name, email, role } = req.body;

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "Worker no encontrado" });

  if (name !== undefined) user.name = name;
  if (email !== undefined) user.email = email;
  if (role !== undefined) {
    if (!["trabajador", "admin"].includes(role)) {
      return res.status(400).json({ message: "Rol inválido" });
    }
    user.role = role;
  }

  await user.save();
  res.json({ message: "Worker actualizado", worker: { id: user._id, name: user.name, email: user.email, role: user.role } });
}

async function deleteWorker(req, res) {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "Worker no encontrado" });

  await user.deleteOne();
  res.json({ message: "Worker eliminado" });
}

module.exports = { createWorker, listWorkers, updateWorker, deleteWorker };