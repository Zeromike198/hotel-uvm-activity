const User = require('../models/User');

/**
 * Seeder para crear usuario administrador por defecto
 */
const seedAdmin = async () => {
  try {
    // Verificar si ya existe un admin
    const existingAdmin = await User.findOne({ role: 'admin' });
    
    if (existingAdmin) {
      console.log('✅ Usuario administrador ya existe');
      return;
    }

    // Crear usuario administrador
    const adminUser = new User({
      username: 'admin',
      email: 'admin@hotel.com',
      password: 'admin123', // Será encriptada automáticamente por el middleware
      role: 'admin',
      isActive: true
    });

    await adminUser.save();
    
    console.log('✅ Usuario administrador creado exitosamente');
    console.log('📧 Email: admin@hotel.com');
    console.log('👤 Usuario: admin');
    console.log('🔑 Contraseña: admin123');
    console.log('⚠️  IMPORTANTE: Cambia la contraseña después del primer login');
    
  } catch (error) {
    console.error('❌ Error al crear usuario administrador:', error);
    throw error;
  }
};

/**
 * Seeder para limpiar y recrear el admin (útil para desarrollo)
 */
const resetAdmin = async () => {
  try {
    // Eliminar admin existente
    await User.deleteMany({ role: 'admin' });
    console.log('🗑️  Usuario administrador eliminado');
    
    // Crear nuevo admin
    await seedAdmin();
    
  } catch (error) {
    console.error('❌ Error al resetear usuario administrador:', error);
    throw error;
  }
};

module.exports = {
  seedAdmin,
  resetAdmin
};
