import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const productService = {
  getAllProducts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/product`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error;
    }
  },

  addProduct: async (newProduct, fetchData) => {
    try {
      await axios.post(`${API_BASE_URL}/product`, newProduct);
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
  }
};

export default productService;



//CÓDIGO DE CELIA 
//import axios from "axios";

// const apiClient = axios.create({
//     baseURL: 'http://localhost:3000/',
//     withCredentials: false,
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json'
//     }
// })

//  export const ImageService = {
//     async getImages() {
//         let response = await apiClient.get("/images");
//         let allImages = response.data;
//         return allImages;
//     },
//     async getImage(id) {
//         let response = await apiClient.get("/images/"+ id);
//         let image = response.data;
//         return image;
//     },
//     async submitImage(newImage){
//         return await apiClient.post("/images", newImage)
//     },
//     async deleteImage(id){
//         axios.delete('images' + id)
//     },
//     async updateImage(id, updatedImage){
//         return await apiClient.patch("/images/" + id, updatedImage)
//     }
// }

// export default ImageService