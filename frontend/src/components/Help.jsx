import { Link } from 'react-router-dom';

function Help() {
  return (
    // Mi contenedor principal para la página de ayuda, centrado y con buen espacio
    <div style={{ padding: '40px 0', minHeight: '80vh' }}>
      
      {/* 1. SECCIÓN SUPERIOR: Listas de categorías de ayuda */}
      {/* Uso un layout de cuadrícula (grid) para dividirlo en 2 columnas como en la imagen */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px', marginBottom: '80px' }}>
        
        {/* COLUMNA IZQUIERDA */}
        <div>
          {/* Categoría: Comunidad (Reemplazo de ADICLUB) */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>COMUNIDAD KARLDAY</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontFamily: 'Inter', fontSize: '1rem' }}>
              <Link to="/" style={{ color: '#000', textDecoration: 'underline' }}>Términos y condiciones de la comunidad</Link>
              <Link to="/" style={{ color: '#000', textDecoration: 'underline' }}>Conoce nuestra comunidad</Link>
              <Link to="/" style={{ color: '#000', textDecoration: 'underline' }}>Conoce el nuevo monedero de puntos</Link>
              <Link to="/" style={{ color: '#000', textDecoration: 'underline', fontWeight: 'bold', marginTop: '10px' }}>Cargar todos los artículos de Comunidad</Link>
            </div>
          </div>

          {/* Categoría: Entregas */}
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>ENTREGAS</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontFamily: 'Inter', fontSize: '1rem' }}>
              <Link to="/" style={{ color: '#000', textDecoration: 'underline' }}>¿A cuánto ascienden los gastos de envío?</Link>
              <Link to="/" style={{ color: '#000', textDecoration: 'underline' }}>¿Cuánto tardará en llegar mi pedido?</Link>
              <Link to="/" style={{ color: '#000', textDecoration: 'underline' }}>¿Cómo puedo dar seguimiento a la entrega?</Link>
              <Link to="/" style={{ color: '#000', textDecoration: 'underline' }}>¿Puedo hacer cambios en el domicilio de entrega?</Link>
              <Link to="/" style={{ color: '#000', textDecoration: 'underline' }}>¿Qué debo hacer si mi pedido viene con signos de manipulación?</Link>
              <Link to="/" style={{ color: '#000', textDecoration: 'underline', fontWeight: 'bold', marginTop: '10px' }}>Cargar todos los artículos de Entregas</Link>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div>
          {/* Categoría: Devoluciones y Reembolsos */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>DEVOLUCIONES Y REEMBOLSOS</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontFamily: 'Inter', fontSize: '1rem' }}>
              <Link to="/" style={{ color: '#000', textDecoration: 'underline' }}>Autogestiona tu devolución</Link>
              <Link to="/" style={{ color: '#000', textDecoration: 'underline' }}>¿Cuáles son los requisitos para devolver productos?</Link>
              <Link to="/" style={{ color: '#000', textDecoration: 'underline' }}>¿Cómo es el proceso de devolución en KARLDAY?</Link>
              <Link to="/" style={{ color: '#000', textDecoration: 'underline' }}>¿Qué pasa si mi producto tiene un defecto de calidad?</Link>
              <Link to="/" style={{ color: '#000', textDecoration: 'underline', fontWeight: 'bold', marginTop: '10px' }}>Cargar todos los artículos de Devoluciones</Link>
            </div>
          </div>

          {/* Categoría: Proceso de Pago */}
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>PROCESO DE PAGO</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontFamily: 'Inter', fontSize: '1rem' }}>
              <Link to="/" style={{ color: '#000', textDecoration: 'underline' }}>¿Es seguro pagar en KARLDAY?</Link>
              <Link to="/" style={{ color: '#000', textDecoration: 'underline' }}>¿Qué opciones de pago ofrece la tienda?</Link>
              <Link to="/" style={{ color: '#000', textDecoration: 'underline' }}>¿Cómo funciona el pago a meses CON INTERESES?</Link>
              <Link to="/" style={{ color: '#000', textDecoration: 'underline' }}>¿Cómo funciona el pago a meses SIN INTERESES?</Link>
              <Link to="/" style={{ color: '#000', textDecoration: 'underline' }}>¿Qué debo hacer si mi pago no funciona?</Link>
            </div>
          </div>
        </div>

      </div>

      {/* 2. SECCIÓN INFERIOR: Preguntas Frecuentes (Fondo Gris) */}
      <div style={{ backgroundColor: '#f0f0f0', padding: '60px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <h2 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>PREGUNTAS FRECUENTES</h2>
          
          {/* Cuadrícula para las tarjetas blancas de preguntas rápidas */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            
            {/* Tarjeta 1 */}
            <div style={{ backgroundColor: '#fff', border: '1px solid #eaeaea', padding: '20px', minHeight: '130px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <h4 style={{ fontSize: '1rem', textTransform: 'none', margin: 0, fontFamily: 'Inter', fontWeight: 'bold' }}>Tarjetas de regalo</h4>
            </div>

            {/* Tarjeta 2 */}
            <div style={{ backgroundColor: '#fff', border: '1px solid #eaeaea', padding: '20px', minHeight: '130px', display: 'flex', flexDirection: 'column', justifyContent: 'center', cursor: 'pointer' }}>
              <h4 style={{ fontSize: '1rem', textTransform: 'none', margin: 0, fontFamily: 'Inter', fontWeight: 'bold' }}>¿Cómo puedo solicitar corrección de mi factura?</h4>
            </div>

            {/* Tarjeta 3 */}
            <div style={{ backgroundColor: '#fff', border: '1px solid #eaeaea', padding: '20px', minHeight: '130px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}>
              <h4 style={{ fontSize: '1rem', textTransform: 'none', margin: 0, fontFamily: 'Inter', fontWeight: 'bold', marginBottom: '10px' }}>¿Cuánto tardará en llegar mi pedido?</h4>
              <span style={{ fontFamily: 'Inter', color: '#666', fontSize: '0.85rem' }}>Entregas</span>
            </div>

            {/* Tarjeta 4 */}
            <div style={{ backgroundColor: '#fff', border: '1px solid #eaeaea', padding: '20px', minHeight: '130px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}>
              <h4 style={{ fontSize: '1rem', textTransform: 'none', margin: 0, fontFamily: 'Inter', fontWeight: 'bold', marginBottom: '10px' }}>¿Qué pasa si mi producto tiene un defecto o no cumple con la calidad?</h4>
              <span style={{ fontFamily: 'Inter', color: '#666', fontSize: '0.85rem' }}>Devoluciones y reembolsos</span>
            </div>

            {/* Tarjeta 5 (Abajo a la izquierda) */}
            <div style={{ backgroundColor: '#fff', border: '1px solid #eaeaea', padding: '20px', minHeight: '130px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}>
              <h4 style={{ fontSize: '1rem', textTransform: 'none', margin: 0, fontFamily: 'Inter', fontWeight: 'bold', marginBottom: '10px' }}>¿Cómo es el proceso de devolución de un pedido en KARLDAY?</h4>
              <span style={{ fontFamily: 'Inter', color: '#666', fontSize: '0.85rem' }}>Devoluciones y reembolsos</span>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default Help;