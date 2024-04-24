import { useState, useEffect } from "react";
import "./endPurchase.css";
import { useNavigate } from "react-router-dom";
import "../shoppingCart/ShoppingCart";
import { useLocation } from "react-router-dom";
import { adminServiceF } from "../../services/adminServiceF";
import Cookies from "js-cookie";

function EndPurchase({ onClose, data }) {
  const navigate = useNavigate();

  const location = useLocation();
  const { total, products } = data;
  const [endOk, setEndOk] = useState(false);
  const [idUser, setIdUser] = useState("");
  const [purchaseOrder, setPurchaseOrder] = useState({
    id_purchase_order: "",
    date: "",
    status: "Preparation",
    id_user_fk: "",
    id_product_fk: "",
  });

  const cancelPay = () => {
    navigate("/ShoppingCart");
  };

  const handleCerrarComponente = () => {
    setMostrarComponente(false);

    window.history.back();
  };

  const saveDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const deleteProductCookie = (index) => {
    let cookies = Cookies.get("products");
    if (cookies) {
      cookies = JSON.parse(cookies);
      const nuevasCookies = cookies.filter(
        (producto) => producto.id_product !== index
      );
      Cookies.set("products", JSON.stringify(nuevasCookies));
    }
  };

  useEffect(() => {
    const userCookie = Cookies.get("id_user");
    if (userCookie) {
      setIdUser(userCookie);
    }
  }, []);

  const handlePay = async () => {
    const dateToday = saveDate();

    for (let i = 0; i < products.length; i++) {
      const objeto = products[i];
      const idProduct = objeto.id_product; 
      const order = {
        id_purchase_order: "",
        date: dateToday,
        status: "Preparation",
        id_user_fk: idUser,
        id_product_fk: idProduct,
      };
      setPurchaseOrder(order);
      products[i].in_stock = 0;
      try {
        const newPurchaseOrder = await adminServiceF.postPurchaseOrder1(order);
        const updateStock = await adminServiceF.patchAllProducts(products);
        setEndOk(true);
        deleteProductCookie(idProduct);
      } catch (error) {
        setEndOk(false);
        console.error("Error al insertar datos:", error);
      }
    }

    alert("compra realizada con éxito");
  };

  return (
    <>
      <div className="containerF">
        <div className="row">
          <div className="column1">
            <img
              src="https://i.postimg.cc/02mCX6rw/cerrar.png"
              alt="close"
              onClick={onClose}
            />
          </div>
        </div>
        <div className="row">
          <div className="column2">
            <div className="image-container">
              <img
                src="https://i.postimg.cc/vZzHxQhC/visa.png"
                alt="Imagen 1"
                className="image"
              />
              <img
                src="https://i.postimg.cc/6QbWzYD0/mastercard.png"
                alt="Imagen 2"
                className="image imageTransparent"
              />
              <img
                src="https://i.postimg.cc/t4SGH72R/amex.png"
                alt="Imagen 3"
                className="image imageTransparent"
              />
              <img
                src="https://i.postimg.cc/28NzHqXP/paypal1.png"
                alt="Imagen 4"
                className="image imageTransparent"
              />
              <img
                src="https://i.postimg.cc/cLNNcV6Z/bitcoin.png"
                alt="Imagen 5"
                className="image imageTransparent"
              />
            </div>
          </div>
        </div>
        <div className="row central">
          <div className="column">
            <form className="myForm">
              <div className="dataCC1">
                <h4>Tus datos de pago</h4>
                <label>Titular de la tarjeta</label>
                <input type="text" placeholder="Vincent Picasso" />
                <label>Número de la tarjeta</label>
                <input type="text" placeholder="xxxx xxxx xxxx xxxx" />
              </div>
              <div className="dataCC2">
                <div className="smallData">
                  <label>Caducidad</label>
                  <input type="text" placeholder="MM/YYYY" className="dateCC" />
                </div>
                <div className="smallData">
                  <label>cvv</label>
                  <input type="text" placeholder="Ej. 123" className="cvv" />
                </div>
              </div>
              <div className="total">
                <h4>Monto total</h4>
                <h4 className="priceT">{total} EUR</h4>
                <input type="checkbox" defaultChecked></input>
                <label>Guardar para futuras compras</label>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <button className="btnPay" onClick={() => handlePay()}>
              Pagar ahora{" "}
              <img
                src="https://i.postimg.cc/FRtzfRxN/candado2.png"
                alt="pagar"
                className="btnIcon"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EndPurchase;