import { useContext, useState } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Login = ({ setShowLogin }) => {
    const { url , setToken } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Sign Up");
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };
    
    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = currState === "Login" ? `${url}/api/user/login` : `${url}/api/user/register`;
    
        console.log("Sending data:", data); 
    
        try {
            const response = await axios.post(newUrl, data, {
                headers: { "Content-Type": "application/json" },
            });
    
            console.log("Full API Response:", response.data);
            if (response.data.success) {
                const user = response.data.user || {};
                const userId = user._id;
    
                if (!userId) {
                    throw new Error("User ID is missing in the response");
                }
    
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userId", userId);
                setToken(response.data.token);
                setShowLogin(false);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Login Error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "An error occurred. Please try again.");
        }
    };
    
    
    
    

    return (
        <div className="login-popup">
            <form onSubmit={onLogin} className="login-container">
                <div className="login-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                </div>
                <div className="login-field">
                    {currState === "Sign Up" && (
                        <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="Enter your name" required />
                    )}
                    <input type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder="Enter your email" required />
                    <input type="password" name="password" onChange={onChangeHandler} value={data.password} placeholder="Enter your password" required />
                    <button type="submit">{currState === "Sign Up" ? "Sign Up" : "Login"}</button>
                    <div className="login-condition">
                        <input type="checkbox" required />
                        <p>By continuing, I agree to the terms and conditions.</p>
                    </div>
                    {currState === "Login" ? (
                        <p>Create a New Account? <span onClick={() => setCurrState("Sign Up")}>Click Here</span></p>
                    ) : (
                        <p>Already Have an Account? <span onClick={() => setCurrState("Login")}>Login Here</span></p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Login;
