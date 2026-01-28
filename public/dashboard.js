// public/dashboard.js

// 1. Verificación de Seguridad
// Recupero mi token del almacenamiento local. Si no existe, redirijo al login para proteger la vista.
const token = localStorage.getItem('auth-token');
if (!token) window.location.href = 'index.html';

const tasksList = document.getElementById('tasksList');
const taskForm = document.getElementById('taskForm');

// 2. Función de Lectura (READ)
// Esta función asíncrona se encarga de pedirle al backend mi lista de inventario.
async function loadTasks() {
    try {
        const res = await fetch('http://localhost:3000/api/tasks', {
            headers: { 'auth-token': token } // Envío mi "pase VIP" (token) en los headers
        });
        const tasks = await res.json();
        
        tasksList.innerHTML = ''; // Limpio la lista visual antes de volver a llenarla
        
        // Si no tengo datos, muestro un mensaje amigable
        if(tasks.length === 0) {
            tasksList.innerHTML = '<p style="text-align:center; color:#888; margin-top:50px;">El inventario está vacío actualmente.</p>';
            return;
        }

        // Recorro cada elemento que me devolvió MongoDB y creo el HTML correspondiente
        tasks.forEach(task => {
            const div = document.createElement('div');
            div.className = 'task-item'; // Uso la clase CSS que definí en mi dashboard.html
            
            // Aquí agregué el botón de EDITAR junto al de ELIMINAR para cumplir con el CRUD completo
            div.innerHTML = `
                <span>${task.title}</span>
                <div style="display:flex; gap:10px;">
                    <button onclick="editTask('${task._id}', '${task.title}')" style="cursor:pointer; background:none; border:1px solid #888; color:#ccc; padding:5px 10px; border-radius:4px;">EDITAR</button>
                    <button class="delete-btn" onclick="deleteTask('${task._id}')">ELIMINAR</button>
                </div>
            `;
            tasksList.appendChild(div);
        });
    } catch (error) {
        console.error('Tuve un error al cargar las tareas:', error);
    }
}

// 3. Función de Creación (CREATE)
// Escucho el evento 'submit' del formulario para agregar nuevas prendas.
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evito que la página se recargue sola
    const title = document.getElementById('taskTitle').value;
    
    // Hago la petición POST a mi API
    await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'auth-token': token },
        body: JSON.stringify({ title })
    });
    
    document.getElementById('taskTitle').value = ''; // Limpio el input
    loadTasks(); // Recargo la lista para ver el cambio inmediato
});

// 4. Función de Edición (UPDATE) - ¡NUEVA!
// Esta función se activa al dar clic en "EDITAR". Uso un prompt nativo para pedir el nuevo nombre.
window.editTask = async (id, currentTitle) => {
    const newTitle = prompt("Editar nombre de la prenda:", currentTitle);
    
    // Solo procedo si el usuario escribió algo y es diferente al original
    if (newTitle && newTitle !== currentTitle) {
        await fetch(`http://localhost:3000/api/tasks/${id}`, {
            method: 'PUT', // Uso el método PUT que configuré en mis rutas
            headers: { 'Content-Type': 'application/json', 'auth-token': token },
            body: JSON.stringify({ title: newTitle })
        });
        loadTasks(); // Actualizo la vista
    }
};

// 5. Función de Eliminación (DELETE)
// Pido confirmación antes de borrar permanentemente de la base de datos.
window.deleteTask = async (id) => {
    if(confirm('¿Estás seguro de eliminar este elemento del inventario?')) {
        await fetch(`http://localhost:3000/api/tasks/${id}`, {
            method: 'DELETE',
            headers: { 'auth-token': token }
        });
        loadTasks(); // Refresco la lista
    }
};

// 6. Cerrar Sesión
// Borro el token para que nadie más pueda entrar y regreso al login.
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('auth-token');
    window.location.href = 'index.html';
});

// Llamada inicial para cargar los datos al abrir la página
loadTasks();