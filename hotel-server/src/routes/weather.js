const express = require('express');
const router = express.Router();
const { getWeather, getWeatherInfo } = require('../controllers/weatherController');

// GET /api/weather - Obtener clima por ciudad o coordenadas
router.get('/', getWeather);

// GET /api/weather/info - Información sobre la API del clima
router.get('/info', getWeatherInfo);

module.exports = router;
