import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './ShowProduct.css';
import axios from 'axios';

function ShowProduct() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editProduct, setEditProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://127.0.0.1:5000/product/getAll');
                if (response.status === 200) {
                    setProducts(response.data.data);
                    console.log(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch products.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await axios.delete(`http://127.0.0.1:5000/product/delete/${id}`);
                if (response.status === 200) {
                    alert('Product deleted successfully.');
                    setProducts(products.filter((product) => product._id !== id));
                }
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Failed to delete product.');
            }
        }
    };

    const handleEditClick = (product) => {
        setEditProduct(product);
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.patch(`http://127.0.0.1:5000/product/update/${editProduct._id}`, editProduct);
            if (response.status === 200) {
                alert('Product updated successfully.');
                setProducts(products.map((prod) =>
                    prod._id === editProduct._id ? { ...editProduct } : prod
                ));
                setEditProduct(null);
            }
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditProduct({ ...editProduct, [name]: value });
    };

    const handleInfoClick = (product) => {
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    return (
        <div className="container">
            <Navbar />
            <div className="main-content">
                <Sidebar />
                <div className="product-section">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="error">{error}</p>
                    ) : (
                        <table className="product-table">
                            <thead>
                                <tr>
                                    <th>SNO.</th>
                                    <th>Image</th>
                                    <th>Product</th>
                                    <th>Category</th>
                                    <th>Brand</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={product._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <img
                                                src={`http://localhost:5000/${product.image_url}`}
                                                alt={product.productName}
                                                className="product-image"
                                            />
                                        </td>
                                        <td>{product.productName}</td>
                                        <td>{product.Cat_details?.[0]?.name || 'N/A'}</td>
                                        <td>{product.Brand_details?.[0]?.name || 'N/A'}</td>
                                        <td>${product.product_price}</td>
                                        <td>
                                            <span
                                                className="info-icon"
                                                title="More information"
                                                onClick={() => handleInfoClick(product)}
                                                style={{ cursor: 'pointer', marginRight: '10px' }}
                                            >
                                                i
                                            </span>
                                            <button onClick={() => handleEditClick(product)} style={{ marginRight: '10px' }} className='edit'>
                                                Edit
                                            </button>
                                            <button onClick={() => handleDelete(product._id)} className='delete'>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {/* Info Modal */}
                    {selectedProduct && (
                        <div className="modal">
                            <div className="modal-content">
                                <h3>Product Details</h3>
                                <p><strong>_id:</strong> {selectedProduct._id}</p>
                                <p><strong>Product Name:</strong> {selectedProduct.productName}</p>
                                <p><strong>Category:</strong> {selectedProduct.Cat_details?.[0]?.name || 'N/A'}</p>
                                <p><strong>Brand:</strong> {selectedProduct.Brand_details?.[0]?.name || 'N/A'}</p>
                                <p><strong>Price:</strong> ${selectedProduct.product_price}</p>
                                <p><strong>Description:</strong> {selectedProduct.prodDesc}</p>
                                <button onClick={handleCloseModal}>Close</button>
                            </div>
                        </div>
                    )}

                    {/* Edit Modal */}
                    {editProduct && (
                        <div className="modal">
                            <div className="modal-content">
                                <h3>Edit Product</h3>
                                <form onSubmit={handleEditSubmit}>
                                    <label>
                                        Product Name:
                                        <input
                                            type="text"
                                            name="productName"
                                            value={editProduct.productName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </label>
                                    <label>
                                        Price:
                                        <input
                                            type="number"
                                            name="product_price"
                                            value={editProduct.product_price}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </label>
                                    <label>
                                        Description:
                                        <textarea
                                            name="prodDesc"
                                            value={editProduct.prodDesc}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </label>
                                    <button type="submit">Save</button>
                                    <button type="button" onClick={() => setEditProduct(null)}>
                                        Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ShowProduct;
