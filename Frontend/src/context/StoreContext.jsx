import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
    const [food_list, setFoodList] = useState([]); 
    const [cartItem, setCartItem] = useState({});
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const url = "http://localhost:3000";

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data.success) {
                setFoodList(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching food list", error);
        }
    };
    
    const loadCartData = async (token) => {
        try {
            const response = await axios.get(`${url}/api/cart/get`, {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            // Ensure cart is always an object
            setCartItem(response.data.cart || {});
        } catch (error) {
            console.error("Error loading cart data:", error.response?.data || error.message);
            setCartItem({}); // Fallback to an empty object
        }
    };
    
    
    useEffect(() => {
        async function loadData() {
            await fetchFoodList();

            const token = localStorage.getItem("token");
            if (token) {
                setToken(token);
                await loadCartData(token);
            } else {
                console.warn("No token found. User may not be logged in.");
            }
        }
        loadData();
    }, []);

    const addToCart = async (itemId) => {
        const userId = localStorage.getItem("userId");
    
        if (!userId) {
            console.error("User ID is missing. Please log in.");
            alert("Please log in to add items to the cart.");
            return;
        }
    
        // Ensure `cartItem` is initialized
        setCartItem((prev = {}) => ({
            ...prev,
            [itemId]: (prev?.[itemId] || 0) + 1,
        }));
    
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token is missing. Please log in.");
            alert("Please log in to continue.");
            return;
        }
    
        try {
            await axios.post(url + "/api/cart/add",
                { userId, itemId }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (error) {
            console.error("Error adding to cart:", error.response?.data || error.message);
        }
    };
    
    
    const removeFromCart = async (itemId) => {
        const userId = localStorage.getItem("userId");
    
        if (!userId) {
            console.error("User ID is missing. Please log in.");
            alert("Please log in to modify your cart.");
            return;
        }
    
        // Ensure cartItem is defined and contains itemId
        if (!cartItem?.[itemId]) {
            console.warn(`Item ${itemId} not found in cart.`);
            return;
        }
    
        setCartItem((prev = {}) => {
            const updatedCart = { ...prev };
            updatedCart[itemId] = prev[itemId] - 1;
            if (updatedCart[itemId] <= 0) {
                delete updatedCart[itemId]; // Remove if quantity is 0
            }
            return updatedCart;
        });
    
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("Token is missing. Please log in.");
            alert("Please log in to continue.");
            return;
        }
    
        try {
            const response = await axios.post(url + "/api/cart/remove",
                { userId, itemId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
    
            if (!response.data.success) {
                console.error("Backend error:", response.data.message);
            }
        } catch (error) {
            console.error("Error removing from cart:", error.response?.data || error.message);
        }
    };
    
    
    const getTotalAmount = () => {
        return food_list.reduce((acc, item) => {
            return acc + (cartItem?.[item._id] || 0) * item.price;
        }, 0);
    };

    const contextValue = {
        food_list,
        cartItem,
        addToCart,
        removeFromCart,
        getTotalAmount,
        url,
        token,
        setToken,  
    };

    return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
};

export default StoreContextProvider;