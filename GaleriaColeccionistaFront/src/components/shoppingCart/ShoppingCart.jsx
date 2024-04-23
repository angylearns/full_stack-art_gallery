import { useEffect, useState } from 'react'
import './shoppingCart.css'
import '../endPurchase/EndPurchase'
// import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function ShoppingCart() {

    const navigate = useNavigate();

    const [productList2, setProductList2] = useState([]);

    // Calcular el total de los precios
    const totalPrecio = productList2.reduce((total, product) => total + parseFloat(product.price), 0);
    // URL de la imagen estática
    const imagenEstatica = "https://i.postimg.cc/ZRFNChK9/eliminar.png";

    const data = {
        total: totalPrecio,
        products: productList2
    };

    useEffect(() => {

        // Recuperar los datos de la cookie
        const storedProductsCookie = getCookie('products');

        if (storedProductsCookie != null) {
            const storedProducts = JSON.parse(storedProductsCookie);
            setProductList2(storedProducts)
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

    // Manejador de clic para mostrar el número de fila en una alert
    const mostrarNumeroFila = (index) => {
         alert(`Número de fila: ${index + 1}`);
        eliminarProducto(index);
    };


    const eliminarProducto = (index) => {
        const nuevaLista = productList2.filter((product, idx) => idx !== index);
        // const nuevaLista = productList2.filter(product => product.id_product !== index);

        setProductList2(nuevaLista);
        //actualizar localstorage
        // localStorage.setItem('products', JSON.stringify(nuevaLista));


        // Borrar la cookie 'products' si existe
        if (Cookies.get('products')) {
            Cookies.remove('products');
        }

        // Establecer la nueva cookie con nuevaLista
        Cookies.set('products', JSON.stringify(nuevaLista));
    };

    const handleEndPurchase = (total) => {
        // history.push('/pagos');
        // navigate('/EndPurchase', { state: { total } });
        navigate('/EndPurchase', { state: { data } });
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
            <div className='mainContainer1'>
                <table className='tableM'>
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Precio</th>
                            <th></th>
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
                                <td><img src={product.url} alt="Imagen del producto" className='imgProduct' /></td>
                                <td>{product.id_product}</td>
                                <td>{product.title}</td>
                                <td>{product.price} eur</td>
                                <td onClick={() => mostrarNumeroFila(index)}><img src={imagenEstatica} alt="eliminar" className='imgDelete' /></td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="3">Total:</td>
                            <td>{totalPrecio.toFixed(2)} eur</td>
                            <td><button onClick={() => handleEndPurchase(totalPrecio.toFixed(2))} className='btnPay'>Pagar</button></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}

export default ShoppingCart