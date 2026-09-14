import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    // Fetch orders on component mount
    useEffect(() => {
        if (!user) return; // Ensure user is logged in
        axios.get('/orders')
            .then(response => {
                setOrders(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching orders:", error);
                setLoading(false);
            });
    }, [user]);
    
    if (loading) return <div>Loading orders...</div>;

    if (orders.length === 0) {
        return <div className="alert alert-info">You have no orders.</div>;
    }

    return (
        <div>
            <h2>Your Orders</h2>
            {orders.map(order => (
                <div key={order.id} className="card mb-3">
                    <div className="card-header d-flex justify-content-between">
                        <span>Order #{order.id}</span>
                        <span>Status: <span className="badge bg-primary">{order.status}</span></span>
                        <span>Total: ${order.total.toFixed(2)}</span>
                    </div>
                    <div className="card-body">
                        <ul className="list-group">
                            {order.order_items.map(item => (
                                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>{item.product.name} x {item.quantity}</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="card-footer text-muted">
                        Placed on: {new Date(order.created_at).toLocaleDateString()}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Orders;
