import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from "./ProductsPage.module.css";

function ProductDetailsPage() {
  const { productId, userId } = useParams(); // 🛠️ FIXED: get both

  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState({ productId: "", userId: "", quantity: "" });

  useEffect(() => {
    axios.get(`http://localhost:8080/api/products/${productId}`)
      .then(response => {
        setProduct(response.data);

        setCart({
          productId: productId,
          userId: userId,
          quantity: 1,
        });
      })
      .catch(error => {
        console.error("Error fetching product details!", error);
      });
  }, [productId, userId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const onChange = (e) => {
    setCart(prevCart => ({
      ...prevCart,
      quantity: e.target.value,
    }));
  };

  const addToCart = async () => {
    console.log("Cart data being sent:", cart);
    try {
      const res = await axios.post("http://localhost:8080/api/cart/add", cart);
      alert("Added to cart successfully!");
    } catch (e) {
      console.error(e);
      alert("Failed to add to cart");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>{product.productName}</h1>
      <img src={product.imgUrl} alt={product.productName} style={{ width: "300px", height: "300px", objectFit: "cover" }} />
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Description:</strong> {product.description}</p>
      <input
        type="number"
        placeholder="Quantity"
        value={cart.quantity}
        onChange={onChange}
        style={{ marginBottom: "10px" }}
      />
      <button className={styles.button} onClick={addToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductDetailsPage;
