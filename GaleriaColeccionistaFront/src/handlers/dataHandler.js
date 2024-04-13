const dataHandler = {
    formatArtworkData: (artworkData) => {
      // Realiza cualquier formateo necesario en los datos de la obra de arte antes de enviarlos al backend
      return {
        title: artworkData.title,
        description: artworkData.description,
        price: artworkData.price,
        // Otros campos...
      };
    },
    validateArtworkData: (artworkData) => {
      // Realiza validaciones en los datos de la obra de arte antes de enviarlos al backend
      // Por ejemplo, asegurarse de que los campos obligatorios estén presentes y sean válidos
      if (!artworkData.title || !artworkData.description || !artworkData.price) {
        throw new Error('Los datos de la obra de arte son inválidos');
      }
    },
    // Otras funciones de manipulación de datos...
  };
  
  export default dataHandler;