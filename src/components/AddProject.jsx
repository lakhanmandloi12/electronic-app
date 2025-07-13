import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './Addproject.css';

function AddProject() {
  const [cat_id, setCatId] = useState('');
  const [brand_id, setBrandId] = useState('');
  const [productName, setProdName] = useState('');
  const [product_price, setProdPrice] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [image_url, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const validateForm = () => {
    if (!cat_id || !brand_id || !productName || !prodDesc || !image_url) {
      alert("Please fill all the fields.");
      return false;
    }
    if (product_price <= 0) {
      alert("Product price must be a positive number.");
      return false;
    }
    return true;
  };

  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];
    if (!selectedImage) return;

  
    if (!selectedImage.type.startsWith('image/')) {
      alert("Please upload a valid image file.");
      return;
    }


    if (selectedImage.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB.");
      return;
    }

    setImage(selectedImage);
  };

  async function addProduct(e) {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('cat_id', cat_id);
    formData.append('brand_id', brand_id);
    formData.append('productName', productName);
    formData.append('product_price', product_price);
    formData.append('prodDesc', prodDesc);
    formData.append('image_url', image_url);

    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:5000/product/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        alert("Product Added Successfully!");

        setCatId('');
        setBrandId('');
        setProdName('');
        setProdPrice('');
        setProdDesc('');
        setImage(null);
      } else {
        alert("Failed to Add Product. Please try again.");
      }
    } catch (error) {
      setError('There was an error adding the product. Please try again later.');
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <div className="body-content" style={{ marginTop: '100px' }}>
          <div className='products'>
            <h2>Add Product</h2>
            {error && <div className="error-message">{error}</div>}
            <div className='inputs-product'>
              <input
                type="text"
                placeholder="Enter Category ID (cat_id)"
                onChange={(e) => setCatId(e.target.value)}
                value={cat_id}
              />
              <br />
              <input
                type="text"
                placeholder="Enter Brand ID (brand_id)"
                onChange={(e) => setBrandId(e.target.value)}
                value={brand_id}
              />
              <br />
              <input
                type="text"
                placeholder="Enter Product Name (productName)"
                onChange={(e) => setProdName(e.target.value)}
                value={productName}
              />
              <br />
              <input
                type="number"
                placeholder="Enter Product Price (product_price)"
                onChange={(e) => setProdPrice(e.target.value)}
                value={product_price}
              />
              <br />
              <textarea
                placeholder="Enter Product Description (prodDesc)"
                onChange={(e) => setProdDesc(e.target.value)}
                value={prodDesc}
              />
              <br />
              <input
                type="file"
                onChange={handleFileChange}
              />
              <br />
            </div>
            <div>
              <button className="btn" onClick={addProduct} disabled={loading}>
                {loading ? 'Adding...' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProject;
