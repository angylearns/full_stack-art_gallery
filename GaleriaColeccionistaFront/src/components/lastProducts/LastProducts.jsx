import React, { useState, useEffect } from "react";
import productService from "../../services/productService";
import "./lastProducts.css";
import ModalImage from "react-modal-image";

const LastProducts = () => {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    fetchRecentProducts();
  }, []);

  const fetchRecentProducts = async () => {
    try {
      const productsData = await productService.getRecentProducts();
      setRecentProducts(productsData);
    } catch (error) {
      console.error("Error al obtener los últimos productos:", error);
    }
  };

  return (
    <div className="product-gallery">
      <h1>Obras recién llegadas</h1>
      <div className="product-list">
        {recentProducts.map((product) => (
          <div key={product.id} className="product-item">
            <ModalImage
              small={product.url}
              large={product.url}
              alt={product.title}
            />
            <h3>{product.title}</h3>
            <audio controls className="audio-style">
              <source src="/song.mp3" type="audio/mpeg" />
              Tu navegador no soporta el elemento de audio.
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LastProducts;
