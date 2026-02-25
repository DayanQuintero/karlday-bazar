// Yo muestro detalle del producto y permito agregar al carrito.
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../config";

function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const found = cart.find((x) => x._id === product._id);

  if (found) found.qty += 1;
  else cart.push({ ...product, qty: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));
}

export default function ProductDetail() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/api/products/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "No se pudo cargar");
        setP(data);
      } catch (e) {
        setErr(e.message);
      }
    })();
  }, [id]);

  if (err) return <div className="container"><p className="toastErr">{err}</p></div>;
  if (!p) return <div className="container"><p className="p">Cargando...</p></div>;

  return (
    <div className="container">
      <Link className="small" to="/productos">← Volver</Link>

      <div className="card" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 18, padding: 18, marginTop: 14 }}>
        <img className="img" style={{ height: 420, borderRadius: 18 }} src={p.imageUrl} alt={p.title} />

        <div>
          <div className="badge">{p.brand} · {p.category}</div>
          <h2 className="h2" style={{ marginTop: 10 }}>{p.title}</h2>
          <p className="p">{p.description}</p>

          <div className="hr"></div>

          <div className="badge">Stock: {p.stock}</div>
          <h3 style={{ margin: "12px 0" }}>${p.priceMXN} MXN</h3>

          <div className="actions">
            <button className="btn btnPrimary" onClick={() => addToCart(p)}>Agregar al carrito</button>
            <Link className="btn btnGhost" to="/carrito">Ir al carrito</Link>
          </div>
        </div>
      </div>
    </div>
  );
}