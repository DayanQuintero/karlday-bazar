// backend/middleware/validate.js
function isEmail(x) {
  return typeof x === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x);
}

function validateRegister(req, res, next) {
  const { name, email, password } = req.body || {};

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({ message: "Nombre inválido." });
  }
  if (!isEmail(email)) {
    return res.status(400).json({ message: "Email inválido." });
  }
  if (!password || typeof password !== "string" || password.length < 1) {
    return res.status(400).json({ message: "Password requerido." });
  }

  next();
}

function validateLogin(req, res, next) {
  const { email, password } = req.body || {};

  if (!isEmail(email)) {
    return res.status(400).json({ message: "Email inválido." });
  }
  if (!password || typeof password !== "string" || password.length < 1) {
    return res.status(400).json({ message: "Password requerido." });
  }

  next();
}

module.exports = { validateRegister, validateLogin };