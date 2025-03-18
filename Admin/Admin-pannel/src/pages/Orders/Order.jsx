import React, { useState, useEffect } from "react";
import "./Order.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

export const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      console.log("API Response:", response.data);

      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error(response.data.message || "Error fetching orders");
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error(error.response?.data?.message || "Failed to fetch orders");
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const newStatus = event.target.value;
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: newStatus,
      });

      if (response.data.success) {
        toast.success("Order status updated!");
        // ✅ Update order status locally instead of re-fetching all orders
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        toast.error(response.data.message || "Failed to update order status.");
      }
    } catch (error) {
      console.error("Status Update Error:", error);
      toast.error(error.response?.data?.message || "Error updating order status.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="order-container">
      <h2>All Orders</h2>
      <div className="order-list">
        {orders.map((item, index) => (
          <div className="order-item" key={index}>
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <div>
              <p className="order-item-food">
                {item.items.map((food, idx) =>
                  idx === item.items.length - 1
                    ? `${food.name} x ${food.quantity}`
                    : `${food.name} x ${food.quantity}, `
                )}
              </p>
              <p className="order-item-name">
                {item.address.firstname} {item.address.lastname}
              </p>
              <p className="order-item-address">
                {item.address.street}, {item.address.city}, {item.address.state}
              </p>
            </div>
            <p className="order-item-phone">Phone: {item.address.phone}</p>
            <p>Items: {item.items.length}</p>
            <p>Total: ${item.amount}</p>
            <select onChange={(event) => statusHandler(event, item._id)} value={item.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out of Delivery">Out of Delivery</option>
              <option value="Food Delivered">Food Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
