// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Asegúrate de que esta clave sea LA MISMA que usas en auth.routes.js
const SECRET_KEY = process.env.JWT_SECRET || 'mi_secreto_super_seguro';

const verifyToken = (req, res, next) => {
    // 1. Buscamos el token en la cabecera
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(403).json({ message: 'Acceso denegado: Token requerido' });
    }

    try {
        // 2. Limpiamos el token (quitamos la palabra "Bearer " si existe)
        // Esto separa "Bearer <token>" y se queda solo con el token real
        const token = authHeader.startsWith('Bearer ') 
            ? authHeader.split(' ')[1] 
            : authHeader;

        // 3. Verificamos la firma
        const decoded = jwt.verify(token, SECRET_KEY);
        
        // 4. Guardamos los datos del usuario en la petición para usarlos luego
        req.user = decoded;
        next(); // ¡Pasa, amigo!
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

module.exports = verifyToken;