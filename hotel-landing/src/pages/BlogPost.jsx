import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { postService } from '../services/postService';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await postService.getPostBySlug(slug);
        setPost(response.data);
        
        // Obtener posts relacionados
        if (response.data._id) {
          const relatedResponse = await postService.getRelatedPosts(response.data._id);
          setRelatedPosts(relatedResponse.data || []);
        }
      } catch (error) {
        console.error('Error al cargar post:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="blog-post" style={{ marginTop: '76px' }}>
        <div className="container py-5">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3">Cargando artículo...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blog-post" style={{ marginTop: '76px' }}>
        <div className="container py-5">
          <div className="text-center">
            <h1>Artículo no encontrado</h1>
            <p>{error || 'El artículo que buscas no existe.'}</p>
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
                {post.featured && (
                  <span className="badge bg-warning text-dark me-2">
                    <i className="fas fa-star me-1"></i>Destacado
                  </span>
                )}
                {post.tags?.[0] && (
                  <span className="badge bg-light text-dark me-2">{post.tags[0]}</span>
                )}
                <span className="me-3">
                  <i className="fas fa-user me-1"></i>
                  {post.author}
                </span>
                <span className="me-3">
                  <i className="fas fa-calendar me-1"></i>
                  {new Date(post.publishedAt).toLocaleDateString('es-ES')}
                </span>
                <span>
                  <i className="fas fa-clock me-1"></i>
                  {post.readingTime} min
                </span>
              </div>
              <h1 className="display-4 fw-bold mb-4">{post.title}</h1>
              <p className="lead">{post.excerpt}</p>
            </div>
            <div className="col-lg-4">
              <img 
                src={post.images?.[0]?.url || 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'} 
                alt={post.images?.[0]?.alt || post.title}
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
            {post.tags && post.tags.length > 0 && (
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
            )}
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
              {relatedPosts.length > 0 && (
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Artículos Relacionados</h5>
                  </div>
                  <div className="card-body">
                    <div className="list-group list-group-flush">
                      {relatedPosts.map((relatedPost) => (
                        <Link 
                          key={relatedPost._id} 
                          to={`/blog/${relatedPost.slug}`} 
                          className="list-group-item list-group-item-action"
                        >
                          <h6>{relatedPost.title}</h6>
                          <small className="text-muted">
                            {new Date(relatedPost.publishedAt).toLocaleDateString('es-ES')}
                          </small>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
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
