import { Link } from 'react-router-dom';

function Ninos() {
  const productosNinos = [
    { id: 1, nombre: "Chamarra Impermeable Amarilla", precio: "$999 MXN", img: "/img/nino-1.jpg", etiqueta: "Lluvia" },
    { id: 2, nombre: "Overol Denim Clásico", precio: "$849 MXN", img: "/img/nino-2.jpg", etiqueta: "Básico" },
    { id: 3, nombre: "Conjunto Básquetbol Edición Especial", precio: "$1,199 MXN", img: "/img/nino-3.jpg", etiqueta: "Deporte" },
    { id: 4, nombre: "Jersey de Entrenamiento", precio: "$699 MXN", img: "/img/nino-4.jpg", etiqueta: "Nuevo" },
    { id: 5, nombre: "Jersey Flag Football Panteras", precio: "$749 MXN", img: "/img/nino-5.jpg", etiqueta: "Más Vendido" }
  ];

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto', minHeight: '80vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'Oswald', margin: 0, letterSpacing: '1px', textTransform: 'uppercase' }}>
          COLECCIÓN NIÑOS
        </h1>
        <span style={{ fontSize: '0.9rem', color: '#666', fontFamily: 'Inter' }}>{productosNinos.length} Productos</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '40px' }}>
        {productosNinos.map((producto) => (
          <div 
            key={producto.id} 
            style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'transform 0.3s ease' }} 
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} 
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '380px', overflow: 'hidden', position: 'relative' }}>
              <img src={producto.img} alt={producto.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <span style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: '#000', color: '#fff', fontFamily: 'Inter', fontSize: '0.7rem', fontWeight: 'bold', padding: '5px 10px', textTransform: 'uppercase' }}>
                {producto.etiqueta}
              </span>
            </div>
            
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

export default Ninos;