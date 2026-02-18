const express = require('express');
const router = express.Router();

// RUTA: GET /api/currency
router.get('/', async (req, res) => {
    try {
        // 1. Consumimos la API externa (ExchangeRate-API - Gratuita)
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        
        // 2. Convertimos la respuesta a formato JSON
        const data = await response.json();

        // 3. Extraemos el valor específico del Peso Mexicano (MXN)
        const mxnRate = data.rates.MXN;

        // 4. Enviamos la información al Frontend
        res.json({
            success: true,
            base: 'USD',
            target: 'MXN',
            rate: mxnRate,
            message: `Tipo de cambio actual: 1 USD = ${mxnRate} MXN`
        });

    } catch (error) {
        console.error('Error al consumir la API externa:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error al obtener el tipo de cambio del servidor externo' 
        });
    }
});

module.exports = router;