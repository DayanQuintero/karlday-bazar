const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const { notFound, errorHandler } = require("./middleware/errorHandler");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(morgan("dev"));

/** Conecto a Mongo */
async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("Falta MONGO_URI en .env");
  await mongoose.connect(uri);
  console.log("MongoDB conectado");
}

/** Rutas */
app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "KARLDAY API", time: new Date().toISOString() });
});

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/products", require("./routes/products.routes"));
app.use("/api/workers", require("./routes/workers.routes"));
app.use("/api/currency", require("./routes/currency.routes"));

/** Errores */
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
  })
  .catch((e) => {
    console.error("Error conectando DB:", e.message);
    process.exit(1);
  });

module.exports = app; // para tests