import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const serverApi =
  process.env.REACT_APP_SERVER_API || "http://localhost:5000/api";

const Signup = (props) => {
  const { showAlert } = props;

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmPassword === user.password) {
      try {
        console.log("Submitting user:", user);
        console.log("API URL:", serverApi);
        const response = await fetch(`${serverApi}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user.email,
            password: user.password,
          }),
        });
        if (response.ok) {
          showAlert("Account created successfully", "success");
          navigate("/");
        } else {
          const errorData = await response.json();
          showAlert(errorData.error || "Sign Up failed", "warning");
        }
      } catch (error) {
        console.log(error);
        showAlert("Some Internal Error", "danger");
      }
    } else {
      showAlert("Password could not be confirmed. Try again.", "warning");
    }
  };

  return (
    <div>
      <h1 className="mt-3">Sign Up to use Cloud Notebook</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            value={user.name}
            id="name"
            name="name"
            onChange={onChange}
            required
            minLength={3}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={user.email}
            id="email"
            name="email"
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
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            id="confirmPassword"
            name="password"
            onChange={onChangeConfirmPassword}
            required
            minLength={5}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
