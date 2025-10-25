const Post = require('../models/Post');

// Controlador para obtener todos los posts
const getAllPosts = async (req, res) => {
  try {
    const { 
      status = 'published', 
      featured, 
      tag, 
      author, 
      limit = 10, 
      page = 1,
      sort = '-publishedAt'
    } = req.query;

    // Construir filtros
    const filters = {};
    
    if (status) {
      filters.status = status;
    }
    
    if (featured !== undefined) {
      filters.featured = featured === 'true';
    }
    
    if (tag) {
      filters.tags = { $in: [tag] };
    }
    
    if (author) {
      filters.author = new RegExp(author, 'i');
    }

    // Configurar paginación
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const limitNum = parseInt(limit);

    // Ejecutar consulta
    const posts = await Post.find(filters)
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    const total = await Post.countDocuments(filters);

    res.json({
      success: true,
      data: posts,
      pagination: {
        page: parseInt(page),
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
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

// Controlador para obtener un post por ID
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

    // Incrementar vistas
    await post.incrementViews();

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
const createPost = async (req, res) => {
  try {
    const postData = req.body;

    // Validar datos requeridos
    if (!postData.title || !postData.content) {
      return res.status(400).json({
        success: false,
        message: 'Título y contenido son requeridos'
      });
    }

    // Crear nuevo post
    const post = new Post({
      ...postData,
      author: postData.author || req.user?.username || 'Admin'
    });

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
        message: 'El slug ya existe'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error al crear post',
      error: error.message
    });
  }
};

// Controlador para actualizar un post
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const post = await Post.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Post actualizado exitosamente',
      data: post
    });

  } catch (error) {
    console.error('Error al actualizar post:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar post',
      error: error.message
    });
  }
};

// Controlador para eliminar un post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Post eliminado exitosamente',
      data: post
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

// Controlador para obtener posts relacionados
const getRelatedPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const { limit = 3 } = req.query;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post no encontrado'
      });
    }

    const relatedPosts = await post.getRelatedPosts(parseInt(limit));

    res.json({
      success: true,
      data: relatedPosts
    });

  } catch (error) {
    console.error('Error al obtener posts relacionados:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener posts relacionados',
      error: error.message
    });
  }
};

// Controlador para obtener estadísticas de posts
const getPostStats = async (req, res) => {
  try {
    const totalPosts = await Post.countDocuments();
    const publishedPosts = await Post.countDocuments({ status: 'published' });
    const draftPosts = await Post.countDocuments({ status: 'draft' });
    const featuredPosts = await Post.countDocuments({ featured: true });
    
    // Posts más vistos
    const mostViewed = await Post.find({ status: 'published' })
      .sort({ views: -1 })
      .limit(5)
      .select('title views');

    // Tags más populares
    const tagStats = await Post.aggregate([
      { $match: { status: 'published' } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      success: true,
      data: {
        total: totalPosts,
        published: publishedPosts,
        drafts: draftPosts,
        featured: featuredPosts,
        mostViewed,
        popularTags: tagStats
      }
    });

  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener estadísticas',
      error: error.message
    });
  }
};

// Controlador para buscar posts
const searchPosts = async (req, res) => {
  try {
    const { q, limit = 10, page = 1 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Término de búsqueda requerido'
      });
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const posts = await Post.find({
      $and: [
        { status: 'published' },
        {
          $or: [
            { title: { $regex: q, $options: 'i' } },
            { content: { $regex: q, $options: 'i' } },
            { excerpt: { $regex: q, $options: 'i' } },
            { tags: { $in: [new RegExp(q, 'i')] } }
          ]
        }
      ]
    })
    .sort({ publishedAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

    const total = await Post.countDocuments({
      $and: [
        { status: 'published' },
        {
          $or: [
            { title: { $regex: q, $options: 'i' } },
            { content: { $regex: q, $options: 'i' } },
            { excerpt: { $regex: q, $options: 'i' } },
            { tags: { $in: [new RegExp(q, 'i')] } }
          ]
        }
      ]
    });

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
    console.error('Error al buscar posts:', error);
    res.status(500).json({
      success: false,
      message: 'Error al buscar posts',
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
  getRelatedPosts,
  getPostStats,
  searchPosts
};