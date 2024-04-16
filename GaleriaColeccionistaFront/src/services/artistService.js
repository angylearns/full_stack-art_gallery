import axios from 'axios';

const API_BASE_URL = 'http://tu-backend.com/api';

export const addProduct = async (newProduct, fetchData) => {
  try {
    await axios.post(`${API_BASE_URL}/productos`, newProduct);
    alert('Producto agregado exitosamente');
    fetchData();
  } catch (error) {
    console.error('Error al guardar producto:', error);
  }
};

export const updateProduct = async (productId, newProduct, fetchData) => {
  try {
    await axios.put(`${API_BASE_URL}/productos/${productId}`, newProduct);
    alert('Producto actualizado exitosamente');
    fetchData();
  } catch (error) {
    console.error('Error al actualizar producto:', error);
  }
};

export const deleteProduct = async (productId, fetchData) => {
  try {
    await axios.delete(`${API_BASE_URL}/productos/${productId}`);
    alert('Producto eliminado exitosamente');
    fetchData();
  } catch (error) {
    console.error('Error al eliminar producto:', error);
  }
};
