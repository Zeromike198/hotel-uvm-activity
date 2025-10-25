import React from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogPost = () => {
  const { slug } = useParams();
  
  // Datos de posts (en una app real vendrían de una API)
  const posts = {
    'secretos-paramo-andino': {
      id: 1,
      title: 'Descubre los Secretos del Páramo Andino',
      excerpt: 'Una guía completa para explorar el ecosistema único del páramo venezolano',
      content: `
        <h2>El Páramo Andino: Un Ecosistema Único</h2>
        <p>El páramo andino es uno de los ecosistemas más fascinantes y únicos de Venezuela. Ubicado en las alturas de los Andes venezolanos, este ecosistema de alta montaña alberga una biodiversidad extraordinaria y paisajes que parecen sacados de otro mundo.</p>
        
        <h3>¿Qué es el Páramo?</h3>
        <p>El páramo es un ecosistema de alta montaña que se encuentra entre los 3,000 y 4,500 metros sobre el nivel del mar. Se caracteriza por su vegetación única, adaptada a las condiciones extremas de temperatura y humedad de estas altitudes.</p>
        
        <h3>Flora y Fauna Únicas</h3>
        <p>En el páramo andino encontrarás especies endémicas como el frailejón, planta emblemática de estos ecosistemas, y una gran variedad de aves, mamíferos y anfibios que no existen en ningún otro lugar del mundo.</p>
        
        <h3>Mejores Lugares para Visitar</h3>
        <ul>
          <li><strong>Páramo de Mucubají:</strong> Uno de los más accesibles y hermosos</li>
          <li><strong>Páramo de La Culata:</strong> Ideal para senderismo y observación de aves</li>
          <li><strong>Páramo de Timotes:</strong> Conocido por sus frailejones gigantes</li>
        </ul>
        
        <h3>Consejos para tu Visita</h3>
        <p>Si planeas visitar el páramo, recuerda llevar ropa abrigada, protector solar y mucha agua. La altitud puede afectar a algunas personas, así que toma las precauciones necesarias.</p>
      `,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      author: 'María González',
      date: '2024-01-15',
      category: 'Turismo',
      tags: ['páramo', 'ecoturismo', 'naturaleza'],
      readTime: '5 min'
    },
    'gastronomia-andina-merida': {
      id: 2,
      title: 'Gastronomía Andina: Sabores Únicos de Mérida',
      excerpt: 'Explora la rica tradición culinaria de los Andes venezolanos',
      content: `
        <h2>La Cocina Andina: Un Legado Culinario</h2>
        <p>La gastronomía andina de Mérida es una fusión única de sabores que refleja la rica historia y cultura de la región. Cada plato cuenta una historia y cada ingrediente tiene su lugar en la tradición culinaria local.</p>
        
        <h3>Platos Típicos que Debes Probar</h3>
        <p><strong>Pizca Andina:</strong> Una sopa tradicional hecha con cilantro, cebolla y papas, perfecta para el clima frío de la montaña.</p>
        <p><strong>Arepa Andina:</strong> Una variación única de la arepa venezolana, rellena con queso de mano y acompañada de café de la región.</p>
        <p><strong>Trout de la Montaña:</strong> Trucha fresca de los ríos andinos, preparada con hierbas locales.</p>
        
        <h3>Ingredientes Únicos</h3>
        <p>La cocina andina utiliza ingredientes únicos como la papa andina, el maíz morado, y una gran variedad de hierbas aromáticas que crecen en las alturas de los Andes.</p>
        
        <h3>Restaurantes Recomendados</h3>
        <ul>
          <li><strong>El Fogón Andino:</strong> Especializado en platos tradicionales</li>
          <li><strong>La Casa del Páramo:</strong> Con vista panorámica y cocina de autor</li>
          <li><strong>Mercado Principal:</strong> Para probar la comida callejera local</li>
        </ul>
      `,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      author: 'Roberto Silva',
      date: '2024-01-10',
      category: 'Gastronomía',
      tags: ['gastronomía', 'cocina local', 'tradición'],
      readTime: '7 min'
    },
    'teleferico-merida-experiencia': {
      id: 3,
      title: 'El Teleférico de Mérida: Una Experiencia Inolvidable',
      excerpt: 'Todo lo que necesitas saber sobre el teleférico más alto del mundo',
      content: `
        <h2>El Teleférico de Mérida: Una Maravilla de la Ingeniería</h2>
        <p>El teleférico de Mérida es una experiencia única que te lleva a las alturas de los Andes venezolanos. Con sus 12.5 kilómetros de recorrido y una altura máxima de 4,765 metros, es considerado el teleférico más alto del mundo.</p>
        
        <h3>Historia del Teleférico</h3>
        <p>Inaugurado en 1960, el teleférico de Mérida fue construido por una empresa alemana y representa una de las obras de ingeniería más impresionantes de Venezuela. Durante décadas ha sido el orgullo de la ciudad y un atractivo turístico único.</p>
        
        <h3>El Recorrido</h3>
        <p>El teleférico cuenta con 4 estaciones principales:</p>
        <ul>
          <li><strong>Estación Barinitas (1,577 m):</strong> Punto de partida en la ciudad</li>
          <li><strong>Estación La Montaña (2,436 m):</strong> Primera parada con vista panorámica</li>
          <li><strong>Estación La Aguada (3,452 m):</strong> En el corazón del páramo</li>
          <li><strong>Estación Pico Espejo (4,765 m):</strong> La cima, con vista a la Sierra Nevada</li>
        </ul>
        
        <h3>Qué Esperar</h3>
        <p>Durante el ascenso podrás disfrutar de vistas espectaculares de la ciudad de Mérida, el páramo andino, y en días despejados, incluso podrás ver la Sierra Nevada de Mérida con sus picos nevados.</p>
        
        <h3>Consejos para la Visita</h3>
        <ul>
          <li>Lleva ropa abrigada, especialmente en las estaciones altas</li>
          <li>Protégete del sol con gafas y protector solar</li>
          <li>Hidrátate bien durante el recorrido</li>
          <li>Respeta las indicaciones del personal</li>
        </ul>
      `,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      author: 'Carlos Mendoza',
      date: '2024-01-05',
      category: 'Aventura',
      tags: ['teleférico', 'aventura', 'vistas'],
      readTime: '6 min'
    }
  };

  const post = posts[slug];

  if (!post) {
    return (
      <div className="blog-post" style={{ marginTop: '76px' }}>
        <div className="container py-5">
          <div className="text-center">
            <h1>Artículo no encontrado</h1>
            <p>El artículo que buscas no existe.</p>
            <Link to="/blog" className="btn btn-primary">
              Volver al Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post" style={{ marginTop: '76px' }}>
      {/* Hero Section */}
      <div className="hero-post bg-primary text-white py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="post-meta mb-3">
                <span className="badge bg-light text-dark me-2">{post.category}</span>
                <span className="me-3">
                  <i className="fas fa-user me-1"></i>
                  {post.author}
                </span>
                <span className="me-3">
                  <i className="fas fa-calendar me-1"></i>
                  {new Date(post.date).toLocaleDateString('es-ES')}
                </span>
                <span>
                  <i className="fas fa-clock me-1"></i>
                  {post.readTime}
                </span>
              </div>
              <h1 className="display-4 fw-bold mb-4">{post.title}</h1>
              <p className="lead">{post.excerpt}</p>
            </div>
            <div className="col-lg-4">
              <img 
                src={post.image} 
                alt={post.title}
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <div className="post-content">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
            
            {/* Tags */}
            <div className="post-tags mt-5">
              <h5>Etiquetas:</h5>
              <div className="tags-list">
                {post.tags.map((tag, index) => (
                  <span key={index} className="badge bg-light text-dark me-2 mb-2">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="col-lg-4">
            <div className="sidebar">
              {/* Author Info */}
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                    alt={post.author}
                    className="rounded-circle mb-3"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                  <h5 className="card-title">{post.author}</h5>
                  <p className="card-text text-muted">
                    Especialista en turismo andino con más de 10 años de experiencia 
                    explorando los secretos de Mérida.
                  </p>
                </div>
              </div>
              
              {/* Related Posts */}
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Artículos Relacionados</h5>
                </div>
                <div className="card-body">
                  <div className="list-group list-group-flush">
                    <Link to="/blog/secretos-paramo-andino" className="list-group-item list-group-item-action">
                      <h6>Secretos del Páramo Andino</h6>
                      <small className="text-muted">Turismo</small>
                    </Link>
                    <Link to="/blog/gastronomia-andina-merida" className="list-group-item list-group-item-action">
                      <h6>Gastronomía Andina</h6>
                      <small className="text-muted">Gastronomía</small>
                    </Link>
                    <Link to="/blog/teleferico-merida-experiencia" className="list-group-item list-group-item-action">
                      <h6>Teleférico de Mérida</h6>
                      <small className="text-muted">Aventura</small>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-light py-4">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <Link to="/blog" className="btn btn-outline-primary">
                <i className="fas fa-arrow-left me-2"></i>
                Volver al Blog
              </Link>
            </div>
            <div className="col-6 text-end">
              <button className="btn btn-primary">
                <i className="fas fa-share me-2"></i>
                Compartir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
