import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import "./add.css";

const Add = () => {
  // Define initial user state matching your Mongoose schema
  const [user, setUser] = useState({
    fname: "",
    email: "",
    mobileno: "",
    designation: "",
    gender: "",
    course: "",
    action: true // Default boolean field
  });

  const navigate = useNavigate();

  // Function to handle input changes
  const inputHandler = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setUser((prevUser) => ({
        ...prevUser,
        course: checked ? value : ""
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value
      }));
    }
  };

  // Function to handle form submission
  const submitForm = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:8000/api/create", user);
      toast.success(response.data.msg, { position: "top-right" });
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error.message);
      toast.error("Failed to add user");
    }
  };

  return (
    <div className='addUser'>
      <Link to={"/"}>Back</Link>
      <h3>Add New User</h3>
      <form className='addUserForm' onSubmit={submitForm}>

        {/* First Name */}
        <div className="inputGroup">
          <label htmlFor="fname">First Name</label>
          <input type="text" id="fname" name="fname" autoComplete='off' placeholder='First Name' onChange={inputHandler} required />
        </div>

        {/* Email */}
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" autoComplete='off' placeholder='Email' onChange={inputHandler} required />
        </div>

        {/* Mobile No */}
        <div className="inputGroup">
          <label htmlFor="mobileno">Mobile No</label>
          <input type="number" id="mobileno" name="mobileno" autoComplete='off' placeholder='Mobile No' onChange={inputHandler} required />
        </div>

        {/* Designation */}
        <div className="inputGroup">
          <label htmlFor="designation">Designation</label>
          <select name="designation" id="designation" onChange={inputHandler} required>
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        {/* Gender */}
        <div className="inputGroup">
          <label>Gender</label>
          <div className="radio-group">
            <input type="radio" id="male" name="gender" value="Male" onChange={inputHandler} required />
            <label htmlFor="male">Male</label>
          </div>
          <div className="radio-group">
            <input type="radio" id="female" name="gender" value="Female" onChange={inputHandler} required />
            <label htmlFor="female">Female</label>
          </div>
          <div className="radio-group">
            <input type="radio" id="others" name="gender" value="Others" onChange={inputHandler} required />
            <label htmlFor="others">Others</label>
          </div>
        </div>

        {/* Course Selection */}
        <div className="inputGroup">
          <label>Course</label>
          <div className="checkbox-group">
            <input type="checkbox" id="mca" name="course" value="MCA" onChange={inputHandler} />
            <label htmlFor="mca">MCA</label>
          </div>
          <div className="checkbox-group">
            <input type="checkbox" id="bca" name="course" value="BCA" onChange={inputHandler} />
            <label htmlFor="bca">BCA</label>
          </div>
          <div className="checkbox-group">
            <input type="checkbox" id="bsc" name="course" value="BSC" onChange={inputHandler} />
            <label htmlFor="bsc">BSC</label>
          </div>
        </div>

        {/* Action Checkbox */}
        <div className="inputGroup">
          <label>
            <input type="checkbox" name="action" checked={user.action} onChange={() => setUser({ ...user, action: !user.action })} />
            Active User
          </label>
        </div>

        {/* Submit Button */}
        <div className="inputGroup">
          <button type="submit">ADD USER</button>
        </div>

      </form>
    </div>
  );
};

export default Add;
