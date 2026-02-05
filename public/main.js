const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

// Verificar si estamos en la página de registro
const isRegister = window.location.pathname.includes('register.html');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // --- AQUÍ ESTÁ EL CAMBIO CLAVE: Usamos solo la barra "/" ---
        // Esto le dice al navegador: "Busca la API donde sea que estés alojado"
        const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (res.ok) {
                if (isRegister) {
                    alert('¡Registro exitoso! Ahora inicia sesión.');
                    window.location.href = 'index.html';
                } else {
                    localStorage.setItem('token', data.token);
                    window.location.href = 'dashboard.html';
                }
            } else {
                showError(data.message || 'Error en la autenticación');
            }
        } catch (error) {
            console.error(error);
            showError('Error de conexión con el servidor (Revisa main.js)');
        }
    });
}

function showError(msg) {
    errorMessage.textContent = msg;
    errorMessage.style.display = 'block';
}