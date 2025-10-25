import React, { useState } from 'react';
import axios from 'axios';

const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    roomType: '',
    comments: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Validación de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validación de fechas
  const validateDates = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return false;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return checkInDate >= today && checkOutDate > checkInDate;
  };

  const validateForm = () => {
    const newErrors = {};

    // Validación de campos requeridos
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    }

    if (!formData.checkIn) {
      newErrors.checkIn = 'La fecha de entrada es requerida';
    }

    if (!formData.checkOut) {
      newErrors.checkOut = 'La fecha de salida es requerida';
    }

    // Validación de fechas coherentes
    if (formData.checkIn && formData.checkOut && !validateDates(formData.checkIn, formData.checkOut)) {
      newErrors.checkOut = 'La fecha de salida debe ser posterior a la fecha de entrada';
    }

    if (!formData.guests || formData.guests < 1) {
      newErrors.guests = 'El número de huéspedes debe ser al menos 1';
    }

    if (!formData.roomType) {
      newErrors.roomType = 'El tipo de habitación es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await axios.post('/api/reservations', formData);
      setSubmitMessage('¡Reserva enviada exitosamente! Te contactaremos pronto.');
      
      // Limpiar formulario
      setFormData({
        name: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        guests: '',
        roomType: '',
        comments: ''
      });
    } catch (error) {
      console.error('Error al enviar la reserva:', error);
      setSubmitMessage('Error al enviar la reserva. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="card-title mb-0">Formulario de Reserva</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label">Nombre Completo *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ingresa tu nombre completo"
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">Email *</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="phone" className="form-label">Teléfono *</label>
                    <input
                      type="tel"
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="guests" className="form-label">Número de Huéspedes *</label>
                    <select
                      className={`form-select ${errors.guests ? 'is-invalid' : ''}`}
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                    >
                      <option value="">Selecciona...</option>
                      <option value="1">1 Huésped</option>
                      <option value="2">2 Huéspedes</option>
                      <option value="3">3 Huéspedes</option>
                      <option value="4">4 Huéspedes</option>
                      <option value="5">5+ Huéspedes</option>
                    </select>
                    {errors.guests && <div className="invalid-feedback">{errors.guests}</div>}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="checkIn" className="form-label">Fecha de Entrada *</label>
                    <input
                      type="date"
                      className={`form-control ${errors.checkIn ? 'is-invalid' : ''}`}
                      id="checkIn"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                    />
                    {errors.checkIn && <div className="invalid-feedback">{errors.checkIn}</div>}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="checkOut" className="form-label">Fecha de Salida *</label>
                    <input
                      type="date"
                      className={`form-control ${errors.checkOut ? 'is-invalid' : ''}`}
                      id="checkOut"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleChange}
                      min={formData.checkIn || new Date().toISOString().split('T')[0]}
                    />
                    {errors.checkOut && <div className="invalid-feedback">{errors.checkOut}</div>}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="roomType" className="form-label">Tipo de Habitación *</label>
                  <select
                    className={`form-select ${errors.roomType ? 'is-invalid' : ''}`}
                    id="roomType"
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
                  >
                    <option value="">Selecciona un tipo...</option>
                    <option value="standard">Habitación Estándar</option>
                    <option value="superior">Habitación Superior</option>
                    <option value="executive">Suite Ejecutiva</option>
                    <option value="presidential">Suite Presidencial</option>
                  </select>
                  {errors.roomType && <div className="invalid-feedback">{errors.roomType}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="comments" className="form-label">Comentarios Adicionales</label>
                  <textarea
                    className="form-control"
                    id="comments"
                    name="comments"
                    rows="4"
                    value={formData.comments}
                    onChange={handleChange}
                    placeholder="Menciona cualquier solicitud especial o información adicional..."
                  />
                </div>

                {submitMessage && (
                  <div className={`alert ${submitMessage.includes('Error') ? 'alert-danger' : 'alert-success'} mb-3`}>
                    {submitMessage}
                  </div>
                )}

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Enviando...
                      </>
                    ) : (
                      'Enviar Reserva'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;
