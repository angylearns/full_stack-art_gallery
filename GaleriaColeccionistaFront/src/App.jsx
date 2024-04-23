
import './App.css'
import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Router} from './router/Router';
import { RouterProvider } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
  <RouterProvider router= {Router}></RouterProvider>
  
</React.StrictMode>

)

export default App;



