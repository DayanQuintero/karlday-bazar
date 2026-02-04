// backend/utils/fileHandler.js
const fs = require('fs').promises; // Usamos .promises para ser asíncronos (Requisito Rúbrica)
const path = require('path');

// Definimos dónde están los archivos JSON
const tasksPath = path.join(__dirname, '../data/tareas.json');
const usersPath = path.join(__dirname, '../data/usuarios.json');

// Función auxiliar para LEER
const readFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // Si el archivo no existe o está vacío, retornamos un array vacío
        return [];
    }
};

// Función auxiliar para ESCRIBIR
const writeFile = async (filePath, data) => {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

module.exports = { tasksPath, usersPath, readFile, writeFile };