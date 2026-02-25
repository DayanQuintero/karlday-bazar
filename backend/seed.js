const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("./models/User");
const Product = require("./models/Product");

dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Mongo conectado (seed)");

  // Limpio colecciones (opcional, pero te ayuda si ya se te hizo bola)
  await User.deleteMany({});
  await Product.deleteMany({});

  const users = await User.insertMany([
    { name: "Evelyn Dayan Quintero De Anda", email: "evelyndayan@karlday.com", password: "1", role: "trabajador" },
    { name: "Jorge Alejandro Gomez Ochoa", email: "jorgealejandro@karlday.com", password: "2", role: "trabajador" },
    { name: "Karen Michelle Quintero De Anda", email: "karenmichelle@karlday.com", password: "3", role: "trabajador" },
    { name: "Cliente 1", email: "cliente1@karlday.com", password: "4", role: "user" },
    { name: "Cliente 2", email: "cliente2@karlday.com", password: "5", role: "user" },
    { name: "Admin KARLDAY", email: "admin@karlday.com", password: "6", role: "admin" }
  ]);

  console.log("Usuarios creados:", users.map(u => ({ email: u.email, role: u.role })));

  // Productos demo (puedes cambiar imageUrl por tus rutas reales)
  await Product.insertMany([
    { title: "Tenis blancos", brand: "KARLDAY", description: "Producto agregado para mostrar un catálogo más completo.", category: "calzado", priceMXN: 409, stock: 12, imageUrl: "/img/tenis-blancos.jpg" },
    { title: "Pants deportivo", brand: "KARLDAY", description: "Producto agregado para mostrar un catálogo más completo.", category: "deporte", priceMXN: 429, stock: 8, imageUrl: "/img/pants-deportivo.jpg" },
    { title: "Sudadera negra", brand: "KARLDAY", description: "Producto agregado para mostrar un catálogo más completo.", category: "ropa", priceMXN: 439, stock: 10, imageUrl: "/img/sudadera-negra.jpg" },
    { title: "Gorra minimalista", brand: "KARLDAY", description: "Producto agregado para mostrar un catálogo más completo.", category: "accesorios", priceMXN: 419, stock: 15, imageUrl: "/img/gorra-minimalista.jpg" }
  ]);

  console.log("Productos seed OK");

  await mongoose.disconnect();
  console.log("Seed terminado");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});