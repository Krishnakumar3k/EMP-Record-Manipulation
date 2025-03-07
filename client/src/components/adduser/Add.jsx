import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import "./add.css";

const Add = () => {
  // Define initial user state matching your Mongoose schema
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    mobileno: "",
    designation: "",
    gender: "",
    qualification: "",
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
      <Link to={"/"}><button className='backButton'> Go Back</button></Link>
      <h3>Add New User</h3>
      <form className='addUserForm' onSubmit={submitForm}>

        {/* First Name */}
        <div className="inputGroup">
          <label htmlFor="fname">Full Name :</label>
          <input type="text" id="fname" name="fname" autoComplete='off' placeholder='Full Name' onChange={inputHandler} required />
        </div>

        {/* Email */}
        <div className="inputGroup">
          <label htmlFor="email">Email :</label>
          <input type="email" id="email" name="email" autoComplete='off' placeholder='Email' onChange={inputHandler} required />
        </div>

        {/* Mobile No */}
        <div className="inputGroup">
          <label htmlFor="mobileno">Mobile No</label>
          <input type="number" id="mobileno" name="mobileno" autoComplete='off' placeholder='Mobile No' onChange={inputHandler} required />
        </div>

        {/* Designation */}
        <div className="inputGroup">
          <label htmlFor="designation">Designation :</label>
          <select name="designation" id="designation" onChange={inputHandler} required>
            <option value="">Select Designation</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Manager"> QA Software</option>
            <option value="MIS">MIS</option>
            <option value="HR">HR</option>
          </select>
        </div>

        {/* Gender */}

        <div className="inputGroup">
          <label htmlFor="Gender">Gender :</label>
          <select name="gender" id="gender" onChange={inputHandler} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* <div className="inputGroup">
          <label>Gender :</label>
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
        </div> */}

        {/* Qualifiction section */}
        <div className="inputGroup">
          <label htmlFor="Qualification">Qualification :</label>
          <select name="qualification" id="qualification" onChange={inputHandler} required>
            <option value="">Select Qualification</option>
            <option value="Software Engineer">B.Tech</option>
            <option value="Manager">MCA</option>
            <option value="MIS">BCA</option>
            <option value="HR">B.Sc</option>
            <option value="HR">BA</option>
            <option value="HR">Other</option>
          </select>
        </div>
       {/*  <div className="inputGroup">
          <label>Qualification :</label>
          <div className="checkbox-group">
            <input type="checkbox" id="mca" name="course" value="MCA" onChange={inputHandler} />
            <label htmlFor="mca">B.Tech.</label>
          </div>
          <div className="checkbox-group">
            <input type="checkbox" id="bca" name="course" value="BCA" onChange={inputHandler} />
            <label htmlFor="bca">BCA</label>
          </div>
          <div className="checkbox-group">
            <input type="checkbox" id="bsc" name="course" value="BSC" onChange={inputHandler} />
            <label htmlFor="bsc">MCA</label>
          </div>
          <div className="checkbox-group">
            <input type="checkbox" id="bsc" name="course" value="BSC" onChange={inputHandler} />
            <label htmlFor="bsc">B.Sc</label>
          </div>
          <div className="checkbox-group">
            <input type="checkbox" id="bsc" name="course" value="BSC" onChange={inputHandler} />
            <label htmlFor="bsc">BA</label>
          </div>
          <div className="checkbox-group">
            <input type="checkbox" id="bsc" name="course" value="BSC" onChange={inputHandler} />
            <label htmlFor="bsc">BA</label>
          </div> <div className="checkbox-group">
            <input type="checkbox" id="bsc" name="course" value="BSC" onChange={inputHandler} />
            <label htmlFor="bsc">Other</label>
          </div>
        </div> */}

        {/* Action Checkbox */}
        <div className="inputGroup">
          <label>
            <input type="checkbox" name="action" checked={user.action} onChange={() => setUser({ ...user, action: !user.action })} />
            Active Emp.
          </label>
        </div>

        {/* Submit Button */}
        <div className="inputGroup">
          <button type="submit">ADD DATA</button>
        </div>

      </form>
    </div>
  );
};

export default Add;
