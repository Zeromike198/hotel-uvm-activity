const express = require('express');
const router = express.Router();
const {
  getAllPosts,
  getPostById,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  getTags,
  getFeaturedPosts
} = require('../controllers/postController');
const { authenticateToken, requirePermissions, optionalAuth } = require('../utils/auth');

// Rutas públicas (sin autenticación)
router.get('/', optionalAuth, getAllPosts); // GET /api/posts
router.get('/featured', getFeaturedPosts); // GET /api/posts/featured
router.get('/tags', getTags); // GET /api/posts/tags
router.get('/slug/:slug', getPostBySlug); // GET /api/posts/slug/:slug
router.get('/:id', getPostById); // GET /api/posts/:id

// Rutas protegidas (requieren autenticación)
router.post('/', authenticateToken, requirePermissions('write'), createPost); // POST /api/posts
router.put('/:id', authenticateToken, requirePermissions('write'), updatePost); // PUT /api/posts/:id
router.delete('/:id', authenticateToken, requirePermissions('delete'), deletePost); // DELETE /api/posts/:id

module.exports = router;
