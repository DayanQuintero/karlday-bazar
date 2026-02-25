// frontend/src/App.jsx
// Yo centralizo mi navegación aquí para no repetir Navbar en cada página.
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import Login from "./components/Login";
import Register from "./components/Register";
import Cart from "./components/Cart";
import NotFound from "./components/NotFound";

// Yo leo mi sesión desde localStorage (simple y real para la tarea).
function getToken() {
  return localStorage.getItem("token") || "";
}
function getRole() {
  return localStorage.getItem("role") || "";
}

function Protected({ children }) {
  const token = getToken();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

function WorkerOnly({ children }) {
  const token = getToken();
  const role = getRole();
  if (!token) return <Navigate to="/login" replace />;
  if (role !== "trabajador") return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Yo muestro Navbar una sola vez para que TODAS las rutas lo usen */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Catálogo */}
        <Route path="/productos" element={<Products />} />
        <Route path="/productos/:id" element={<ProductDetail />} />

        {/* Carrito */}
        <Route path="/carrito" element={<Cart />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />

        {/* Panel de trabajador (opcional si ya lo tienes) */}
        <Route
          path="/trabajador"
          element={
            <WorkerOnly>
              <div style={{ padding: 18 }}>
                <h2>Panel Trabajador</h2>
                <p>
                  Yo dejo esta ruta lista. Aquí es donde después conectamos el CRUD
                  (crear/editar/borrar productos, subir fotos, etc.).
                </p>
              </div>
            </WorkerOnly>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}