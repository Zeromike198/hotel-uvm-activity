import React from 'react';

const Services = () => {
  const services = [
    {
      icon: 'fas fa-bed',
      title: 'Habitaciones de Lujo',
      description: 'Habitaciones elegantes con vistas panorámicas a los Andes venezolanos',
      features: ['Vista a la montaña', 'WiFi gratuito', 'Minibar', 'TV Smart']
    },
    {
      icon: 'fas fa-spa',
      title: 'Spa & Bienestar',
      description: 'Relájate en nuestro spa de clase mundial con tratamientos únicos',
      features: ['Masajes terapéuticos', 'Sauna andino', 'Piscina climatizada', 'Yoga matutino']
    },
    {
      icon: 'fas fa-utensils',
      title: 'Gastronomía Gourmet',
      description: 'Sabores únicos de la región andina en nuestro restaurante',
      features: ['Cocina local', 'Vinos regionales', 'Desayuno buffet', 'Room service 24h']
    },
    {
      icon: 'fas fa-mountain',
      title: 'Tours & Actividades',
      description: 'Descubre los encantos de Mérida con nuestras excursiones guiadas',
      features: ['Teleférico de Mérida', 'Páramo andino', 'Cascadas', 'Ciudad colonial']
    }
  ];

  return (
    <section className="services-section py-5 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mb-5">
            <h2 className="display-5 fw-bold text-primary">Nuestros Servicios</h2>
            <p className="lead text-muted">
              Experimenta el lujo y la comodidad en el corazón de los Andes venezolanos
            </p>
          </div>
        </div>
        
        <div className="row g-4">
          {services.map((service, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm service-card">
                <div className="card-body text-center p-4">
                  <div className="service-icon mb-3">
                    <i className={`${service.icon} fa-3x text-primary`}></i>
                  </div>
                  <h5 className="card-title text-primary">{service.title}</h5>
                  <p className="card-text text-muted">{service.description}</p>
                  
                  <div className="service-features mt-3">
                    {service.features.map((feature, featureIndex) => (
                      <span key={featureIndex} className="badge bg-light text-dark me-1 mb-1">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="row mt-5">
          <div className="col-12 text-center">
            <div className="card bg-primary text-white">
              <div className="card-body">
                <h4 className="card-title">
                  <i className="fas fa-star me-2"></i>
                  Experiencia Premium
                </h4>
                <p className="card-text">
                  Cada detalle está diseñado para brindarte una experiencia inolvidable 
                  en la hermosa ciudad de Mérida, Venezuela.
                </p>
                <div className="row text-center">
                  <div className="col-md-3">
                    <h5>4.9</h5>
                    <small>Calificación promedio</small>
                  </div>
                  <div className="col-md-3">
                    <h5>500+</h5>
                    <small>Huéspedes satisfechos</small>
                  </div>
                  <div className="col-md-3">
                    <h5>15</h5>
                    <small>Años de experiencia</small>
                  </div>
                  <div className="col-md-3">
                    <h5>24/7</h5>
                    <small>Servicio al cliente</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
