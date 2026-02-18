const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

// RUTA 1: REGISTRO
// Aquí recibo los datos para crear un nuevo usuario
router.post('/register', async (req, res) => {
    try {
        // Extraigo el usuario, contraseña y el ROL del cuerpo de la petición
        const { username, password, role } = req.body;

        // Verifico si ya existe alguien con ese nombre para no duplicar
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Genero una "sal" para encriptar la contraseña de forma segura
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creo el nuevo usuario en memoria, asignando el rol que me pidieron (o 'user' por defecto)
        user = new User({ 
            username, 
            password: hashedPassword,
            role: role || 'user' 
        });

        // Guardo el usuario definitivamente en MongoDB
        await user.save();

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// RUTA 2: INICIO DE SESIÓN (LOGIN)
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Busco al usuario en la base de datos
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        // Comparo la contraseña que escribieron con la encriptada
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        // --- CAMBIO CLAVE AQUÍ ---
        // Preparo la información que irá dentro del Token (el "gafete")
        // Ahora incluyo el 'role' para que el sistema sepa quién soy sin consultar la BD a cada rato
        const payload = {
            user: {
                id: user.id,
                role: user.role 
            }
        };

        // Firmo el token con mi clave secreta
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                // Devuelvo el token y el rol al frontend para que sepa qué menús mostrar
                res.json({ token, role: user.role }); 
            }
        );

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

module.exports = router;