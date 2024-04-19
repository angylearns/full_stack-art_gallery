import { useState } from 'react'
import './navbar.css'
import logo from "../../images/logo.svg";
import search from "../../images/search.svg";
import login from "../../images/login.svg";
import logout from "../../images/logout.svg";
import shoppingCart from "../../images/shoppingCart.svg";
import line from "../../images/line.svg";
import Login from '../login/Login';


function Navbar() {

  const [isLoginOpen, setIsLoginOpen] = useState(false); // Declaración del estado isLoginOpen

  const handleOpenLogin = () => {

    setIsLoginOpen(true);
  };
  const handleCloseLogin = () => {

    setIsLoginOpen(false);
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
                onChange=''
              />
            </form>

            <img src={search} className='search' alt="" />

            <img src={shoppingCart} className='shoppingcart' alt="shoppingcart" />
          </div>



          <div className='login_logout'>

            <Login isOpen={isLoginOpen} onClose={handleCloseLogin}>

              <button onClick={handleOpenLogin}>
                <img src={login} className='login' alt="login" />
              </button>

              <button onClick={handleCloseLogin}>
                <img src={logout} className='logout' alt="logout" />
              </button>

            </Login>

          </div>
        </div>

        <div className='linedivider'>

          <img src={line} className='line' alt="line" />

        </div>

      </div >

    </>
  )
}

export default Navbar;