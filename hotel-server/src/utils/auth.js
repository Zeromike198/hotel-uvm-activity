const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Clave secreta para JWT (en producción debe estar en variables de entorno)
const JWT_SECRET = process.env.JWT_SECRET || 'hotel-secret-key-2024';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

/**
 * Generar token JWT para un usuario
 * @param {Object} user - Objeto usuario
 * @returns {string} - Token JWT
 */
const generateToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role
  };
  
  return jwt.sign(payload, JWT_SECRET, { 
    expiresIn: JWT_EXPIRES_IN,
    issuer: 'hotel-api',
    audience: 'hotel-client'
  });
};

/**
 * Middleware de autenticación con JWT
 * Verifica el token en el header Authorization
 */
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token de acceso requerido',
        error: 'MISSING_TOKEN'
      });
    }

    // Verificar y decodificar token JWT
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Buscar usuario en la base de datos
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user || !user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Usuario no encontrado o inactivo',
        error: 'USER_NOT_FOUND'
      });
    }

    // Agregar información del usuario a la request
    req.user = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      isActive: user.isActive
    };
    
    next();

  } catch (error) {
    console.error('Error en autenticación:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({
        success: false,
        message: 'Token inválido',
        error: 'INVALID_TOKEN'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({
        success: false,
        message: 'Token expirado',
        error: 'TOKEN_EXPIRED'
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Error interno de autenticación',
      error: error.message
    });
  }
};

/**
 * Middleware para verificar rol específico
 * @param {string|Array} requiredRoles - Roles requeridos
 */
const requireRole = (requiredRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Usuario no autenticado',
          error: 'NOT_AUTHENTICATED'
        });
      }

      const userRole = req.user.role;
      const roles = Array.isArray(requiredRoles) 
        ? requiredRoles 
        : [requiredRoles];

      if (!roles.includes(userRole)) {
        return res.status(403).json({
          success: false,
          message: 'Rol insuficiente',
          error: 'INSUFFICIENT_ROLE',
          required: roles,
          userRole: userRole
        });
      }

      next();

    } catch (error) {
      console.error('Error en verificación de rol:', error);
      return res.status(500).json({
        success: false,
        message: 'Error interno de autorización',
        error: error.message
      });
    }
  };
};

/**
 * Middleware opcional de autenticación
 * No falla si no hay token, pero agrega usuario si existe
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        
        if (user && user.isActive) {
          req.user = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            isActive: user.isActive
          };
        }
      } catch (error) {
        // Token inválido, continuar sin autenticación
        console.log('Token inválido en autenticación opcional:', error.message);
      }
    }

    next();

  } catch (error) {
    console.error('Error en autenticación opcional:', error);
    next(); // Continuar sin autenticación
  }
};

module.exports = {
  generateToken,
  authenticateToken,
  requireRole,
  optionalAuth
};