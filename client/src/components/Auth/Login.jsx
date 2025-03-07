import React, { useState } from 'react';
import axios from "axios";
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password });
      if (res.data.success) {
        console.log("User logged in successfully");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.log("Login error", error);
    }
  };

  return (
    <div className='user-container'>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2 className="title">Login</h2>
          <div className="input-group">
            <label htmlFor='email'>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="exampleInputEmail"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor='password'>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="exampleInputPassword"
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>          
          <p className='acc'>Dont have an account </p>
          <button className='acc-btn'>Please Register</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
