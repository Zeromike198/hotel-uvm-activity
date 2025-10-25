import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/api/weather?city=Mérida');
        setWeather(response.data.data);
        setError(null);
      } catch (err) {
        console.error('Error al obtener el clima:', err);
        setError('No se pudo obtener la información del clima');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="card">
        <div className="card-body text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">Obteniendo información del clima...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="card-body text-center">
          <i className="fas fa-cloud-rain text-muted fa-3x mb-3"></i>
          <p className="text-muted">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card weather-widget">
      <div className="card-header bg-primary text-white">
        <h5 className="card-title mb-0">
          <i className="fas fa-cloud-sun me-2"></i>
          Clima en Mérida
        </h5>
      </div>
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-6">
            <div className="weather-icon text-center">
              {weather.iconUrl && (
                <img 
                  src={weather.iconUrl} 
                  alt={weather.description}
                  className="weather-icon-img"
                />
              )}
              <h3 className="temperature">{Math.round(weather.temperature)}°C</h3>
            </div>
          </div>
          <div className="col-6">
            <div className="weather-details">
              <p className="mb-1">
                <strong>{weather.description}</strong>
              </p>
              <p className="mb-1">
                <i className="fas fa-eye me-1"></i>
                Visibilidad: {weather.visibility} km
              </p>
              <p className="mb-1">
                <i className="fas fa-tint me-1"></i>
                Humedad: {weather.humidity}%
              </p>
              <p className="mb-1">
                <i className="fas fa-wind me-1"></i>
                Viento: {weather.windSpeed} km/h {weather.windDirectionText}
              </p>
              <p className="mb-0">
                <i className="fas fa-thermometer-half me-1"></i>
                Sensación: {Math.round(weather.feelsLike)}°C
              </p>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <small className="text-muted">
            Última actualización: {new Date().toLocaleTimeString('es-ES')}
          </small>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
