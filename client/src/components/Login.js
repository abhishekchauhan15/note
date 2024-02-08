import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const serverApi =
  process.env.REACT_APP_SERVER_API || "http://localhost:5000/api";

const Login = (props) => {
  const { showAlert } = props;

  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(`${serverApi}/login`, {
        // Adjusted endpoint URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const res = await response.json();
      if (response.ok) {
        //Save the authToken and redirect
        localStorage.setItem("token", res.token);
        showAlert("Logged in successfully", "success");
        navigate("/");
      } else {
        console.log("Authentication failed");
        showAlert("Incorrect Credentials", "warning");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      showAlert("Some Internal Error", "danger");
      navigate("/login");
    }
  };

  return (
    <div>
      <h1 className="mt-3">Log In to your account</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>{" "}
          {/* Assuming username is used for login */}
          <input
            type="text"
            className="form-control"
            value={user.username}
            id="username"
            name="username"
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={user.password}
            id="password"
            name="password"
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
