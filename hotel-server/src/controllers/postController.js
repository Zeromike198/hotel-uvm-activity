// Simulación de base de datos en memoria para posts
let posts = [
  {
    id: 1,
    title: 'Descubre los Secretos del Páramo Andino',
    excerpt: 'Una guía completa para explorar el ecosistema único del páramo venezolano',
    content: 'El páramo andino es uno de los ecosistemas más fascinantes de Venezuela...',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: 'María González',
    date: '2024-01-15',
    category: 'Turismo',
    slug: 'secretos-paramo-andino',
    tags: ['páramo', 'ecoturismo', 'naturaleza'],
    status: 'published'
  },
  {
    id: 2,
    title: 'Gastronomía Andina: Sabores Únicos de Mérida',
    excerpt: 'Explora la rica tradición culinaria de los Andes venezolanos',
    content: 'La gastronomía andina de Mérida es una fusión única de sabores...',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: 'Roberto Silva',
    date: '2024-01-10',
    category: 'Gastronomía',
    slug: 'gastronomia-andina-merida',
    tags: ['gastronomía', 'cocina local', 'tradición'],
    status: 'published'
  },
  {
    id: 3,
    title: 'El Teleférico de Mérida: Una Experiencia Inolvidable',
    excerpt: 'Todo lo que necesitas saber sobre el teleférico más alto del mundo',
    content: 'El teleférico de Mérida es una experiencia única que te lleva a las alturas...',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: 'Carlos Mendoza',
    date: '2024-01-05',
    category: 'Aventura',
    slug: 'teleferico-merida-experiencia',
    tags: ['teleférico', 'aventura', 'vistas'],
    status: 'published'
  }
];

let nextId = 4;

// Validación de datos del post
const validatePostData = (data) => {
  const errors = [];
  
  if (!data.title || data.title.trim() === '') {
    errors.push('El título es requerido');
  }
  
  if (!data.excerpt || data.excerpt.trim() === '') {
    errors.push('El extracto es requerido');
  }
  
  if (!data.content || data.content.trim() === '') {
    errors.push('El contenido es requerido');
  }
  
  if (!data.author || data.author.trim() === '') {
    errors.push('El autor es requerido');
  }
  
  if (!data.category || data.category.trim() === '') {
    errors.push('La categoría es requerida');
  }
  
  return errors;
};

// Generar slug automáticamente
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
};

// Controlador para obtener todos los posts
const getAllPosts = (req, res) => {
  try {
    const { category, status } = req.query;
    let filteredPosts = [...posts];
    
    // Filtrar por categoría si se especifica
    if (category) {
      filteredPosts = filteredPosts.filter(post => 
        post.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filtrar por estado si se especifica
    if (status) {
      filteredPosts = filteredPosts.filter(post => 
        post.status === status
      );
    }
    
    res.json({
      success: true,
      data: filteredPosts,
      total: filteredPosts.length
    });
  } catch (error) {
    console.error('Error al obtener posts:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener posts',
      error: error.message
    });
  }
};

// Controlador para obtener un post por ID
const getPostById = (req, res) => {
  try {
    const { id } = req.params;
    const post = posts.find(p => p.id === parseInt(id));
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post no encontrado'
      });
    }
    
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('Error al obtener post:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener post',
      error: error.message
    });
  }
};

// Controlador para obtener un post por slug
const getPostBySlug = (req, res) => {
  try {
    const { slug } = req.params;
    const post = posts.find(p => p.slug === slug);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post no encontrado'
      });
    }
    
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error('Error al obtener post:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener post',
      error: error.message
    });
  }
};

// Controlador para crear un nuevo post
const createPost = (req, res) => {
  try {
    const postData = req.body;
    
    // Validar datos
    const validationErrors = validatePostData(postData);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Datos del post inválidos',
        errors: validationErrors
      });
    }
    
    // Crear nuevo post
    const newPost = {
      id: nextId++,
      title: postData.title,
      excerpt: postData.excerpt,
      content: postData.content,
      image: postData.image || 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      author: postData.author,
      date: new Date().toISOString().split('T')[0],
      category: postData.category,
      slug: postData.slug || generateSlug(postData.title),
      tags: postData.tags || [],
      status: postData.status || 'draft'
    };
    
    // Agregar a la lista
    posts.push(newPost);
    
    res.status(201).json({
      success: true,
      message: 'Post creado exitosamente',
      data: newPost
    });
    
  } catch (error) {
    console.error('Error al crear post:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

// Controlador para actualizar un post
const updatePost = (req, res) => {
  try {
    const { id } = req.params;
    const postData = req.body;
    
    const postIndex = posts.findIndex(p => p.id === parseInt(id));
    if (postIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Post no encontrado'
      });
    }
    
    // Validar datos si se proporcionan
    if (postData.title || postData.excerpt || postData.content) {
      const validationErrors = validatePostData({
        title: postData.title || posts[postIndex].title,
        excerpt: postData.excerpt || posts[postIndex].excerpt,
        content: postData.content || posts[postIndex].content,
        author: postData.author || posts[postIndex].author,
        category: postData.category || posts[postIndex].category
      });
      
      if (validationErrors.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Datos del post inválidos',
          errors: validationErrors
        });
      }
    }
    
    // Actualizar post
    posts[postIndex] = {
      ...posts[postIndex],
      ...postData,
      slug: postData.title ? generateSlug(postData.title) : posts[postIndex].slug
    };
    
    res.json({
      success: true,
      message: 'Post actualizado exitosamente',
      data: posts[postIndex]
    });
    
  } catch (error) {
    console.error('Error al actualizar post:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

// Controlador para eliminar un post
const deletePost = (req, res) => {
  try {
    const { id } = req.params;
    
    const postIndex = posts.findIndex(p => p.id === parseInt(id));
    if (postIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Post no encontrado'
      });
    }
    
    // Eliminar post
    const deletedPost = posts.splice(postIndex, 1)[0];
    
    res.json({
      success: true,
      message: 'Post eliminado exitosamente',
      data: deletedPost
    });
    
  } catch (error) {
    console.error('Error al eliminar post:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

// Controlador para obtener categorías
const getCategories = (req, res) => {
  try {
    const categories = [...new Set(posts.map(post => post.category))];
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener categorías',
      error: error.message
    });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  getCategories
};