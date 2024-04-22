import "./allArtworks.css"
import React, { useState, useEffect } from "react";
import "./allArtworks.css"; 
import productService from "../../services/productService";

const AllArtworks = ({ isAuthenticated }) => {
  const [productos, setProductos] = useState([]);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const productsData = await productService.getAllProducts();
      setProductos(productsData);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  const handleCheckboxChange = (categoria) => {
    const isChecked = categoriasSeleccionadas.includes(categoria);
    if (isChecked) {
      setCategoriasSeleccionadas(
        categoriasSeleccionadas.filter((c) => c !== categoria)
      );
    } else {
      setCategoriasSeleccionadas([...categoriasSeleccionadas, categoria]);
    }
  };

  const handleAddToCart = (productId) => {
    //PENDIENTE Lógica para añadir el producto al carrito
    console.log(`Añadir producto ${productId} al carrito`);
  };

  const filteredProductos = productos.filter((producto) => {
    if (categoriasSeleccionadas.length === 0) {
      return true;
    } else {
      return categoriasSeleccionadas.includes(producto.style);
    }
  });

  const categorias = [
    "Arte Abstracto",
    "Realismo Contemporaneo",
    "Arte Digital",
    "Expresionismo",
    "Neo-Pop"
  ];

  return (
    <div className="all-artworks">
      <h1>Explora todas las obras de arte</h1>
      <div className="navbar">
        {categorias.map((categoria) => (
          <div key={categoria} className="navbar-item">
            <input
              type="checkbox"
              id={categoria}
              value={categoria}
              onChange={(e) => handleCheckboxChange(e.target.value)}
            />
            <label htmlFor={categoria}>{categoria}</label>
          </div>
        ))}
      </div>
      <div className="artwork-list">
        {filteredProductos.map((producto) => (
          <div key={producto.id_product} className="artwork-card">
            <h3>{producto.title}</h3>
            <img
              src={producto.url}
              alt={producto.title}
              width={500}
              height={500}
            />
            <p>Precio: {producto.price}€</p>
            <p>Composición: {producto.material}</p>
            <p>Dimensiones: {producto.dimensions}</p>
            <p>Stock: {producto.in_stock}</p>
            <p>Categoría: {producto.style}</p>
        
              <button
                className="btn-add-to-cart"
                onClick={() => handleAddToCart(producto.id_product)}
              >
                Añadir al carrito
              </button>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllArtworks;