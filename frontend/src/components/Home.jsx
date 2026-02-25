// Yo muestro una landing minimalista con CTA a login/registro.
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <div className="container">
      <h1 className="h1">KARLDAY</h1>
      <p className="p">
        Explora KARLDAY. Para comprar o administrar, inicia sesión.
      </p>

      <div className="actions">
        <Link className="btn btnPrimary" to="/login">Iniciar sesión</Link>
        <Link className="btn btnGhost" to="/registro">Crear cuenta</Link>
        <Link className="btn btnGhost" to="/productos">Ver productos</Link>
      </div>

      {user?.name && (
        <>
          <div className="hr"></div>
          <span className="badge">
            Bienvenido/a, <b>{user.name}</b> 👋
          </span>
        </>
      )}
    </div>
  );
}