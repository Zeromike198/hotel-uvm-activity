import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postService } from '../services/postService';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postService.getAllPosts({ 
          status: 'published',
          limit: 12,
          sort: '-publishedAt'
        });
        setPosts(response.data || []);
      } catch (error) {
        console.error('Error al cargar posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="blog-page" style={{ marginTop: '76px' }}>
        <div className="container py-5">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3">Cargando artículos del blog...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page" style={{ marginTop: '76px' }}>
      {/* Hero Section */}
      <div className="hero-blog bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="display-4 fw-bold mb-3">
                <i className="fas fa-blog me-3"></i>
                Blog de Hotel Paradise Mérida
              </h1>
              <p className="lead mb-4">
                Descubre los secretos de Mérida, consejos de viaje y experiencias únicas 
                en los Andes venezolanos
              </p>
            </div>
            <div className="col-md-4">
              <div className="text-center">
                <i className="fas fa-mountain fa-5x opacity-75"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="container py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h2 className="display-6 fw-bold text-primary text-center">
              Artículos Destacados
            </h2>
            <p className="lead text-muted text-center">
              Explora Mérida a través de nuestros artículos especializados
            </p>
          </div>
        </div>

        <div className="row g-4">
          {posts.map((post) => (
            <div key={post.id} className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm blog-card">
                <div className="position-relative">
                  <img 
                    src={post.images?.[0]?.url || 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                    className="card-img-top" 
                    alt={post.images?.[0]?.alt || post.title}
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  <div className="position-absolute top-0 start-0 m-3">
                    {post.featured && (
                      <span className="badge bg-warning me-2">
                        <i className="fas fa-star me-1"></i>Destacado
                      </span>
                    )}
                    {post.tags?.[0] && (
                      <span className="badge bg-primary">
                        {post.tags[0]}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-primary">{post.title}</h5>
                  <p className="card-text text-muted flex-grow-1">{post.excerpt}</p>
                  
                  <div className="post-meta mb-3">
                    <div className="row">
                      <div className="col-6">
                        <small className="text-muted">
                          <i className="fas fa-user me-1"></i>
                          {post.author}
                        </small>
                      </div>
                      <div className="col-6">
                        <small className="text-muted">
                          <i className="fas fa-calendar me-1"></i>
                          {new Date(post.publishedAt).toLocaleDateString('es-ES')}
                        </small>
                      </div>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/blog/${post.slug}`} 
                    className="btn btn-outline-primary"
                  >
                    <i className="fas fa-arrow-right me-2"></i>
                    Leer Más
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="display-5 fw-bold text-primary">Categorías</h2>
              <p className="lead text-muted">
                Explora nuestros contenidos por categoría
              </p>
            </div>
          </div>
          
          <div className="row g-4">
            <div className="col-md-3 col-sm-6">
              <div className="text-center">
                <div className="category-icon mb-3">
                  <i className="fas fa-mountain fa-3x text-primary"></i>
                </div>
                <h5>Turismo</h5>
                <p className="text-muted">
                  Descubre los mejores lugares para visitar en Mérida
                </p>
              </div>
            </div>
            
            <div className="col-md-3 col-sm-6">
              <div className="text-center">
                <div className="category-icon mb-3">
                  <i className="fas fa-utensils fa-3x text-primary"></i>
                </div>
                <h5>Gastronomía</h5>
                <p className="text-muted">
                  Sabores únicos de la cocina andina venezolana
                </p>
              </div>
            </div>
            
            <div className="col-md-3 col-sm-6">
              <div className="text-center">
                <div className="category-icon mb-3">
                  <i className="fas fa-hiking fa-3x text-primary"></i>
                </div>
                <h5>Aventura</h5>
                <p className="text-muted">
                  Actividades de ecoturismo y aventura en los Andes
                </p>
              </div>
            </div>
            
            <div className="col-md-3 col-sm-6">
              <div className="text-center">
                <div className="category-icon mb-3">
                  <i className="fas fa-spa fa-3x text-primary"></i>
                </div>
                <h5>Bienestar</h5>
                <p className="text-muted">
                  Relax y bienestar en nuestro spa de montaña
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="container py-5">
        <div className="row">
          <div className="col-12">
            <div className="card bg-primary text-white">
              <div className="card-body text-center py-5">
                <h3 className="card-title mb-3">
                  <i className="fas fa-envelope me-2"></i>
                  Mantente Actualizado
                </h3>
                <p className="card-text mb-4">
                  Suscríbete a nuestro newsletter y recibe las últimas noticias 
                  sobre Mérida y ofertas especiales del hotel
                </p>
                <div className="row justify-content-center">
                  <div className="col-md-6">
                    <div className="input-group">
                      <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Tu email"
                      />
                      <button className="btn btn-light" type="button">
                        Suscribirse
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
