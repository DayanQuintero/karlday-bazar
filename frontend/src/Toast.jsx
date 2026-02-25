import { useEffect } from 'react';

function Toast({ mensaje, tipo, alCerrar }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      alCerrar();
    }, 3000); // Se cierra sola después de 3 segundos
    return () => clearTimeout(timer);
  }, [alCerrar]);

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: tipo === 'error' ? '#e60000' : '#111',
      color: '#fff',
      padding: '16px 24px',
      borderRadius: '4px',
      fontFamily: 'Inter',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      animation: 'slideIn 0.3s ease-out'
    }}>
      <style>
        {`
          @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}
      </style>
      <span>{mensaje}</span>
      <button onClick={alCerrar} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
    </div>
  );
}

export default Toast;