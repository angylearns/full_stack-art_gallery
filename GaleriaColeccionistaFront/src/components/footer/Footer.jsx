import React from "react";
import "./footer.css";
import galeriaImg from "./images/galeriaImg.svg";
import faceImg from "./images/faceImg.svg";
import twitterImg from "./images/twitterImg.svg";
import instaImg from "./images/instaImg.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <img src={galeriaImg} alt="Logo" className="footer-logo" />
        <p className="rights">
          © 2023 - 2024 Galería del Coleccionista. Todos los derechos
          reservados.
        </p>
        <div className="social-icons">
          <a
            href="https://es-es.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={faceImg} alt="Icono 1" className="social-icon" />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={twitterImg} alt="Icono 2" className="social-icon" />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={instaImg} alt="Icono 3" className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
