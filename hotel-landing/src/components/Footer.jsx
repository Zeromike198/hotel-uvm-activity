import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5 className="text-primary mb-3">Hotel Paradise Mérida</h5>
            <p className="text-light">
              Ubicado en el corazón de los Andes venezolanos, ofrecemos una experiencia única 
              en la hermosa ciudad de Mérida.
            </p>
            <div className="contact-info">
              <p><i className="fas fa-map-marker-alt me-2"></i>Av. Universidad, Mérida, Venezuela</p>
              <p><i className="fas fa-phone me-2"></i>+58 274 123-4567</p>
              <p><i className="fas fa-envelope me-2"></i>info@hotelparadisemerida.com</p>
            </div>
          </div>
          
          <div className="col-md-2 mb-4">
            <h6 className="text-primary mb-3">Enlaces Rápidos</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none">Inicio</Link></li>
              <li><Link to="/rooms" className="text-light text-decoration-none">Habitaciones</Link></li>
              <li><Link to="/about" className="text-light text-decoration-none">Acerca de</Link></li>
              <li><Link to="/blog" className="text-light text-decoration-none">Blog</Link></li>
            </ul>
          </div>
          
          <div className="col-md-3 mb-4">
            <h6 className="text-primary mb-3">Servicios</h6>
            <ul className="list-unstyled">
              <li className="text-light">Spa & Bienestar</li>
              <li className="text-light">Restaurante Gourmet</li>
              <li className="text-light">Tours por Mérida</li>
              <li className="text-light">Eventos Corporativos</li>
            </ul>
          </div>
          
          <div className="col-md-3 mb-4">
            <h6 className="text-primary mb-3">Síguenos</h6>
            <div className="social-links">
              <a href="#" className="text-light me-3"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-light me-3"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-light me-3"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-light"><i className="fab fa-youtube"></i></a>
            </div>
            <div className="mt-3">
              <small className="text-muted">
                © 2024 Hotel Paradise Mérida. Todos los derechos reservados.
              </small>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;