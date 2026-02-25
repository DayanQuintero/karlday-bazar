// Yo muestro una pantalla 404 cuando el usuario entra a una ruta que no existe.
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ maxWidth: 980, margin: "40px auto", padding: 16 }}>
      <h1 style={{ fontSize: 56, margin: 0 }}>404</h1>
      <p style={{ marginTop: 10, fontSize: 18, opacity: 0.8 }}>
        Esta ruta no existe.
      </p>

      <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            padding: "12px 18px",
            borderRadius: 999,
            border: "1px solid #111",
            color: "#111",
          }}
        >
          Ir a Inicio
        </Link>

        <Link
          to="/productos"
          style={{
            textDecoration: "none",
            padding: "12px 18px",
            borderRadius: 999,
            background: "#111",
            color: "#fff",
          }}
        >
          Ver Productos
        </Link>
      </div>
    </div>
  );
}