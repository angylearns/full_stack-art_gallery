import React, { useState, useEffect } from "react";
import "./galleryPreview.css";
import productService from "../../services/productService";

const GalleryPreview = () => {
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
    "Neo-Pop",
  ];

  return (
    <div className="gallery-preview">
      <h1>Nuestra Galería</h1>
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
      <div className="gallery-images">
        {filteredProductos.slice(0, 6).map((producto) => (
          <img
            className="img-style"
            key={producto.id_product}
            src={producto.url}
            alt={producto.title}
            width={360}
            height={420}
          />
        ))}
      </div>
    </div>
  );
};

export default GalleryPreview;
