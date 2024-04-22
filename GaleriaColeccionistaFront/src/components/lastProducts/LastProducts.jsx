import React, { useState, useEffect } from 'react';
import productService from '../../services/productService';
import './lastProducts.css';

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
      console.error('Error al obtener los últimos productos:', error);
    }
  };

  return (
    <div className='product-gallery'>
      <h1>Obras recién llegadas</h1>
      <div className="product-list">
        {recentProducts.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.url} alt={product.title} width={360}
            height={420}/>
            <h3>{product.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LastProducts;
