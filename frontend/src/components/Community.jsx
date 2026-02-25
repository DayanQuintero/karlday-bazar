import { Link } from 'react-router-dom';

function Community() {
  return (
    // Creo un fondo gris oscuro que cubre toda la pantalla para hacer resaltar mi ventana blanca
    <div style={{ 
      backgroundColor: '#e5e5e5', 
      minHeight: '85vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '40px'
    }}>
      
      {/* Mi ventana modal principal estilo Adidas */}
      <div style={{ 
        backgroundColor: '#fff', 
        width: '100%', 
        maxWidth: '500px', 
        padding: '40px', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        position: 'relative' // Necesario para colocar la "X" de cerrar en la esquina
      }}>
        
        {/* Mi botón de cerrar "X" en la esquina superior derecha */}
        <Link to="/" style={{ position: 'absolute', top: '20px', right: '20px', color: '#000', textDecoration: 'none', fontSize: '1.5rem' }}>
          ✕
        </Link>

        {/* Encabezado con el nombre de mi tienda y la sección */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '1.8rem' }}>KARLDAY</h2>
          <span style={{ fontSize: '1.2rem', color: '#ccc' }}>|</span>
          <span style={{ fontFamily: 'Inter', fontWeight: 'bold', fontSize: '1.1rem' }}>comunidad</span>
        </div>

        {/* Título gigante y descripción para invitar a los usuarios al Bazar */}
        <h1 style={{ fontSize: '2.5rem', lineHeight: '1', marginBottom: '15px' }}>
          INICIA SESIÓN O REGÍSTRATE.
        </h1>
        <p style={{ fontFamily: 'Inter', color: '#444', marginBottom: '30px', fontSize: '0.95rem', lineHeight: '1.5' }}>
          Únete a nuestra comunidad. Accede a diseños exclusivos, ofertas especiales... <strong>¡Y abre tu propia tienda en el BAZAR para vender la ropa que ya no usas!</strong>
        </p>

        {/* --- MIS BOTONES DE REDES SOCIALES --- */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
          
          {/* Botón 1: Ahora con el icono perfecto de INSTAGRAM en SVG */}
          <button style={{ flex: 1, padding: '15px', border: '1px solid #000', backgroundColor: '#fff', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E1306C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </button>

          {/* Botón 2: Facebook */}
          <button style={{ flex: 1, padding: '15px', border: '1px solid #000', backgroundColor: '#fff', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold', color: '#1877F2' }}>
            f
          </button>
          
          {/* Botón 3: Google */}
          <button style={{ flex: 1, padding: '15px', border: '1px solid #000', backgroundColor: '#fff', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold', color: '#DB4437' }}>
            G
          </button>
        </div>

        {/* Formulario de Correo */}
        <input 
          type="email" 
          placeholder="CORREO ELECTRÓNICO *" 
          style={{ width: '100%', padding: '15px', border: '1px solid #000', marginBottom: '25px', fontFamily: 'Inter', fontSize: '1rem', outline: 'none' }}
        />

        {/* Casillas de verificación para los términos y privacidad */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '15px' }}>
          <input type="checkbox" style={{ width: '20px', height: '20px', marginTop: '2px', cursor: 'pointer' }} />
          <p style={{ fontFamily: 'Inter', fontSize: '0.85rem', color: '#444', margin: 0 }}>
            He leído y acepto los <span style={{ textDecoration: 'underline' }}>Términos y Condiciones de la comunidad</span> y el <span style={{ textDecoration: 'underline' }}>Aviso de privacidad</span> de KARLDAY *
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '30px' }}>
          <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px', marginTop: '2px', accentColor: '#000', cursor: 'pointer' }} />
          <p style={{ fontFamily: 'Inter', fontSize: '0.85rem', color: '#444', margin: 0 }}>
            Mantener sesión iniciada. Aplicable a todas las opciones.<br/>
            <span style={{ textDecoration: 'underline' }}>Más información</span>
          </p>
        </div>

        {/* Mi Botón principal de Continuar, pintado de negro */}
        <button className="btn-karl" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '200px' }}>
          <span>CONTINUAR</span>
          <span style={{ fontSize: '1.5rem' }}>→</span>
        </button>

      </div>
    </div>
  );
}

export default Community;