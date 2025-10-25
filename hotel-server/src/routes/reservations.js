const express = require('express');
const router = express.Router();
const {
  createReservation,
  getAllReservations,
  getReservationById
} = require('../controllers/reservationController');
const { validateReservation, validateId } = require('../middleware/validation');

// POST /api/reservations - Crear nueva reserva
router.post('/', validateReservation, createReservation);

// GET /api/reservations - Obtener todas las reservas (admin)
router.get('/', getAllReservations);

// GET /api/reservations/:id - Obtener reserva por ID
router.get('/:id', validateId, getReservationById);

module.exports = router;
