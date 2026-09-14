import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [newAddress, setNewAddress] = useState({ street: '', city: '', state: '', zip: '', country: '' });
    const [loading, setLoading] = useState(true);

    // Redirect if not logged in
    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        axios.get('/addresses')
            .then(response => {
                setAddresses(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching addresses:", error);
                setLoading(false);
            });
    }, [user, navigate]);

    // Handle address selection
    const handleAddressChange = (e) => {
        setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
    };

    // Create a new address
    const createAddress = (e) => {
        e.preventDefault();
        axios.post('/addresses', { address: newAddress })
            .then(response => {
                setAddresses([...addresses, response.data]);
                setSelectedAddress(response.data.id);
                setNewAddress({ street: '', city: '', state: '', zip: '', country: '' });
            })
            .catch(error => {
                console.error("Error creating address:", error);
            });
    };

    // Place the order
    const placeOrder = () => {
        if (!selectedAddress) {
            alert("Please select or add a shipping address.");
            return;
        }
        axios.post('/cart/checkout', { address_id: selectedAddress })
            .then(response => {
                alert("Order placed successfully!");
                navigate("/orders");
            })
            .catch(error => {
                console.error("Error placing order:", error);
                alert("Failed to place order.");
            });
    };

    if (loading) return <div>Loading...</div>; 
        return (
            <div>
                <h2>Checkout</h2>
                <div className="mb-3">
                    <h5>Shipping Address</h5>
                    {addresses.length > 0 && (
                        <div className="form-group">
                            <select className="form-select" value={selectedAddress} onChange={(e) => setSelectedAddress(e.target.value)}>
                                <option value="">Select an address</option>
                                {addresses.map(address => (
                                    <option key={address.id} value={address.id}>
                                        {address.street}, {address.city}, {address.state} {address.zip}, {address.country}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    <hr />
                    <h6>Add New Address</h6>
                    <form onSubmit={createAddress} className="row g-3">
                        <div className="col-md-6">
                            <input type="text" className="form-control" name="street" placeholder="Street" value={newAddress.street} onChange={handleAddressChange} required />
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control" name="city" placeholder="City" value={newAddress.city} onChange={handleAddressChange} required />
                        </div>
                        <div className="col-md-4">
                            <input type="text" className="form-control" name="state" placeholder="State" value={newAddress.state} onChange={handleAddressChange} required />
                        </div>
                        <div className="col-md-4">
                            <input type="text" className="form-control" name="zip" placeholder="ZIP Code" value={newAddress.zip} onChange={handleAddressChange} required />
                        </div>
                        <div className="col-md-4">
                            <input type="text" className="form-control" name="country" placeholder="Country" value={newAddress.country} onChange={handleAddressChange} required />
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">Add Address</button>
                        </div>
                    </form>
                </div>
                <button className="btn btn-success" onClick={placeOrder}>Place Order</button>
            </div>
        );
};

export default Checkout;