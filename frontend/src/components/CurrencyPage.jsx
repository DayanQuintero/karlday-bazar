import React, { useEffect, useState } from "react";

function CurrencyPage() {
  // Yo guardo aquí el estado de carga, error y el dato final
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  // Yo llamo al backend para obtener el tipo de cambio
  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("http://localhost:5000/api/currency/convert?from=USD&to=MXN&amount=100");
        const json = await res.json();

        if (!res.ok) {
          throw new Error(json?.message || "Error consultando API de moneda");
        }

        setData(json);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrency();
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: "0 16px" }}>
      <h1 style={{ fontWeight: 900, letterSpacing: "1px" }}>TIPO DE CAMBIO (USD → MXN)</h1>

      {loading && <p>Cargando tipo de cambio…</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {data && (
        <div style={{ marginTop: 20, border: "1px solid #ddd", borderRadius: 12, padding: 18 }}>
          <p><b>Monto:</b> {data.amount}</p>
          <p><b>De:</b> {data.from}</p>
          <p><b>A:</b> {data.to}</p>
          <p><b>Resultado:</b> {data.result}</p>
          <p style={{ fontSize: 12, opacity: 0.7 }}>
            Yo muestro el dato que me regresa mi backend (que a su vez consume la API externa).
          </p>
        </div>
      )}
    </div>
  );
}

export default CurrencyPage;