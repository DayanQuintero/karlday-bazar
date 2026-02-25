// Yo creo un panel real de trabajador (admin) para manejar productos tipo tienda profesional.
import React, { useEffect, useMemo, useState } from "react";
import { API_URL } from "../config";

function getToken() {
  return localStorage.getItem("token") || "";
}

function isTrabajador() {
  return (localStorage.getItem("role") || "").toLowerCase() === "trabajador";
}

export default function TrabajadorPanel() {
  const [stats, setStats] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  // Yo guardo el formulario en un estado para crear/editar
  const [form, setForm] = useState({
    _id: "",
    title: "",
    brand: "KARLDAY",
    description: "",
    priceMXN: 0,
    category: "ropa",
    imageUrl: "",
    stock: 0,
    isActive: true,
  });

  const editing = useMemo(() => Boolean(form._id), [form._id]);

  const authHeaders = useMemo(
    () => ({
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
    }),
    []
  );

  const loadStats = async () => {
    const res = await fetch(`${API_URL}/api/products/admin/stats/quick`, { headers: authHeaders });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error stats");
    setStats(data);
  };

  const loadProducts = async () => {
    const res = await fetch(`${API_URL}/api/products?page=1&limit=50`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Error productos");
    setItems(data.items || []);
  };

  const refresh = async () => {
    try {
      setLoading(true);
      setErr("");
      setMsg("");
      await Promise.all([loadStats(), loadProducts()]);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isTrabajador()) refresh();
  }, []);

  const onChange = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const resetForm = () => {
    setForm({
      _id: "",
      title: "",
      brand: "KARLDAY",
      description: "",
      priceMXN: 0,
      category: "ropa",
      imageUrl: "",
      stock: 0,
      isActive: true,
    });
  };

  const pickEdit = (p) => {
    setMsg("");
    setErr("");
    setForm({
      _id: p._id,
      title: p.title,
      brand: p.brand,
      description: p.description,
      priceMXN: p.priceMXN,
      category: p.category,
      imageUrl: p.imageUrl,
      stock: p.stock,
      isActive: p.isActive,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const save = async () => {
    try {
      setLoading(true);
      setErr("");
      setMsg("");

      // Yo valido lo mínimo para no mandar basura
      if (!form.title.trim()) throw new Error("Falta título");
      if (!form.description.trim()) throw new Error("Falta descripción");
      if (!form.imageUrl.trim()) throw new Error("Falta imagen (sube una o pega URL)");
      if (Number(form.priceMXN) < 0) throw new Error("Precio inválido");
      if (Number(form.stock) < 0) throw new Error("Stock inválido");

      const url = editing ? `${API_URL}/api/products/${form._id}` : `${API_URL}/api/products`;
      const method = editing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: authHeaders,
        body: JSON.stringify({
          title: form.title,
          brand: form.brand,
          description: form.description,
          priceMXN: Number(form.priceMXN),
          category: form.category,
          imageUrl: form.imageUrl,
          stock: Number(form.stock),
          isActive: Boolean(form.isActive),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error guardando");

      setMsg(editing ? "Producto actualizado ✅" : "Producto creado ✅");
      resetForm();
      await refresh();
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    try {
      const ok = confirm("¿Seguro que quieres borrar este producto?");
      if (!ok) return;

      setLoading(true);
      setErr("");
      setMsg("");

      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error borrando");

      setMsg("Producto eliminado ✅");
      await refresh();
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Subida real de imagen (archivo) al backend
  const uploadImage = async (file) => {
    try {
      setLoading(true);
      setErr("");
      setMsg("");

      const fd = new FormData();
      fd.append("image", file);

      const res = await fetch(`${API_URL}/api/products/upload/image`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
        body: fd,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error subiendo imagen");

      onChange("imageUrl", data.imageUrl);
      setMsg("Imagen subida ✅");
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isTrabajador()) {
    return (
      <div className="container">
        <h2 className="h2">Panel de Trabajador</h2>
        <p className="toastErr">No tienes permisos para entrar aquí.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="h2">Panel de Trabajador</h2>

      {loading && <p className="p">Cargando...</p>}
      {err && <p className="toastErr">{err}</p>}
      {msg && <p className="toastOk">{msg}</p>}

      {/* Dashboard */}
      {stats && (
        <div className="grid2" style={{ marginBottom: 18 }}>
          <div className="card"><div className="cardBody"><div className="badge">Total</div><h3>{stats.totalProducts}</h3></div></div>
          <div className="card"><div className="cardBody"><div className="badge">Activos</div><h3>{stats.activeProducts}</h3></div></div>
          <div className="card"><div className="cardBody"><div className="badge">Stock bajo</div><h3>{stats.lowStock}</h3></div></div>
        </div>
      )}

      {/* Form crear/editar */}
      <div className="card" style={{ padding: 14, marginBottom: 18 }}>
        <h3 style={{ marginTop: 0 }}>{editing ? "Editar producto" : "Crear producto"}</h3>

        <div className="row">
          <input className="input" placeholder="Título" value={form.title} onChange={(e) => onChange("title", e.target.value)} />
          <input className="input" placeholder="Marca" value={form.brand} onChange={(e) => onChange("brand", e.target.value)} />
        </div>

        <textarea
          className="input"
          style={{ minHeight: 90, marginTop: 10 }}
          placeholder="Descripción"
          value={form.description}
          onChange={(e) => onChange("description", e.target.value)}
        />

        <div className="row" style={{ marginTop: 10 }}>
          <input className="input" type="number" placeholder="Precio MXN" value={form.priceMXN} onChange={(e) => onChange("priceMXN", e.target.value)} />
          <input className="input" type="number" placeholder="Stock" value={form.stock} onChange={(e) => onChange("stock", e.target.value)} />

          <select className="input" value={form.category} onChange={(e) => onChange("category", e.target.value)}>
            <option value="calzado">Calzado</option>
            <option value="ropa">Ropa</option>
            <option value="accesorios">Accesorios</option>
            <option value="deporte">Deporte</option>
            <option value="outlet">Outlet</option>
            <option value="bazar">Bazar</option>
            <option value="mujer">Mujer</option>
            <option value="hombre">Hombre</option>
            <option value="ninos">Niños</option>
          </select>
        </div>

        <div className="row" style={{ marginTop: 10 }}>
          <input className="input" placeholder="imageUrl (o sube archivo abajo)" value={form.imageUrl} onChange={(e) => onChange("imageUrl", e.target.value)} />
          <label className="btn btnGhost" style={{ cursor: "pointer" }}>
            Subir foto
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])}
            />
          </label>
        </div>

        <div className="row" style={{ marginTop: 10, alignItems: "center" }}>
          <label className="badge" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <input type="checkbox" checked={form.isActive} onChange={(e) => onChange("isActive", e.target.checked)} />
            Activo
          </label>

          <button className="btn btnPrimary" onClick={save}>{editing ? "Guardar cambios" : "Crear producto"}</button>
          <button className="btn btnGhost" onClick={resetForm}>Limpiar</button>
          <button className="btn btnGhost" onClick={refresh}>Refrescar</button>
        </div>
      </div>

      {/* Tabla/lista tipo admin */}
      <div className="card" style={{ padding: 14 }}>
        <h3 style={{ marginTop: 0 }}>Productos (administración)</h3>

        <div style={{ overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>Foto</th>
                <th>Título</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Activo</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {items.map((p) => (
                <tr key={p._id}>
                  <td style={{ width: 90 }}>
                    <img
                      src={`${API_URL}${p.imageUrl.startsWith("/uploads") ? p.imageUrl : ""}` || p.imageUrl}
                      alt={p.title}
                      style={{ width: 70, height: 50, objectFit: "cover", borderRadius: 10 }}
                    />
                  </td>
                  <td>{p.title}</td>
                  <td><span className="badge">{p.category}</span></td>
                  <td>${p.priceMXN}</td>
                  <td>{p.stock}</td>
                  <td>{p.isActive ? "Sí" : "No"}</td>
                  <td>
                    <div className="actions">
                      <button className="btn btnGhost" onClick={() => pickEdit(p)}>Editar</button>
                      <button className="btn btnPrimary" onClick={() => remove(p._id)}>Borrar</button>
                    </div>
                  </td>
                </tr>
              ))}

              {!items.length && (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: 18 }}>
                    No hay productos todavía.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}