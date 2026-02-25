// Yo hago un panel real para trabajador: crear, editar y borrar productos.
import React, { useEffect, useState } from "react";
import { API_URL } from "../config";

function getAuth() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return { token, user };
}

const emptyForm = {
  title: "",
  brand: "",
  category: "calzado",
  description: "",
  priceMXN: 0,
  imageUrl: "",
  stock: 0
};

export default function AdminPanel() {
  const { token, user } = getAuth();

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const load = async () => {
    setErr("");
    const res = await fetch(`${API_URL}/api/products?page=1&limit=50`);
    const data = await res.json();
    if (!res.ok) {
      setErr(data.message || "No pude cargar productos");
      return;
    }
    setProducts(data.items);
  };

  useEffect(() => { load(); }, []);

  const onChange = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setErr("");

    try {
      const url = editingId ? `${API_URL}/api/products/${editingId}` : `${API_URL}/api/products`;
      const method = editingId ? "PUT" : "POST";

      // Yo convierto a números para evitar errores en backend.
      const payload = {
        ...form,
        priceMXN: Number(form.priceMXN),
        stock: Number(form.stock)
      };

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error guardando");

      setMsg(data.message || "Listo ✅");
      setForm(emptyForm);
      setEditingId(null);
      await load();
    } catch (e2) {
      setErr(e2.message);
    }
  };

  const edit = (p) => {
    setEditingId(p._id);
    setForm({
      title: p.title,
      brand: p.brand,
      category: p.category,
      description: p.description,
      priceMXN: p.priceMXN,
      imageUrl: p.imageUrl,
      stock: p.stock
    });
  };

  const remove = async (id) => {
    setMsg("");
    setErr("");

    try {
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error eliminando");

      setMsg(data.message || "Eliminado ✅");
      await load();
    } catch (e2) {
      setErr(e2.message);
    }
  };

  return (
    <div className="container">
      <h2 className="h2">PANEL DE TRABAJADOR</h2>
      <div className="badge">Bienvenido/a, <b>{user?.name}</b> ✅ · rol: <b>{user?.role}</b></div>

      <div className="hr"></div>

      <div className="card" style={{ padding: 18, marginBottom: 18 }}>
        <h3 style={{ marginTop: 0 }}>{editingId ? "Editar producto" : "Crear producto"}</h3>

        <form className="row" onSubmit={submit}>
          <input className="input" placeholder="Título" value={form.title} onChange={(e) => onChange("title", e.target.value)} />
          <input className="input" placeholder="Marca" value={form.brand} onChange={(e) => onChange("brand", e.target.value)} />

          <select className="input" value={form.category} onChange={(e) => onChange("category", e.target.value)}>
            <option value="calzado">Calzado</option>
            <option value="ropa">Ropa</option>
            <option value="accesorios">Accesorios</option>
            <option value="deporte">Deporte</option>
            <option value="outlet">Outlet</option>
          </select>

          <input className="input" placeholder="URL de imagen" value={form.imageUrl} onChange={(e) => onChange("imageUrl", e.target.value)} />
          <input className="input" type="number" placeholder="Precio MXN" value={form.priceMXN} onChange={(e) => onChange("priceMXN", e.target.value)} />
          <input className="input" type="number" placeholder="Stock" value={form.stock} onChange={(e) => onChange("stock", e.target.value)} />

          <textarea className="input" rows="5" placeholder="Descripción" value={form.description} onChange={(e) => onChange("description", e.target.value)} />

          <div className="actions">
            <button className="btn btnPrimary" type="submit">
              {editingId ? "Guardar cambios" : "Crear"}
            </button>

            {editingId && (
              <button
                className="btn btnGhost"
                type="button"
                onClick={() => { setEditingId(null); setForm(emptyForm); }}
              >
                Cancelar
              </button>
            )}
          </div>

          {msg && <div className="toastOk">{msg}</div>}
          {err && <div className="toastErr">{err}</div>}
        </form>
      </div>

      <div className="grid">
        {products.map((p) => (
          <div className="card" key={p._id}>
            <img className="img" src={p.imageUrl} alt={p.title} />
            <div className="cardBody">
              <div className="badge">{p.brand} · {p.category}</div>
              <h3 style={{ margin: "10px 0 6px 0" }}>{p.title}</h3>
              <p className="p" style={{ marginBottom: 12 }}>${p.priceMXN} MXN · stock {p.stock}</p>

              <div className="actions">
                <button className="btn btnGhost" onClick={() => edit(p)}>Editar</button>
                <button className="btn btnPrimary" onClick={() => remove(p._id)}>Eliminar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}