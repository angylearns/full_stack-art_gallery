import { useEffect, useState } from 'react'
import './productDetail.css'
import React from 'react';


function ProductDetail() {
  //este componente debe recibir como parámetro la obra que se quiere mostrar pero de momento solo para probar pongo una a mano, al pinchar en el boton de comprar guarda en local storage

  const [arrayProduct, setArrayProduct] = useState([]);

  const [product, setProduct] = useState(
    {
      id_product: "3",
      url: "https://i.postimg.cc/tCfhFKYv/popArt1.png",
      title: "Producto 4",
      price: "10",
      material: "Material 5",
      dimensions: "Dimension 4",
      in_stock: true,
      style: "Estilo pop",
      id_purchase_order: "8",
      id_person_fk: "2"
    });

  //recuperamos local storage asi si vamos a añadir la obra al carrito no eliminamos las que ya puedan estar añadidas y guardadas en local storage
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products'));
    if (storedProducts != null) {
      setArrayProduct(storedProducts);
    }

  }, []);

  //guardamos el producto en local storage para que luego aparezca en la lista de la compra que es la que lo recupera
  useEffect(() => {
    if (arrayProduct.length > 0) {
      localStorage.setItem('products', JSON.stringify(arrayProduct));
    }
  }, [arrayProduct]);

  const handleSaveProduct = () => {
    setArrayProduct(prevArray => [...prevArray, product]);
  };



  return (
    <>
      <div className="contenedor">
        <div className="fila fila-superior">
          <div className="columna">Contenido 1 logo de Galeria</div>
          <div className="columna"><button onClick={() => handleSaveProduct()}>Comprar</button></div>
        </div>
        <div className="fila fila-inferior">
          <div className="columna-grande">
            <img src={product.url} alt="Producto" style={{ width: '100%', height: '100%' }} />
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
  )
}

export default ProductDetail