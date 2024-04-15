import { useEffect, useState } from 'react'
import './App.css'
import Gallery from './components/gallery/Gallery'
import ShoppingCart from './components/shoppingCart/ShoppingCart'
import React from 'react';
import EndPurchase from './components/endPurchase/EndPurchase';
import ProductDetail from './components/productDetail/ProductDetail';
import AdminMenu from './components/adminMenu/AdminMenu'

function App() {
  

  return (
    <>
      {/* <ShoppingCart/> */}
    {/* <ProductDetail /> */}
    <AdminMenu/>
    </>
  )
}

export default App
