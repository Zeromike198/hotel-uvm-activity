const { getWeatherByCity, getWeatherByCoordinates, getWeatherIconUrl, getWindDirection } = require('../utils/weather');

/**
 * Controlador para obtener clima por ciudad
 */
const getWeather = async (req, res) => {
  try {
    const { city, lat, lon } = req.query;
    
    // Validar que se proporcione al menos ciudad o coordenadas
    if (!city && (!lat || !lon)) {
      return res.status(400).json({
        success: false,
        message: 'Se requiere el parámetro "city" o las coordenadas "lat" y "lon"',
        example: {
          byCity: '/api/weather?city=Madrid',
          byCoordinates: '/api/weather?lat=40.4168&lon=-3.7038'
        }
      });
    }

    let weatherData;

    // Obtener clima por ciudad o coordenadas
    if (city) {
      weatherData = await getWeatherByCity(city);
    } else {
      weatherData = await getWeatherByCoordinates(parseFloat(lat), parseFloat(lon));
    }

    // Agregar URL del icono y dirección del viento
    weatherData.iconUrl = getWeatherIconUrl(weatherData.icon);
    weatherData.windDirectionText = getWindDirection(weatherData.windDirection);

    // Respuesta exitosa
    res.json({
      success: true,
      message: 'Datos del clima obtenidos exitosamente',
      data: weatherData
    });

  } catch (error) {
    console.error('Error en controlador de clima:', error.message);
    
    // Determinar código de estado HTTP
    let statusCode = 500;
    let message = 'Error interno del servidor';
    
    if (error.message.includes('no está configurada')) {
      statusCode = 500;
      message = 'Configuración de API del clima no disponible';
    } else if (error.message.includes('no encontrada')) {
      statusCode = 404;
      message = error.message;
    } else if (error.message.includes('API Key inválida')) {
      statusCode = 500;
      message = 'Configuración de API del clima inválida';
    } else if (error.message.includes('Límite de consultas')) {
      statusCode = 429;
      message = 'Límite de consultas excedido';
    } else if (error.message.includes('requerido')) {
      statusCode = 400;
      message = error.message;
    }

    res.status(statusCode).json({
      success: false,
      message: message,
      error: error.message
    });
  }
};

/**
 * Controlador para obtener información de la API del clima
 */
const getWeatherInfo = (req, res) => {
  res.json({
    success: true,
    message: 'API del clima disponible',
    endpoints: {
      getWeather: {
        method: 'GET',
        path: '/api/weather',
        parameters: {
          city: 'Nombre de la ciudad (opcional si se usan coordenadas)',
          lat: 'Latitud (opcional si se usa ciudad)',
          lon: 'Longitud (opcional si se usa ciudad)'
        },
        examples: [
          '/api/weather?city=Madrid',
          '/api/weather?city=New York',
          '/api/weather?lat=40.4168&lon=-3.7038'
        ]
      }
    },
    required: {
      environmentVariable: 'OPENWEATHER_API_KEY',
      description: 'Clave de API de OpenWeatherMap requerida'
    }
  });
};

module.exports = {
  getWeather,
  getWeatherInfo
};
