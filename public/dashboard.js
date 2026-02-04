// public/dashboard.js

// 1. Verificación de Seguridad
const token = localStorage.getItem('auth-token');
if (!token) window.location.href = 'index.html';

const tasksList = document.getElementById('tasksList');
const taskForm = document.getElementById('taskForm');

// Configuración de cabeceras estándar para JWT
const getAuthHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // ¡CORRECCIÓN IMPORTANTE! Backend espera "Bearer token"
    };
};

// 2. Función de Lectura (READ)
async function loadTasks() {
    try {
        const res = await fetch('/api/tasks', {
            method: 'GET',
            headers: getAuthHeaders() // Usamos la cabecera corregida
        });

        if (res.status === 401 || res.status === 403) {
            alert("Tu sesión ha expirado.");
            localStorage.removeItem('auth-token');
            window.location.href = 'index.html';
            return;
        }

        const tasks = await res.json();
        
        tasksList.innerHTML = ''; 

        if(tasks.length === 0) {
            tasksList.innerHTML = '<p style="text-align:center; color:#888; margin-top:50px;">El inventario está vacío actualmente.</p>';
            return;
        }

        tasks.forEach(task => {
            const div = document.createElement('div');
            div.className = 'task-item';
            
            // CORRECCIÓN DE ID: Cambiamos task._id por task.id
            div.innerHTML = `
                <span>${task.title}</span>
                <div style="display:flex; gap:10px;">
                    <button onclick="editTask('${task.id}', '${task.title}')" style="cursor:pointer; background:none; border:1px solid #888; color:#ccc; padding:5px 10px; border-radius:4px;">EDITAR</button>
                    <button class="delete-btn" onclick="deleteTask('${task.id}')">ELIMINAR</button>
                </div>
            `;
            tasksList.appendChild(div);
        });
    } catch (error) {
        console.error('Error cargando tareas:', error);
    }
}

// 3. Función de Creación (CREATE)
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('taskTitle').value;
    
    await fetch('/api/tasks', {
        method: 'POST',
        headers: getAuthHeaders(), // Cabecera corregida
        body: JSON.stringify({ title, description: "Inventario" }) // Agrego description por si el backend lo pide
    });
    
    document.getElementById('taskTitle').value = '';
    loadTasks();
});

// 4. Función de Edición (UPDATE)
window.editTask = async (id, currentTitle) => {
    const newTitle = prompt("Editar nombre de la prenda:", currentTitle);
    
    if (newTitle && newTitle !== currentTitle) {
        await fetch(`/api/tasks/${id}`, { // ID sin guion bajo
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({ title: newTitle })
        });
        loadTasks();
    }
};

// 5. Función de Eliminación (DELETE)
window.deleteTask = async (id) => {
    if(confirm('¿Estás seguro de eliminar este elemento del inventario?')) {
        await fetch(`/api/tasks/${id}`, { // ID sin guion bajo
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        loadTasks();
    }
};

// 6. Cerrar Sesión
document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('auth-token');
    window.location.href = 'index.html';
});

// Iniciar
loadTasks();