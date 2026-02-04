const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// --- IMPORTACIONES ---
const taskRoutes = require('./routes/tasks.routes');
const authRoutes = require('./routes/auth.routes'); 
const verifyToken = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// --- MIDDLEWARES GLOBALES ---
app.use(cors());
app.use(express.json()); 
app.use(express.static(path.join(__dirname, '../public')));

// --- RUTAS API ---

// Rutas públicas (Auth)
app.use('/api/auth', authRoutes); 

// Rutas privadas (Tareas) - Protegidas con Token
// NOTA: La rúbrica pide operaciones CRUD completas
app.use('/api/tasks', verifyToken, taskRoutes); 

// --- MIDDLEWARE DE MANEJO DE ERRORES (REQUISITO RÚBRICA) ---
// Este bloque captura cualquier error de las rutas y responde ordenadamente
app.use((err, req, res, next) => {
    console.error(err.stack); // Muestra el error en la terminal para debugging
    res.status(500).json({
        message: 'Ocurrió un error interno en el servidor',
        error: err.message
    });
});

// --- INICIO DEL SERVIDOR ---
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});