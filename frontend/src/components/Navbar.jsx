// frontend/src/components/Navbar.jsx
// Yo creo un navbar estilo limpio tipo tienda (minimalista y claro).
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function getToken() {
  return localStorage.getItem("token") || "";
}
function getRole() {
  return localStorage.getItem("role") || "";
}
function getName() {
  return localStorage.getItem("name") || "";
}
function cartCount() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  return cart.reduce((acc, item) => acc + (item.qty || 0), 0);
}

export default function Navbar() {
  const nav = useNavigate();
  const token = getToken();
  const role = getRole();
  const name = getName();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    nav("/");
    window.location.reload(); // yo refresco para que el navbar se actualice rápido
  };

  return (
    <header
      style={{
        borderBottom: "1px solid rgba(0,0,0,.08)",
        background: "#fff",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Link
            to="/"
            style={{
              fontWeight: 900,
              letterSpacing: 1,
              textDecoration: "none",
              color: "#111",
            }}
          >
            KARLDAY
          </Link>

          <nav style={{ display: "flex", gap: 12 }}>
            <Link to="/" style={{ textDecoration: "none", color: "#111" }}>
              Inicio
            </Link>
            <Link
              to="/productos"
              style={{ textDecoration: "none", color: "#111" }}
            >
              Productos
            </Link>
            <Link
              to="/carrito"
              style={{ textDecoration: "none", color: "#111" }}
            >
              Carrito ({cartCount()})
            </Link>

            {token && role === "trabajador" && (
              <Link
                to="/trabajador"
                style={{ textDecoration: "none", color: "#111" }}
              >
                Trabajador
              </Link>
            )}
          </nav>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {!token ? (
            <>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "#111" }}
              >
                Iniciar sesión
              </Link>
              <Link
                to="/registro"
                style={{
                  textDecoration: "none",
                  color: "#111",
                  border: "1px solid #111",
                  padding: "8px 12px",
                  borderRadius: 999,
                }}
              >
                Registro
              </Link>
            </>
          ) : (
            <>
              <span style={{ fontSize: 13, color: "#333" }}>
                Hola, {name || "usuario"}
              </span>
              <button
                onClick={logout}
                style={{
                  border: "1px solid #111",
                  background: "transparent",
                  padding: "8px 12px",
                  borderRadius: 999,
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}