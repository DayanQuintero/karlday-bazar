import { useState } from 'react';

function FeedbackWidget() {
  // Uso mi estado para saber si el panel debe mostrarse (true) o esconderse (false)
  const [isOpen, setIsOpen] = useState(false);
  
  // Guardo la calificación que el cliente elija (del 0 al 10)
  const [score, setScore] = useState(null);
  
  // NUEVO: Creo un estado para controlar en qué "paso" de la encuesta estoy (1 = Pregunta, 2 = Gracias)
  const [step, setStep] = useState(1);

  // NUEVO: Creo una función que se encarga de cerrar el panel y "limpiar" todo para la próxima vez
  const handleClose = () => {
    setIsOpen(false);
    // Espero 300 milisegundos (lo que dura la animación de cierre) antes de reiniciar la encuesta
    setTimeout(() => {
      setStep(1);
      setScore(null);
    }, 300); 
  };

  return (
    <>
      {/* 1. MI PESTAÑA LATERAL */}
      <div 
        className="feedback-tab" 
        onClick={() => setIsOpen(true)}
        style={{ display: isOpen ? 'none' : 'block' }} 
      >
        COMENTARIOS
      </div>

      {/* 2. MI PANEL DESLIZABLE DE ENCUESTA */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: isOpen ? '0' : '-450px', 
        width: '100%',
        maxWidth: '400px',
        height: '100vh',
        backgroundColor: '#fff',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
        transition: 'right 0.3s ease-in-out',
        zIndex: 2000,
        padding: '50px 40px',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto'
      }}>
        
        {/* Mi botón de cerrar "X" */}
        <button 
          onClick={handleClose}
          style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
        >
          ✕
        </button>

        {/* El Logo de mi tienda */}
        <h2 style={{ fontFamily: 'Oswald', fontSize: '2rem', margin: '0 0 20px 0', letterSpacing: '2px' }}>KARLDAY</h2>
        
        {/* --- LÓGICA DE PASOS: Dependiendo de la variable 'step', muestro una cosa u otra --- */}
        {step === 1 ? (
          
          // --- PASO 1: LA ENCUESTA ---
          <>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '30px', lineHeight: '1' }}>TU EXPERIENCIA</h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '30px' }}>
              <span style={{ textDecoration: 'underline', fontFamily: 'Inter', fontSize: '1.1rem', cursor: 'pointer' }}>AYUDA</span>
              <span style={{ border: '1px solid #000', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.8rem', cursor: 'pointer' }}>i</span>
            </div>

            <p style={{ fontFamily: 'Inter', fontSize: '1.2rem', marginBottom: '40px', color: '#222' }}>
              ¡Queremos escucharte! Buena o mala, <strong>danos tu opinión.</strong>
            </p>

            <p style={{ fontFamily: 'Inter', fontSize: '1.15rem', marginBottom: '20px' }}>
              ¿Cuál es la probabilidad de que recomiendes <strong>karlday.com</strong> a tus amigos? <span style={{ color: '#e60000' }}>*</span>
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter', fontSize: '0.9rem', marginBottom: '15px', color: '#555' }}>
              <span>Muy poco probable</span>
              <span>Muy probable</span>
            </div>

            {/* Fila de números con sus casillas redondas */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <div key={num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                  <input 
                    type="radio" 
                    name="nps-score" 
                    value={num}
                    checked={score === num} // Le digo a React cuál es la casilla seleccionada
                    onChange={() => setScore(num)} // Guardo el número cuando le dan clic
                    style={{ width: '20px', height: '20px', accentColor: '#000', cursor: 'pointer' }}
                  />
                  <span style={{ fontFamily: 'Inter', fontSize: '0.9rem' }}>{num}</span>
                </div>
              ))}
            </div>

            {/* Mi botón SIGUIENTE */}
            <button 
              className="btn-karl" 
              onClick={() => {
                // Valido que el usuario haya seleccionado un número antes de cambiar de pantalla
                if (score !== null) {
                  setStep(2); // Cambio al paso 2 (Agradecimiento)
                } else {
                  alert('Por favor, selecciona una calificación del 0 al 10 antes de continuar.');
                }
              }}
              // Si no han seleccionado nada, hago que el botón se vea un poco transparente
              style={{ display: 'inline-flex', justifyContent: 'space-between', alignItems: 'center', width: '200px', padding: '15px 20px', opacity: score !== null ? 1 : 0.5 }}
            >
              <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>SIGUIENTE</span>
              <span style={{ fontSize: '1.5rem' }}>→</span>
            </button>
          </>

        ) : (

          // --- PASO 2: EL MENSAJE DE AGRADECIMIENTO ---
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1, textAlign: 'center', paddingBottom: '30px', marginTop: '40px' }}>
            
            {/* Dibujo un círculo negro con una palomita blanca (SVG) adentro para dar un toque premium */}
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#000', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '30px' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>

            <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', lineHeight: '1.1' }}>¡GRACIAS POR TU TIEMPO!</h1>
            
            <p style={{ fontFamily: 'Inter', fontSize: '1.1rem', color: '#444', marginBottom: '15px', lineHeight: '1.5' }}>
              Tus comentarios son fundamentales para ayudarnos a construir el futuro del <strong>BAZAR</strong> y mejorar la experiencia de toda nuestra comunidad.
            </p>

            <p style={{ fontFamily: 'Inter', fontSize: '1rem', color: '#888', marginBottom: '50px' }}>
              Hemos registrado tu calificación de <strong>{score}/10</strong>.
            </p>

            {/* Botón final para cerrar el panel */}
            <button 
              className="btn-karl" 
              onClick={handleClose} 
              style={{ width: '100%', padding: '15px' }}
            >
              VOLVER A LA TIENDA
            </button>
          </div>
        )}

        {/* Mi pie de página legal simulado para darle profesionalismo */}
        <div style={{ marginTop: 'auto', paddingTop: '40px' }}>
          <p style={{ fontFamily: 'Inter', fontSize: '0.8rem', color: '#888', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
            Protegido por reCAPTCHA: Privacidad y condiciones 
          </p>
        </div>

      </div>
      
      {/* 3. MI FONDO OSCURO PROTECTOR */}
      {isOpen && (
        <div 
          onClick={handleClose}
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1999 }}
        />
      )}
    </>
  );
}

export default FeedbackWidget;