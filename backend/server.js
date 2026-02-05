const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// --- CONFIGURACIÓN DE ENTORNO ---
// Le decimos explícitamente que busque el .env en la carpeta actual (__dirname)
// Esto es vital para que funcione en tu compu
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Importar Rutas
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/products.routes'); 

const app = express();
const PORT = process.env.PORT || 3000;

// --- MIDDLEWARES ---
app.use(cors());
app.use(express.json());

// Servir archivos estáticos (Frontend)
// Esto permite que al entrar a localhost:3000 veas tu página web
app.use(express.static(path.join(__dirname, '../public')));

// --- CONEXIÓN A MONGODB ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Conectado a MongoDB Atlas'))
    .catch(err => console.error('❌ Error conectando a MongoDB:', err));

// --- RUTAS API ---
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error interno del servidor', error: err.message });
});

// --- ARRANQUE DEL SERVIDOR ---
// Esta condición es MÁGICA:
// 1. Si corres "node server.js", entra aquí e inicia el servidor.
// 2. Si Vercel o Jest importan este archivo, NO entra aquí (evita errores de puerto ocupado).
if (require.main === module) {
    app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
}

// Exportamos la app para que Vercel (y los tests) puedan usarla
module.exports = app;