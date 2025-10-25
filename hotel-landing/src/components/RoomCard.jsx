import React from 'react';
import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
  return (
    <div className="card h-100 border-0 shadow-sm room-card">
      <div className="position-relative">
        <img 
          src={room.image} 
          className="card-img-top" 
          alt={room.name}
          style={{ height: '250px', objectFit: 'cover' }}
        />
        <div className="position-absolute top-0 end-0 m-3">
          <span className="badge bg-primary fs-6">
            ${room.price}/noche
          </span>
        </div>
        <div className="position-absolute bottom-0 start-0 m-3">
          <span className="badge bg-light text-dark">
            <i className="fas fa-users me-1"></i>
            {room.capacity}
          </span>
        </div>
      </div>
      
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-primary">{room.name}</h5>
        <p className="card-text text-muted flex-grow-1">{room.description}</p>
        
        <div className="room-features mb-3">
          <div className="row">
            <div className="col-6">
              <small className="text-muted">
                <i className="fas fa-expand-arrows-alt me-1"></i>
                {room.size}
              </small>
            </div>
            <div className="col-6">
              <small className="text-muted">
                <i className="fas fa-users me-1"></i>
                {room.capacity}
              </small>
            </div>
          </div>
        </div>
        
        <div className="features-list mb-3">
          {room.features.slice(0, 3).map((feature, index) => (
            <span key={index} className="badge bg-light text-dark me-1 mb-1">
              {feature}
            </span>
          ))}
          {room.features.length > 3 && (
            <span className="badge bg-secondary">
              +{room.features.length - 3} más
            </span>
          )}
        </div>
        
        <div className="d-grid gap-2">
          <Link 
            to={`/rooms/${room.id}`} 
            className="btn btn-outline-primary"
          >
            <i className="fas fa-eye me-2"></i>
            Ver Detalles
          </Link>
          <Link to="/#reservation" className="btn btn-primary">
            <i className="fas fa-calendar-plus me-2"></i>
            Reservar Ahora
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
