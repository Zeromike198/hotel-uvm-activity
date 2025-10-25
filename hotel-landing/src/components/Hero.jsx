import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="hero-section position-relative">
      <div 
        className="hero-image"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '70vh',
          width: '100%'
        }}
      >
        <div className="hero-overlay position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"></div>
        <div className="hero-content position-absolute top-50 start-50 translate-middle text-center text-white">
          <h1 className="display-4 fw-bold mb-4">Bienvenido a Hotel Paradise</h1>
          <p className="lead mb-4">
            Experimenta el lujo y la comodidad en nuestro hotel de clase mundial
          </p>
          <div className="hero-buttons">
            <Link to="/rooms" className="btn btn-primary btn-lg me-3">
              Ver Habitaciones
            </Link>
            <Link to="/about" className="btn btn-outline-light btn-lg">
              Conocer Más
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
