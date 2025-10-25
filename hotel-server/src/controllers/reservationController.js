const nodemailer = require('nodemailer');
const Reservation = require('../models/Reservation');

// Configuración del transporter de nodemailer
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == 465, // true para 465, false para otros puertos
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

// Validación del payload
const validateReservationData = (data) => {
  const errors = [];
  
  // Validaciones requeridas
  if (!data.name || data.name.trim() === '') {
    errors.push('El nombre es requerido');
  }
  
  if (!data.email || data.email.trim() === '') {
    errors.push('El email es requerido');
  } else {
    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push('El email no tiene un formato válido');
    }
  }
  
  if (!data.phone || data.phone.trim() === '') {
    errors.push('El teléfono es requerido');
  }
  
  if (!data.checkIn) {
    errors.push('La fecha de entrada es requerida');
  }
  
  if (!data.checkOut) {
    errors.push('La fecha de salida es requerida');
  }
  
  // Validación de fechas
  if (data.checkIn && data.checkOut) {
    const checkInDate = new Date(data.checkIn);
    const checkOutDate = new Date(data.checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (checkInDate < today) {
      errors.push('La fecha de entrada no puede ser anterior al día actual');
    }
    
    if (checkOutDate <= checkInDate) {
      errors.push('La fecha de salida debe ser posterior a la fecha de entrada');
    }
  }
  
  if (!data.guests || data.guests < 1) {
    errors.push('El número de huéspedes debe ser al menos 1');
  }
  
  if (!data.roomType || data.roomType.trim() === '') {
    errors.push('El tipo de habitación es requerido');
  }
  
  return errors;
};

// Función para enviar email de confirmación
const sendConfirmationEmail = async (reservation) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Hotel Paradise" <${process.env.SMTP_USER}>`,
      to: reservation.email,
      subject: 'Confirmación de Reserva - Hotel Paradise',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #007bff;">¡Reserva Confirmada!</h2>
          <p>Estimado/a <strong>${reservation.name}</strong>,</p>
          <p>Hemos recibido su solicitud de reserva. A continuación, los detalles:</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Detalles de la Reserva</h3>
            <p><strong>Número de Reserva:</strong> #${reservation.id}</p>
            <p><strong>Nombre:</strong> ${reservation.name}</p>
            <p><strong>Email:</strong> ${reservation.email}</p>
            <p><strong>Teléfono:</strong> ${reservation.phone}</p>
            <p><strong>Fecha de Entrada:</strong> ${new Date(reservation.checkIn).toLocaleDateString('es-ES')}</p>
            <p><strong>Fecha de Salida:</strong> ${new Date(reservation.checkOut).toLocaleDateString('es-ES')}</p>
            <p><strong>Número de Huéspedes:</strong> ${reservation.guests}</p>
            <p><strong>Tipo de Habitación:</strong> ${reservation.roomType}</p>
            ${reservation.comments ? `<p><strong>Comentarios:</strong> ${reservation.comments}</p>` : ''}
          </div>
          
          <p>Nos pondremos en contacto con usted en las próximas 24 horas para confirmar la disponibilidad y finalizar los detalles de su reserva.</p>
          
          <p>¡Esperamos darle la bienvenida a Hotel Paradise!</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            Hotel Paradise<br>
            Av. Principal 123, Ciudad<br>
            Tel: +1 (555) 123-4567<br>
            Email: info@hotelparadise.com
          </p>
        </div>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log('Email de confirmación enviado a:', reservation.email);
    return true;
  } catch (error) {
    console.error('Error al enviar email:', error);
    return false;
  }
};

// Controlador para crear reserva
const createReservation = async (req, res) => {
  try {
    const reservationData = req.body;
    
    // Validar datos
    const validationErrors = validateReservationData(reservationData);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Datos de reserva inválidos',
        errors: validationErrors
      });
    }
    
    // Crear y guardar reserva en MongoDB
    const reservation = new Reservation({
      ...reservationData,
      status: 'pending'
    });
    await reservation.save();
    
    // Enviar email de confirmación
    const emailSent = await sendConfirmationEmail({
      id: reservation._id.toString(),
      ...reservation.toObject()
    });
    
    // Respuesta exitosa
    res.status(201).json({
      success: true,
      message: 'Reserva creada exitosamente',
      data: {
        id: reservation._id.toString(),
        name: reservation.name,
        email: reservation.email,
        checkIn: reservation.checkIn,
        checkOut: reservation.checkOut,
        guests: reservation.guests,
        roomType: reservation.roomType,
        status: reservation.status,
        emailSent: emailSent
      }
    });
    
  } catch (error) {
    console.error('Error al crear reserva:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

// Controlador para obtener todas las reservas (para admin)
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    // mapear _id -> id para compatibilidad con frontend actual
    const data = reservations.map(r => ({
      id: r._id.toString(),
      name: r.name,
      email: r.email,
      checkIn: r.checkIn,
      checkOut: r.checkOut,
      guests: r.guests,
      roomType: r.roomType,
      status: r.status,
      createdAt: r.createdAt
    }));
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener reservas',
      error: error.message
    });
  }
};

// Controlador para obtener reserva por ID
const getReservationById = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reserva no encontrada' });
    }
    res.json({ success: true, data: reservation });
  } catch (error) {
    console.error('Error al obtener reserva:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener reserva',
      error: error.message
    });
  }
};

module.exports = {
  createReservation,
  getAllReservations,
  getReservationById
};
