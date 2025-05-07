import React, { useState } from 'react';
import axios from "axios";
import { Link,Navigate } from 'react-router-dom';
import './Twinland.css';
import HomePage from "./home.js"
function Login() {
  const [login, setLogin] = useState({ email: "", password: "" });
  let ret;
  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", login);

     if (res.data.success) {
     ret=res;
             alert(`Welcome, ${login.email}!`);
             localStorage.setItem('userId', res.data.user.userId);
              window.location.href = `/home`;
           } else {
             alert("Invalid login credentials");
           }
    } catch (error) {
     if (error.response) {


          if (error.response.status === 404) {
            alert('Login service not found. Please contact admin.');
          } else if (error.response.status === 400 || error.response.status === 401) {
            alert('Invalid email or password. Try again.');
          } else {
            alert('Server error occurred. Please try later.');
          }

        } else if (error.request) {

          alert('Server is not responding. Please check your internet or try again later.');

        } else {

          alert('Unexpected error occurred: ' + error.message);
        }
      }
  };

  return (
    <div className="twinland-container">
      <div className="twinland-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
          <div className="twinland-switch">
            Don't have an account? <Link to="/User">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
