import apiClient from './authService';

export const postService = {
  // Obtener todos los posts
  async getAllPosts(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.status) queryParams.append('status', params.status);
      if (params.featured !== undefined) queryParams.append('featured', params.featured);
      if (params.tag) queryParams.append('tag', params.tag);
      if (params.author) queryParams.append('author', params.author);
      if (params.limit) queryParams.append('limit', params.limit);
      if (params.page) queryParams.append('page', params.page);
      if (params.sort) queryParams.append('sort', params.sort);

      const response = await apiClient.get(`/posts?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener posts');
    }
  },

  // Obtener post por ID
  async getPostById(id) {
    try {
      const response = await apiClient.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener post');
    }
  },

  // Obtener post por slug
  async getPostBySlug(slug) {
    try {
      const response = await apiClient.get(`/posts/slug/${slug}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener post');
    }
  },

  // Buscar posts
  async searchPosts(query, params = {}) {
    try {
      const queryParams = new URLSearchParams({ q: query });
      
      if (params.limit) queryParams.append('limit', params.limit);
      if (params.page) queryParams.append('page', params.page);

      const response = await apiClient.get(`/posts/search?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al buscar posts');
    }
  },

  // Obtener posts relacionados
  async getRelatedPosts(id, limit = 3) {
    try {
      const response = await apiClient.get(`/posts/${id}/related?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener posts relacionados');
    }
  },

  // Crear post (requiere autenticación)
  async createPost(postData) {
    try {
      const response = await apiClient.post('/posts', postData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al crear post');
    }
  },

  // Actualizar post (requiere autenticación)
  async updatePost(id, postData) {
    try {
      const response = await apiClient.put(`/posts/${id}`, postData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al actualizar post');
    }
  },

  // Eliminar post (requiere autenticación)
  async deletePost(id) {
    try {
      const response = await apiClient.delete(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al eliminar post');
    }
  },

  // Obtener estadísticas (requiere autenticación)
  async getStats() {
    try {
      const response = await apiClient.get('/posts/admin/stats');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al obtener estadísticas');
    }
  }
};
