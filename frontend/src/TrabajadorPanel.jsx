// Yo creo un panel real para TRABAJADOR: listar, crear, editar y borrar productos.
import React, { useEffect, useMemo, useState } from "react";
import { API_URL } from "../config";
import "./adidasPanel.css";

function getToken() {
  return localStorage.getItem("token") || "";
}

const emptyForm = {
  title: "",
  brand: "",
  description: "",
  priceMXN: 0,
  category: "ropa",
  imageUrl: "/img/top-deportivo.jpg",
  stock: 0,
};

export default function TrabajadorPanel() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const [mode, setMode] = useState("create"); // create | edit
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...emptyForm });

  const authHeaders = useMemo(() => {
    const token = getToken();
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      setErr("");

      const res = await fetch(`${API_URL}/api/products?page=1&limit=50`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "No pude cargar productos");

      setItems(data.items || []);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(); // Yo cargo al entrar al panel
    // eslint-disable-next-line
  }, []);

  const startCreate = () => {
    setMode("create");
    setEditingId(null);
    setForm({ ...emptyForm });
  };

  const startEdit = (p) => {
    setMode("edit");
    setEditingId(p._id);
    setForm({
      title: p.title || "",
      brand: p.brand || "",
      description: p.description || "",
      priceMXN: Number(p.priceMXN || 0),
      category: p.category || "ropa",
      imageUrl: p.imageUrl || "/img/top-deportivo.jpg",
      stock: Number(p.stock || 0),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onChange = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  const save = async (e) => {
    e.preventDefault();
    try {
      setErr("");

      const isEdit = mode === "edit";
      const url = isEdit
        ? `${API_URL}/api/products/${editingId}`
        : `${API_URL}/api/products`;

      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: authHeaders,
        body: JSON.stringify({
          ...form,
          priceMXN: Number(form.priceMXN),
          stock: Number(form.stock),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "No pude guardar");

      await load();
      startCreate();
    } catch (e2) {
      setErr(e2.message);
    }
  };

  const remove = async (id) => {
    const ok = window.confirm("¿Seguro que quieres eliminar este producto?");
    if (!ok) return;

    try {
      setErr("");

      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: authHeaders,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "No pude eliminar");

      await load();
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div className="aPage">
      <div className="aTop">
        <div>
          <h1 className="aH1">Panel de Trabajador</h1>
          <p className="aP">Aquí administro productos de KARLDAY: creo, edito y elimino en tiempo real.</p>
        </div>
        <button className="aBtn aBtnGhost" onClick={startCreate}>
          Nuevo producto
        </button>
      </div>

      <div className="aGrid2">
        {/* FORM */}
        <div className="aCard">
          <div className="aCardHeader">
            <h2 className="aH2">{mode === "edit" ? "Editar producto" : "Crear producto"}</h2>
            <span className="aTag">{mode === "edit" ? "EDIT" : "CREATE"}</span>
          </div>

          {err && <div className="aErr">{err}</div>}

          <form onSubmit={save} className="aForm">
            <label className="aLabel">Título</label>
            <input className="aInput" value={form.title} onChange={(e) => onChange("title", e.target.value)} />

            <label className="aLabel">Marca</label>
            <input className="aInput" value={form.brand} onChange={(e) => onChange("brand", e.target.value)} />

            <label className="aLabel">Descripción</label>
            <textarea
              className="aInput aTextarea"
              value={form.description}
              onChange={(e) => onChange("description", e.target.value)}
            />

            <div className="aRow">
              <div className="aCol">
                <label className="aLabel">Precio (MXN)</label>
                <input
                  type="number"
                  className="aInput"
                  value={form.priceMXN}
                  onChange={(e) => onChange("priceMXN", Number(e.target.value))}
                />
              </div>

              <div className="aCol">
                <label className="aLabel">Stock</label>
                <input
                  type="number"
                  className="aInput"
                  value={form.stock}
                  onChange={(e) => onChange("stock", Number(e.target.value))}
                />
              </div>
            </div>

            <label className="aLabel">Categoría</label>
            <select className="aInput" value={form.category} onChange={(e) => onChange("category", e.target.value)}>
              <option value="calzado">Calzado</option>
              <option value="ropa">Ropa</option>
              <option value="accesorios">Accesorios</option>
              <option value="deporte">Deporte</option>
              <option value="outlet">Outlet</option>
              <option value="bazar">Bazar</option>
              <option value="ninos">Niños</option>
              <option value="mujer">Mujer</option>
              <option value="hombre">Hombre</option>
            </select>

            <label className="aLabel">Image URL (recomiendo /img/archivo.jpg)</label>
            <input className="aInput" value={form.imageUrl} onChange={(e) => onChange("imageUrl", e.target.value)} />

            <div className="aActions">
              <button className="aBtn aBtnPrimary" type="submit">
                {mode === "edit" ? "Guardar cambios" : "Crear producto"}
              </button>
              {mode === "edit" && (
                <button className="aBtn aBtnGhost" type="button" onClick={startCreate}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* LIST */}
        <div className="aCard">
          <div className="aCardHeader">
            <h2 className="aH2">Productos</h2>
            <span className="aTag">{items.length} items</span>
          </div>

          {loading ? <p className="aP">Cargando…</p> : null}

          <div className="aList">
            {items.map((p) => (
              <div className="aListItem" key={p._id}>
                <img className="aThumb" src={p.imageUrl} alt={p.title} />
                <div className="aListBody">
                  <div className="aListTop">
                    <strong>{p.title}</strong>
                    <span className="aMini">{p.brand} · {p.category}</span>
                  </div>
                  <div className="aMini">
                    ${p.priceMXN} MXN · Stock: {p.stock}
                  </div>

                  <div className="aActions">
                    <button className="aBtn aBtnGhost" onClick={() => startEdit(p)}>
                      Editar
                    </button>
                    <button className="aBtn aBtnDanger" onClick={() => remove(p._id)}>
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {(!items || items.length === 0) && <p className="aP">Aún no hay productos. Crea el primero arriba.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}