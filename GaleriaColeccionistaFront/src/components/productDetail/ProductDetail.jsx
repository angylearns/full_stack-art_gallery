import { useEffect, useState } from "react";
import "./productDetail.css";
import React from "react";

function ProductDetail() {
  const [arrayProduct, setArrayProduct] = useState([]);

  const [product, setProduct] = useState({
    id_product: "3",
    url: "https://i.postimg.cc/tCfhFKYv/popArt1.png",
    title: "Producto 4",
    price: "10",
    material: "Material 5",
    dimensions: "Dimension 4",
    in_stock: true,
    style: "Estilo pop",
    id_purchase_order: "8",
    id_person_fk: "2",
  });

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    if (storedProducts != null) {
      setArrayProduct(storedProducts);
    }
  }, []);

  function setCookie(name, value, daysToExpire) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + daysToExpire);
    const cookieValue =
      encodeURIComponent(value) +
      (daysToExpire ? `; expires=${expirationDate.toUTCString()}` : "");
    document.cookie = `${name}=${cookieValue}; path=/`;
  }

  useEffect(() => {
    if (arrayProduct.length > 0) {
      localStorage.setItem("products", JSON.stringify(arrayProduct));

      setCookie("products", JSON.stringify(arrayProduct), 30);
    }
  }, [arrayProduct]);

  const handleSaveProduct = () => {
    setArrayProduct((prevArray) => [...prevArray, product]);
  };

  return (
    <>
      <div className="contenedor">
        <div className="fila fila-superior">
          <div className="columna">Contenido 1 logo de Galeria</div>
          <div className="columna">
            <button onClick={() => handleSaveProduct()}>Comprar</button>
          </div>
        </div>
        <div className="fila fila-inferior">
          <div className="columna-grande">
            <img
              src={product.url}
              alt="Producto"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div className="columna-grande">
            <h3>{product.title}</h3>
            <p>Artista: {product.id_person_fk}</p>
            <p>Tamaño: {product.dimensions}</p>
            <p>Material: {product.material}</p>
            <p>Estilo: {product.style}</p>
            <p>Ref. {product.id}</p>
            <p>Precio: {product.price}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
