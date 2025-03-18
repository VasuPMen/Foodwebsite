import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";
import "./Myorders.css";

export const MyOrders = () => {
    const [data, setData] = useState([]);
    const { url, token } = useContext(StoreContext);
    const userId = localStorage.getItem("userId");

    const fetchOrders = async () => {
        try {
            // Changed from GET to POST to match the server route
            const response = await axios.post(`${url}/api/order/userorder/${userId}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data.success) {
                setData(response.data.orders);
                console.log(response.data.orders);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        if (token && userId) {
            fetchOrders();
        }
    }, [token, userId]);

    return (
        <div className="my-orders">
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order, index) => (
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="Order Icon" />
                        <p>
                            {order.items
                                .map((item,index) =>{
                                    if(index === order.items.length-1){
                                        return item.name + " X " + item.quantity
                                    }
                                    else{
                                        return item.name + " X " + item.quantity + ","
                                    }
                                })}
                        </p>
                        <p>
                            ${order.amount}.00
                        </p>
                        <p>Items:{order.items.length}</p>
                        <p><span>&#x25cf;</span><b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;