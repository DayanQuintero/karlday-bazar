import { Link } from 'react-router-dom';

function Hombre() {
  // Mi lista de productos exclusivos para la sección de hombre
  const productosHombre = [
    { id: 1, nombre: "Sudadera Negra Underground", precio: "$1,499 MXN", img: "/img/sudadera-negra.jpg", etiqueta: "Más Vendido" },
    { id: 2, nombre: "Gorra Minimalista", precio: "$599 MXN", img: "/img/gorra-minimalista.jpg", etiqueta: "Básico" }
  ];

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto', minHeight: '80vh' }}>
      
      {/* Encabezado de la colección */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'Oswald', margin: 0, letterSpacing: '1px', textTransform: 'uppercase' }}>
          COLECCIÓN HOMBRE
        </h1>
        <span style={{ fontSize: '0.9rem', color: '#666', fontFamily: 'Inter' }}>{productosHombre.length} Productos</span>
      </div>

      {/* Grid Automático para acomodar las tarjetas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '40px' }}>
        
        {/* Usamos map() para dibujar las dos prendas automáticamente */}
        {productosHombre.map((producto) => (
          <div 
            key={producto.id} 
            style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'transform 0.3s ease' }} 
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} 
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            
            {/* Contenedor de la imagen */}
            <div style={{ backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '380px', overflow: 'hidden', position: 'relative' }}>
              <img 
                src={producto.img} 
                alt={producto.nombre} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              {/* Etiqueta flotante negra */}
              <span style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: '#000', color: '#fff', fontFamily: 'Inter', fontSize: '0.7rem', fontWeight: 'bold', padding: '5px 10px', textTransform: 'uppercase' }}>
                {producto.etiqueta}
              </span>
            </div>
            
            {/* Textos y precio debajo de la foto */}
            <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', fontFamily: 'Inter', alignItems: 'flex-start' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1rem', color: '#000', maxWidth: '70%' }}>{producto.nombre}</span>
              <span style={{ color: '#555', fontSize: '1rem', fontWeight: 'bold' }}>{producto.precio}</span>
            </div>
            
          </div>
        ))}

      </div>
    </div>
  );
}

export default Hombre;