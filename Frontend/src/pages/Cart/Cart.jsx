import { useContext, useEffect } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const { cartItem, food_list, removeFromCart, getTotalAmount, url } = useContext(StoreContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("cartItem:", cartItem);
        console.log("food_list:", food_list);
        console.log("getTotalAmount:", getTotalAmount);
        console.log("url:", url);
    }, [cartItem, food_list]);

    // ✅ Prevent crash by checking if `food_list` or `cartItem` is empty
    if (!food_list.length) {
        return <h2>Loading cart...</h2>;
    }

    return (
        <div className="cart">
            <div className="cart-item">
                <div className="cart-item-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <hr />
                {food_list.map((item) =>
                    cartItem?.[item._id] > 0 ? (
                        <div key={item._id} className="cart-items-item">
                            <div className="cart-item-title">
                                <img 
                                    src={`${url}/images/${item.image}`} 
                                    alt={item.name} 
                                    onError={(e) => { 
                                        console.error("Image failed to load:", e.target.src);
                                        e.target.src = "/fallback.jpg";
                                    }} 
                                />
                                <p>{item.name}</p>
                                <p>${item.price}</p>
                                <p>{cartItem[item._id]}</p>
                                <p>${(cartItem[item._id] * item.price).toFixed(2)}</p>
                                <p className="cross" onClick={() => removeFromCart(item._id)}>X</p>
                            </div>
                            <hr />
                        </div>
                    ) : null
                )}
            </div>

            <div className="cart-bottom">
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
                        <button onClick={() => navigate('/order')}>Proceed To Checkout</button>
                    </div>
                </div>

                <div className="cart-promocode">
                    <p>If you have a promo code, enter it here</p>
                    <div className="cart-promocode-input">
                        <input type="text" placeholder="Enter promo code" />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
