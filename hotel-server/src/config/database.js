const mongoose = require('mongoose');

/**
 * Configuración de conexión a MongoDB
 */
const connectDatabase = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    
    const options = {
      maxPoolSize: 10, // Mantener hasta 10 conexiones
      serverSelectionTimeoutMS: 5000, // Mantener intentando por 5 segundos
      socketTimeoutMS: 45000, // Cerrar sockets después de 45 segundos de inactividad
      bufferCommands: false // Deshabilitar mongoose buffering
    };

    await mongoose.connect(MONGODB_URI, options);
    
    console.log('✅ MongoDB conectado exitosamente');
    console.log(`📊 Base de datos: ${mongoose.connection.name}`);
    console.log(`🔗 URI: ${MONGODB_URI}`);

    // Eventos de conexión
    mongoose.connection.on('error', (err) => {
      console.error('❌ Error de MongoDB:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  MongoDB desconectado');
    });

    // Manejo de cierre graceful
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('🔌 Conexión a MongoDB cerrada por terminación de aplicación');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error);
    process.exit(1);
  }
};

module.exports = { connectDatabase };
