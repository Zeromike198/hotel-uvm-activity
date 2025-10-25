const { body, param, query, validationResult } = require('express-validator');

/**
 * Middleware para manejar errores de validación
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map(error => ({
      field: error.path,
      message: error.msg,
      value: error.value
    }));

    return res.status(400).json({
      success: false,
      message: 'Errores de validación',
      errors: formattedErrors
    });
  }
  
  next();
};

/**
 * Validaciones para reservaciones
 */
const validateReservation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('El nombre es requerido')
    .isLength({ min: 2, max: 100 })
    .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
  
  body('email')
    .trim()
    .isEmail()
    .withMessage('El email debe ser válido')
    .normalizeEmail(),
  
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('El teléfono es requerido')
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('El teléfono debe ser válido'),
  
  body('checkIn')
    .isISO8601()
    .withMessage('La fecha de entrada debe ser válida')
    .custom((value) => {
      const date = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (date < today) {
        throw new Error('La fecha de entrada no puede ser anterior al día actual');
      }
      return true;
    }),
  
  body('checkOut')
    .isISO8601()
    .withMessage('La fecha de salida debe ser válida')
    .custom((value, { req }) => {
      const checkIn = new Date(req.body.checkIn);
      const checkOut = new Date(value);
      if (checkOut <= checkIn) {
        throw new Error('La fecha de salida debe ser posterior a la fecha de entrada');
      }
      return true;
    }),
  
  body('guests')
    .isInt({ min: 1, max: 10 })
    .withMessage('El número de huéspedes debe ser entre 1 y 10'),
  
  body('roomType')
    .trim()
    .notEmpty()
    .withMessage('El tipo de habitación es requerido')
    .isIn(['standard', 'superior', 'executive', 'presidential'])
    .withMessage('Tipo de habitación inválido'),
  
  body('comments')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Los comentarios no pueden exceder 500 caracteres'),
  
  handleValidationErrors
];

/**
 * Validaciones para posts
 */
const validatePost = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('El título es requerido')
    .isLength({ min: 5, max: 200 })
    .withMessage('El título debe tener entre 5 y 200 caracteres'),
  
  body('slug')
    .optional()
    .trim()
    .matches(/^[a-z0-9-]+$/)
    .withMessage('El slug solo puede contener letras minúsculas, números y guiones'),
  
  body('content')
    .trim()
    .notEmpty()
    .withMessage('El contenido es requerido')
    .isLength({ min: 50 })
    .withMessage('El contenido debe tener al menos 50 caracteres'),
  
  body('images')
    .optional()
    .isArray()
    .withMessage('Las imágenes deben ser un array'),
  
  body('images.*.url')
    .optional()
    .isURL()
    .withMessage('La URL de la imagen debe ser válida'),
  
  body('images.*.alt')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('El texto alternativo no puede exceder 100 caracteres'),
  
  body('status')
    .optional()
    .isIn(['draft', 'published', 'archived'])
    .withMessage('El estado debe ser draft, published o archived'),
  
  body('tags')
    .optional()
    .isArray()
    .withMessage('Las etiquetas deben ser un array'),
  
  body('tags.*')
    .optional()
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage('Cada etiqueta debe tener entre 1 y 30 caracteres'),
  
  body('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured debe ser un booleano'),
  
  handleValidationErrors
];

/**
 * Validaciones para consultas de posts
 */
const validatePostQuery = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('La página debe ser un número mayor a 0'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('El límite debe ser entre 1 y 50'),
  
  query('status')
    .optional()
    .isIn(['draft', 'published', 'archived'])
    .withMessage('El estado debe ser draft, published o archived'),
  
  query('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured debe ser un booleano'),
  
  query('search')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('La búsqueda debe tener entre 1 y 100 caracteres'),
  
  handleValidationErrors
];

/**
 * Validaciones para parámetros de ID
 */
const validateId = [
  param('id')
    .isMongoId()
    .withMessage('ID inválido'),
  
  handleValidationErrors
];

/**
 * Validaciones para consultas del clima
 */
const validateWeatherQuery = [
  query('city')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('El nombre de la ciudad debe tener entre 1 y 100 caracteres'),
  
  query('lat')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('La latitud debe estar entre -90 y 90'),
  
  query('lon')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('La longitud debe estar entre -180 y 180'),
  
  query()
    .custom((value, { req }) => {
      if (!req.query.city && (!req.query.lat || !req.query.lon)) {
        throw new Error('Se requiere el parámetro "city" o las coordenadas "lat" y "lon"');
      }
      return true;
    }),
  
  handleValidationErrors
];

/**
 * Validaciones para headers de autenticación
 */
const validateAuthHeader = [
  (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Header de autorización requerido',
        error: 'MISSING_AUTH_HEADER'
      });
    }
    
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Formato de autorización inválido. Use: Bearer <token>',
        error: 'INVALID_AUTH_FORMAT'
      });
    }
    
    next();
  }
];

/**
 * Sanitización básica de entrada
 */
const sanitizeInput = (req, res, next) => {
  // Sanitizar strings básicos
  const sanitizeString = (str) => {
    if (typeof str === 'string') {
      return str
        .trim()
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remover scripts
        .replace(/javascript:/gi, '') // Remover javascript: URLs
        .replace(/on\w+\s*=/gi, ''); // Remover event handlers
    }
    return str;
  };

  // Aplicar sanitización recursivamente
  const sanitizeObject = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map(sanitizeObject);
    } else if (obj && typeof obj === 'object') {
      const sanitized = {};
      for (const key in obj) {
        sanitized[key] = sanitizeObject(obj[key]);
      }
      return sanitized;
    } else {
      return sanitizeString(obj);
    }
  };

  if (req.body) {
    req.body = sanitizeObject(req.body);
  }
  
  if (req.query) {
    req.query = sanitizeObject(req.query);
  }
  
  next();
};

module.exports = {
  handleValidationErrors,
  validateReservation,
  validatePost,
  validatePostQuery,
  validateId,
  validateWeatherQuery,
  validateAuthHeader,
  sanitizeInput
};
