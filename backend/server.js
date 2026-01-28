const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path'); // Importé 'path' para poder manejar las rutas de mis carpetas
require('dotenv').config();

// --- MIS IMPORTACIONES ---
// Importo mis rutas y el middleware de seguridad que creé
const taskRoutes = require('./routes/tasks.routes');
const authRoutes = require('./routes/auth.routes'); 
const verifyToken = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// --- MIS MIDDLEWARES GLOBALES ---
app.use(cors()); // Habilito CORS para permitir peticiones externas
app.use(express.json()); // Permito que mi servidor entienda datos en formato JSON

// Configuro mi servidor para servir los archivos estáticos (HTML, CSS, JS) de mi carpeta 'public'
// Esto permite ver mi página web al entrar a localhost:3000
app.use(express.static(path.join(__dirname, '../public')));

// --- CONEXIÓN A MI BASE DE DATOS ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('He conectado exitosamente con MongoDB'))
  .catch((error) => console.error('Tuve un error en la conexión a Mongo:', error));

// --- DEFINICIÓN DE MIS RUTAS API ---

// Rutas públicas: Aquí gestiono mi registro y login
app.use('/api/auth', authRoutes); 

// Rutas privadas: Aquí están mis tareas, protegidas por mi middleware (token)
app.use('/api/tasks', verifyToken, taskRoutes); 

// --- INICIO DEL SERVIDOR ---
app.listen(PORT, () => {
  console.log(`Mi servidor está corriendo y listo en http://localhost:${PORT}`);
});