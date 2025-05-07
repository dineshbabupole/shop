
import React from "react";
import { Link,useNavigate } from "react-router-dom";

function Navbar() {

const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link to="/home" style={styles.link}>MyShop</Link>
      </div>
      <div style={styles.navLinks}>
        <Link to="/home" style={styles.link}>Home</Link>
        <Link to="/cart" style={styles.link}>Cart</Link>
        <Link to="/login" style={styles.link}>Logout</Link>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: "15px 30px",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "white",
  },
  navLinks: {
    display: "flex",
    gap: "20px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  },
};

export default Navbar;
