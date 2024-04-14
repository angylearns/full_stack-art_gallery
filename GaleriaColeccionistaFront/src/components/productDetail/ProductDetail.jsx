import { useState } from 'react'
import './productDetail.css'
import React from 'react';


function ProductDetail() {
  //este componente debe recibir como parámetro la obra que se quiere mostrar pero de momento solo para probar pongo una a mano, al pinchar en el boton de comprar guarda en local storage

  const [product, setProduct] = useState(
    {
        id_product: "1",
        title: "Producto 1",
        price: "10",
        material: "Material 1",
        dimension: "Dimension 1",
        in_stock: true,
        style: "Estilo 1",
        id_purchase_order: "1",
        url: "https://i.postimg.cc/tCfhFKYv/popArt1.png"
    });

  return (
    <>
 <div className="contenedor">
      <div className="fila fila-superior">
        <div className="columna">Contenido 1 logo de Galeria</div>
        <div className="columna"><button>Comprar</button></div>
      </div>
      <div className="fila fila-inferior">
        <div className="columna-grande">
        <img src={product.url} alt="Producto" style={{ width: '100%', height: '100%' }} />
        </div>
        <div className="columna-grande">
            <h3>{product.title}</h3>
            <p>Artista: dfasdf</p>
            <p>Tamaño: {product.dimension}</p>
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