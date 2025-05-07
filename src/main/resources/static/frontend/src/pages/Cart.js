import React, { useState, useEffect } from 'react';
import styles from "./ProductsPage.module.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import axios from 'axios';

function Cart() {
  const [products, setProducts] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    axios.get(`http://localhost:8080/api/cart/user/${userId}`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, [userId]);

  async function dltProduct(userId, id) {
    try {
      const response = await axios.delete(`http://localhost:8080/api/cart/delete/${userId}/${id}`);
      alert('Product deleted:', response.data);
      // After deletion, remove the product from the local state to update the UI
      setProducts(products.filter(product => product.productId !== id));
    } catch (error) {
      alert('Error deleting product:', error);
    }
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <h1 className={styles.heading}>Our Products</h1>
      <div className={styles.productGrid}>
        {products.map(product => (
          <motion.div
            key={product.productId}
            className={styles.card}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={product.imgUrl}
              alt={product.productName}
              className={styles.productImage}
            />
            <h3 className={styles.productName}>{product.productName}</h3>
            <p className={styles.price}>${product.price}</p>
            <Link to={`/product/${product.productId}/userId/${userId}`}>
              <button className={styles.button}>View Details</button>
            </Link>
            <button
              className={styles.button}
              onClick={() => dltProduct(userId, product.productId)}
            >
              Delete Product
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
