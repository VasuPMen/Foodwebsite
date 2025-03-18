import { useState, useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Placeorder.css";

const Placeorder = () => {
    const { getTotalAmount, token, food_list, cartItem, url } = useContext(StoreContext);
    
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
    });

    const [paymentMethod, setPaymentMethod] = useState(""); 
    const [showPayment, setShowPayment] = useState(false); 

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const confirmOrder = async () => {
        if (!token) {
            alert("Please log in before placing an order.");
            return;
        }
    
        if (!paymentMethod) {
            alert("Please select a payment method.");
            return;
        }
    
        let orderItems = [];
        food_list.forEach((item) => {
            if (cartItem && cartItem[item._id] && cartItem[item._id] > 0) {
                let itemInfo = { ...item, quantity: cartItem[item._id] };
                orderItems.push(itemInfo);
            }
        });
    
        let orderData = {
            userId: localStorage.getItem("userId"), // ✅ Fix: Include userId
            address: data,
            items: orderItems,
            amount: getTotalAmount() + 2,
            paymentMethod,
        };
    
        try {
            let response = await axios.post(url + "/api/order/place", orderData, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            if (response.data.success) {
                alert("Order placed successfully!");
                setShowPayment(false);
                window.location.href = "/myorders"; // Redirect to my orders
            } else {
                alert("Order placement failed: " + response.data.message);
            }
        } catch (error) {
            console.error("Error placing order:", error.response?.data || error.message);
            alert("Failed to place order. Please try again.");
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/cart');
        } else if (getTotalAmount() === 0) {
            navigate('/cart');
        }
    }, [token]);
    

    return (
        <div>
            <form className="place-order">
                <div className="place-order-left">
                    <p className="title">Delivery Information</p>
                    <div className="multi-fields">
                        <input type="text" name="firstName" onChange={onChangeHandler} value={data.firstName} placeholder="First Name" required />
                        <input type="text" name="lastName" onChange={onChangeHandler} value={data.lastName} placeholder="Last Name" required />
                    </div>
                    <input type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder="Email address" required />
                    <input type="text" name="street" onChange={onChangeHandler} value={data.street} placeholder="Street" required />
                    <div className="multi-fields">
                        <input type="text" name="city" onChange={onChangeHandler} value={data.city} placeholder="City" required />
                        <input type="text" name="state" onChange={onChangeHandler} value={data.state} placeholder="State" required />
                    </div>
                    <div className="multi-fields">
                        <input type="text" name="zipcode" onChange={onChangeHandler} value={data.zipcode} placeholder="Zipcode" required />
                        <input type="text" name="country" onChange={onChangeHandler} value={data.country} placeholder="Country" required />
                    </div>
                    <input type="number" name="phone" onChange={onChangeHandler} value={data.phone} placeholder="Phone Number" required />
                </div>

                <div className="place-order-right">
                    <div className="cart-total">
                        <h2>Cart Total</h2>
                        <div>
                            <div className="cart-total-details">
                                <p>Subtotal</p>
                                <p>${getTotalAmount()}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <p>Delivery Fee</p>
                                <p>{getTotalAmount() === 0 ? 0 : 2}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <p>Total</p>
                                <p>${getTotalAmount() === 0 ? 0 : getTotalAmount() + 2}</p>
                            </div>
                            <button type="button" onClick={() => setShowPayment(true)}>Proceed To Payment</button>
                        </div>
                    </div>
                </div>
            </form>

            {showPayment && (
                <div className="payment-modal">
                    <h2>Select Payment Method</h2>
                    <label>
                        <input type="radio" name="paymentMethod" value="Cash on Delivery" onChange={(e) => setPaymentMethod(e.target.value)} />
                        Cash on Delivery
                    </label>
                    <label>
                        <input type="radio" name="paymentMethod" value="UPI" onChange={(e) => setPaymentMethod(e.target.value)} />
                        UPI
                    </label>
                    <label>
                        <input type="radio" name="paymentMethod" value="Credit/Debit Card" onChange={(e) => setPaymentMethod(e.target.value)} />
                        Credit/Debit Card (Dummy)
                    </label>
                    <button onClick={confirmOrder}>Confirm Order</button>
                </div>
            )}
        </div>
    );
};

export default Placeorder;
