const mongoose = require('mongoose');

/*
  Aquí configuré la conexión a la base de datos MongoDB.
  Uso la variable de entorno MONGO_URI definida en el archivo .env
  para mantener seguras las credenciales.
*/
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a MongoDB correctamente');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;