const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// --- MIDDLEWARES ---
app.use(cors()); // Permite conectar el Frontend con el Backend
app.use(express.json()); // Permite recibir datos en formato JSON

// --- CONEXIÓN A BASE DE DATOS (MONGODB ATLAS) ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Conectado exitosamente a MongoDB Atlas'))
    .catch((error) => console.error('❌ Error al conectar a MongoDB:', error));

// --- RUTAS DE LA API ---
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/products', require('./routes/products.routes'));

// --- LA NUEVA RUTA DE LA API EXTERNA (MONEDAS) ---
app.use('/api/currency', require('./routes/currency.routes'));

// --- RUTA BASE DE PRUEBA ---
app.get('/', (req, res) => {
    res.send('El servidor de KarlDay está funcionando al 100% 🚀');
});

// --- INICIO DEL SERVIDOR ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Exportamos la app para que Vercel la pueda leer correctamente
module.exports = app;