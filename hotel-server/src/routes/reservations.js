const express = require('express');
const router = express.Router();
const {
  createReservation,
  getAllReservations,
  getReservationById
} = require('../controllers/reservationController');

// POST /api/reservations - Crear nueva reserva
router.post('/', createReservation);

// GET /api/reservations - Obtener todas las reservas (admin)
router.get('/', getAllReservations);

// GET /api/reservations/:id - Obtener reserva por ID
router.get('/:id', getReservationById);

module.exports = router;
