const mongoose = require('mongoose');

// Esquema para el modelo Post
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título es requerido'],
    trim: true,
    maxlength: [200, 'El título no puede exceder 200 caracteres']
  },
  slug: {
    type: String,
    required: [true, 'El slug es requerido'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[a-z0-9-]+$/, 'El slug solo puede contener letras minúsculas, números y guiones']
  },
  content: {
    type: String,
    required: [true, 'El contenido es requerido'],
    minlength: [10, 'El contenido debe tener al menos 10 caracteres']
  },
  images: [{
    url: {
      type: String,
      required: false
    },
    alt: {
      type: String,
      default: ''
    },
    caption: {
      type: String,
      default: ''
    }
  }],
  publishedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  author: {
    type: String,
    default: 'Admin'
  },
  tags: [{
    type: String,
    trim: true
  }],
  excerpt: {
    type: String,
    maxlength: [300, 'El extracto no puede exceder 300 caracteres']
  },
  views: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true, // Agrega createdAt y updatedAt automáticamente
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Índices para mejorar el rendimiento
// Nota: slug ya tiene índice único definido en el esquema
postSchema.index({ publishedAt: -1 });
postSchema.index({ status: 1 });
postSchema.index({ tags: 1 });
postSchema.index({ featured: 1 });

// Virtual para obtener la URL del post
postSchema.virtual('url').get(function() {
  return `/blog/${this.slug}`;
});

// Virtual para obtener el tiempo de lectura estimado
postSchema.virtual('readingTime').get(function() {
  if (!this.content) return 1;
  const wordsPerMinute = 200;
  const wordCount = this.content.split(' ').length;
  return Math.ceil(wordCount / wordsPerMinute);
});

// Middleware pre-validate para generar slug antes de la validación
postSchema.pre('validate', async function(next) {
  try {
    if (this.isModified('title') && !this.slug && this.title) {
      let baseSlug = this.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remover caracteres especiales
        .replace(/\s+/g, '-') // Reemplazar espacios con guiones
        .replace(/-+/g, '-') // Reemplazar múltiples guiones con uno solo
        .trim('-'); // Remover guiones del inicio y final
      
      // Verificar si el slug ya existe y agregar un número si es necesario
      let slug = baseSlug;
      let counter = 1;
      
      while (await this.constructor.findOne({ slug: slug, _id: { $ne: this._id } })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
      
      this.slug = slug;
    }
    
    // Generar excerpt automáticamente si no se proporciona
    if (!this.excerpt && this.content) {
      this.excerpt = this.content.substring(0, 200).replace(/<[^>]*>/g, '') + '...';
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

// Método estático para buscar posts por slug
postSchema.statics.findBySlug = function(slug) {
  return this.findOne({ slug: slug, status: 'published' });
};

// Método estático para obtener posts publicados
postSchema.statics.findPublished = function() {
  return this.find({ status: 'published' }).sort({ publishedAt: -1 });
};

// Método estático para buscar posts por tag
postSchema.statics.findByTag = function(tag) {
  return this.find({ 
    tags: { $in: [tag] }, 
    status: 'published' 
  }).sort({ publishedAt: -1 });
};

// Método de instancia para incrementar vistas
postSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Método de instancia para obtener posts relacionados (por tags)
postSchema.methods.getRelatedPosts = function(limit = 3) {
  return this.constructor.find({
    _id: { $ne: this._id },
    tags: { $in: this.tags },
    status: 'published'
  }).limit(limit);
};

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
