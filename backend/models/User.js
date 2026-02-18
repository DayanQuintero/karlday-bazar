const mongoose = require('mongoose');

// Defino el esquema de mi usuario en la base de datos
const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    // --- CAMBIO CLAVE AQUÍ ---
    // Agrego una propiedad 'role' para saber si soy admin o cliente
    role: { 
        type: String, 
        enum: ['user', 'admin'], // Solo permito estos dos valores exactos
        default: 'user'          // Si no me dicen qué soy, asumo que soy un usuario normal
    }
});

module.exports = mongoose.model('User', UserSchema);