const axios = require('axios');

// Configuración de OpenWeatherMap API
const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

/**
 * Obtiene el clima de una ciudad específica
 * @param {string} city - Nombre de la ciudad
 * @returns {Promise<Object>} - Datos del clima
 */
const getWeatherByCity = async (city) => {
  try {
    if (!WEATHER_API_KEY) {
      throw new Error('OPENWEATHER_API_KEY no está configurada en las variables de entorno');
    }

    if (!city || city.trim() === '') {
      throw new Error('El nombre de la ciudad es requerido');
    }

    // Parámetros para la API de OpenWeatherMap
    const params = {
      q: city.trim(),
      appid: WEATHER_API_KEY,
      units: 'metric', // Temperatura en Celsius
      lang: 'es' // Respuesta en español
    };

    console.log(`Consultando clima para: ${city}`);
    
    const response = await axios.get(WEATHER_BASE_URL, { params });
    
    if (response.status !== 200) {
      throw new Error(`Error en la API del clima: ${response.status}`);
    }

    const data = response.data;
    
    // Formatear respuesta
    const weatherData = {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      description: data.weather[0].description,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: data.wind.speed,
      windDirection: data.wind.deg,
      visibility: data.visibility ? Math.round(data.visibility / 1000) : null, // en km
      icon: data.weather[0].icon,
      timestamp: new Date().toISOString()
    };

    console.log(`Clima obtenido para ${city}: ${weatherData.temperature}°C, ${weatherData.description}`);
    return weatherData;

  } catch (error) {
    console.error('Error al obtener datos del clima:', error.message);
    
    // Manejo específico de errores de la API
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || 'Error desconocido de la API';
      
      switch (status) {
        case 401:
          throw new Error('API Key inválida para OpenWeatherMap');
        case 404:
          throw new Error(`Ciudad "${city}" no encontrada`);
        case 429:
          throw new Error('Límite de consultas excedido para OpenWeatherMap');
        default:
          throw new Error(`Error de la API del clima: ${message}`);
      }
    }
    
    // Re-lanzar el error original si no es de la API
    throw error;
  }
};

/**
 * Obtiene el clima por coordenadas (latitud y longitud)
 * @param {number} lat - Latitud
 * @param {number} lon - Longitud
 * @returns {Promise<Object>} - Datos del clima
 */
const getWeatherByCoordinates = async (lat, lon) => {
  try {
    if (!WEATHER_API_KEY) {
      throw new Error('OPENWEATHER_API_KEY no está configurada en las variables de entorno');
    }

    if (!lat || !lon) {
      throw new Error('Las coordenadas (latitud y longitud) son requeridas');
    }

    const params = {
      lat: lat,
      lon: lon,
      appid: WEATHER_API_KEY,
      units: 'metric',
      lang: 'es'
    };

    console.log(`Consultando clima para coordenadas: ${lat}, ${lon}`);
    
    const response = await axios.get(WEATHER_BASE_URL, { params });
    
    if (response.status !== 200) {
      throw new Error(`Error en la API del clima: ${response.status}`);
    }

    const data = response.data;
    
    const weatherData = {
      city: data.name,
      country: data.sys.country,
      coordinates: {
        lat: data.coord.lat,
        lon: data.coord.lon
      },
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      description: data.weather[0].description,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: data.wind.speed,
      windDirection: data.wind.deg,
      visibility: data.visibility ? Math.round(data.visibility / 1000) : null,
      icon: data.weather[0].icon,
      timestamp: new Date().toISOString()
    };

    console.log(`Clima obtenido para coordenadas: ${weatherData.temperature}°C, ${weatherData.description}`);
    return weatherData;

  } catch (error) {
    console.error('Error al obtener datos del clima por coordenadas:', error.message);
    throw error;
  }
};

/**
 * Obtiene el icono del clima como URL
 * @param {string} iconCode - Código del icono de OpenWeatherMap
 * @returns {string} - URL del icono
 */
const getWeatherIconUrl = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

/**
 * Convierte la dirección del viento en grados a texto
 * @param {number} degrees - Dirección en grados
 * @returns {string} - Dirección del viento en texto
 */
const getWindDirection = (degrees) => {
  const directions = [
    'Norte', 'NNE', 'Norte', 'NNE', 'Este', 'ESE', 'Este', 'ESE',
    'Sur', 'SSE', 'Sur', 'SSE', 'Oeste', 'OSO', 'Oeste', 'OSO'
  ];
  
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

module.exports = {
  getWeatherByCity,
  getWeatherByCoordinates,
  getWeatherIconUrl,
  getWindDirection
};
