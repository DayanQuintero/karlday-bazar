import { Link } from 'react-router-dom';

function Returns() {
  return (
    // Mi contenedor principal, lo hago un poco más angosto (800px) para que los textos no se estiren demasiado y se vea elegante
    <div style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px', minHeight: '80vh' }}>
      
      {/* 1. SECCIÓN PRINCIPAL: Título y descripción */}
      <h1 style={{ fontSize: '3rem', marginBottom: '15px', letterSpacing: '1px' }}>PEDIDOS Y DEVOLUCIONES</h1>
      <p style={{ fontFamily: 'Inter', color: '#000', marginBottom: '50px', fontSize: '1.1rem' }}>
        Puedes cambiar o devolver un artículo de forma gratuita en un plazo de 30 días desde la recepción del pedido.
      </p>

      {/* 2. SECCIÓN: Correo Electrónico */}
      <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>¿CUÁL ES TU CORREO ELECTRÓNICO?</h3>
      <input 
        type="email" 
        placeholder="Correo electrónico *" 
        style={{ width: '100%', padding: '15px', border: '1px solid #000', marginBottom: '50px', fontFamily: 'Inter', fontSize: '1rem', outline: 'none' }} 
      />

      {/* 3. SECCIÓN: Qué quieres hacer (Radio Buttons) */}
      <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>¿QUÉ QUIERES HACER?</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginBottom: '40px' }}>
        
        {/* Opción 1: Seguir pedido */}
        <label style={{ display: 'flex', alignItems: 'center', gap: '15px', fontFamily: 'Inter', borderBottom: '1px solid #eaeaea', paddingBottom: '20px', paddingTop: '10px', cursor: 'pointer' }}>
          <input type="radio" name="action" style={{ width: '22px', height: '22px', accentColor: '#000', cursor: 'pointer' }} />
          <span style={{ fontSize: '1.1rem' }}>Seguir un pedido</span>
        </label>
        
        {/* Opción 2: Iniciar cambio */}
        <label style={{ display: 'flex', alignItems: 'center', gap: '15px', fontFamily: 'Inter', borderBottom: '1px solid #eaeaea', paddingBottom: '20px', paddingTop: '20px', cursor: 'pointer' }}>
          <input type="radio" name="action" style={{ width: '22px', height: '22px', accentColor: '#000', cursor: 'pointer' }} />
          <span style={{ fontSize: '1.1rem' }}>Iniciar un cambio o devolución</span>
        </label>
      </div>

      {/* Botón de Continuar para la primera sección */}
      <button className="btn-karl" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '220px', marginBottom: '80px' }}>
        <span>CONTINUAR</span>
        <span style={{ fontSize: '1.5rem' }}>→</span>
      </button>


      {/* 4. SECCIÓN ALTERNATIVA: Iniciar cambio directo con número de pedido */}
      <h2 style={{ fontSize: '2.2rem', marginBottom: '15px' }}>INICIAR UN CAMBIO O DEVOLUCIÓN</h2>
      <p style={{ fontFamily: 'Inter', color: '#000', marginBottom: '20px', fontSize: '1.05rem', lineHeight: '1.5' }}>
        Ingresa tu número de pedido para solicitar un cambio o devolución. Si no quieres buscar tu número de pedido, también puedes <Link to="/comunidad" style={{ color: '#000', textDecoration: 'underline', fontWeight: 'bold' }}>crear una cuenta</Link>.
      </p>
      
      {/* Input con borde rojo de error simulado como en la captura */}
      <input 
        type="text" 
        placeholder="Número de pedido *" 
        style={{ width: '100%', padding: '15px', border: '1px solid #e60000', marginBottom: '5px', fontFamily: 'Inter', fontSize: '1rem', outline: 'none' }} 
      />
      <p style={{ color: '#e60000', fontFamily: 'Inter', fontSize: '0.9rem', marginBottom: '30px' }}>
        Por favor, introduce tu número de pedido.
      </p>

      {/* Botón de Continuar para el número de pedido */}
      <button className="btn-karl" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '220px', marginBottom: '100px' }}>
        <span>CONTINUAR</span>
        <span style={{ fontSize: '1.5rem' }}>→</span>
      </button>


      {/* 5. SECCIÓN DE PREGUNTAS FRECUENTES (Grid de 2 columnas) */}
      <h2 style={{ fontSize: '1.8rem', marginBottom: '30px' }}>PREGUNTAS FRECUENTES</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '50px' }}>
        
        {/* Tarjeta de Pregunta 1 */}
        <div style={{ border: '1px solid #eaeaea', padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '150px' }}>
          <h4 style={{ fontSize: '1.1rem', textTransform: 'none', marginBottom: '20px' }}>¿Cómo puedo devolver mi pedido?</h4>
          <span style={{ fontFamily: 'Inter', color: '#888', fontSize: '0.9rem' }}>Devoluciones y reembolsos</span>
        </div>

        {/* Tarjeta de Pregunta 2 */}
        <div style={{ border: '1px solid #eaeaea', padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '150px' }}>
          <h4 style={{ fontSize: '1.1rem', textTransform: 'none', marginBottom: '20px' }}>¿Cómo es el proceso de devolución de un pedido en KARLDAY?</h4>
          <span style={{ fontFamily: 'Inter', color: '#888', fontSize: '0.9rem' }}>Devoluciones y reembolsos</span>
        </div>

        {/* Tarjeta de Pregunta 3 */}
        <div style={{ border: '1px solid #eaeaea', padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '150px' }}>
          <h4 style={{ fontSize: '1.1rem', textTransform: 'none', marginBottom: '20px' }}>¿Cuándo recibiré mi reembolso después de una devolución?</h4>
          <span style={{ fontFamily: 'Inter', color: '#888', fontSize: '0.9rem' }}>Devoluciones y reembolsos</span>
        </div>

        {/* Tarjeta de Pregunta 4 */}
        <div style={{ border: '1px solid #eaeaea', padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '150px' }}>
          <h4 style={{ fontSize: '1.1rem', textTransform: 'none', marginBottom: '20px' }}>¿Cuánto tardará en llegar mi pedido?</h4>
          <span style={{ fontFamily: 'Inter', color: '#888', fontSize: '0.9rem' }}>Entregas</span>
        </div>

      </div>

    </div>
  );
}

export default Returns;