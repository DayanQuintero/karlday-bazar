const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); // Importo mi modelo de Tareas para poder interactuar con la base de datos

/* NOTA: En mi server.js ya definí que este archivo maneja '/api/tasks'.
  Por lo tanto, aquí solo uso '/' para referirme a la raíz de esa ruta.
*/

// 1. LEER TODAS (GET /api/tasks)
// Aquí le pido a MongoDB que busque y me devuelva todas las tareas que tengo guardadas.
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Tuve un error al intentar obtener las tareas' });
    }
});

// 2. CREAR TAREA (POST /api/tasks)
// Aquí recibo los datos nuevos, creo una instancia de mi modelo y la guardo en la base de datos.
router.post('/', async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save(); // Guardo la tarea permanentemente
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ error: 'Tuve un error al intentar crear la tarea' });
    }
});

// 3. ACTUALIZAR TAREA (PUT /api/tasks/:id)
// Aquí busco una tarea específica por su ID y actualizo su título con la nueva información que recibo.
router.put('/:id', async (req, res) => {
    try {
        const { title } = req.body;
        // Uso {new: true} para que la base de datos me devuelva el objeto ya editado, no el viejo.
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, { title }, { new: true });
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Tuve un error al intentar actualizar la tarea' });
    }
});

// 4. ELIMINAR TAREA (DELETE /api/tasks/:id)
// Aquí localizo el documento por su ID y lo elimino de mi colección.
router.delete('/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'He eliminado la tarea correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Tuve un error al intentar eliminar la tarea' });
    }
});

module.exports = router;