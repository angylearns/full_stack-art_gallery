import { useState } from 'react'
import './endPurchase.css'
import { useNavigate } from 'react-router-dom';
import '../shoppingCart/ShoppingCart';
import { useLocation } from 'react-router-dom';
import { adminServiceF } from "../../services/adminServiceF";

function EndPurchase() {

    const navigate = useNavigate();

    const location = useLocation();
    // const { total } = location.state;
    const { data } = location.state;
    const total = data.total;
    const products = data.products;//lista de products que llegan del carrito y que se van a comprar

    const cancelPay = () => {
        // history.push('/pagos');
        navigate('/ShoppingCart');
    };

    const handlePay = async () => {
               
       // await deletePerson(index);
        //............................................. ojo .............................................................
        //para pagar necesito los datos del usuario registrado en concreto id_user_fk = id_user, de momento harcodeo para probar
        //necesito el id de todos los productos del carrito para crear un registro en la tabla purchase order por cada producto 
        //para el usuario indicado, productos ya los tengo en products

        const purchaseOrder = {
            id_purchase_order: "",
            date: "2024-03-25",
            status: 'Preparation',
            id_user_fk: "15",
            id_product_fk: "6"
        }

        try {
            const newPurchaseOrder = await adminServiceF.postPurchaseOrder1(purchaseOrder);
        } catch (error) {
            console.error("Error al insertar datos:", error);
        }

    };
    

    return (
        <>
            <div className="containerF">
                <div className="row">
                    <div className="column1">
                        <img src='https://i.postimg.cc/02mCX6rw/cerrar.png' alt="close" onClick={() => cancelPay()}/>
                    </div>
                </div>
                <div className="row">
                    <div className="column2">
                        {/* Contenido de la fila 2, que son las imagenes de los métodos de pago*/}
                        <div className="image-container">
                            <img src="https://i.postimg.cc/vZzHxQhC/visa.png" alt="Imagen 1" className="image" />
                            <img src="https://i.postimg.cc/6QbWzYD0/mastercard.png" alt="Imagen 2" className="image imageTransparent" />
                            <img src="https://i.postimg.cc/t4SGH72R/amex.png" alt="Imagen 3" className="image imageTransparent" />
                            <img src="https://i.postimg.cc/28NzHqXP/paypal1.png" alt="Imagen 4" className="image imageTransparent" />
                            <img src="https://i.postimg.cc/cLNNcV6Z/bitcoin.png" alt="Imagen 5" className="image imageTransparent" />
                        </div>
                    </div>
                </div>
                <div className="row central">
                    <div className="column">
                        {/* Contenido de la fila 3 (central con formulario) */}
                        <form>
                            <div className='dataCC1'>
                                <h4>Tus datos de pago</h4>
                                <label>Titular de la tarjeta</label>
                                <input type="text" placeholder="Vincent Picasso" />
                                <label>Número de la tarjeta</label>
                                <input type="text" placeholder="xxxx xxxx xxxx xxxx" />
                            </div>
                            <div className='dataCC2'>
                                <div className='smallData'>
                                    <label>Fecha de vencimiento</label>
                                    <input type="text" placeholder="MM/YYYY" className='dateCC' />
                                </div>
                                <div className='smallData'>
                                    <label>cvv</label>
                                    <input type="text" placeholder="Ej. 123" className='cvv' />
                                </div>
                            </div>
                            <div className='total'>
                                <h4>Monto total</h4>
                                <h4 className='priceT'>{total} EUR</h4>
                                <input type='checkbox' defaultChecked></input><label>Guardar para futuras compras</label>
                            </div>
                        </form>

                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <button className='btnPay' onClick={() => handlePay()}>Pagar ahora <img src="https://i.postimg.cc/FRtzfRxN/candado2.png" alt="pagar" className='btnIcon' /></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EndPurchase
