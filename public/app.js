// public/app.js

// 1. Verificar Seguridad (Si no hay token, te saca)
const token = localStorage.getItem('auth-token');
if (!token) {
    window.location.href = 'index.html';
}

// Referencias del DOM (Coinciden con tu inicio.html)
const inputTarea = document.getElementById('nueva-tarea');
const btnAgregar = document.getElementById('agregar-tarea');
const selectPrioridad = document.getElementById('prioridad');
const listaTareas = document.getElementById('lista-tareas');
const contadorTareas = document.getElementById('contador-tareas');
const btnLimpiar = document.getElementById('limpiar-tareas'); // Opcional si quieres implementarlo

// Configurar Headers con el Token
const getAuthHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

// --- FUNCIONES CRUD ---

// 2. Cargar Tareas (READ)
async function cargarTareas() {
    try {
        const res = await fetch('/api/tasks', { headers: getAuthHeaders() });
        
        if (res.status === 401 || res.status === 403) {
            alert('Sesión expirada');
            localStorage.removeItem('auth-token');
            window.location.href = 'index.html';
            return;
        }

        const tareas = await res.json();
        renderizarTareas(tareas);
    } catch (error) {
        console.error('Error cargando tareas:', error);
    }
}

// 3. Renderizar en HTML
function renderizarTareas(tareas) {
    listaTareas.innerHTML = ''; // Limpiar lista
    
    // Contadores
    const total = tareas.length;
    // (Opcional: Si el backend tuviera 'completed', aquí filtraríamos)
    contadorTareas.textContent = `Total tareas: ${total}`; 

    tareas.forEach(tarea => {
        // Crear elemento LI
        const li = document.createElement('li');
        li.className = 'todo__item';
        
        // Usamos la descripción para mostrar la prioridad si existe
        const prioridadTexto = tarea.description ? `(${tarea.description})` : '';

        li.innerHTML = `
            <span class="todo__text">${tarea.title} <small>${prioridadTexto}</small></span>
            <button class="todo__btn todo__btn--danger" onclick="eliminarTarea('${tarea.id}')">Eliminar</button>
        `;
        
        listaTareas.appendChild(li);
    });
}

// 4. Agregar Tarea (CREATE)
btnAgregar.addEventListener('click', async () => {
    const titulo = inputTarea.value;
    const prioridad = selectPrioridad.value; // Guardaremos la prioridad como descripción

    if (!titulo) return;

    try {
        await fetch('/api/tasks', {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ 
                title: titulo, 
                description: `Prioridad: ${prioridad}` 
            })
        });

        inputTarea.value = ''; // Limpiar input
        cargarTareas(); // Recargar lista
    } catch (error) {
        alert('Error al guardar tarea');
    }
});

// 5. Eliminar Tarea (DELETE)
// Hacemos esta función global (window) para que el HTML pueda llamarla onclick
window.eliminarTarea = async (id) => {
    if (confirm('¿Borrar tarea?')) {
        try {
            await fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });
            cargarTareas();
        } catch (error) {
            alert('Error eliminando tarea');
        }
    }
};

// 6. Botón Cerrar Sesión (Agregado dinámicamente o puedes ponerlo en el HTML)
// Como tu inicio.html no tiene botón de logout explícito, podrías agregar uno,
// o ejecutar localStorage.removeItem('auth-token') en la consola.

// INCIAR
cargarTareas();