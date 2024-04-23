import "./allArtworks.css"
import React, { useState, useEffect } from "react";
import "./allArtworks.css";
import productService from "../../services/productService";
import Swal from 'sweetalert2';

const AllArtworks = ({ isAuthenticated }) => {
  const [productos, setProductos] = useState([]);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [arrayProduct, setArrayProduct] = useState([]);



  useEffect(() => {
    fetchData();
    // Recuperar los datos de la cookie
    const storedProductsCookie = getCookie('products');

    if (storedProductsCookie != null) {
      const storedProducts = JSON.parse(storedProductsCookie);
      setArrayProduct(storedProducts);
    }



  }, []);



  // Función para obtener el valor de una cookie por su nombre
  function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split('=');
      if (cookie[0] === name) {
        return decodeURIComponent(cookie[1]);
      }
    }
    return null;
  }

  // Función para establecer una cookie
  function setCookie(name, value, hoursToExpire) {
    const expirationDate = new Date();
    //cookies caducan en una hora
    expirationDate.setTime(expirationDate.getTime() + (hoursToExpire * 3600000));
    const cookieValue = encodeURIComponent(value) + ((hoursToExpire) ? `; expires=${expirationDate.toUTCString()}` : '');
    document.cookie = `${name}=${cookieValue}; path=/`;
  }

  const handleSaveProduct = (product) => {
    //si el producto ya ha sido añadido que lo indique y no lo añada de nuevo
    // Verificar si el producto ya está presente en el array
  const existeProducto = arrayProduct.find((p) => p.id_product === product.id_product);
  // Si el producto no existe en el array, agrégalo
  if (!existeProducto) {
    setArrayProduct(prevArray => [...prevArray, product]);
  } else {
    // Si el producto ya existe en el array, puedes mostrar un mensaje o realizar alguna otra acción
    Swal.fire({
      title: 'Atención',
      text: 'Este producto ya se encuentra en su carrito.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
  });
  }
  
  };

  //guardamos el producto en local storage para que luego aparezca en la lista de la compra que es la que lo recupera
  useEffect(() => {
    if (arrayProduct.length > 0) {
      //localStorage.setItem('products', JSON.stringify(arrayProduct));
      // Guardar el array en la cookie

      setCookie('products', JSON.stringify(arrayProduct), 1); // Guardar la cookie por 30 días

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

  // const handleAddToCart = (productId) => {
  //   //PENDIENTE Lógica para añadir el producto al carrito
  //   console.log(`Añadir producto ${productId} al carrito`);

  // };

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
        className={producto.in_stock === 0 ? 'cbtn-disabled' : 'btn-add-to-cart'}
        onClick={() => handleSaveProduct(producto)}
        disabled={producto.in_stock === 0} // Expresión ternaria para deshabilitar el botón si in_stock es cero
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