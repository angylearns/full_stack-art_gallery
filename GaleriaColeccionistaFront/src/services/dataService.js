import axios from 'axios';

const baseURL = 'http://localhost:3000'; // La URL de tu backend

const dataService = {
  getArtworks: async () => {
    try {
      const response = await axios.get(`${baseURL}/api/artworks`);
      return response.data;
    } catch (error) {
      console.error('Error fetching artworks:', error);
      throw error;
    }
  },
  addToCart: async (artworkId) => {
    try {
      const response = await axios.post(`${baseURL}/api/cart`, { artworkId });
      return response.data;
    } catch (error) {
      console.error('Error adding artwork to cart:', error);
      throw error;
    }
  },
  editArtwork: async (artworkId, newData) => {
    try {
      const response = await axios.put(`${baseURL}/api/artworks/${artworkId}`, newData);
      return response.data;
    } catch (error) {
      console.error('Error editing artwork:', error);
      throw error;
    }
  },
  deleteArtwork: async (artworkId) => {
    try {
      const response = await axios.delete(`${baseURL}/api/artworks/${artworkId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting artwork:', error);
      throw error;
    }
  },
};

export default dataService;
