import React from 'react';
import "./hero.css";
import image2 from './images/image2.svg'
import imageHero from './images/imageHero.svg'


const Hero = () => {
  return (
    <div className="hero-container">
      {/* <p className='text-image-2'>NEO POP</p> */}
      <img src={image2} alt="Imagen 1" className="hero-image-text" />
      <img src={imageHero} alt="Imagen 2" className="hero-image" />
    </div>
  );
}

export default Hero;
