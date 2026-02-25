/**
 * CurrencyConverter.jsx
 * Yo creo un componente que consume mi backend (que a su vez consume la API externa).
 * Con esto pruebo la integración de API externa en frontend (rúbrica).
 */

import React, { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function CurrencyConverter() {
  // Yo guardo inputs del usuario
  const [from, setFrom] = useState("MXN");
  const [to, setTo] = useState("USD");
  const [amount, setAmount] = useState(100);

  // Yo guardo resultados
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Yo hago conversión automática al cargar (para que se vea vivo)
  useEffect(() => {
    convert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const convert = async () => {
    try {
      setError("");
      setLoading(true);
      setResult(null);

      const url = `${API_URL}/api/currency/convert?from=${encodeURIComponent(
        from
      )}&to=${encodeURIComponent(to)}&amount=${encodeURIComponent(amount)}`;

      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error consultando conversión");
      }

      setResult(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const swap = () => {
    // Yo intercambio monedas para UX tipo tienda
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Conversión de Moneda</h2>
        <p style={styles.subtitle}>
          Yo consumo una API externa real desde mi backend y muestro el resultado aquí.
        </p>

        <div style={styles.grid}>
          <div style={styles.field}>
            <label style={styles.label}>De</label>
            <select style={styles.input} value={from} onChange={(e) => setFrom(e.target.value)}>
              <option value="MXN">MXN</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="JPY">JPY</option>
            </select>
          </div>

          <button type="button" onClick={swap} style={styles.swap}>
            ⇄
          </button>

          <div style={styles.field}>
            <label style={styles.label}>A</label>
            <select style={styles.input} value={to} onChange={(e) => setTo(e.target.value)}>
              <option value="USD">USD</option>
              <option value="MXN">MXN</option>
              <option value="EUR">EUR</option>
              <option value="JPY">JPY</option>
            </select>
          </div>

          <div style={styles.fieldWide}>
            <label style={styles.label}>Cantidad</label>
            <input
              style={styles.input}
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
        </div>

        <div style={styles.actions}>
          <button style={{ ...styles.btn, ...styles.primary }} onClick={convert} disabled={loading}>
            {loading ? "Convirtiendo..." : "Convertir"}
          </button>
          <button
            style={{ ...styles.btn, ...styles.ghost }}
            onClick={() => {
              setFrom("MXN");
              setTo("USD");
              setAmount(100);
              setResult(null);
              setError("");
            }}
          >
            Limpiar
          </button>
        </div>

        {error && <p style={styles.error}>⚠ {error}</p>}

        {result && (
          <div style={styles.resultBox}>
            <p style={styles.resultMain}>
              {result.amount} {result.from} = <b>{result.converted.toFixed(2)}</b> {result.to}
            </p>
            <p style={styles.resultMeta}>
              Tipo de cambio: {result.rate.toFixed(6)} • Fuente: {result.source}
              {result.date ? ` • Fecha: ${result.date}` : ""}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  // Yo hago un look minimalista tipo Adidas (blanco, negro, aire)
  page: {
    minHeight: "100vh",
    background: "#f6f6f6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "32px 16px",
  },
  card: {
    width: "min(760px, 100%)",
    background: "#fff",
    border: "1px solid #eaeaea",
    borderRadius: "18px",
    padding: "26px",
    boxShadow: "0 16px 50px rgba(0,0,0,0.06)",
  },
  title: {
    margin: 0,
    letterSpacing: "1px",
    fontWeight: 900,
    textTransform: "uppercase",
  },
  subtitle: {
    marginTop: "6px",
    marginBottom: "18px",
    color: "#555",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 64px 1fr",
    gap: "14px",
    alignItems: "end",
  },
  field: { display: "flex", flexDirection: "column", gap: "6px" },
  fieldWide: { gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "12px", color: "#333", fontWeight: 700, textTransform: "uppercase" },
  input: {
    height: "46px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    padding: "0 12px",
    outline: "none",
    fontSize: "15px",
  },
  swap: {
    height: "46px",
    borderRadius: "12px",
    border: "1px solid #111",
    background: "#fff",
    cursor: "pointer",
    fontWeight: 900,
  },
  actions: { display: "flex", gap: "12px", marginTop: "16px", flexWrap: "wrap" },
  btn: {
    padding: "12px 18px",
    borderRadius: "999px",
    fontWeight: 900,
    cursor: "pointer",
    border: "none",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  primary: { background: "#111", color: "#fff" },
  ghost: { background: "transparent", border: "1px solid #111", color: "#111" },
  error: { marginTop: "14px", color: "#b00020", fontWeight: 700 },
  resultBox: {
    marginTop: "18px",
    padding: "16px",
    borderRadius: "14px",
    background: "#fafafa",
    border: "1px solid #eee",
  },
  resultMain: { margin: 0, fontSize: "18px" },
  resultMeta: { marginTop: "6px", marginBottom: 0, color: "#555", fontSize: "13px" },
};