import React from 'react';
import Sidebar from './Sidebar';
import Body from './Body';
import Navbar from './Navbar';
import './Template.css'
import electronics1 from '../assests/electonic1.png';
import electronics2 from '../assests/electonic2.png';
import electronics3 from '../assests/electonic3.png';

function Template() {
  return (
    <div>
      <Navbar />
      
      <div className="container-temp">
  
        <div className="dashboard-header">
          <h3 style={{ color: 'darkCyan', fontSize: '28px', fontWeight: 'bold', marginTop: '80px' }}>
            Welcome to Electronics Sales Dashboard!
          </h3>
          <p style={{ color: '#555', fontSize: '18px' }}>
            Track your sales, inventory, and performance in one place.
          </p>
        </div>
        
      
        <div className="dashboard-main">
          <Sidebar />
          <Body />
        </div>

        {/* Stylish Section with Images */}
        <div className="dashboard-images">
          <div className="image-card">
          <img src={electronics1} alt="Electronics Sales" className="dashboard-image" />

            <h4>Top Sellers</h4>
          </div>
          <div className="image-card">
          <img src={electronics2} alt="Electronics Sales" className="dashboard-image" />
            <h4>New Arrivals</h4>
          </div>
          <div className="image-card">
          <img src={electronics3} alt="Electronics Sales" className="dashboard-image" />
            <h4>Best Offers</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Template;
