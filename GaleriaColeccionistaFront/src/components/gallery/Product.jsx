import React, { useState, useEffect, useRef } from "react";
import "./product.css";
import productService from "../../services/productService";
import {
  addProduct,
  updateProduct,
  handleEdit,
  deleteProduct,
} from "../../handlers/productHandler";

const Product = () => {
  const [productos, setProductos] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id_product: "",
    url: "",
    title: "",
    price: "",
    material: "",
    dimensions: "",
    in_stock: "",
    style: "",
    id_person_fk: "2",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const formRef = useRef(null);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (newProduct.id_product) {
        await updateProduct(newProduct.id_product, newProduct, fetchData);
      } else {
        await addProduct(newProduct, fetchData);
      }
      setNewProduct({
        id_product: "",
        url: "",
        title: "",
        price: "",
        material: "",
        dimensions: "",
        in_stock: "1",
        style: "",
        id_person_fk: "",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  };

  const handleEditClick = (productId) => {
    handleEdit(productId, productos, setNewProduct, setIsEditing);
  };

  const handleDelete = async (productId) => {
    await deleteProduct(productId, fetchData);
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
    <div className="style">
      <div>
        <h1>Hola Artista!</h1>
      </div>

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

      <div className="add-product">
        <form
          className="Form-add-product"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <label htmlFor="title">Copie la URL de su imagen:</label>
          <input
            type="text"
            id="title"
            value={newProduct.url}
            onChange={(e) =>
              setNewProduct({ ...newProduct, url: e.target.value })
            }
            required
          />
          {newProduct.url && (
            <img
              src={newProduct.url}
              alt="Previsualización de la imagen"
              style={{ maxWidth: "20%", height: "200px" }}
            />
          )}
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
          <label htmlFor="title">Composición de la obra:</label>
          <input
            type="text"
            id="title"
            value={newProduct.material}
            onChange={(e) =>
              setNewProduct({ ...newProduct, material: e.target.value })
            }
            required
          />
          <label htmlFor="title">Dimensiones, Alto*Ancho:</label>
          <input
            type="text"
            id="title"
            value={newProduct.dimensions}
            onChange={(e) =>
              setNewProduct({ ...newProduct, dimensions: e.target.value })
            }
            required
          />

          <label htmlFor="style">Categoría de la obra:</label>
          <select
            id="style"
            value={newProduct.style}
            onChange={(e) =>
              setNewProduct({ ...newProduct, style: e.target.value })
            }
            required
          >
            <option value="">Selecciona una categoría</option>
            <option value="Arte Abstracto">Arte Abstracto</option>
            <option value="Realismo Contemporaneo">
              Realismo Contemporáneo
            </option>
            <option value="Arte Digital">Arte Digital</option>
            <option value="Expresionismo">Expresionismo</option>
            <option value="Neo-Pop">Neo-Pop</option>
          </select>

          <button className="button-add-product" type="submit">
            {isEditing ? "Actualizar Producto" : "Agregar Producto"}
          </button>
        </form>
      </div>

      <div className="product-list">
        {filteredProductos.map((producto) => (
          <div key={producto.id_product} className="product-card">
            <h3>{producto.title}</h3>
            <img
              src={producto.url}
              alt={producto.title}
              width={100}
              height={100}
            ></img>
            <p>Precio: {producto.price}€</p>
            <p>Composición: {producto.material}</p>
            <p>Dimensiones: {producto.dimensions}</p>
            <p>Stock: {producto.in_stock}</p>
            <p>Categoría: {producto.style}</p>
            <div>
              <button
                className="btn-cardForm-edit"
                onClick={() => handleEditClick(producto.id_product)}
              >
                Editar
              </button>
              <button
                className="btn-cardForm-delete"
                onClick={() => handleDelete(producto.id_product)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
