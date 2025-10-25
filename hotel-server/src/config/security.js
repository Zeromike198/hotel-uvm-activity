const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

/**
 * Configuración de CORS para dominios permitidos
 */
const corsOptions = {
  origin: function (origin, callback) {
    // Lista de dominios permitidos
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173', // Vite dev server
      'http://localhost:4173', // Vite preview
      'https://hotel-paradise.com',
      'https://www.hotel-paradise.com',
      'https://admin.hotel-paradise.com'
    ];

    // Permitir requests sin origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`🚫 CORS bloqueado para origen: ${origin}`);
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true, // Permitir cookies y headers de autenticación
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'Cache-Control'
  ],
  exposedHeaders: ['X-Total-Count', 'X-Rate-Limit-Remaining']
};

/**
 * Configuración de Helmet para seguridad HTTP
 */
const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
      scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", "https://cdn.jsdelivr.net"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"]
    }
  },
  crossOriginEmbedderPolicy: false,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
});

/**
 * Rate limiting general
 */
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Límite de 100 requests por IP cada 15 minutos
  message: {
    success: false,
    message: 'Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde',
    error: 'RATE_LIMIT_EXCEEDED'
  },
  standardHeaders: true, // Retornar rate limit info en headers
  legacyHeaders: false, // Deshabilitar X-RateLimit-* headers
  handler: (req, res) => {
    console.warn(`🚫 Rate limit excedido para IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde',
      error: 'RATE_LIMIT_EXCEEDED',
      retryAfter: Math.round(req.rateLimit.resetTime / 1000)
    });
  }
});

/**
 * Rate limiting estricto para autenticación
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Solo 5 intentos de login por IP cada 15 minutos
  message: {
    success: false,
    message: 'Demasiados intentos de autenticación, intenta de nuevo más tarde',
    error: 'AUTH_RATE_LIMIT_EXCEEDED'
  },
  skipSuccessfulRequests: true, // No contar requests exitosos
  handler: (req, res) => {
    console.warn(`🚫 Rate limit de autenticación excedido para IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'Demasiados intentos de autenticación, intenta de nuevo más tarde',
      error: 'AUTH_RATE_LIMIT_EXCEEDED',
      retryAfter: Math.round(req.rateLimit.resetTime / 1000)
    });
  }
});

/**
 * Rate limiting para creación de recursos
 */
const createLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 10, // Solo 10 creaciones por IP cada hora
  message: {
    success: false,
    message: 'Límite de creación excedido, intenta de nuevo más tarde',
    error: 'CREATE_RATE_LIMIT_EXCEEDED'
  },
  handler: (req, res) => {
    console.warn(`🚫 Rate limit de creación excedido para IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'Límite de creación excedido, intenta de nuevo más tarde',
      error: 'CREATE_RATE_LIMIT_EXCEEDED',
      retryAfter: Math.round(req.rateLimit.resetTime / 1000)
    });
  }
});

/**
 * Rate limiting para API del clima
 */
const weatherLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 30, // 30 requests por minuto para clima
  message: {
    success: false,
    message: 'Límite de consultas del clima excedido',
    error: 'WEATHER_RATE_LIMIT_EXCEEDED'
  },
  handler: (req, res) => {
    console.warn(`🚫 Rate limit del clima excedido para IP: ${req.ip}`);
    res.status(429).json({
      success: false,
      message: 'Límite de consultas del clima excedido',
      error: 'WEATHER_RATE_LIMIT_EXCEEDED',
      retryAfter: Math.round(req.rateLimit.resetTime / 1000)
    });
  }
});

module.exports = {
  corsOptions,
  helmetConfig,
  generalLimiter,
  authLimiter,
  createLimiter,
  weatherLimiter
};
