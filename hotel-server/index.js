const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { connectDatabase } = require('./src/config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importar rutas
const reservationsRoutes = require('./src/routes/reservations');
const weatherRoutes = require('./src/routes/weather');
const postsRoutes = require('./src/routes/posts');

// Rutas API
app.use('/api/reservations', reservationsRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/posts', postsRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    message: 'Hotel Server API funcionando correctamente',
    version: '1.0.0',
    endpoints: {
      reservations: '/api/reservations',
      weather: '/api/weather',
      posts: '/api/posts'
    }
  });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: err.message
  });
});

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Iniciar servidor
const startServer = async () => {
  try {
    // Conectar a la base de datos
    await connectDatabase();
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
      console.log(`📧 Configuración SMTP: ${process.env.SMTP_HOST}:${process.env.SMTP_PORT}`);
      console.log(`🌤️  API del clima: ${process.env.OPENWEATHER_API_KEY ? 'Configurada' : 'No configurada'}`);
      console.log(`🌐 API disponible en: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
