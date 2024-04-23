import { useState, useEffect } from 'react'
import './endPurchase.css'
import { useNavigate } from 'react-router-dom';
import '../shoppingCart/ShoppingCart';
import { useLocation } from 'react-router-dom';
import { adminServiceF } from "../../services/adminServiceF";
// import Swal from 'sweetalert';
// import Swal from 'sweetalert2';
import Cookies from 'js-cookie'; // Importa la biblioteca js-cookie


function EndPurchase({ onClose, data }) {

    const navigate = useNavigate();

    const location = useLocation();
    // const { total } = location.state;
    // const { data } = location.state;
    const { total, products } = data;
    // const total = data.total;
    // const products = data.products;//lista de products que llegan del carrito y que se van a comprar
    const [endOk, setEndOk] = useState(false);

    const [idUser, setIdUser] = useState(""); //usuario conectado, recuperado de localStorage

    const [purchaseOrder, setPurchaseOrder] = useState({
        id_purchase_order: "",
        date: "",
        status: "Preparation",
        id_user_fk: "",
        id_product_fk: ""
    });

    const cancelPay = () => {
        // history.push('/pagos');
        navigate('/ShoppingCart');
    };

    const handleCerrarComponente = () => {
        // Cambia el estado para ocultar el componente
        setMostrarComponente(false);

        // Navegar hacia atrás en el historial del navegador
        window.history.back();
    };


    const saveDate = () => {
        // Obtener la fecha de hoy
        const today = new Date();

        // Obtener el año, el mes y el día
        const year = today.getFullYear();
        // Los meses en JavaScript son 0-indexados, por lo que debes sumar 1 al mes
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Agrega cero a la izquierda si es necesario
        const day = String(today.getDate()).padStart(2, '0'); // Agrega cero a la izquierda si es necesario

        // Formatear la fecha en formato YYYY-MM-DD
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    };




    const deleteProductCookie = (index) => {

        // Obtener todas las cookies y convertirlas en una matriz de objetos JavaScript
        let cookies = Cookies.get('products');
        if (cookies) {
            cookies = JSON.parse(cookies);

            // Buscar y eliminar el producto con el id_producto dado
            const nuevasCookies = cookies.filter(producto => producto.id_product !== index);

            // Actualizar las cookies en el navegador con las nuevasCookies
            Cookies.set('products', JSON.stringify(nuevasCookies));


        };

    }


    useEffect(() => {

        const userCookie = Cookies.get('id_user');
        if (userCookie) {
            //   const user = JSON.parse(userCookie);
            setIdUser(userCookie);
        }

    }, []);

    const handlePay = async () => {


        const dateToday = saveDate();

        for (let i = 0; i < products.length; i++) {
            const objeto = products[i];
            const idProduct = objeto.id_product; // Extraemos el campo 'id' del producto actual
            const order = {
                id_purchase_order: "",
                date: dateToday,
                status: "Preparation",
                id_user_fk: idUser,
                id_product_fk: idProduct
            };
            setPurchaseOrder(order);
             products[i].in_stock = 0;
            try {
                const newPurchaseOrder = await adminServiceF.postPurchaseOrder1(order);
                const updateStock = await adminServiceF.patchAllProducts(products);
                setEndOk(true);
                //el producto se ha comprado, borrar de las cookies
                deleteProductCookie(idProduct);
               


            } catch (error) {
                setEndOk(false);
                console.error("Error al insertar datos:", error);
            }
        }
        if (endOk) {
            // Swal.fire({
            //     title: '¡Felicitaciones!',
            //     text: 'Su compra se realizó con éxito.',
            //     icon: 'success',
            //     confirmButtonText: 'Aceptar',
            //     position: 'center', // Puedes ajustar la posición si lo deseas
            //     customClass: {
            //         container: 'swal-container', // Clase personalizada para el contenedor del modal
            //     },
                
            // });
            alert("compra realizada con éxito");
            
        }

    }
// };


return (
    <>
        <div className="containerF">
            <div className="row">
                <div className="column1">
                    <img src='https://i.postimg.cc/02mCX6rw/cerrar.png' alt="close" onClick={onClose} />
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
                    <form className='myForm'>
                        <div className='dataCC1'>
                            <h4>Tus datos de pago</h4>
                            <label>Titular de la tarjeta</label>
                            <input type="text" placeholder="Vincent Picasso" />
                            <label>Número de la tarjeta</label>
                            <input type="text" placeholder="xxxx xxxx xxxx xxxx" />
                        </div>
                        <div className='dataCC2'>
                            <div className='smallData'>
                                <label>Caducidad</label>
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
