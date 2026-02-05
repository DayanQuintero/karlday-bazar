const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const logoutBtn = document.getElementById('logout-btn');

const token = localStorage.getItem('token');
if (!token) {
    window.location.href = 'index.html';
}

fetchProducts();

async function fetchProducts() {
    try {
        // --- CAMBIO CLAVE: Ruta relativa ---
        const res = await fetch('/api/products', {
            headers: { 'Authorization': token }
        });
        const products = await res.json();
        
        taskList.innerHTML = '';
        if(Array.isArray(products)) {
            products.forEach(addProductToDOM);
        }
    } catch (error) {
        console.error('Error cargando inventario:', error);
    }
}

if (taskForm) {
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = taskInput.value;
        
        try {
            // --- CAMBIO CLAVE: Ruta relativa ---
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({ name, price: 100, category: 'Moda' })
            });

            if (res.ok) {
                const newProduct = await res.json();
                addProductToDOM(newProduct);
                taskInput.value = '';
            }
        } catch (error) {
            console.error('Error agregando producto:', error);
        }
    });
}

function addProductToDOM(product) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
        <div class="task-info">
            <h3>${product.name}</h3>
            <p>Categoría: ${product.category || 'General'} | Precio: $${product.price || 0}</p>
        </div>
    `;
    taskList.appendChild(li);
}

if(logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = 'index.html';
    });
}