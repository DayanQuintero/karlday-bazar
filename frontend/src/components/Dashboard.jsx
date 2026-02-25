// Importo mis herramientas de React
import { useState } from 'react';

// Creo mi componente Dashboard: la página secreta para subir ropa
function Dashboard() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const token = localStorage.getItem('token');

    if (!token) {
      setMessage('¡ALTO! Necesitas iniciar sesión como Administrador primero.');
      return;
    }

    try {
      const response = await fetch('https://karlday-bazar.vercel.app/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          name: name,
          price: Number(price), 
          category: category,
          image: image 
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ ¡PRODUCTO SUBIDO A LA TIENDA CON ÉXITO!');
        setName('');
        setPrice('');
        setCategory('');
        setImage('');
      } else {
        setMessage(`❌ Error: ${data.message}`);
      }
    } catch (error) {
      setMessage('❌ Error al conectar con el servidor.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', marginTop: '30px' }}>
      <h2 style={{ marginBottom: '10px', textAlign: 'center' }}>PANEL DE CONTROL</h2>
      <p style={{ textAlign: 'center', color: 'gray', marginBottom: '30px' }}>
        Sube nueva mercancía a la tienda KARLDAY
      </p>

      {message && (
        <p style={{ textAlign: 'center', fontWeight: 'bold', marginBottom: '20px' }}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>NOMBRE DE LA PRENDA:</label>
        <input type="text" placeholder="Ej: Tenis Blancos" value={name} onChange={(e) => setName(e.target.value)} style={{ padding: '12px', border: '2px solid #000', outline: 'none' }} required />

        <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>PRECIO (MXN):</label>
        <input type="number" placeholder="Ej: 1500" value={price} onChange={(e) => setPrice(e.target.value)} style={{ padding: '12px', border: '2px solid #000', outline: 'none' }} required />

        <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>CATEGORÍA:</label>
        <input type="text" placeholder="Ej: Calzado" value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '12px', border: '2px solid #000', outline: 'none' }} required />

        <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>RUTA DE LA IMAGEN:</label>
        <input type="text" placeholder="Ej: /img/tenis-blancos.jpg" value={image} onChange={(e) => setImage(e.target.value)} style={{ padding: '12px', border: '2px solid #000', outline: 'none' }} required />

        <button type="submit" style={{ marginTop: '10px', padding: '15px', backgroundColor: '#000', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '2px' }}>
          SUBIR PRODUCTO
        </button>
      </form>
    </div>
  );
}

export default Dashboard;