import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000';

const productService = {
  getAllProducts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/product/`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error;
    }
  },

  addProduct: async (newProduct, fetchData) => {
    try {
      await axios.post(`${API_BASE_URL}/product/`, newProduct);
      alert('Producto agregado exitosamente');
      fetchData();
    } catch (error) {
      console.error('Error al guardar producto:', error);
    }
  },

  updateProduct: async (productId, newProduct, fetchData) => {
    try {
      await axios.put(`${API_BASE_URL}/product/${productId}`, newProduct);
      alert('Producto actualizado exitosamente');
      fetchData();
    } catch (error) {
      console.error('Error al actualizar producto:', error);
    }
  },

  deleteProduct: async (productId, fetchData) => {
    try {
      await axios.delete(`${API_BASE_URL}/product/${productId}`);
      alert('Producto eliminado exitosamente');
      fetchData();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  },

  getRecentProducts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/product/recent`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los últimos productos:', error);
      throw error;
    }
  }
}

export default productService;