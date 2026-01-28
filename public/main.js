// public/main.js
const authForm = document.getElementById('authForm');
const toggleLink = document.getElementById('toggleLink');
const formTitle = document.getElementById('formTitle');
const btnAction = document.getElementById('btnAction');
const message = document.getElementById('message');

let isLogin = true;

toggleLink.addEventListener('click', () => {
    isLogin = !isLogin;
    if (isLogin) {
        formTitle.textContent = 'Iniciar Sesión';
        btnAction.textContent = 'Entrar';
        toggleLink.textContent = '¿No tienes cuenta? Regístrate';
    } else {
        formTitle.textContent = 'Registro';
        btnAction.textContent = 'Registrarse';
        toggleLink.textContent = '¿Ya tienes cuenta? Entra aquí';
    }
});

authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
        const res = await fetch(`http://localhost:3000${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();

        if (res.ok) {
            if (isLogin) {
                localStorage.setItem('auth-token', data.token);
                window.location.href = 'dashboard.html';
            } else {
                message.style.color = '#4caf50';
                message.textContent = '¡Registro exitoso! Ahora entra.';
                toggleLink.click();
            }
        } else {
            message.style.color = '#ff4444';
            message.textContent = data.error || 'Error desconocido';
        }
    } catch (error) {
        message.textContent = 'Error de conexión con el servidor';
    }
});