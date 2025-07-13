import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaPlusSquare, FaSignOutAlt, FaBox, FaShoppingCart, FaSearch } from 'react-icons/fa';
import Cookies from 'js-cookie';
import './Sidebar.css';

function Sidebar() {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('userName');
    Cookies.remove('authToken');
    navigate('/');
  };

  const toggleProducts = () => {
    setIsProductsOpen((prevState) => !prevState);
  };

  return (
    <div className={`sidebar-container`}>
      <div className="sidebar-header">
        <h2 className="logo">My App</h2>
      </div>

      <div className="sidebar-search">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      <nav>
        <NavLink 
          to={'/template'} 
          className={({ isActive }) => isActive ? 'sidebar-link active-link' : 'sidebar-link'}
        >
          <FaTachometerAlt className='sidebar-icon' />
          <span>Dashboard</span>
        </NavLink>

        <NavLink 
          to={'/users'} 
          className={({ isActive }) => isActive ? 'sidebar-link active-link' : 'sidebar-link'}
        >
          <FaUsers className='sidebar-icon' />
          <span>Users</span>
        </NavLink>

        <div className={`sidebar-link ${isProductsOpen ? 'active-link' : ''}`} onClick={toggleProducts}>
          <FaPlusSquare className='sidebar-icon' />
          <span>Products</span>
        </div>
        {isProductsOpen && (
          <div className='sub-links'>
            <NavLink 
              to={'/addProject'} 
              className={({ isActive }) => isActive ? 'sidebar-link active-link' : 'sidebar-link'}
            >
              Add Product
            </NavLink>
            <NavLink 
              to={'/showProduct'} 
              className={({ isActive }) => isActive ? 'sidebar-link active-link' : 'sidebar-link'}
            >
              Show Products
            </NavLink>
          </div>
        )}

        <NavLink 
          to={'/category'} 
          className={({ isActive }) => isActive ? 'sidebar-link active-link' : 'sidebar-link'}
        >
          <FaBox className='sidebar-icon' />
          <span>Category</span>
        </NavLink>

        <NavLink 
          to={'/orders'} 
          className={({ isActive }) => isActive ? 'sidebar-link active-link' : 'sidebar-link'}
        >
          <FaShoppingCart className='sidebar-icon' />
          <span>Orders</span>
        </NavLink>

        <button className='sidebar-link logout-button' onClick={handleLogout}>
          <FaSignOutAlt className='sidebar-icon' />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;
