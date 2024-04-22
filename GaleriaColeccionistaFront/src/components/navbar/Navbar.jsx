import { useState, useEffect  } from 'react'
import './navbar.css'
import logo from "../../images/logo.svg";
import search from "../../images/search.svg";
import login from "../../images/login.svg";
import logout from "../../images/logout.svg";
import shoppingCart from "../../images/shoppingCart.svg";
import line from "../../images/line.svg";
import Login from '../login/Login';
import Swal from 'sweetalert2'


function Navbar() {

  const [isLoginOpen, setIsLoginOpen] = useState(false); // Declaración del estado isLoginOpen

  const handleOpenLogin = () => {
    console.log('Navbar.jsx handlepenlogin');
    setIsLoginOpen(true);
  };

  const [user, setUser] = useState(null); 
  // DESLOGUEARSE
  const handleLogout = () => {
    // Eliminar el usuario del almacenamiento local
    localStorage.removeItem('user');
    // Limpiar el estado del usuario en el componente
    setUser(null);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Ha cerrado sesión",
      showConfirmButton: false,
      timer: 1500
    });
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser);
        setUser(foundUser);
    }
}, []);

const handleLoginSuccess = (user) => {
  console.log('handleLoginSuccess '+ JSON.stringify(user));
  console.log('handleLoginSuccess '+ user);
  if (user) {
    setUser(JSON.parse(user)); // Actualiza el estado del usuario después de iniciar sesión
  }
  
};

  return (
    <>

      <div className='container-navbar'>

        <div className='icons-group'>

          <div className='logo-and-gallery-button'>
            <img src={logo} className='logo' alt="" />

            <button className='gallery_button'>GALERIA</button>

            
          </div>

           <p className='navbaruserhello'>{user ? `Hola, ${user.user_name}` : '¡Hola!'}</p>

  
          
            <form className='form'>
              <input className='input-navbar'
                type="text"
                // placeholder=""
                value=''
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </form>

            <img src={search} className='search' alt="" />
         

          {/* PROPS */}

          <button onClick={handleOpenLogin} className='login'>
            <img src={login} alt="login" />
          </button>

          <button onClick={handleLogout} className='logout'>
            <img src={logout} alt="logout" />
          </button>

          <img src={shoppingCart} className='shoppingcart' alt="shoppingcart" />
        </div>


        <div className='linedivider'>
          <img src={line} className='line' alt="line" />
        </div>

        <div className='login_logout'>
          <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLogin={handleLoginSuccess} />
        </div>

      </div>


    </>
  )
}

export default Navbar;