import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'María González',
      location: 'Caracas, Venezuela',
      rating: 5,
      text: 'Una experiencia increíble en el corazón de los Andes. El hotel tiene vistas espectaculares y el servicio es excepcional. Definitivamente regresaré.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Carlos Rodríguez',
      location: 'Valencia, Venezuela',
      rating: 5,
      text: 'El spa andino es único en su tipo. Los tratamientos con ingredientes locales me dejaron completamente relajado. El personal es muy atento y profesional.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Ana Martínez',
      location: 'Maracaibo, Venezuela',
      rating: 5,
      text: 'La ubicación es perfecta para explorar Mérida. El teleférico está muy cerca y las excursiones organizadas por el hotel son fantásticas. Altamente recomendado.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Roberto Silva',
      location: 'Barcelona, Venezuela',
      rating: 5,
      text: 'La gastronomía es excepcional. Probé platos típicos de la región que nunca había saboreado. El chef realmente conoce los sabores andinos.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
    }
  ];

  return (
    <section className="testimonials-section py-5">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center mb-5">
            <h2 className="display-5 fw-bold text-primary">Lo que dicen nuestros huéspedes</h2>
            <p className="lead text-muted">
              Testimonios reales de viajeros que han experimentado la magia de Mérida
            </p>
          </div>
        </div>
        
        <div className="row g-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm testimonial-card">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="rounded-circle me-3"
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                    <div>
                      <h6 className="mb-0">{testimonial.name}</h6>
                      <small className="text-muted">{testimonial.location}</small>
                    </div>
                  </div>
                  
                  <div className="rating mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star text-warning"></i>
                    ))}
                  </div>
                  
                  <p className="card-text text-muted">
                    "{testimonial.text}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="row mt-5">
          <div className="col-12 text-center">
            <div className="bg-light p-4 rounded">
              <h4 className="text-primary mb-3">
                <i className="fas fa-award me-2"></i>
                Reconocimientos
              </h4>
              <div className="row">
                <div className="col-md-4">
                  <div className="text-center">
                    <i className="fas fa-trophy fa-2x text-warning mb-2"></i>
                    <h6>Mejor Hotel de Montaña</h6>
                    <small className="text-muted">Premio Turismo Venezuela 2023</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center">
                    <i className="fas fa-medal fa-2x text-warning mb-2"></i>
                    <h6>Excelencia en Servicio</h6>
                    <small className="text-muted">Certificación 5 Estrellas</small>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="text-center">
                    <i className="fas fa-certificate fa-2x text-warning mb-2"></i>
                    <h6>Sostenibilidad</h6>
                    <small className="text-muted">Hotel Verde Certificado</small>
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

export default Testimonials;
