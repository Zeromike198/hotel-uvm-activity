import React from 'react';
import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => {
  const { id, title, price, image, description } = room;

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-img-top-container" style={{ height: '250px', overflow: 'hidden' }}>
          <img 
            src={image || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'} 
            className="card-img-top w-100 h-100" 
            alt={title}
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title}</h5>
          <p className="card-text text-muted flex-grow-1">{description}</p>
          <div className="d-flex justify-content-between align-items-center mt-auto">
            <div className="price-section">
              <span className="h4 text-primary mb-0">${price}</span>
              <small className="text-muted d-block">por noche</small>
            </div>
            <Link 
              to={`/rooms/${id}`} 
              className="btn btn-outline-primary"
            >
              Ver Detalles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
