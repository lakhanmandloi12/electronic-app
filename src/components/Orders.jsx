import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./Orders.css";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/order/getAll/${userId}`);
        if (response.data && Array.isArray(response.data.data)) {
          if (response.data.data.length === 0) {
            setError("No orders found.");
          } else {
            setOrders(response.data.data);
            setFilteredOrders(response.data.data);
          }
        } else {
          setError("Unexpected data format from API.");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders. Please try again later.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const handleSearch = () => {
    const results = orders.filter((order) =>
      order.Product?.[0]?.productName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredOrders(results);
  };
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.patch(`http://127.0.0.1:5000/order/update/${orderId}`, {
        newStatus, 
      });
  
      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
  
        setFilteredOrders((prevFilteredOrders) =>
          prevFilteredOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
    if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="orders-page">
        <Sidebar />
        <div className="orders-content">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search your orders here"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-box"
            />
            <button className="orderSearch" onClick={handleSearch}>
              Search Orders
            </button>
          </div>
          <div className="orders-container">
            {filteredOrders.map((order) => (
              <div className="order-card" key={order._id}>
                <div className="order-left">
                  <img
                    src={`http://127.0.0.1:5000/${order.Product?.[0]?.image_url?.replace("./", "") || "default-image.jpg"}`}
                    alt={order.Product?.[0]?.productName || "Product Image"}
                    className="order-image"
                    loading="lazy"
                  />
                </div>
                <div className="order-middle">
                  <h3 className="order-name">
                    {order.Product?.[0]?.productName || "Product Name Not Available"}
                  </h3>
                </div>
                <div className="order-right">
                  <p style={{ color: "black" }}>Price: ₹{order.price}</p>
                  <p>
                    Status: 
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    >
                      <option value="Pending" className="pending">Pending</option>
                      <option value="Shift" className="shift">Shift</option>
                      <option value="Delevered" className="delevered">Delevered</option>
                      <option value="Cancelled" className="cancelled">Cancelled</option>
                    </select>
                  </p>
                  <p>User Id: {order.user_id}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
