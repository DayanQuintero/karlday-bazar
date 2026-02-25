import { useState } from 'react';

function GiftCards() {
  // Guardo en mi estado el monto que el cliente elige, empezando por $1000 por defecto
  const [amount, setAmount] = useState(1000);

  return (
    // Creo mi contenedor principal dándole márgenes para que no pegue con las orillas de la pantalla
    <div style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 40px', minHeight: '80vh' }}>
      
      {/* Pongo mi título gigante y la descripción de las tarjetas */}
      <h1 style={{ fontSize: '3rem', marginBottom: '10px', letterSpacing: '1px' }}>TARJETAS DE REGALO KARLDAY</h1>
      <p style={{ fontFamily: 'Inter', color: '#555', marginBottom: '50px', fontSize: '1.1rem' }}>
        El regalo perfecto para cualquier ocasión. Válidas en toda la tienda oficial y en el BAZAR de la comunidad.
      </p>

      {/* Armo mi cuadrícula para dividir la pantalla en 2 columnas: izquierda (fotos) y derecha (formulario) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '80px', alignItems: 'start' }}>
        
        {/* --- MI COLUMNA IZQUIERDA: EL ABANICO DE TARJETAS (VERSIÓN EXTREMA) --- */}
        <div style={{
          backgroundColor: '#f5f5f5',
          padding: '60px 20px', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '20px', 
          minHeight: '450px',
          overflow: 'hidden' // Evito que las tarjetas se salgan del cuadro gris si se abren mucho
        }}>
          
          {/* Hago mi contenedor un poco más alto para que quepan bien al separarse */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '350px', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

            {/* MI TARJETA 3 (La de hasta atrás) */}
            <img
              src="/img/tarjeta-regalo-3.jpg"
              alt="Tarjeta de regalo fondo"
              style={{
                position: 'absolute',
                width: '85%', 
                // La obligo a irse muy a la izquierda y hacia arriba con porcentajes
                left: '-30%', 
                top: '-10%',
                transform: 'rotate(-20deg)', // La roto bastante hacia la izquierda
                zIndex: 1, // La mando hasta la capa del fondo
                borderRadius: '15px',
                boxShadow: '0 10px 20px rgba(0,0,0,0.15)'
              }}
            />

            {/* MI TARJETA 2 (La de en medio) */}
            <img
              src="/img/tarjeta-regalo-2.jpg"
              alt="Tarjeta de regalo medio"
              style={{
                position: 'absolute',
                width: '85%',
                // La obligo a irse muy a la derecha y hacia abajo
                right: '-30%',
                bottom: '-10%',
                transform: 'rotate(20deg)', // La roto bastante a la derecha
                zIndex: 2, // Se queda en la capa de en medio
                borderRadius: '15px',
                boxShadow: '0 15px 30px rgba(0,0,0,0.2)'
              }}
            />

            {/* MI TARJETA 1 (La principal al frente) */}
            <img
              src="/img/tarjeta-regalo-1.jpg"
              alt="Tarjeta de Regalo Principal"
              style={{
                position: 'absolute',
                width: '100%', // Esta la dejo al 100% de tamaño
                // Se queda al centro exacto, sin moverse a los lados
                zIndex: 3, // Esta va hasta el frente tapando el centro de las otras dos
                borderRadius: '15px',
                boxShadow: '0 25px 50px rgba(0,0,0,0.5)' // Le doy una sombra fuerte para resaltar
              }}
            />
          </div>
        </div>

        {/* --- MI COLUMNA DERECHA: LOS BOTONES Y FORMULARIO --- */}
        <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '10px' }}>
          
          <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>1. SELECCIONA EL MONTO</h2>

          {/* Construyo mis botones de montos dinámicos */}
          <div style={{ display: 'flex', gap: '15px', marginBottom: '40px', flexWrap: 'wrap' }}>
            {[500, 1000, 2000, 5000].map((val) => (
              <button
                key={val}
                onClick={() => setAmount(val)} // Si le doy clic, guardo este valor en mi estado
                style={{
                  padding: '15px 25px',
                  // Pinto el botón de negro si es el que acabo de seleccionar, si no, lo dejo blanco
                  border: amount === val ? '2px solid #000' : '1px solid #ccc',
                  backgroundColor: amount === val ? '#000' : '#fff',
                  color: amount === val ? '#fff' : '#000',
                  fontFamily: 'Inter',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  flex: '1 0 100px', textAlign: 'center'
                }}
              >
                ${val}
              </button>
            ))}
          </div>

          <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>2. DETALLES DEL DESTINATARIO</h2>
          
          {/* Pongo los campos para que me llenen los datos del regalo */}
          <input type="text" placeholder="¿Para quién es? (Nombre)" style={{ width: '100%', padding: '15px', border: '1px solid #ccc', marginBottom: '15px', fontFamily: 'Inter', outline: 'none' }} />
          <input type="email" placeholder="Correo electrónico de quien recibe *" style={{ width: '100%', padding: '15px', border: '1px solid #ccc', marginBottom: '15px', fontFamily: 'Inter', outline: 'none' }} />
          <input type="text" placeholder="Tu nombre" style={{ width: '100%', padding: '15px', border: '1px solid #ccc', marginBottom: '15px', fontFamily: 'Inter', outline: 'none' }} />
          <textarea placeholder="Añade un mensaje personal (Opcional)" rows="4" style={{ width: '100%', padding: '15px', border: '1px solid #ccc', marginBottom: '40px', fontFamily: 'Inter', outline: 'none', resize: 'vertical' }}></textarea>

          {/* Mi botón negro gigante de agregar al carrito */}
          <button className="btn-karl" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '20px' }}>
            {/* Aquí muestro el monto actualizado en el botón */}
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>AGREGAR AL CARRITO • ${amount}</span>
            <span style={{ fontSize: '1.5rem' }}>→</span>
          </button>

          {/* Mis textos legales pequeños en gris */}
          <p style={{ fontFamily: 'Inter', fontSize: '0.85rem', color: '#666', marginTop: '20px', lineHeight: '1.5' }}>
            * Las tarjetas de regalo digitales se envían por correo electrónico. No tienen cargos adicionales ni fecha de caducidad.
          </p>
        </div>

      </div>
    </div>
  );
}

export default GiftCards;