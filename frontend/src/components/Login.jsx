// Yo inicio sesión y guardo token + rol en localStorage.
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErr("");

      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login falló");

      // Yo guardo token + role para proteger rutas.
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("userName", data.user.name || "Usuario");

      nav("/productos");
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 12 }}>Iniciar sesión</h2>

      {err && <div className="toastErr">{err}</div>}

      <form onSubmit={submit} className="card" style={{ padding: 18, maxWidth: 460 }}>
        <label className="p">Email</label>
        <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label className="p" style={{ marginTop: 10 }}>Password</label>
        <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button className="btn btnPrimary" style={{ marginTop: 14 }} disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}