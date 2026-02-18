const jwt = require('jsonwebtoken');

// GUARDIA 1: Verifica que el usuario tenga un Token válido
const verifyToken = (req, res, next) => {
    // Busco el token en el encabezado 'Authorization'
    const token = req.header('Authorization');

    // Si no trae token, le niego el acceso inmediatamente
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No hay token.' });
    }

    try {
        // Intento decodificar el token usando mi clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Si funciona, guardo los datos del usuario (id y role) en la petición
        req.user = decoded.user;
        
        // Dejo pasar a la siguiente función
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token no válido' });
    }
};

// GUARDIA 2: Verifica que el usuario sea ADMINISTRADOR
// Este guardia solo funciona si ya pasó el primero (verifyToken)
const verifyAdmin = (req, res, next) => {
    // Reviso si el rol guardado en el token es exactamente 'admin'
    if (req.user && req.user.role === 'admin') {
        // Si es admin, lo dejo pasar
        next();
    } else {
        // Si no es admin, le prohíbo el paso aunque tenga token
        res.status(403).json({ message: 'Acceso denegado. Se requieren permisos de Administrador.' });
    }
};

// Exporto ambos guardias para usarlos en mis rutas
module.exports = { verifyToken, verifyAdmin };