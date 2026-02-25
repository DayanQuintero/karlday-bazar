// --- 1. FUNCIÓN MÁGICA PARA LA NOTIFICACIÓN ---
// Crea una burbuja elegante en la pantalla sin usar alert()
function mostrarNotificacion(mensaje, exito = true) {
    // Crear el elemento de la notificación
    const toast = document.createElement('div');
    
    // Aplicar estilos premium (negro/blanco como KARLDAY)
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: exito ? '#111' : '#e60000',
        color: '#fff',
        padding: '16px 24px',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        zIndex: '10000',
        transition: 'all 0.5s ease',
        transform: 'translateX(120%)', // Empieza fuera de la pantalla
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
    });

    toast.innerHTML = `<span>${mensaje}</span> <b style="cursor:pointer">✕</b>`;
    document.body.appendChild(toast);

    // Animación de entrada
    setTimeout(() => toast.style.transform = 'translateX(0)', 100);

    // Función para quitarla
    const cerrar = () => {
        toast.style.transform = 'translateX(120%)';
        setTimeout(() => toast.remove(), 500);
    };

    // Cerrar al dar clic en la X o después de 3 segundos
    toast.querySelector('b').onclick = cerrar;
    setTimeout(cerrar, 3500);
}

// --- 2. LÓGICA DEL FORMULARIO ---
// Aquí es donde atrapamos el evento de subir el producto
document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('form');

    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault();

            // Obtenemos los datos (asumiendo que tus inputs tienen estos ID)
            const nombreInput = document.querySelector('input[type="text"]');
            const nombre = nombreInput ? nombreInput.value : "Producto";

            // ¡AQUÍ ESTÁ EL CAMBIO! 
            // En lugar de alert("Bienvenido Admin"), usamos nuestra notificación:
            mostrarNotificacion(`¡ÉXITO! EL PRODUCTO "${nombre.toUpperCase()}" SE SUBIÓ CORRECTAMENTE`);

            // Limpiar formulario opcional
            formulario.reset();
        });
    }
});