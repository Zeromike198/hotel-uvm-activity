const Post = require('../models/Post');

/**
 * GET /api/posts - Obtener todos los posts
 * Query params: page, limit, status, tag, featured
 */
const getAllPosts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status = 'published',
      tag,
      featured,
      search
    } = req.query;

    // Construir filtros
    const filters = {};
    
    if (status) {
      filters.status = status;
    }
    
    if (tag) {
      filters.tags = { $in: [tag] };
    }
    
    if (featured !== undefined) {
      filters.featured = featured === 'true';
    }
    
    if (search) {
      filters.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } }
      ];
    }

    // Calcular paginación
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Ejecutar consulta
    const posts = await Post.find(filters)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-content'); // Excluir contenido completo para listado

    const total = await Post.countDocuments(filters);

    res.json({
      success: true,
      data: posts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
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

/**
 * GET /api/posts/:id - Obtener post por ID
 */
const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const post = await Post.findById(id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post no encontrado'
      });
    }

    // Incrementar vistas si es un post publicado
    if (post.status === 'published') {
      await post.incrementViews();
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

/**
 * GET /api/posts/slug/:slug - Obtener post por slug
 */
const getPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const post = await Post.findBySlug(slug);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post no encontrado'
      });
    }

    // Incrementar vistas
    await post.incrementViews();

    // Obtener posts relacionados
    const relatedPosts = await post.getRelatedPosts(3);

    res.json({
      success: true,
      data: {
        ...post.toObject(),
        relatedPosts
      }
    });

  } catch (error) {
    console.error('Error al obtener post por slug:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener post',
      error: error.message
    });
  }
};

/**
 * POST /api/posts - Crear nuevo post
 */
const createPost = async (req, res) => {
  try {
    const postData = {
      ...req.body,
      author: req.user.username
    };

    // Validar datos requeridos
    if (!postData.title || !postData.content) {
      return res.status(400).json({
        success: false,
        message: 'Título y contenido son requeridos'
      });
    }

    const post = new Post(postData);
    await post.save();

    res.status(201).json({
      success: true,
      message: 'Post creado exitosamente',
      data: post
    });

  } catch (error) {
    console.error('Error al crear post:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'El slug ya existe',
        error: 'DUPLICATE_SLUG'
      });
    }

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Datos de validación inválidos',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al crear post',
      error: error.message
    });
  }
};

/**
 * PUT /api/posts/:id - Actualizar post
 */
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const post = await Post.findById(id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post no encontrado'
      });
    }

    // Verificar permisos (solo el autor o admin puede editar)
    if (post.author !== req.user.username && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para editar este post'
      });
    }

    // Actualizar post
    Object.assign(post, updateData);
    await post.save();

    res.json({
      success: true,
      message: 'Post actualizado exitosamente',
      data: post
    });

  } catch (error) {
    console.error('Error al actualizar post:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'El slug ya existe',
        error: 'DUPLICATE_SLUG'
      });
    }

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Datos de validación inválidos',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al actualizar post',
      error: error.message
    });
  }
};

/**
 * DELETE /api/posts/:id - Eliminar post
 */
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post no encontrado'
      });
    }

    // Verificar permisos (solo el autor o admin puede eliminar)
    if (post.author !== req.user.username && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para eliminar este post'
      });
    }

    await Post.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Post eliminado exitosamente'
    });

  } catch (error) {
    console.error('Error al eliminar post:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar post',
      error: error.message
    });
  }
};

/**
 * GET /api/posts/tags - Obtener todas las etiquetas
 */
const getTags = async (req, res) => {
  try {
    const tags = await Post.distinct('tags', { status: 'published' });
    
    res.json({
      success: true,
      data: tags
    });

  } catch (error) {
    console.error('Error al obtener etiquetas:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener etiquetas',
      error: error.message
    });
  }
};

/**
 * GET /api/posts/featured - Obtener posts destacados
 */
const getFeaturedPosts = async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    
    const posts = await Post.find({ 
      featured: true, 
      status: 'published' 
    })
    .sort({ publishedAt: -1 })
    .limit(parseInt(limit))
    .select('-content');

    res.json({
      success: true,
      data: posts
    });

  } catch (error) {
    console.error('Error al obtener posts destacados:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener posts destacados',
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
  getTags,
  getFeaturedPosts
};
