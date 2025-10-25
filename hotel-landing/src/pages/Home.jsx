import React from 'react';
import Hero from '../components/Hero';
import ReservationForm from '../components/ReservationForm';
import WeatherWidget from '../components/WeatherWidget';
import Testimonials from '../components/Testimonials';
import Services from '../components/Services';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      
      {/* Sección de Servicios */}
      <Services />
      
      {/* Widget del Clima */}
      <div className="container my-5">
        <div className="row">
          <div className="col-md-6">
            <WeatherWidget />
          </div>
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title text-primary">
                  <i className="fas fa-map-marker-alt me-2"></i>
                  Ubicación Privilegiada
                </h5>
                <p className="card-text">
                  Nuestro hotel está ubicado en el corazón de Mérida, Venezuela, 
                  rodeado por los majestuosos Andes venezolanos. Desde aquí podrás 
                  disfrutar de:
                </p>
                <ul className="list-unstyled">
                  <li><i className="fas fa-mountain text-primary me-2"></i>Vistas panorámicas de los Andes</li>
                  <li><i className="fas fa-city text-primary me-2"></i>Acceso directo al centro histórico</li>
                  <li><i className="fas fa-skiing text-primary me-2"></i>Proximidad a pistas de esquí</li>
                  <li><i className="fas fa-hiking text-primary me-2"></i>Senderos de montaña</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonios */}
      <Testimonials />
      
      {/* Formulario de Reserva */}
      <ReservationForm />
    </div>
  );
};

export default Home;
