import { useState, useEffect } from "react";
import "./navbar.css";
import logo from "../../images/logo.svg";
import search from "../../images/search.svg";
import login from "../../images/login.svg";
import logout from "../../images/logout.svg";
import home from "../../images/home.svg";
import shoppingCart from "../../images/shoppingCart.svg";
import line from "../../images/line.svg";
import Login from "../login/Login";
import { Link, Navigate } from "react-router-dom";
import ShoppingCart from "../shoppingCart/ShoppingCart";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [mostrarComponente, setMostrarComponente] = useState(false);
  const navigate = useNavigate();

  const handleOpenLogin = () => {
    console.log("Navbar.jsx handlepenlogin");
    setIsLoginOpen(true);
  };

  const [user, setUser] = useState(null);

  const handleLogout = () => {
    Cookies.remove("user_name");
    Cookies.remove("first_name");
    Cookies.remove("id_user");
    Cookies.remove("id_person");
    Cookies.remove("password");
    Cookies.remove("user_type");

    setUser(null);
    navigate("/");
    alert("vete ya a dormir ");
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  const handleLoginSuccess = (user) => {
    console.log("handleLoginSuccess " + JSON.stringify(user));
    console.log("handleLoginSuccess " + user);
    if (user) {
      setUser(JSON.parse(user));
    }
  };

  const handleClick = () => {
    setMostrarComponente(true);
  };

  const handleCerrarComponente = () => {
    setMostrarComponente(false);
  };

  return (
    <>
      <div className="container-navbar">
        <div className="icons-group">
          <div className="logo-and-gallery-button">
            <img src={logo} className="logo" alt="" />

            <Link to="/Gallery">
              <button className="gallery_button">GALERIA</button>
            </Link>

            <button className="home">
              <img src={home} alt="imghome" className="imghome" />
            </button>
          </div>

          <p className="navbaruserhello">
            {user ? `Hola, ${user.user_name}` : "¡Hola!"}
          </p>

          <form className="navbar-form">
            <input
              className="input-navbar"
              type="text"
              value=""
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </form>

          <img src={search} className="search" alt="" />

          <button onClick={handleOpenLogin} className="login">
            <img src={login} alt="imglogin" className="imglogin" />
          </button>

          <button onClick={handleLogout} className="logout">
            <img src={logout} alt="imglogout" className="imglogout" />
          </button>

          <img
            src={shoppingCart}
            className="shoppingcart"
            alt="shoppingcart"
            onClick={handleClick}
          />
        </div>

        <div className="linedivider">
          <img src={line} className="line" alt="line" />
        </div>

        <div className="login_logout">
          <Login
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
            onLogin={handleLoginSuccess}
          />
        </div>
        <div>
          {mostrarComponente && (
            <ShoppingCart onClose={handleCerrarComponente} />
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
