// backend/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTRO
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        // 1. Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // 2. Crear usuario
        const user = new User({ username, password: hashedPassword });
        await user.save();
        
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // 1. Buscar usuario
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

        // 2. Comparar contraseñas
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'Contraseña incorrecta' });

        // 3. Crear Token JWT
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        
        res.header('auth-token', token).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
});

module.exports = router;