const mongoose = require('mongoose');

/*
  Aquí definí el esquema de la tarea.
  Indico qué campos tendrá cada tarea en la base de datos
  y el tipo de dato de cada uno.
*/
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

/*
  Aquí exporté el modelo para poder usarlo
  en las rutas del CRUD.
*/
module.exports = mongoose.model('Task', taskSchema);
