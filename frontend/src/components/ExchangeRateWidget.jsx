/**
 * frontend/src/components/ExchangeRateWidget.jsx
 * Aquí yo muestro el tipo de cambio USD -> MXN consumiendo mi backend.
 * Yo lo hago para evidenciar la integración de API externa en el frontend.
 */

import React, { useEffect, useState } from "react";
import { API_URL } from "../config";

export default function ExchangeRateWidget() {
  const [loading, setLoading] = useState(false);
  const [rate, setRate] = useState(null);
  const [updated, setUpdated] = useState(null);
  const [error, setError] = useState("");

  const fetchRate = async () => {
    try {
      setLoading(true);
      setError("");

      // Yo consulto mi backend (que a su vez consulta la API externa)
      const res = await fetch(`${API_URL}/api/currency/usd-mxn`);
      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.message || "No pude obtener el tipo de cambio.");
      }

      setRate(data.rate);
      setUpdated(data.updated || null);
    } catch (err) {
      setError(err.message || "Error de conexión.");
      setRate(null);
      setUpdated(null);
    } finally {
      setLoading(false);
    }
  };

  // Yo cargo automáticamente al abrir la página
  useEffect(() => {
    fetchRate();
  }, []);

  return (
    <div style={styles.card}>
      <div style={styles.row}>
        <div>
          <div style={styles.label}>Tipo de cambio</div>
          <div style={styles.title}>USD → MXN</div>
        </div>

        <button style={styles.btn} onClick={fetchRate} disabled={loading}>
          {loading ? "Actualizando..." : "Actualizar"}
        </button>
      </div>

      {error ? (
        <div style={styles.error}>⚠️ {error}</div>
      ) : (
        <>
          <div style={styles.big}>
            {rate ? `${rate.toFixed(4)} MXN` : "Cargando..."}
          </div>
          <div style={styles.small}>1 USD equivale a {rate ? rate.toFixed(4) : "..."} MXN</div>

          {updated && <div style={styles.updated}>Última actualización: {updated}</div>}

          <div style={styles.note}>
            Yo consumo una API externa (open.er-api.com) desde mi backend y la muestro aquí para cumplir la rúbrica.
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  card: {
    marginTop: "18px",
    padding: "18px",
    borderRadius: "14px",
    background: "#fff",
    border: "1px solid #e6e6e6",
    boxShadow: "0 10px 28px rgba(0,0,0,0.06)",
    maxWidth: "520px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
  },
  label: { fontSize: "12px", color: "#777", fontWeight: "700", letterSpacing: "0.5px" },
  title: { fontSize: "18px", fontWeight: "900", color: "#111", marginTop: "2px" },
  btn: {
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: "999px",
    padding: "10px 14px",
    fontWeight: "800",
    cursor: "pointer",
  },
  big: { fontSize: "28px", fontWeight: "900", marginTop: "14px", color: "#111" },
  small: { marginTop: "4px", color: "#555", fontSize: "13px" },
  updated: { marginTop: "8px", color: "#333", fontSize: "12px" },
  note: { marginTop: "10px", color: "#666", fontSize: "12px", lineHeight: "1.4" },
  error: { marginTop: "12px", color: "#b00020", fontWeight: "700" },
};