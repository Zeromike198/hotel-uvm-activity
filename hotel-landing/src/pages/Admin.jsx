import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { authService } from '../services/authService';
import { postService } from '../services/postService';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [reservations, setReservations] = useState([]);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('reservations');
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [postForm, setPostForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: [],
    status: 'draft',
    featured: false
  });

  // Verificar autenticación al cargar el componente
  useEffect(() => {
    if (authService.isAuthenticated()) {
      setIsAuthenticated(true);
      setUser(authService.getCurrentUser());
      fetchData();
    }
  }, []);

  // Autenticación dinámica
  const handleLogin = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoginLoading(true);
    setError('');

    try {
      const response = await authService.login(loginData);
      
      if (response.success) {
        setIsAuthenticated(true);
        setUser(response.data.user);
        fetchData();
      }
    } catch (error) {
      setError(error.message);
      // Mantener el error visible por un momento
      setTimeout(() => {
        setError('');
      }, 3000);
    } finally {
      setLoginLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // Obtener reservas
      const reservationsResponse = await axios.get('http://localhost:3000/api/reservations');
      setReservations(reservationsResponse.data.data || []);
      
      // Obtener posts
      const postsResponse = await postService.getAllPosts({ limit: 50 });
      setPosts(postsResponse.data || []);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
    setReservations([]);
    setPosts([]);
    setLoginData({ username: '', password: '' });
  };

  // Funciones para manejar posts
  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const response = await postService.createPost(postForm);
      setPosts([response.data, ...posts]);
      setShowPostForm(false);
      setPostForm({
        title: '',
        content: '',
        excerpt: '',
        tags: [],
        status: 'draft',
        featured: false
      });
    } catch (error) {
      console.error('Error al crear post:', error);
      setError(error.message);
    }
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setPostForm({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      tags: post.tags || [],
      status: post.status,
      featured: post.featured
    });
    setShowPostForm(true);
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    try {
      const response = await postService.updatePost(editingPost._id, postForm);
      setPosts(posts.map(p => p._id === editingPost._id ? response.data : p));
      setShowPostForm(false);
      setEditingPost(null);
      setPostForm({
        title: '',
        content: '',
        excerpt: '',
        tags: [],
        status: 'draft',
        featured: false
      });
    } catch (error) {
      console.error('Error al actualizar post:', error);
      setError(error.message);
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este post?')) {
      try {
        await postService.deletePost(postId);
        setPosts(posts.filter(p => p._id !== postId));
      } catch (error) {
        console.error('Error al eliminar post:', error);
        setError(error.message);
      }
    }
  };

  const resetPostForm = () => {
    setShowPostForm(false);
    setEditingPost(null);
    setPostForm({
      title: '',
      content: '',
      excerpt: '',
      tags: [],
      status: 'draft',
      featured: false
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login" style={{ marginTop: '76px', minHeight: '80vh' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4">
              <div className="card shadow-lg border-0">
                <div className="card-header bg-primary text-white text-center">
                  <h4 className="mb-0">
                    <i className="fas fa-lock me-2"></i>
                    Panel de Administración
                  </h4>
                </div>
                <div className="card-body p-4">
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      {error}
                    </div>
                  )}
                  
                  <form>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">Usuario o Email</label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={loginData.username}
                        onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                        required
                        disabled={loginLoading}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="password" className="form-label">Contraseña</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        required
                        disabled={loginLoading}
                      />
                    </div>
                    <button 
                      type="button" 
                      className="btn btn-primary w-100"
                      disabled={loginLoading}
                      onClick={handleLogin}
                    >
                      {loginLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Iniciando sesión...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-sign-in-alt me-2"></i>
                          Iniciar Sesión
                        </>
                      )}
                    </button>
                  </form>
                  <div className="mt-3 text-center">
                    <small className="text-muted">
                      Usuario: admin | Contraseña: admin123
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard" style={{ marginTop: '76px' }}>
      {/* Header */}
      <div className="bg-primary text-white py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <h1 className="h3 mb-0">
                <i className="fas fa-tachometer-alt me-2"></i>
                Panel de Administración - Hotel Paradise Mérida
              </h1>
              {user && (
                <small className="text-light">
                  Bienvenido, {user.username} ({user.role})
                </small>
              )}
            </div>
            <div className="col-md-4 text-end">
              <button onClick={handleLogout} className="btn btn-outline-light">
                <i className="fas fa-sign-out-alt me-2"></i>
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="container py-4">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'reservations' ? 'active' : ''}`}
              onClick={() => setActiveTab('reservations')}
            >
              <i className="fas fa-calendar-check me-2"></i>
              Reservas ({reservations.length})
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'posts' ? 'active' : ''}`}
              onClick={() => setActiveTab('posts')}
            >
              <i className="fas fa-blog me-2"></i>
              Blog Posts ({posts.length})
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'stats' ? 'active' : ''}`}
              onClick={() => setActiveTab('stats')}
            >
              <i className="fas fa-chart-bar me-2"></i>
              Estadísticas
            </button>
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="container pb-5">
        {activeTab === 'reservations' && (
          <div className="reservations-section">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3>Gestión de Reservas</h3>
              <button onClick={fetchData} className="btn btn-outline-primary">
                <i className="fas fa-refresh me-2"></i>
                Actualizar
              </button>
            </div>
            
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Cliente</th>
                      <th>Email</th>
                      <th>Check-in</th>
                      <th>Check-out</th>
                      <th>Habitación</th>
                      <th>Huéspedes</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((reservation) => (
                      <tr key={reservation.id}>
                        <td>#{reservation.id}</td>
                        <td>{reservation.name}</td>
                        <td>{reservation.email}</td>
                        <td>{new Date(reservation.checkIn).toLocaleDateString('es-ES')}</td>
                        <td>{new Date(reservation.checkOut).toLocaleDateString('es-ES')}</td>
                        <td>{reservation.roomType}</td>
                        <td>{reservation.guests}</td>
                        <td>
                          <span className={`badge ${reservation.status === 'pending' ? 'bg-warning' : 'bg-success'}`}>
                            {reservation.status === 'pending' ? 'Pendiente' : 'Confirmada'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'posts' && (
          <div className="posts-section">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3>Gestión del Blog</h3>
              <button 
                className="btn btn-primary"
                onClick={() => setShowPostForm(true)}
              >
                <i className="fas fa-plus me-2"></i>
                Nuevo Post
              </button>
            </div>
            
            {showPostForm && (
              <div className="card mb-4">
                <div className="card-header">
                  <h5>{editingPost ? 'Editar Post' : 'Nuevo Post'}</h5>
                </div>
                <div className="card-body">
                  <form onSubmit={editingPost ? handleUpdatePost : handleCreatePost}>
                    <div className="row">
                      <div className="col-md-8">
                        <div className="mb-3">
                          <label className="form-label">Título</label>
                          <input
                            type="text"
                            className="form-control"
                            value={postForm.title}
                            onChange={(e) => setPostForm({...postForm, title: e.target.value})}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Contenido</label>
                          <ul className="nav nav-tabs" id="contentTabs" role="tablist">
                            <li className="nav-item" role="presentation">
                              <button className="nav-link active" id="edit-tab" data-bs-toggle="tab" data-bs-target="#edit" type="button" role="tab">
                                <i className="fas fa-edit me-1"></i>Editar
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button className="nav-link" id="preview-tab" data-bs-toggle="tab" data-bs-target="#preview" type="button" role="tab">
                                <i className="fas fa-eye me-1"></i>Vista Previa
                              </button>
                            </li>
                          </ul>
                          <div className="tab-content" id="contentTabContent">
                            <div className="tab-pane fade show active" id="edit" role="tabpanel">
                              <textarea
                                className="form-control mt-2"
                                rows="10"
                                value={postForm.content}
                                onChange={(e) => setPostForm({...postForm, content: e.target.value})}
                                required
                                style={{ fontFamily: 'monospace' }}
                                placeholder="Puedes usar HTML básico como &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, etc."
                              />
                            </div>
                            <div className="tab-pane fade" id="preview" role="tabpanel">
                              <div 
                                className="border p-3 mt-2" 
                                style={{ minHeight: '200px', backgroundColor: '#f8f9fa' }}
                                dangerouslySetInnerHTML={{ __html: postForm.content || '<p class="text-muted">No hay contenido para mostrar</p>' }}
                              />
                            </div>
                          </div>
                          <small className="form-text text-muted">
                            Puedes usar HTML básico: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, &lt;em&gt;
                          </small>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Extracto</label>
                          <textarea
                            className="form-control"
                            rows="3"
                            value={postForm.excerpt}
                            onChange={(e) => setPostForm({...postForm, excerpt: e.target.value})}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Tags (separados por comas)</label>
                          <input
                            type="text"
                            className="form-control"
                            value={postForm.tags.join(', ')}
                            onChange={(e) => setPostForm({...postForm, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)})}
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Estado</label>
                          <select
                            className="form-select"
                            value={postForm.status}
                            onChange={(e) => setPostForm({...postForm, status: e.target.value})}
                          >
                            <option value="draft">Borrador</option>
                            <option value="published">Publicado</option>
                            <option value="archived">Archivado</option>
                          </select>
                        </div>
                        <div className="form-check mb-3">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={postForm.featured}
                            onChange={(e) => setPostForm({...postForm, featured: e.target.checked})}
                          />
                          <label className="form-check-label">Destacado</label>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-primary">
                        {editingPost ? 'Actualizar' : 'Crear'} Post
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-secondary"
                        onClick={resetPostForm}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            
            <div className="row">
              {posts.map((post) => (
                <div key={post._id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card">
                    <img 
                      src={post.images?.[0]?.url || 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                      className="card-img-top" 
                      alt={post.title} 
                      style={{ height: '200px', objectFit: 'cover' }} 
                    />
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="card-title">{post.title}</h5>
                        <div className="dropdown">
                          <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                            <i className="fas fa-ellipsis-v"></i>
                          </button>
                          <ul className="dropdown-menu">
                            <li><button className="dropdown-item" onClick={() => handleEditPost(post)}>
                              <i className="fas fa-edit me-2"></i>Editar
                            </button></li>
                            <li><button className="dropdown-item text-danger" onClick={() => handleDeletePost(post._id)}>
                              <i className="fas fa-trash me-2"></i>Eliminar
                            </button></li>
                          </ul>
                        </div>
                      </div>
                      <p className="card-text">{post.excerpt}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <small className="text-muted">{post.author}</small>
                          <br />
                          <small className="text-muted">{new Date(post.publishedAt).toLocaleDateString('es-ES')}</small>
                        </div>
                        <div>
                          <span className={`badge ${post.status === 'published' ? 'bg-success' : post.status === 'draft' ? 'bg-warning' : 'bg-secondary'}`}>
                            {post.status === 'published' ? 'Publicado' : post.status === 'draft' ? 'Borrador' : 'Archivado'}
                          </span>
                          {post.featured && <span className="badge bg-warning ms-1">Destacado</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="stats-section">
            <h3>Estadísticas del Hotel</h3>
            <div className="row">
              <div className="col-md-3">
                <div className="card text-center">
                  <div className="card-body">
                    <i className="fas fa-calendar-check fa-3x text-primary mb-3"></i>
                    <h4>{reservations.length}</h4>
                    <p className="text-muted">Reservas Totales</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center">
                  <div className="card-body">
                    <i className="fas fa-clock fa-3x text-warning mb-3"></i>
                    <h4>{reservations.filter(r => r.status === 'pending').length}</h4>
                    <p className="text-muted">Pendientes</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center">
                  <div className="card-body">
                    <i className="fas fa-check-circle fa-3x text-success mb-3"></i>
                    <h4>{reservations.filter(r => r.status === 'confirmed').length}</h4>
                    <p className="text-muted">Confirmadas</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center">
                  <div className="card-body">
                    <i className="fas fa-blog fa-3x text-info mb-3"></i>
                    <h4>{posts.length}</h4>
                    <p className="text-muted">Posts del Blog</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
