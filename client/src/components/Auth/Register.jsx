import React, { useState } from 'react';
import axios from "axios";
import "./Auth.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, { name, email, password, phone });
      if (res.data.success) {
        console.log("User registered successfully");
      } else {
        console.log("User registration failed");
      }
    } catch (error) {
      console.log("Registration error", error);
    }
  };

  return (
    <div className='user-container'>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2 className="title">Register</h2>
          <div className="input-group">
            <label htmlFor='name'>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="exampleInputName"
              placeholder="Enter your Name"
              required
            />
          </div>
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
          <div className="input-group">
            <label htmlFor='phone'>Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              id="exampleInputPhone"
              placeholder="Enter your phone"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
          <p className='acc'>Already Have an account. </p>
          <button className='acc-btn'>Please Login</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
