const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { connectDatabase } = require('./config/database');
const { seedAdmin } = require('./seeders/adminSeeder');
const { 
  corsOptions, 
  helmetConfig, 
  generalLimiter, 
  authLimiter, 
  createLimiter, 
  weatherLimiter 
} = require('./config/security');
const { sanitizeInput } = require('./middleware/validation');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de seguridad
app.use(helmetConfig);
app.use(cors(corsOptions));
app.use(generalLimiter);

// Middleware de parsing y sanitización
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(sanitizeInput);

// Importar rutas
const reservationsRoutes = require('./routes/reservations');
const weatherRoutes = require('./routes/weather');
const postsRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');

// Rutas API con rate limiting específico
app.use('/api/auth', authRoutes);
app.use('/api/reservations', createLimiter, reservationsRoutes);
app.use('/api/weather', weatherLimiter, weatherRoutes);
app.use('/api/posts', postsRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    message: 'Hotel Server API funcionando correctamente',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
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
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
    path: req.path,
    method: req.method
  });
});

// Iniciar servidor
const startServer = async () => {
  try {
    // Conectar a la base de datos
    await connectDatabase();
    
    // Ejecutar seeder de admin
    await seedAdmin();
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
      console.log(`📧 Configuración SMTP: ${process.env.SMTP_HOST}:${process.env.SMTP_PORT}`);
      console.log(`🌤️  API del clima: ${process.env.OPENWEATHER_API_KEY ? 'Configurada' : 'No configurada'}`);
      console.log(`🔐 Sistema de autenticación: Configurado`);
      console.log(`🌐 API disponible en: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
