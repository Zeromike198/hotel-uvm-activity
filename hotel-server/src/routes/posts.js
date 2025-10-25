const express = require('express');
const router = express.Router();
const {
  getAllPosts,
  getPostById,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  getCategories
} = require('../controllers/postController');

// Rutas públicas (sin autenticación)
router.get('/', getAllPosts); // GET /api/posts
router.get('/categories', getCategories); // GET /api/posts/categories
router.get('/slug/:slug', getPostBySlug); // GET /api/posts/slug/:slug
router.get('/:id', getPostById); // GET /api/posts/:id

// Rutas protegidas (requieren autenticación)
router.post('/', createPost); // POST /api/posts
router.put('/:id', updatePost); // PUT /api/posts/:id
router.delete('/:id', deletePost); // DELETE /api/posts/:id

module.exports = router;
