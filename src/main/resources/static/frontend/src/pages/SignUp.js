import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Twinland.css';

function SignUp() {
  const [signUp, setSignUp] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/signup", signUp);
      alert(`email: ${signUp.email}`);
    } catch (er) {
      alert("error");
    }
  };

  return (
    <div className="twinland-container">
      <div className="twinland-box">
        <h2>Sign Up</h2>
        <form onSubmit={onSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={onChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={onChange}
            required
          />
          <button type="submit">Sign Up</button>
          <div className="twinland-switch">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
