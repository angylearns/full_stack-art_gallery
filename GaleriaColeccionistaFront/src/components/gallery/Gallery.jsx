import "./gallery.css"
import React, { useState, useEffect } from 'react';
import dataService from "../../services/dataService";
import dataHandler from "../../handlers/dataHandler"; 

const Gallery = ({ userType }) => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    try {
      const artworksData = await dataService.getArtworks();
      setArtworks(artworksData);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    }
  };

  const handleAddToCart = async (artworkId) => {
    try {
      // Aquí puedes hacer alguna validación o manipulación de datos antes de enviarlos al servicio de datos
      await dataService.addToCart(artworkId);
      // Si necesitas actualizar la lista de obras después de agregar al carrito, puedes hacerlo aquí
      fetchArtworks();
    } catch (error) {
      console.error('Error adding artwork to cart:', error);
    }
  };

  const renderArtworks = () => {
    return artworks.map((artwork) => (
      <div key={artwork.id}>
        <h2>{artwork.title}</h2>
        <p>{artwork.description}</p>
        <p>Precio: {artwork.price}</p>
        {userType === 'client' && (
          <button onClick={() => handleAddToCart(artwork.id)}>Añadir al carrito</button>
        )}
        {userType === 'artist' && (
          <div>
            <button onClick={() => handleEditArtwork(artwork.id)}>Editar obra</button>
            <button onClick={() => handleDeleteArtwork(artwork.id)}>Eliminar obra</button>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div>
      <h1>Nuestra Galería</h1>
      <div>
        {renderArtworks()}
      </div>
    </div>
  );
};

export default Gallery;

