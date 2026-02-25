import { useEffect } from 'react';

function Toast({ mensaje, alCerrar }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      alCerrar();
    }, 3000); 
    return () => clearTimeout(timer);
  }, [alCerrar]);

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      backgroundColor: '#111',
      color: '#fff',
      padding: '16px 24px',
      fontFamily: 'Inter',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      zIndex: 9999,
      animation: 'slideIn 0.3s ease-out'
    }}>
      <style>
        {`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}
      </style>
      <span>{mensaje}</span>
    </div>
  );
}

export default Toast;