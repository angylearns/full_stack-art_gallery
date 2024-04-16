import productService from "../services/productService";

export const addProduct = async (newProduct, fetchData) => {
  try {
    await productService.addProduct(newProduct, fetchData);
    alert('Producto agregado exitosamente');
  } catch (error) {
    console.error('Error al guardar producto:', error);
  }
};

export const updateProduct = async (productId, newProduct, fetchData) => {
  try {
    await productService.updateProduct(productId, newProduct, fetchData);
    alert('Producto actualizado exitosamente');
  } catch (error) {
    console.error('Error al actualizar producto:', error);
  }
};

export const deleteProduct = async (productId, fetchData) => {
  try {
    await productService.deleteProduct(productId, fetchData);
    alert('Producto eliminado exitosamente');
  } catch (error) {
    console.error('Error al eliminar producto:', error);
  }
};
