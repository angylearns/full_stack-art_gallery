import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import EndPurchase from './components/endPurchase/EndPurchase.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShoppingCart from './components/shoppingCart/ShoppingCart.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,

  <React.StrictMode>
    
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<App />} />
          <Route path="/EndPurchase" element={<EndPurchase />} />
          <Route path="/ShoppingCart" element={<ShoppingCart />} />

        </Routes>
      </BrowserRouter>
    
  </React.StrictMode >,

)
