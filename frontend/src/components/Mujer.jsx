import { Link } from 'react-router-dom';

function Mujer() {
  // Creo una lista con todos los productos que me pediste y sus fotos exactas
  const productosMujer = [
    { id: 1, nombre: "Top Deportivo Pro", precio: "$899 MXN", img: "/img/top-deportivo.jpg", etiqueta: "Nuevo" },
    { id: 2, nombre: "Leggings de Entrenamiento", precio: "$1,299 MXN", img: "/img/leggings-entrenamiento.jpg", etiqueta: "Más Vendido" },
    { id: 3, nombre: "Chamarra Running Ligera", precio: "$1,899 MXN", img: "/img/chamarra-running.jpg", etiqueta: "Impermeable" },
    { id: 4, nombre: "Shorts de Gym Flex", precio: "$749 MXN", img: "/img/shorts-gym.jpg", etiqueta: "Ligero" },
    { id: 5, nombre: "Pants Deportivo Clásico", precio: "$1,199 MXN", img: "/img/pants-deportivo.jpg", etiqueta: "Algodón" },
    { id: 6, nombre: "Playera Blanca Básica", precio: "$499 MXN", img: "/img/playera-blanca.jpg", etiqueta: "Básico" },
    { id: 7, nombre: "Calcetas Deportivas", precio: "$299 MXN", img: "/img/calcetas-deportivas.jpg", etiqueta: "Pack x3" }
  ];

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto', minHeight: '80vh' }}>
      
      {/* Encabezado de la colección */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', fontFamily: 'Oswald', margin: 0, letterSpacing: '1px', textTransform: 'uppercase' }}>
          COLECCIÓN MUJER
        </h1>
        <span style={{ fontSize: '0.9rem', color: '#666', fontFamily: 'Inter' }}>{productosMujer.length} Productos</span>
      </div>

      {/* Grid Automático: Se acomodará dependiendo del tamaño de la pantalla */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '40px' }}>
        
        {/* Aquí uso map() para que React dibuje una tarjeta por cada producto de mi lista de arriba */}
        {productosMujer.map((producto) => (
          <div 
            key={producto.id} 
            style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'transform 0.3s ease' }} 
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} 
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            
            {/* Contenedor de la imagen con fondo gris claro */}
            <div style={{ backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '380px', overflow: 'hidden', position: 'relative' }}>
              <img 
                src={producto.img} 
                alt={producto.nombre} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              {/* Etiqueta flotante negra arriba a la derecha */}
              <span style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: '#000', color: '#fff', fontFamily: 'Inter', fontSize: '0.7rem', fontWeight: 'bold', padding: '5px 10px', textTransform: 'uppercase' }}>
                {producto.etiqueta}
              </span>
            </div>
            
            {/* Textos debajo de la foto */}
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

export default Mujer;