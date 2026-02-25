// backend/middleware/roleMiddleware.js
// Permite el acceso solo si req.user.role está en los roles permitidos

function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "No autorizado: sin sesión." });
    }

    const userRole = req.user.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res
        .status(403)
        .json({ message: `Acceso denegado: requiere rol ${allowedRoles.join(" o ")}.` });
    }

    next();
  };
}

module.exports = requireRole;