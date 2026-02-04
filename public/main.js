// public/main.js

const authForm = document.getElementById('authForm');
const toggleLink = document.getElementById('toggleLink');
const formTitle = document.getElementById('formTitle');
const btnAction = document.getElementById('btnAction');
const message = document.getElementById('message');

let isLoginMode = true; // Variable para saber si estamos logueando o registrando

// 1. Alternar entre Modo Login y Modo Registro
toggleLink.addEventListener('click', () => {
    isLoginMode = !isLoginMode;
    if (isLoginMode) {
        formTitle.textContent = 'Ingresar';
        btnAction.textContent = 'ENTRAR';
        toggleLink.textContent = '¿Nuevo administrador? Registrarse';
    } else {
        formTitle.textContent = 'Registrar';
        btnAction.textContent = 'REGISTRARSE';
        toggleLink.textContent = '¿Ya tienes cuenta? Ingresar';
    }
    message.textContent = ''; // Limpiar mensajes
});

// 2. Manejar el envío del formulario
authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const endpoint = isLoginMode ? '/api/auth/login' : '/api/auth/register';

    try {
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (!res.ok) {
            message.style.color = 'red';
            message.textContent = data.error || data.message || 'Ocurrió un error';
            return;
        }

        if (isLoginMode) {
            // --- LOGIN EXITOSO ---
            if (data.token) {
                localStorage.setItem('auth-token', data.token);
                // Redirigimos a 'inicio.html' que es tu página principal
                window.location.href = 'inicio.html';
            }
        } else {
            // --- REGISTRO EXITOSO ---
            message.style.color = 'lightgreen';
            message.textContent = '¡Registro exitoso! Ahora puedes ingresar.';
            // Volvemos al modo login automáticamente
            toggleLink.click();
        }

    } catch (error) {
        console.error(error);
        message.style.color = 'red';
        message.textContent = 'Error de conexión con el servidor';
    }
});