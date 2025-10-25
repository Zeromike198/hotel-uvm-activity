import React from 'react';

const About = () => {
  return (
    <div className="about-page" style={{ marginTop: '76px' }}>
      {/* Hero Section */}
      <div className="hero-about bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="display-4 fw-bold mb-3">
                <i className="fas fa-mountain me-3"></i>
                Acerca de Hotel Paradise Mérida
              </h1>
              <p className="lead mb-4">
                Más que un hotel, somos tu puerta de entrada a la magia de los Andes venezolanos
              </p>
            </div>
            <div className="col-md-4">
              <div className="text-center">
                <i className="fas fa-heart fa-5x opacity-75"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Historia Section */}
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-6">
            <h2 className="display-6 fw-bold text-primary mb-4">Nuestra Historia</h2>
            <p className="lead">
              Fundado en 2009, Hotel Paradise Mérida nació del sueño de crear un refugio 
              de lujo en el corazón de los Andes venezolanos.
            </p>
            <p>
              Ubicado estratégicamente en la hermosa ciudad de Mérida, nuestro hotel ha 
              sido testigo de innumerables momentos especiales y ha acogido a viajeros de 
              todo el mundo que buscan experimentar la auténtica hospitalidad andina.
            </p>
            <p>
              Cada detalle de nuestro hotel está diseñado para honrar la rica cultura 
              venezolana mientras ofrecemos comodidades de clase mundial. Desde nuestras 
              habitaciones con vistas panorámicas hasta nuestro spa de montaña, cada 
              experiencia está cuidadosamente curada para brindarte recuerdos inolvidables.
            </p>
          </div>
          <div className="col-lg-6">
            <div className="about-image">
              <img 
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Hotel Paradise Mérida"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Valores Section */}
      <div className="bg-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="display-5 fw-bold text-primary">Nuestros Valores</h2>
              <p className="lead text-muted">
                Los principios que guían cada una de nuestras acciones
              </p>
            </div>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="text-center">
                <div className="value-icon mb-3">
                  <i className="fas fa-hands-helping fa-3x text-primary"></i>
                </div>
                <h4 className="text-primary">Hospitalidad Auténtica</h4>
                <p className="text-muted">
                  Tratamos a cada huésped como parte de nuestra familia, 
                  ofreciendo un servicio cálido y personalizado que refleja 
                  la hospitalidad venezolana.
                </p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="text-center">
                <div className="value-icon mb-3">
                  <i className="fas fa-leaf fa-3x text-primary"></i>
                </div>
                <h4 className="text-primary">Sostenibilidad</h4>
                <p className="text-muted">
                  Comprometidos con el cuidado del medio ambiente andino, 
                  implementamos prácticas sostenibles que respetan y protegen 
                  nuestro hermoso entorno natural.
                </p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="text-center">
                <div className="value-icon mb-3">
                  <i className="fas fa-star fa-3x text-primary"></i>
                </div>
                <h4 className="text-primary">Excelencia</h4>
                <p className="text-muted">
                  Buscamos la perfección en cada detalle, desde la limpieza 
                  de nuestras habitaciones hasta la presentación de nuestros 
                  platos gourmet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Equipo Section */}
      <div className="container py-5">
        <div className="row">
          <div className="col-12 text-center mb-5">
            <h2 className="display-5 fw-bold text-primary">Nuestro Equipo</h2>
            <p className="lead text-muted">
              Profesionales apasionados por brindarte la mejor experiencia
            </p>
          </div>
        </div>
        
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm text-center">
              <div className="card-body">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                  alt="Carlos Mendoza"
                  className="rounded-circle mb-3"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
                <h5 className="card-title">Carlos Mendoza</h5>
                <p className="text-primary">Director General</p>
                <p className="card-text text-muted">
                  Con más de 15 años de experiencia en la industria hotelera, 
                  Carlos lidera nuestro equipo con pasión y dedicación.
                </p>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card border-0 shadow-sm text-center">
              <div className="card-body">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                  alt="María González"
                  className="rounded-circle mb-3"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
                <h5 className="card-title">María González</h5>
                <p className="text-primary">Gerente de Operaciones</p>
                <p className="card-text text-muted">
                  Especialista en atención al cliente, María asegura que cada 
                  huésped tenga una experiencia memorable en nuestro hotel.
                </p>
              </div>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card border-0 shadow-sm text-center">
              <div className="card-body">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                  alt="Roberto Silva"
                  className="rounded-circle mb-3"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
                <h5 className="card-title">Roberto Silva</h5>
                <p className="text-primary">Chef Ejecutivo</p>
                <p className="card-text text-muted">
                  Chef reconocido por su innovación en la cocina andina, 
                  Roberto crea experiencias gastronómicas únicas para nuestros huéspedes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ubicación Section */}
      <div className="bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h2 className="display-6 fw-bold mb-3">
                <i className="fas fa-map-marker-alt me-3"></i>
                Ubicación Privilegiada
              </h2>
              <p className="lead mb-4">
                En el corazón de Mérida, Venezuela, rodeados por los majestuosos Andes
              </p>
              <div className="row">
                <div className="col-md-6">
                  <h5>Dirección</h5>
                  <p>Av. Universidad, Mérida, Estado Mérida, Venezuela</p>
                </div>
                <div className="col-md-6">
                  <h5>Contacto</h5>
                  <p>+58 274 123-4567<br/>info@hotelparadisemerida.com</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center">
                <i className="fas fa-mountain fa-5x opacity-75"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
