import './Navbar.css';
import { assets } from '../../assets/assets.js';
import { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from '../../context/StoreContext.jsx';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("Home");
    const { getTotalAmount, token, setToken } = useContext(StoreContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };

    return (
        <>
            <div className="navbar">
                <Link to='/home'>
                    <img src={assets.logo} className='logo' />
                </Link>
                <ul className="navbar-menu">
                    <Link to="/home" onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}>Home</Link>
                    <a href="#explore-menu" onClick={() => setMenu("Menu")} className={menu === "Menu" ? "active" : ""}>Menu</a>
                    <a href="#app-download" onClick={() => setMenu("Mobile-app")} className={menu === "Mobile-app" ? "active" : ""}>Mobile-app</a>
                    <a href="#footer" onClick={() => setMenu("Contact us")} className={menu === "Contact us" ? "active" : ""}>Contact us</a>
                </ul>
                <div className="navbar-right">
                    <img src={assets.search_icon} />
                    <div className="navbar-search-icon">
                        <Link to='/cart'>
                            <img src={assets.basket_icon} />
                        </Link>
                        <div className={getTotalAmount === 0 ? "" : "dot"}></div>
                    </div>
                    {!token ? (
                        <button onClick={() => setShowLogin(true)}>Sign in</button>
                    ) : (
                        <div className='navbar-profile'>
                            <img src={assets.profile_icon} />
                            <ul className='navbar-profile-dropdown'>
                                <li onClick={() => { navigate('/myorders') }}>
                                    <img src={assets.bag_icon} /> <p>Orders</p>
                                </li>
                                <hr />
                                <li onClick={logout}>
                                    <img src={assets.logout_icon} /> <p>Logout</p>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;
