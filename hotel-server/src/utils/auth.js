/**
 * Middleware de autenticación básica con token simulado
 * En un entorno de producción, esto debería usar JWT o similar
 */

// Tokens simulados para desarrollo
const SIMULATED_TOKENS = {
  'admin-token-123': {
    id: 'admin-001',
    username: 'admin',
    role: 'admin',
    permissions: ['read', 'write', 'delete']
  },
  'editor-token-456': {
    id: 'editor-001',
    username: 'editor',
    role: 'editor',
    permissions: ['read', 'write']
  },
  'viewer-token-789': {
    id: 'viewer-001',
    username: 'viewer',
    role: 'viewer',
    permissions: ['read']
  }
};

/**
 * Middleware de autenticación básica
 * Verifica el token en el header Authorization
 */
const authenticateToken = (req, res, next) => {
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

    // Verificar token simulado
    const user = SIMULATED_TOKENS[token];
    
    if (!user) {
      return res.status(403).json({
        success: false,
        message: 'Token inválido o expirado',
        error: 'INVALID_TOKEN'
      });
    }

    // Agregar información del usuario a la request
    req.user = user;
    next();

  } catch (error) {
    console.error('Error en autenticación:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno de autenticación',
      error: error.message
    });
  }
};

/**
 * Middleware para verificar permisos específicos
 * @param {string|Array} requiredPermissions - Permisos requeridos
 */
const requirePermissions = (requiredPermissions) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Usuario no autenticado',
          error: 'NOT_AUTHENTICATED'
        });
      }

      const userPermissions = req.user.permissions || [];
      const permissions = Array.isArray(requiredPermissions) 
        ? requiredPermissions 
        : [requiredPermissions];

      const hasPermission = permissions.every(permission => 
        userPermissions.includes(permission)
      );

      if (!hasPermission) {
        return res.status(403).json({
          success: false,
          message: 'Permisos insuficientes',
          error: 'INSUFFICIENT_PERMISSIONS',
          required: permissions,
          userPermissions: userPermissions
        });
      }

      next();

    } catch (error) {
      console.error('Error en verificación de permisos:', error);
      return res.status(500).json({
        success: false,
        message: 'Error interno de autorización',
        error: error.message
      });
    }
  };
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
const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token && SIMULATED_TOKENS[token]) {
      req.user = SIMULATED_TOKENS[token];
    }

    next();

  } catch (error) {
    console.error('Error en autenticación opcional:', error);
    next(); // Continuar sin autenticación
  }
};

/**
 * Función para generar token simulado (para desarrollo)
 * @param {string} username - Nombre de usuario
 * @param {string} role - Rol del usuario
 * @returns {string} - Token simulado
 */
const generateSimulatedToken = (username, role = 'viewer') => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  return `${role}-token-${timestamp}-${random}`;
};

module.exports = {
  authenticateToken,
  requirePermissions,
  requireRole,
  optionalAuth,
  generateSimulatedToken,
  SIMULATED_TOKENS
};
