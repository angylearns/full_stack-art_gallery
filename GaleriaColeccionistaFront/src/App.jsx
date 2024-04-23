
import './App.css'
import ShoppingCart from './components/shoppingCart/ShoppingCart'
import React from 'react';
import EndPurchase from './components/endPurchase/EndPurchase';
import ProductDetail from './components/productDetail/ProductDetail';
import AdminMenu from './components/adminMenu/AdminMenu'
import Login from './components/login/Login'
import Navbar from './components/navbar/Navbar'

import Artist from './views/Artist'
import Gallery from './views/Gallery'
import Home from './views/Home'




function App() {


  return (
    <>
      {/* <Login /> */}
      <Navbar />
      {/* <ShoppingCart /> */}
      {/* <ProductDetail /> */}
      <AdminMenu/>
      {/* <Navbar /> */}
      {/* <Artist /> */}
      {/* <Gallery/> */}
       {/* <Home/>  */}
    </>
  )
}

export default App



