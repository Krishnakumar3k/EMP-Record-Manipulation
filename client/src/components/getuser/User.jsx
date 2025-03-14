import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./user.css";
import { Link } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getall");
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/delete/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      toast.success(response.data.msg, { position: "top-right" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="userTable">
      <Link to="/add" className="addButton">
        Add User
      </Link>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>S.No.</th>
            {/* <th>Profile Image</th> */}
            <th>Employee Name</th>
            <th>Designation</th>
            <th>Emp. Email</th>
            <th>Mobile No</th>
            <th>Gender</th>
            <th>Qualification</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                {/* <td>
                  {user.image ? (
                    <img src={user.image} alt="Profile" width={50} height={50} style={{ borderRadius: "50%" }} />
                  ) : (
                    "No Image"
                  )}
                </td> */}
                <td>{user.fullname}</td>
                <td>{user.designation}</td>
                <td>{user.email}</td>
                <td>{user.mobileno}</td>
                <td>{user.gender}</td>
                <td>{user.qualification}</td>
                <td className="actionButtons">
                  <button onClick={() => deleteUser(user._id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <Link to={`/edit/${user._id}`}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: "center" }}>
                No Users Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default User;
