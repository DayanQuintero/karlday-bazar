const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const errorMessage = document.getElementById('error-message');

// URL del Backend
const API_URL = 'http://localhost:3000/api/auth';

// --- LOGIN ---
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', username);
                window.location.href = 'dashboard.html';
            } else {
                showError(data.message || 'Error al iniciar sesión');
            }
        } catch (error) {
            showError('Error de conexión con el servidor');
        }
    });
}

// --- REGISTRO ---
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const res = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();

            if (res.ok) {
                alert('¡Usuario registrado con éxito! Ahora inicia sesión.');
                window.location.href = 'index.html';
            } else {
                showError(data.message || 'Error al registrar usuario');
            }
        } catch (error) {
            showError('Error de conexión con el servidor');
        }
    });
}

function showError(msg) {
    if(errorMessage) {
        errorMessage.textContent = msg;
        errorMessage.style.display = 'block';
    } else {
        alert(msg);
    }
}