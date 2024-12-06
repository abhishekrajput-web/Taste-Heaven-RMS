import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import './index.css';
import {AuthProvider} from "./context/auth";
import {SearchProvider} from "./context/search";
import { CartProvider } from './context/cart.jsx';
import 'antd/dist/reset.css';
ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
    <App />
        </CartProvider>
      </SearchProvider>
    </AuthProvider>
)
