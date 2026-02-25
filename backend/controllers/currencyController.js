/**
 * Frankfurter Latest:
 * https://api.frankfurter.dev/v1/latest?base=USD&symbols=MXN
 */
async function getCurrency(req, res) {
  const base = (req.query.base || "USD").toUpperCase();
  const symbols = (req.query.symbols || "MXN").toUpperCase();

  const url = `https://api.frankfurter.dev/v1/latest?base=${encodeURIComponent(base)}&symbols=${encodeURIComponent(symbols)}`;

  const r = await fetch(url);
  const data = await r.json();

  if (!r.ok) {
    return res.status(400).json({ message: "API externa falló", detail: data });
  }

  res.json({
    success: true,
    provider: "frankfurter",
    base: data.base,
    date: data.date,
    rates: data.rates
  });
}

module.exports = { getCurrency };