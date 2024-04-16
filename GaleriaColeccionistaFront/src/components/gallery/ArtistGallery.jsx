import React, { useState, useEffect, useRef } from 'react';
import './artistGallery.css';
import { addProduct, updateProduct, deleteProduct } from '../../handlers/galleryHandler.js';
import userService from '../../services/artistService.js';

const Product = () => {
  const [productos, setProductos] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: null,
    stock: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const productsData = await userService.getAllProducts();
      setProductos(productsData);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (newProduct.id) {
        await updateProduct(newProduct.id, newProduct, fetchData);
      } else {
        await addProduct(newProduct, fetchData);
      }
      setNewProduct({
        title: '',
        price: '',
        description: '',
        category: '',
        image: '',
        stock: '',
      });
      setIsEditing(false); 
    } catch (error) {
      console.error('Error al guardar producto:', error);
    }
  };

  const handleDelete = async (productId) => {
    await deleteProduct(productId, fetchData);
  };

  const handleCheckboxChange = (categoria) => {
    const isChecked = categoriasSeleccionadas.includes(categoria);
    if (isChecked) {
      setCategoriasSeleccionadas(categoriasSeleccionadas.filter((c) => c !== categoria));
    } else {
      setCategoriasSeleccionadas([...categoriasSeleccionadas, categoria]);
    }
  };

  const filteredProductos = productos.filter((producto) => {
    if (categoriasSeleccionadas.length === 0) {
      return true; 
    } else {
      return categoriasSeleccionadas.includes(producto.category);
    }
  });

  const categorias = ['Ropa', 'Juguetes', 'Estatuas']; 

  return (
    <div>
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
      </div >

      <div className='add-product'>
        <form className='Form-add-product' ref={formRef} onSubmit={handleSubmit}>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          value={newProduct.title}
          onChange={(e) =>
            setNewProduct({ ...newProduct, title: e.target.value })
          }
          required
        />
        <label htmlFor="title">Precio:</label>
        <input
          type="text"
          id="title"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          required
        />
        <label htmlFor="title">Descripción:</label>
        <input
          type="text"
          id="title"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          required
        />
        <label htmlFor="title">Categoría:</label>
        <input
          type="text"
          id="title"
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
          required
        />

        <label htmlFor="title">Copie la URL de su imagen:</label>
        <input
          type="text"
          id="title"
          value={newProduct.image}
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: e.target.value })
          }
          required
        />
        {newProduct.image && (
          <img
            src={newProduct.image}
            alt="Previsualización de la imagen"
            style={{ maxWidth: "17%", height: "200px" }}
          />
        )}

        <label htmlFor="title">Stock:</label>
        <input
          type="text"
          id="title"
          value={newProduct.stock}
          onChange={(e) =>
            setNewProduct({ ...newProduct, stock: e.target.value })
          }
          required
        />

        <button className='button-add-product' type="submit">
          {isEditing ? "Actualizar Producto" : "Agregar Producto"}
        </button>
        </form>
      </div>

      <div className="product-list">
      {filteredProductos.map((producto) => (
          <div key={producto.id} className="product-card">
            <h3>{producto.title}</h3>
            <img
              src={producto.image}
              alt={producto.title}
              width={100}
              height={100}
            ></img>
            <p>Precio: {producto.price}€</p>
            <p>Descripción: {producto.description}</p>
            <p>Categoría: {producto.category}</p>

            <p>Stock: {producto.stock}</p>
            <div>
              <button className='btn-cardForm-edit' onClick={() => handleEdit(producto.id)}>Editar</button>
              <button className='btn-cardForm-delete'onClick={() => handleDelete(producto.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;