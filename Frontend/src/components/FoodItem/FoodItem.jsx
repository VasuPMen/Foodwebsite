import { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import PropTypes from "prop-types";
import "./FoodItem.css";
import { StoreContext } from "../../context/StoreContext";
const FoodItem = ({ id, name, price, description, image }) => {
    const { cartItem, addToCart, removeFromCart, url } = useContext(StoreContext);

    const [imgSrc, setImgSrc] = useState(
        image.includes("/src/assets/") ? image : `${url}/images/${image}`
    );
    const [loaded, setLoaded] = useState(false);

    return (
        <div className={`food-item ${loaded ? "fade-in" : ""}`}>
            <div className="food-item-img-container">
                <img
                    className="food-item-image"
                    src={imgSrc}
                    alt={name}
                    onLoad={() => setLoaded(true)}
                    onError={(e) => {
                        if (e.target.src !== "/fallback.jpg") {
                            setImgSrc("/fallback.jpg");
                        }
                    }}
                />

                {cartItem?.[id] ? (
                    <div className="food-item-counter">
                        <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="Remove" />
                        <p>{cartItem?.[id]}</p>
                        <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="Add" />
                    </div>
                ) : (
                    <img className="add" onClick={() => addToCart(id)} src={assets.add_icon_white} alt="Add" />
                )}
            </div>

            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="Rating" />
                </div>
                <p className="food-item-description">{description}</p>
                <p className="food-item-price">${price.toFixed(2)}</p>
            </div>
        </div>
    );
};

FoodItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
};

export default FoodItem;
