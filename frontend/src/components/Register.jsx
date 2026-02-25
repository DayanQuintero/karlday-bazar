// Yo implemento registro real y, al registrarme, puedo mandar al login.
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../config";

export default function Register() {
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setErr("");

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error de conexión");

      setMsg(data.message || "Registro exitoso ✅");

      // Yo mando al login para que inicie sesión
      setTimeout(() => nav("/login"), 900);
    } catch (e2) {
      setErr(e2.message);
    }
  };

  return (
    <div className="container">
      <h2 className="h2" style={{ textAlign: "center" }}>CREAR CUENTA</h2>

      <form className="card form" onSubmit={submit}>
        <div className="row">
          <input
            className="input"
            placeholder="Nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="input"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="input"
            placeholder="Contraseña (mínimo 6 caracteres)"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btnPrimary" type="submit">
            Registrarme
          </button>

          {msg && <div className="toastOk">{msg}</div>}
          {err && <div className="toastErr">{err}</div>}

          <div className="small">
            ¿Ya tienes cuenta? <Link to="/login"><b>Inicia sesión</b></Link>
          </div>
        </div>
      </form>
    </div>
  );
}