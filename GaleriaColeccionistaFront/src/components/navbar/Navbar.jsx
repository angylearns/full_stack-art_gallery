import { useState } from 'react'
import './navbar.css'
import logo from "../../images/logo.svg";
import search from "../../images/search.svg";
import login from "../../images/login.svg";
import logout from "../../images/logout.svg";
import shoppingCart from "../../images/shoppingCart.svg";
import line from "../../images/line.svg";



function Navbar() {


  return (
    <>

      <div className='container-navbar'>
        <div className='logo_gallery'>
          <div className='logo_gallery'>
            <img src={logo} className='logo' alt="" />
            {/* <p>GALERIA</p> */}
            <button className='gallery_button'>GALERIA</button>
            </div>

            <form className='form'>
              <input
                type="text"
                placeholder="Buscar..."
                value=''
                onChange=''
              />
              <img src={search} className='search' alt="" />
              {/* <p>BUSCAR</p> */}
            </form>
          
            <img src={login} className='login' alt="login" />
            <img src={logout} className='logout' alt="logout" />
            <img src={shoppingCart} className='shoppingcart' alt="shoppingcart" />
        
        </div>

        <div className='linedivider'>

          <img src={line} className='line' alt="line" />

        </div>

      </div>



    </>
  )
}

export default Navbar;