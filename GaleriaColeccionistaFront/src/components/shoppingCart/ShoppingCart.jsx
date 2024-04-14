import { useState } from 'react'
import './shoppingCart.css'
import '../endPurchase/EndPurchase'
// import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ShoppingCart() {

    // const history = useHistory();
    const navigate = useNavigate();

    const [productList, setProductList] = useState([
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
        },
        {
            id_product: "2",
            title: "Producto 2",
            price: "20",
            material: "Material 2",
            dimension: "Dimension 2",
            in_stock: true,
            style: "Estilo 2",
            id_purchase_order: "2",
            url: "https://i.postimg.cc/tCfhFKYv/popArt1.png"
        },
        {
            id_product: "3",
            title: "Producto 3",
            price: "30",
            material: "Material 3",
            dimension: "Dimension 3",
            in_stock: true,
            style: "Estilo 3",
            id_purchase_order: "3",
            url: "https://i.postimg.cc/tCfhFKYv/popArt1.png"
        }
    ]);

    // Calcular el total de los precios
    const totalPrecio = productList.reduce((total, product) => total + parseFloat(product.price), 0);
    // URL de la imagen estática
    const imagenEstatica = "https://i.postimg.cc/ZRFNChK9/eliminar.png";

    // Manejador de clic para mostrar el número de fila en una alert
    const mostrarNumeroFila = (index) => {
        alert(`Número de fila: ${index + 1}`);
        eliminarProducto(index);
    };

    const eliminarProducto = (index) => {
        const nuevaLista = productList.filter((product, idx) => idx !== index);
        setProductList(nuevaLista);
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
                        {productList.map((product, index) => (
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