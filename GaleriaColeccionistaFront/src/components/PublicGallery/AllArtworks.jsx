import "./allArtworks.css";
import React, { useState, useEffect } from "react";
import "./allArtworks.css";
import productService from "../../services/productService";

const AllArtworks = ({ isAuthenticated }) => {
  const [productos, setProductos] = useState([]);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [arrayProduct, setArrayProduct] = useState([]);

  useEffect(() => {
    fetchData();
    const storedProductsCookie = getCookie("products");

    if (storedProductsCookie != null) {
      const storedProducts = JSON.parse(storedProductsCookie);
      setArrayProduct(storedProducts);
    }
  }, []);

  function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split("=");
      if (cookie[0] === name) {
        return decodeURIComponent(cookie[1]);
      }
    }
    return null;
  }

  function setCookie(name, value, hoursToExpire) {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + hoursToExpire * 3600000);
    const cookieValue =
      encodeURIComponent(value) +
      (hoursToExpire ? `; expires=${expirationDate.toUTCString()}` : "");
    document.cookie = `${name}=${cookieValue}; path=/`;
  }

  const handleSaveProduct = (product) => {
    const existeProducto = arrayProduct.find(
      (p) => p.id_product === product.id_product
    );
    if (!existeProducto) {
      setArrayProduct((prevArray) => [...prevArray, product]);

      alert("producto agregado al carrito");
    } else {
      alert("No se puede agregar el producto, ya se encuentra en el carrito");
    }
  };

  useEffect(() => {
    if (arrayProduct.length > 0) {
      setCookie("products", JSON.stringify(arrayProduct), 1);
    }
  }, [arrayProduct]);

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
              className="img-style"
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
              className={
                producto.in_stock === 0 ? "cbtn-disabled" : "btn-add-to-cart"
              }
              onClick={() => handleSaveProduct(producto)}
              disabled={producto.in_stock === 0}
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
