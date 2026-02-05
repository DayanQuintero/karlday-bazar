const API_URL = 'http://localhost:3000/api/products';
const token = localStorage.getItem('token');
const productList = document.getElementById('task-list'); // Usaremos el mismo contenedor
const productForm = document.getElementById('task-form'); // Usaremos el mismo form

// 1. Verificar si hay token (Protección del Frontend)
if (!token) {
    window.location.href = 'index.html';
}

// 2. Cargar Productos desde MongoDB
async function loadProducts() {
    try {
        const res = await fetch(API_URL, {
            headers: { 'Authorization': token }
        });
        const products = await res.json();
        
        productList.innerHTML = ''; // Limpiar lista
        products.forEach(renderProduct);
        updateStats(products.length); // Actualizar contador
    } catch (error) {
        console.error('Error cargando productos:', error);
        alert('Tu sesión expiró, inicia sesión de nuevo');
        localStorage.removeItem('token');
        window.location.href = 'index.html';
    }
}

// 3. Renderizar Producto en HTML
function renderProduct(product) {
    const li = document.createElement('li');
    li.className = 'task-item'; // Mantenemos la clase para que se vea bonito con tu CSS actual
    li.innerHTML = `
        <div class="task-info">
            <h3>${product.name}</h3>
            <p>Categoría: ${product.category} | Precio: $${product.price}</p>
        </div>
        <div class="task-actions">
            <button onclick="deleteProduct('${product._id}')" class="btn-delete">🗑️</button>
        </div>
    `;
    productList.appendChild(li);
}

// 4. Crear Nuevo Producto
if (productForm) {
    productForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // OJO: Aquí estoy asumiendo que tu input se llama 'task-input'. 
        // Para que sea una tienda real, deberíamos cambiar el HTML, 
        // pero por ahora usaremos el input de texto para el nombre.
        const nameInput = document.getElementById('task-input'); 
        
        const newProduct = {
            name: nameInput.value,
            price: 100, // Precio por defecto (luego podemos poner inputs reales)
            category: 'Moda' // Categoría por defecto
        };

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(newProduct)
            });

            if (res.ok) {
                nameInput.value = '';
                loadProducts(); // Recargar lista
            }
        } catch (error) {
            console.error(error);
        }
    });
}

// 5. Eliminar Producto
window.deleteProduct = async (id) => {
    if(!confirm('¿Borrar producto?')) return;

    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': token }
        });
        loadProducts();
    } catch (error) {
        console.error(error);
    }
};

function updateStats(count) {
    // Si tienes elementos para mostrar estadísticas
    const statsElement = document.getElementById('total-tasks'); 
    if(statsElement) statsElement.innerText = count + ' Productos';
}

// Iniciar
document.addEventListener('DOMContentLoaded', loadProducts);

// Botón Logout
document.getElementById('logout-btn')?.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
});