import React from 'react';
import RoomCard from '../components/RoomCard';

const Rooms = () => {
  const rooms = [
    {
      id: 1,
      name: 'Habitación Andina Estándar',
      price: 120,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Habitación cómoda con vista a los Andes venezolanos',
      features: ['Vista a la montaña', 'WiFi gratuito', 'TV Smart', 'Minibar', 'Aire acondicionado'],
      size: '25 m²',
      capacity: '2 personas'
    },
    {
      id: 2,
      name: 'Habitación Superior Páramo',
      price: 180,
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Habitación amplia con balcón privado y vista panorámica',
      features: ['Balcón privado', 'Vista panorámica', 'Jacuzzi', 'Desayuno incluido', 'Servicio a la habitación'],
      size: '35 m²',
      capacity: '3 personas'
    },
    {
      id: 3,
      name: 'Suite Ejecutiva Teleférico',
      price: 280,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Suite de lujo con vista directa al teleférico de Mérida',
      features: ['Vista al teleférico', 'Sala de estar', 'Bar privado', 'Butler service', 'Acceso al spa'],
      size: '50 m²',
      capacity: '4 personas'
    },
    {
      id: 4,
      name: 'Suite Presidencial Andes',
      price: 450,
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'La suite más exclusiva con vista 360° a los Andes',
      features: ['Vista 360°', 'Terraza privada', 'Spa privado', 'Chef personal', 'Chauffeur'],
      size: '80 m²',
      capacity: '6 personas'
    }
  ];

  return (
    <div className="rooms-page" style={{ marginTop: '76px' }}>
      {/* Hero Section */}
      <div className="hero-rooms bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="display-4 fw-bold mb-3">
                <i className="fas fa-mountain me-3"></i>
                Nuestras Habitaciones
              </h1>
              <p className="lead mb-4">
                Cada habitación está diseñada para ofrecerte la mejor experiencia 
                en los Andes venezolanos, con vistas espectaculares y comodidades únicas.
              </p>
              <div className="row">
                <div className="col-md-4">
                  <div className="text-center">
                    <h4>4.9</h4>
                    <small>Calificación promedio</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center">
                    <h4>24/7</h4>
                    <small>Servicio al cliente</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center">
                    <h4>100%</h4>
                    <small>Vista a la montaña</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center">
                <i className="fas fa-bed fa-5x opacity-75"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="container py-5">
        <div className="row g-4">
          {rooms.map((room) => (
            <div key={room.id} className="col-md-6 col-lg-3">
              <RoomCard room={room} />
            </div>
          ))}
        </div>
      </div>

      {/* Amenities Section */}
      <div className="bg-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="display-5 fw-bold text-primary">Amenidades Incluidas</h2>
              <p className="lead text-muted">
                Todos nuestros huéspedes disfrutan de estos servicios
              </p>
            </div>
          </div>
          
          <div className="row g-4">
            <div className="col-md-3 col-sm-6">
              <div className="text-center">
                <i className="fas fa-wifi fa-3x text-primary mb-3"></i>
                <h5>WiFi Gratuito</h5>
                <p className="text-muted">Internet de alta velocidad en todas las áreas</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="text-center">
                <i className="fas fa-car fa-3x text-primary mb-3"></i>
                <h5>Estacionamiento</h5>
                <p className="text-muted">Parqueadero gratuito y seguro</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="text-center">
                <i className="fas fa-dumbbell fa-3x text-primary mb-3"></i>
                <h5>Gimnasio</h5>
                <p className="text-muted">Equipos modernos con vista a la montaña</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="text-center">
                <i className="fas fa-swimming-pool fa-3x text-primary mb-3"></i>
                <h5>Piscina</h5>
                <p className="text-muted">Piscina climatizada con vista panorámica</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
