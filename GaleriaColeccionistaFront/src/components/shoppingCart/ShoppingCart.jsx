import { useEffect, useState } from 'react'
import './shoppingCart.css'
import '../endPurchase/EndPurchase'
// import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ShoppingCart() {

    //ESTE COMPONENTE DEBE RECUPERAR DE LOCALHISTORY LOS DATOS DE LOS ELEMENTOS PARA INSERTAR EN LA LISTA DEL CARRITO, Y CUANDO SE ELIMINE ALGUNO DE LA LISTA TAMBIEN
    // SE DEBE ACTUALIZAR LOCAL HISTORY, POR AHORA PONGO VARIOS ELEMENTOS DE PRUEBA

    // const history = useHistory();
    const navigate = useNavigate();

    const [productList2, setProductList2] = useState([]);

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('products'));
        if (storedProducts != null) {
            setProductList2(storedProducts);
        }

    }, []);



    // Calcular el total de los precios
    const totalPrecio = productList2.reduce((total, product) => total + parseFloat(product.price), 0);
    // URL de la imagen estática
    const imagenEstatica = "https://i.postimg.cc/ZRFNChK9/eliminar.png";

    // Manejador de clic para mostrar el número de fila en una alert
    const mostrarNumeroFila = (index) => {
        alert(`Número de fila: ${index + 1}`);
        eliminarProducto(index);
    };


    const eliminarProducto = (index) => {
        const nuevaLista = productList2.filter((product, idx) => idx !== index);
        setProductList2(nuevaLista);
        //actualizar localstorage
        localStorage.setItem('products', JSON.stringify(nuevaLista));
    };

    const handleEndPurchase = (total) => {
        // history.push('/pagos');
        navigate('/EndPurchase', { state: { total } });
    };

    const [highlightedIndex, setHighlightedIndex] = useState(null);

    const handleMouseEnter = (index) => {
        setHighlightedIndex(index);
    };

    const handleMouseLeave = () => {
        setHighlightedIndex(null);
    };


    return (
        <>
            <div className='mainContainer'>
                <table>
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Precio</th>
                            <th>Imagen Estática</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productList2.map((product, index) => (
                            <tr
                                key={product.id_product}
                                className={highlightedIndex === index ? 'highlighted' : ''}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <td><img src={product.url} alt="Imagen del producto" width="100" height="100" /></td>
                                <td>{product.id_product}</td>
                                <td>{product.title}</td>
                                <td>{product.price}</td>
                                <td onClick={() => mostrarNumeroFila(index)}><img src={imagenEstatica} alt="eliminar" width="40" height="40" /></td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="3">Total:</td>
                            <td>{totalPrecio.toFixed(2)}</td>
                            <td><button onClick={() => handleEndPurchase(totalPrecio.toFixed(2))} className='btnPay'>Finalizar compra</button></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}

export default ShoppingCart