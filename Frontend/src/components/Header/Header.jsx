import { useEffect, useState } from "react";
import "./Header.css";

const Header = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/header_img.png";
    img.onload = () => setLoaded(true);
  }, []);

  return (
    <div className="header">
      <div className={`header-contents ${loaded ? "fade-in" : ""}`}>
        <h2>Order Your Favorite Food</h2>
        <p>Choose</p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
