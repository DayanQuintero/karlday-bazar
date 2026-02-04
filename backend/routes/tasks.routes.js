// backend/routes/tasks.routes.js
const express = require('express');
const router = express.Router();
// Importamos nuestras herramientas de archivos en lugar de Mongoose
const { readFile, writeFile, tasksPath } = require('../utils/fileHandler');

// 1. LEER TODAS (GET /api/tasks)
router.get('/', async (req, res, next) => {
    try {
        const tasks = await readFile(tasksPath);
        // Opcional: Si quieres que cada usuario vea SOLO sus tareas, descomenta esto:
        // const userTasks = tasks.filter(task => task.userId === req.user.id);
        // res.json(userTasks);
        
        // Por ahora devolvemos todas para cumplir el CRUD básico:
        res.json(tasks);
    } catch (error) {
        next(error); // Pasamos el error al middleware de server.js
    }
});

// 2. CREAR TAREA (POST /api/tasks)
router.post('/', async (req, res, next) => {
    try {
        const { title, description } = req.body;
        
        // Validación básica
        if (!title) {
            return res.status(400).json({ error: 'El título es obligatorio' });
        }

        const tasks = await readFile(tasksPath);
        
        const newTask = {
            id: Date.now().toString(), // Generamos un ID único basado en el tiempo
            title,
            description: description || '',
            completed: false,
            userId: req.user ? req.user.id : null // Vinculamos al usuario si existe el token
        };

        tasks.push(newTask);
        await writeFile(tasksPath, tasks); // Guardamos en el archivo
        
        res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
});

// 3. ACTUALIZAR TAREA (PUT /api/tasks/:id)
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        
        const tasks = await readFile(tasksPath);
        const taskIndex = tasks.findIndex(t => t.id === id);

        if (taskIndex === -1) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        // Actualizamos la tarea manteniendo los datos viejos que no cambian
        tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
        
        await writeFile(tasksPath, tasks);
        res.json(tasks[taskIndex]);
    } catch (error) {
        next(error);
    }
});

// 4. ELIMINAR TAREA (DELETE /api/tasks/:id)
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        let tasks = await readFile(tasksPath);
        
        const initialLength = tasks.length;
        tasks = tasks.filter(t => t.id !== id);

        if (tasks.length === initialLength) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        await writeFile(tasksPath, tasks);
        res.json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;