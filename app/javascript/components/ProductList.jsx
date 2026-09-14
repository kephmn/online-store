import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Fetch products, optionally filtered by category
  const fetchProducts = (categoryId = '') => {
    setLoading(true);
    const url = categoryId ? `/products?category_id=${categoryId}` : '/products';
    axios.get(url)
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products', err);
        setLoading(false);
      });
  };

  // Fetch categories for the dropdown
  useEffect(() => {
    axios.get('/categories')
      .then(res => {
        setCategories(res.data);
      })
      .catch(err => console.error('Error fetching categories', err));
  }, []);

  // Initial product fetch
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle category filter change
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    fetchProducts(categoryId);
  };

  // Add product to cart
  const addToCart = (productId) => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }
    axios.post('/cart/add_item', { product_id: productId, quantity: 1 })
      .then(() => {
        alert('Added to cart!');
      })
      .catch(err => {
        console.error('Error adding to cart', err);
        alert('Failed to add to cart');
      });
  };

  if (loading) {
    return <div className="text-center">Loading products...</div>;
  }

  return (
    <div>
      {/* Category filter dropdown */}
      <div className="mb-4">
        <label htmlFor="categoryFilter" className="form-label">Filter by Category:</label>
        <select
          id="categoryFilter"
          className="form-select w-auto"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description.substring(0, 100)}...</p>
                <p className="card-text"><strong>${parseFloat(product.price).toFixed(2)}</strong></p>
                <p className="card-text"><small className="text-muted">{product.category_name}</small></p>
                <Link to={`/products/${product.id}`} className="btn btn-primary btn-sm me-2">View</Link>
                <button className="btn btn-success btn-sm" onClick={() => addToCart(product.id)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;