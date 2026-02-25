// frontend/src/components/Products.jsx
// Yo muestro productos con paginación/filtros y botón real "agregar al carrito".
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";

function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const found = cart.find((x) => x._id === product._id);

  if (found) found.qty += 1;
  else cart.push({ ...product, qty: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));
}

export default function Products() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const load = async (forcedPage = page) => {
    try {
      setLoading(true);
      setErr("");

      const qs = new URLSearchParams({
        page: String(forcedPage),
        limit: "8",
        ...(category ? { category } : {}),
        ...(search ? { search } : {}),
      });

      const res = await fetch(`${API_URL}/api/products?${qs.toString()}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Error cargando productos");

      setItems(Array.isArray(data.items) ? data.items : []);
      setTotalPages(Number(data.totalPages || 1));
    } catch (e) {
      setErr(e.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const applyFilters = () => {
    const newPage = 1;
    setPage(newPage);
    load(newPage);
  };

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "18px 16px" }}>
      <h2 style={{ margin: "10px 0 16px 0", letterSpacing: 0.5 }}>
        PRODUCTOS
      </h2>

      {/* Filtros */}
      <div
        style={{
          border: "1px solid rgba(0,0,0,.08)",
          borderRadius: 16,
          padding: 14,
          marginBottom: 18,
          background: "#fff",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 280px 220px",
            gap: 12,
          }}
        >
          <input
            placeholder="Buscar por marca o nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "12px 12px",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,.15)",
              outline: "none",
            }}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              padding: "12px 12px",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,.15)",
              outline: "none",
              background: "#fff",
            }}
          >
            <option value="">Todas las categorías</option>
            <option value="calzado">Calzado</option>
            <option value="ropa">Ropa</option>
            <option value="accesorios">Accesorios</option>
            <option value="deporte">Deporte</option>
            <option value="outlet">Outlet</option>
            <option value="bazar">Bazar</option>
            <option value="mujer">Mujer</option>
            <option value="hombre">Hombre</option>
            <option value="ninos">Niños</option>
            <option value="regalos">Regalos</option>
          </select>

          <button
            onClick={applyFilters}
            style={{
              border: "none",
              borderRadius: 999,
              padding: "12px 14px",
              fontWeight: 800,
              cursor: "pointer",
              background: "#111",
              color: "#fff",
            }}
          >
            Aplicar filtros
          </button>
        </div>
      </div>

      {loading && <p>Cargando...</p>}
      {err && (
        <div
          style={{
            background: "#ffe8e8",
            border: "1px solid #ffb9b9",
            padding: 12,
            borderRadius: 12,
            marginBottom: 14,
            color: "#7a0000",
          }}
        >
          {err}
        </div>
      )}

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 14,
        }}
      >
        {items.map((p) => (
          <div
            key={p._id}
            style={{
              border: "1px solid rgba(0,0,0,.08)",
              borderRadius: 16,
              overflow: "hidden",
              background: "#fff",
            }}
          >
            <div style={{ width: "100%", aspectRatio: "1 / 1", background: "#f3f3f3" }}>
              <img
                src={p.imageUrl}
                alt={p.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/600x600?text=KARLDAY";
                }}
              />
            </div>

            <div style={{ padding: 12 }}>
              <div
                style={{
                  display: "inline-block",
                  fontSize: 12,
                  padding: "6px 10px",
                  borderRadius: 999,
                  border: "1px solid rgba(0,0,0,.12)",
                  color: "#111",
                  marginBottom: 10,
                }}
              >
                {p.category}
              </div>

              <h3 style={{ margin: "4px 0 6px 0" }}>{p.name}</h3>
              <p style={{ margin: "0 0 10px 0", color: "#444", fontSize: 13 }}>
                {p.description}
              </p>

              <div style={{ fontWeight: 900, marginBottom: 12 }}>
                ${p.priceMXN} MXN
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <Link
                  to={`/productos/${p._id}`}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    textDecoration: "none",
                    border: "1px solid #111",
                    color: "#111",
                    padding: "10px 12px",
                    borderRadius: 999,
                    fontWeight: 800,
                  }}
                >
                  Ver
                </Link>

                <button
                  onClick={() => addToCart(p)}
                  style={{
                    flex: 1,
                    border: "none",
                    background: "#111",
                    color: "#fff",
                    padding: "10px 12px",
                    borderRadius: 999,
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 22 }}>
        <button
          disabled={page <= 1}
          onClick={() => setPage((x) => x - 1)}
          style={{
            border: "1px solid #111",
            background: "transparent",
            padding: "10px 12px",
            borderRadius: 999,
            cursor: "pointer",
            fontWeight: 800,
            opacity: page <= 1 ? 0.5 : 1,
          }}
        >
          ← Anterior
        </button>

        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            border: "1px solid rgba(0,0,0,.12)",
            padding: "10px 12px",
            borderRadius: 999,
            fontWeight: 800,
          }}
        >
          Página {page} de {totalPages}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage((x) => x + 1)}
          style={{
            border: "1px solid #111",
            background: "transparent",
            padding: "10px 12px",
            borderRadius: 999,
            cursor: "pointer",
            fontWeight: 800,
            opacity: page >= totalPages ? 0.5 : 1,
          }}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}