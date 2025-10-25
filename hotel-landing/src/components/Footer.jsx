import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5 className="text-primary mb-3">Hotel Paradise</h5>
            <p className="text-muted">
              Tu destino de lujo para una experiencia inolvidable. 
              Ofrecemos el mejor servicio y comodidad en cada detalle.
            </p>
            <div className="social-links">
              <a href="#" className="text-light me-3">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-light me-3">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-light me-3">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-light">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          <div className="col-md-2 mb-4">
            <h6 className="text-primary mb-3">Enlaces Rápidos</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-muted text-decoration-none">Inicio</Link>
              </li>
              <li className="mb-2">
                <Link to="/rooms" className="text-muted text-decoration-none">Habitaciones</Link>
              </li>
              <li className="mb-2">
                <Link to="/blog" className="text-muted text-decoration-none">Blog</Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-muted text-decoration-none">Acerca de</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-md-3 mb-4">
            <h6 className="text-primary mb-3">Servicios</h6>
            <ul className="list-unstyled">
              <li className="mb-2 text-muted">Restaurante</li>
              <li className="mb-2 text-muted">Spa & Bienestar</li>
              <li className="mb-2 text-muted">Piscina</li>
              <li className="mb-2 text-muted">Gimnasio</li>
              <li className="mb-2 text-muted">WiFi Gratuito</li>
            </ul>
          </div>
          
          <div className="col-md-3 mb-4">
            <h6 className="text-primary mb-3">Contacto</h6>
            <div className="contact-info">
              <p className="text-muted mb-2">
                <i className="fas fa-map-marker-alt me-2"></i>
                Av. Principal 123, Ciudad
              </p>
              <p className="text-muted mb-2">
                <i className="fas fa-phone me-2"></i>
                +1 (555) 123-4567
              </p>
              <p className="text-muted mb-2">
                <i className="fas fa-envelope me-2"></i>
                info@hotelparadise.com
              </p>
            </div>
          </div>
        </div>
        
        <hr className="my-4" />
        
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="text-muted mb-0">
              &copy; 2024 Hotel Paradise. Todos los derechos reservados.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <Link to="/admin" className="text-muted text-decoration-none me-3">
              Panel Admin
            </Link>
            <a href="#" className="text-muted text-decoration-none">
              Política de Privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
