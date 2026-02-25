// backend/middleware/authMiddleware.js
// Lee el token JWT (Authorization: Bearer <token>), lo verifica y pone req.user

const jwt = require("jsonwebtoken");

module.exports = function authMiddleware(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;

    if (!token) {
      return res.status(401).json({ message: "No autorizado: falta token (Bearer)." });
    }

    // El payload debe incluir role (ej: { id, email, role })
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Aquí se crea req.user (esto es lo que te faltaba)
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "No autorizado: token inválido o expirado." });
  }
};