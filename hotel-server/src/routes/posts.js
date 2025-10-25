const express = require('express');
const router = express.Router();
const {
  getAllPosts,
  getPostById,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  getRelatedPosts,
  getPostStats,
  searchPosts
} = require('../controllers/postController');
const { authenticateToken, requireRole } = require('../utils/auth');

// Rutas públicas (sin autenticación)
router.get('/', getAllPosts); // GET /api/posts
router.get('/search', searchPosts); // GET /api/posts/search?q=term
router.get('/slug/:slug', getPostBySlug); // GET /api/posts/slug/:slug
router.get('/:id', getPostById); // GET /api/posts/:id
router.get('/:id/related', getRelatedPosts); // GET /api/posts/:id/related

// Rutas protegidas (requieren autenticación)
router.post('/', authenticateToken, requireRole('admin'), createPost); // POST /api/posts
router.put('/:id', authenticateToken, requireRole('admin'), updatePost); // PUT /api/posts/:id
router.delete('/:id', authenticateToken, requireRole('admin'), deletePost); // DELETE /api/posts/:id
router.get('/admin/stats', authenticateToken, requireRole('admin'), getPostStats); // GET /api/posts/admin/stats

module.exports = router;
