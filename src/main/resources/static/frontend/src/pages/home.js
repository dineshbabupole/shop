
import React ,{useEffect} from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import { useParams } from 'react-router-dom';
function HomePage() {
  return (
    <div>
      <Navbar />
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>Welcome to Our E-Commerce Store!</h1>
        <p>Shop the best products at amazing prices.</p>
        <div style={{ marginTop: "30px" }}>
          <Link to="/products">
            <button style={{
              padding: "15px 30px",
              fontSize: "18px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}>
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
