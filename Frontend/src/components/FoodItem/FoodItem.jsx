import { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import PropTypes from "prop-types";
import "./FoodItem.css";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
    const { cartItem, addToCart, removeFromCart, url } = useContext(StoreContext);

    // Correct Image URL handling
    const [imgSrc, setImgSrc] = useState(
        image.includes("/src/assets/") ? image : `${url}/images/${image}`
    );

    console.log("Image prop:", image);
    console.log("Final Image URL:", imgSrc);

    return (
        <div className="food-item">
            <div className="food-item-img-container">
                <img
                    className="food-item-image"
                    src={imgSrc}
                    alt={name}
                    onError={(e) => {
                        if (e.target.src !== "/fallback.jpg") {
                            console.error("Image failed to load:", e.target.src);
                            setImgSrc("/fallback.jpg");
                        }
                    }}
                />

                {/* Cart Functionality */}
                {cartItem?.[id] ? (
                    <div className="food-item-counter">
                        <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="Remove from Cart" />
                        <p>{cartItem?.[id] || 0}</p>
                        <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="Add more" />
                    </div>
                ) : (
                    <img className="add" onClick={() => addToCart(id)} src={assets.add_icon_white} alt="Add to Cart" />
                )}


            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="Rating Stars" />
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
