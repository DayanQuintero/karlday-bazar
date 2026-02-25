function notFound(req, res, next) {
  res.status(404);
  next(new Error(`Ruta no encontrada: ${req.method} ${req.originalUrl}`));
}

function errorHandler(err, req, res, next) {
  const status = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(status).json({
    message: err.message || "Error interno",
    stack: process.env.NODE_ENV === "production" ? "hidden" : err.stack
  });
}

module.exports = { notFound, errorHandler };