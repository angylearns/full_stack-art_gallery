import artistService from "../services/artistService.js"


export const addProduct = async (newProduct, fetchData) => {
  try {
    await artistService.addProduct(newProduct);
    alert('Producto agregado exitosamente');
    fetchData();
  } catch (error) {
    console.error('Error al guardar producto:', error);
  }
};

export const updateProduct = async (productId, newProduct, fetchData) => {
  try {
    await artistService.updateProduct(productId, newProduct);
    alert('Producto actualizado exitosamente');
    fetchData();
  } catch (error) {
    console.error('Error al actualizar producto:', error);
  }
};

export const deleteProduct = async (productId, fetchData) => {
  try {
    await artistService.deleteProduct(productId);
    alert('Producto eliminado exitosamente');
    fetchData();
  } catch (error) {
    console.error('Error al eliminar producto:', error);
  }
};
