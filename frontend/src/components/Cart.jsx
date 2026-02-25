// Yo manejo un carrito real con localStorage (sumas, quitar y vaciar).
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart") || "[]"));

  const total = useMemo(() => cart.reduce((acc, p) => acc + p.priceMXN * p.qty, 0), [cart]);

  const save = (next) => {
    setCart(next);
    localStorage.setItem("cart", JSON.stringify(next));
  };

  const inc = (id) => {
    const next = cart.map((p) => (p._id === id ? { ...p, qty: p.qty + 1 } : p));
    save(next);
  };

  const dec = (id) => {
    const next = cart
      .map((p) => (p._id === id ? { ...p, qty: Math.max(p.qty - 1, 1) } : p));
    save(next);
  };

  const remove = (id) => {
    const next = cart.filter((p) => p._id !== id);
    save(next);
  };

  const clear = () => save([]);

  return (
    <div className="container">
      <h2 className="h2">CARRITO</h2>

      {cart.length === 0 ? (
        <div className="card" style={{ padding: 18 }}>
          <h3 style={{ margin: 0 }}>El carrito está vacío</h3>
          <p className="p">Agrega productos para verlos aquí.</p>
          <div className="actions">
            <Link className="btn btnPrimary" to="/productos">Comenzar</Link>
          </div>
        </div>
      ) : (
        <>
          <div className="card" style={{ padding: 18 }}>
            {cart.map((p) => (
              <div key={p._id} style={{ display: "grid", gridTemplateColumns: "120px 1fr auto", gap: 14, alignItems: "center", padding: "12px 0" }}>
                <img src={p.imageUrl} alt={p.title} style={{ width: 120, height: 90, objectFit: "cover", borderRadius: 14 }} />
                <div>
                  <div className="badge">{p.brand} · {p.category}</div>
                  <div style={{ fontWeight: 900, marginTop: 6 }}>{p.title}</div>
                  <div className="small">${p.priceMXN} MXN</div>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <button className="btn btnGhost" onClick={() => dec(p._id)}>-</button>
                  <span className="badge">x{p.qty}</span>
                  <button className="btn btnGhost" onClick={() => inc(p._id)}>+</button>
                  <button className="btn btnPrimary" onClick={() => remove(p._id)}>Quitar</button>
                </div>
              </div>
            ))}
          </div>

          <div className="actions" style={{ justifyContent: "space-between", marginTop: 18 }}>
            <button className="btn btnGhost" onClick={clear}>Vaciar</button>
            <span className="badge">Total: <b>${total} MXN</b></span>
          </div>
        </>
      )}
    </div>
  );
}