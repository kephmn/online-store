import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    // Redirect if not logged in
    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        // Fetch cart items on component mount
        fetchCart();
    }, [user, navigate]);

    // Fetch current cart
    const fetchCart = () => {
        axios.get('/cart')
            .then(response => {
                setCart(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching cart:", error);
                setLoading(false);
            });
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return;
        axios.put('/cart/update_item', { product_id: productId, quantity })
            .then(() => fetchCart())
            .catch(error => console.error("Error updating quantity:", error));
    }

    // Remove item from cart
    const removeItem = (productId) => {
        axios.delete('/cart/remove_item', { data: { product_id: productId } })
            .then(() => fetchCart())
            .catch(error => console.error("Error removing item from cart:", error));
    };

    // Clear entire cart
    const clearCart = () => {
        axios.delete('/cart/clear')
            .then(() => fetchCart())
            .catch(error => console.error("Error clearing cart:", error));
    };

    // Proceed to checkout
    const proceedToCheckout = () => {
        navigate("/checkout");
    };
    
    if (loading) { return <div>Loading cart...</div>; }
    if (!cart || cart.cart_items.length === 0) { 
        return <div className="alert alert-info">Your cart is empty.</div>; 
    }

    return (
        <div>
            <h2>Your Cart</h2>
            <ul className="list-group mb-3">
                {cart.cart_items.map(item => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{item.product.name}</strong> - ${parseFloat(item.product.price).toFixed(2)}
                            <div className="btn-group ms-3" role="group">
                                <button className="btn btn-outline-secondary btn-sm" onClick={() => updateQuantity(item.product_id, item.quantity - 1)}>-</button>
                                <span className="mx-2">{item.quantity}</span>
                                <button className="btn btn-outline-secondary btn-sm" onClick={() => updateQuantity(item.product_id, item.quantity + 1)}>+</button>
                                </div>
                        </div>
                        <div>
                            <span className="badge bg-primary rounded-pill">${(item.product.price * item.quantity).toFixed(2)}</span>
                            <button className="btn btn-danger btn-sm ms-3" onClick={() => removeItem(item.product_id)}>Remove</button>
                        </div>
                        </li>
                ))}
            </ul>
            <div className="d-flex justify-content-between align-items-center">
                <h4>Total: ${parseFloat(cart.total_price).toFixed(2)}</h4>
                <div>
                    <button className="btn btn-secondary me-2" onClick={clearCart}>Clear Cart</button>
                    <button className="btn btn-success" onClick={proceedToCheckout}>Proceed to Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;