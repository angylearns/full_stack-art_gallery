import { useState } from 'react'
import './navbar.css'
import logo from "../../images/logo.svg";
import search from "../../images/search.svg";
import login from "../../images/login.svg";
import logout from "../../images/logout.svg";
import shoppingCart from "../../images/shoppingCart.svg";
import line from "../../images/line.svg";
import Login from '../login/Login';


function Navbar({ onClick }) {

  const [isLoginOpen, setIsLoginOpen] = useState(false); // Declaración del estado isLoginOpen

  const handleOpenLogin = () => {

    setIsLoginOpen(true);
  };
  // const handleCloseLogin = () => {

  //   setIsLoginOpen(false);
  // };

  
  // DESLOGUEARSE
  const handleLogout = () => {
    // Eliminar el usuario del almacenamiento local
    localStorage.removeItem('user');
    // Limpiar el estado del usuario en el componente
    setUser(null);
};



  return (
    <>

      <div className='container-navbar'>

        <div className='fullicons'>

          <div className='icons-group'>

            <img src={logo} className='logo' alt="" />

            <button className='gallery_button'>GALERIA</button>

            <form className='form'>
              <input
                type="text"
                placeholder="Buscar..."
                value=''
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </form>

            <img src={search} className='search' alt="" />


            {/* PROPS */}

            <button onClick={handleOpenLogin}>
              <img src={login} className='login' alt="login" />
            </button>

            {/* Corrección: Usar setIsLoginOpen para cambiar el estado y cerrar el modal */}
            <button onClick={handleLogout}>
              <img src={logout} className='logout' alt="logout" />
            </button>

            <img src={shoppingCart} className='shoppingcart' alt="shoppingcart" />
          </div>
          <div className='linedivider'>

            <img src={line} className='line' alt="line" />

          </div>
          {/* Corrección: Pasar isLoginOpen y la función para cerrar el modal como props a Login */}
          <div className='login_logout'>
            <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
          </div>
        </div>


      </div >

    </>
  )
}

export default Navbar;