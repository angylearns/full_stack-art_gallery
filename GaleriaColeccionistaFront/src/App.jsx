import { useState } from 'react'
import './App.css'
import Gallery from './components/gallery/Gallery'
import ShoppingCart from './components/shoppingCart/ShoppingCart'

import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EndPurchase from './components/endPurchase/EndPurchase';

function App() {
  

  return (
    <>
      <ShoppingCart/>
      {/* <Router>
      <Switch>
        <Route exact path="/pagos" component={Pagos} />
        {/* Otras rutas si es necesario */}
        {/* <Route exact path="/otraRuta" component={OtroComponente} /> */}
      {/* </Switch>
    </Router> */} 
    </>
  )
}

export default App
