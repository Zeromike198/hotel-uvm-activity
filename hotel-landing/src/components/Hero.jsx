import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="hero-section position-relative" style={{ marginTop: '76px' }}>
      <div 
        className="hero-image"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '80vh',
          width: '100%'
        }}
      >
        <div className="hero-overlay position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-60"></div>
        <div className="hero-content position-absolute top-50 start-50 translate-middle text-center text-white">
          <div className="hero-badge mb-3">
            <span className="badge bg-primary fs-6 px-3 py-2">
              <i className="fas fa-mountain me-2"></i>
              Ubicado en los Andes Venezolanos
            </span>
          </div>
          <h1 className="display-3 fw-bold mb-4">
            Hotel Paradise Mérida
          </h1>
          <p className="lead mb-4 fs-4">
            Descubre la magia de los Andes venezolanos desde nuestro hotel de lujo
          </p>
          <p className="mb-4">
            Experimenta la hospitalidad andina con vistas espectaculares, spa de montaña 
            y gastronomía regional en el corazón de Mérida, Venezuela.
          </p>
          <div className="hero-buttons">
            <Link to="/rooms" className="btn btn-primary btn-lg me-3 mb-2">
              <i className="fas fa-bed me-2"></i>
              Ver Habitaciones
            </Link>
            <Link to="/about" className="btn btn-outline-light btn-lg mb-2">
              <i className="fas fa-info-circle me-2"></i>
              Conocer Más
            </Link>
          </div>
          
          <div className="hero-features mt-5">
            <div className="row text-center">
              <div className="col-md-3">
                <i className="fas fa-mountain fa-2x mb-2"></i>
                <h6>Vistas Andinas</h6>
              </div>
              <div className="col-md-3">
                <i className="fas fa-spa fa-2x mb-2"></i>
                <h6>Spa de Montaña</h6>
              </div>
              <div className="col-md-3">
                <i className="fas fa-utensils fa-2x mb-2"></i>
                <h6>Gastronomía Local</h6>
              </div>
              <div className="col-md-3">
                <i className="fas fa-hiking fa-2x mb-2"></i>
                <h6>Ecoturismo</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
