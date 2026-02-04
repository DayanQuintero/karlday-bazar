const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Importamos nuestras herramientas de archivos en lugar del modelo User
const { readFile, writeFile, usersPath } = require('../utils/fileHandler');

// Clave secreta (En producción iría en .env, para la tarea puedes usar un string fijo si quieres)
const SECRET_KEY = process.env.JWT_SECRET || 'mi_secreto_super_seguro';

// REGISTRO (POST /api/auth/register)
router.post('/register', async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // 1. Leer usuarios actuales del archivo JSON
        const users = await readFile(usersPath);

        // 2. Validar si el usuario ya existe
        const userExists = users.find(user => user.username === username);
        if (userExists) {
            return res.status(400).json({ error: 'El nombre de usuario ya existe' });
        }

        // 3. Encriptar contraseña (Requisito Rúbrica: bcryptjs)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Crear nuevo usuario y guardarlo en el array
        const newUser = {
            id: Date.now().toString(), // Generamos ID único
            username,
            password: hashedPassword
        };

        users.push(newUser);

        // 5. Escribir el array actualizado en el archivo JSON
        await writeFile(usersPath, users);
        
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        next(error); // Enviamos el error al middleware global
    }
});

// LOGIN (POST /api/auth/login)
router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        
        // 1. Leer usuarios del archivo
        const users = await readFile(usersPath);

        // 2. Buscar usuario por username
        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }

        // 3. Comparar contraseñas
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        // 4. Crear Token JWT (Requisito Rúbrica: jsonwebtoken)
        // Importante: Guardamos el 'id' en el token para saber quién es el dueño de las tareas después
        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        
        // Devolvemos el token en el cuerpo de la respuesta
        res.json({ 
            message: 'Login exitoso',
            token 
        });

    } catch (error) {
        next(error);
    }
});

module.exports = router;