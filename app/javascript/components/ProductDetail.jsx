import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";

const ProductDetail = () => {
    // Get product ID from URL parameter
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    // State for product data, loading status, and quantity to add
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    // Fetch product data from API when component mounts or ID changes
    useEffect(() => {
        axios.get(`/products/${id}`)
            .then(response => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching product:", error);
                setLoading(false);
                navigate("/"); // Redirect to home if product not found
            });
    }, [id, navigate]);

    // Handle adding product to cart
    const handleAddToCart = () => {
        if (!user) {
            alert("Please login to add items to cart.");
            navigate("/login"); // Redirect to login if user is not authenticated
            return;
        }
        axios.post("/cart/add_item", { product_id: id, quantity })
            .then(response => {
                alert(`Added ${quantity} item(s) to cart!`);
                navigate("/cart"); // Redirect to cart after adding item
            })
            .catch(error => {
                console.error("Error adding to cart:", error);
                alert("Failed to add item to cart. Please try again.");
            });
    };

    // Show loading state
    if (loading) {
        return <div className="text-center">Loading product details...</div>;
    }

    // If product not found, show message
    if (!product) {
        return <div className="text-center">Product not found.</div>;
    }

    // Render product details
    return (
        <div className="row">
            <div className="col-md-6">
                {/* Placeholder for product image; you can add image attribute to Product model */}
                <div className="bg-light p-5 text-center">
                    <h3>Product Image</h3>
                    <p className="text-muted">(Image placeholder)</p>
                </div>
            </div>
            <div className="col-md-6">
                <h2>{product.name}</h2>
                <p className="lead">{product.description}</p>
                <h3 className="text-success">${parseFloat(product.price).toFixed(2)}</h3>
                <p><strong>Category:</strong> {product.category_name}</p>

                <div className="mt-4">
                    <div className="row g-2 align-items-center">
                        <div className="col-auto">
                            <label htmlFor="quantity" className="col-form-label">Quantity:</label>
                        </div>
                        <div className="col-auto">
                            <input
                                type="number"
                                id="quantity"
                                className="form-control"
                                value={quantity}
                                min="1"
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                style={{ width: "80px" }}
                            />
                        </div>
                        <div className="col-auto">
                            <button className="btn btn-primary" onClick={handleAddToCart}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <button className="btn btn-secondary" onClick={() => navigate('/')}>
                        Back to Products
                    </button>

            </div>
                </div>
        </div>
    );
};

export default ProductDetail;