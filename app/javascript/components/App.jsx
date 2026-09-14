import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

// Import components for different pages
import Navbar from './Navbar';
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Login from "./Login";
import Register from "./Register";
import Orders from "./Orders";
import { AuthProvider } from "./AuthContext";

const App = () => {
    // Set base URL for API calls and add JWT token to every request
    axios.defaults.baseURL = '/api/v1';
    axios.interceptors.request.use(config => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
    axios.interceptors.response.use(
        response => response,
        error => {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('jwtToken');
                window.location.href = '/login';
            }
            return Promise.reject(error);
        }
    );

    return (
        <AuthProvider>
            <BrowserRouter>
            <div className="container">
                <Navbar />
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/orders" element={<Orders />} />
                </Routes>
            </div>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;