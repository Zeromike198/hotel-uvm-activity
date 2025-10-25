import React from 'react';
import { useParams, Link } from 'react-router-dom';

const RoomDetail = () => {
  const { id } = useParams();
  
  // Datos de habitaciones (en una app real vendrían de una API)
  const rooms = {
    "1": {
      id: 1,
      name: 'Habitación Andina Estándar',
      price: 120,
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Habitación cómoda con vista a los Andes venezolanos',
      features: ['Vista a la montaña', 'WiFi gratuito', 'TV Smart', 'Minibar', 'Aire acondicionado'],
      size: '25 m²',
      capacity: '2 personas',
      amenities: [
        'Cama King Size',
        'Baño privado con ducha',
        'Balcón con vista a la montaña',
        'Closet amplio',
        'Escritorio de trabajo',
        'Teléfono directo'
      ],
      images: [
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    "2": {
      id: 2,
      name: 'Habitación Superior Páramo',
      price: 180,
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Habitación amplia con balcón privado y vista panorámica',
      features: ['Balcón privado', 'Vista panorámica', 'Jacuzzi', 'Desayuno incluido', 'Servicio a la habitación'],
      size: '35 m²',
      capacity: '3 personas',
      amenities: [
        'Cama King Size con vista panorámica',
        'Baño con jacuzzi',
        'Balcón privado',
        'Sala de estar',
        'Minibar premium',
        'Servicio de habitación 24h'
      ],
      images: [
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    "3": {
      id: 3,
      name: 'Suite Ejecutiva Teleférico',
      price: 280,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Suite de lujo con vista directa al teleférico de Mérida',
      features: ['Vista al teleférico', 'Sala de estar', 'Bar privado', 'Butler service', 'Acceso al spa'],
      size: '50 m²',
      capacity: '4 personas',
      amenities: [
        'Cama King Size con vista al teleférico',
        'Sala de estar separada',
        'Bar privado',
        'Butler service 24h',
        'Acceso exclusivo al spa',
        'Terraza privada'
      ],
      images: [
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    },
    "4": {
      id: 4,
      name: 'Suite Presidencial Andes',
      price: 450,
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'La suite más exclusiva con vista 360° a los Andes',
      features: ['Vista 360°', 'Terraza privada', 'Spa privado', 'Chef personal', 'Chauffeur'],
      size: '80 m²',
      capacity: '6 personas',
      amenities: [
        'Cama King Size con vista 360°',
        'Terraza privada panorámica',
        'Spa privado en suite',
        'Chef personal disponible',
        'Chauffeur incluido',
        'Butler dedicado 24h'
      ],
      images: [
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ]
    }
  };

  const room = rooms[id];

  if (!room) {
    return (
      <div className="room-detail" style={{ marginTop: '76px' }}>
        <div className="container py-5">
          <div className="text-center">
            <h1>Habitación no encontrada</h1>
            <p>La habitación que buscas no existe.</p>
            <Link to="/rooms" className="btn btn-primary">
              Volver a Habitaciones
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="room-detail" style={{ marginTop: '76px' }}>
      {/* Hero Section */}
      <div className="hero-room bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="display-4 fw-bold mb-3">{room.name}</h1>
              <p className="lead mb-4">{room.description}</p>
              <div className="row">
                <div className="col-md-4">
                  <div className="text-center">
                    <h4>${room.price}</h4>
                    <small>por noche</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center">
                    <h4>{room.size}</h4>
                    <small>tamaño</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center">
                    <h4>{room.capacity}</h4>
                    <small>capacidad</small>
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

      {/* Galería de Imágenes */}
      <div className="container py-5">
        <div className="row">
          <div className="col-12 mb-4">
            <h2 className="text-center mb-4">Galería de Imágenes</h2>
          </div>
        </div>
        <div className="row g-3">
          {room.images.map((image, index) => (
            <div key={index} className="col-md-4">
              <img 
                src={image} 
                alt={`${room.name} - Imagen ${index + 1}`}
                className="img-fluid rounded shadow"
                style={{ height: '250px', width: '100%', objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Características y Amenidades */}
      <div className="bg-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h3 className="text-primary mb-4">Características Principales</h3>
              <div className="row">
                {room.features.map((feature, index) => (
                  <div key={index} className="col-md-6 mb-3">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-check-circle text-primary me-3"></i>
                      <span>{feature}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="col-lg-6">
              <h3 className="text-primary mb-4">Amenidades Incluidas</h3>
              <div className="row">
                {room.amenities.map((amenity, index) => (
                  <div key={index} className="col-md-6 mb-3">
                    <div className="d-flex align-items-center">
                      <i className="fas fa-star text-warning me-3"></i>
                      <span>{amenity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Información Adicional */}
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <h3 className="text-primary mb-4">Información Adicional</h3>
            <div className="row">
              <div className="col-md-6">
                <h5>Políticas de Cancelación</h5>
                <ul className="list-unstyled">
                  <li><i className="fas fa-clock me-2 text-primary"></i>Cancelación gratuita hasta 24h antes</li>
                  <li><i className="fas fa-credit-card me-2 text-primary"></i>Pago al llegar</li>
                  <li><i className="fas fa-shield-alt me-2 text-primary"></i>Seguro de viaje incluido</li>
                </ul>
              </div>
              <div className="col-md-6">
                <h5>Servicios Incluidos</h5>
                <ul className="list-unstyled">
                  <li><i className="fas fa-wifi me-2 text-primary"></i>WiFi de alta velocidad</li>
                  <li><i className="fas fa-car me-2 text-primary"></i>Estacionamiento gratuito</li>
                  <li><i className="fas fa-concierge-bell me-2 text-primary"></i>Servicio de conserjería 24h</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="col-lg-4">
            <div className="card shadow">
              <div className="card-body text-center">
                <h4 className="card-title text-primary">Reservar Ahora</h4>
                <div className="price-display mb-4">
                  <span className="h2 text-primary">${room.price}</span>
                  <small className="text-muted d-block">por noche</small>
                </div>
                <p className="card-text text-muted mb-4">
                  Disfruta de una experiencia única en los Andes venezolanos
                </p>
                <div className="d-grid gap-2">
                  <Link to="/#reservation" className="btn btn-primary btn-lg">
                    <i className="fas fa-calendar-plus me-2"></i>
                    Reservar Habitación
                  </Link>
                  <Link to="/rooms" className="btn btn-outline-primary">
                    <i className="fas fa-arrow-left me-2"></i>
                    Ver Otras Habitaciones
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
