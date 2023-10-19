import React, { useContext, useState } from "react";
import notevalue from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const context = useContext(notevalue);
  const { showalert } = context;
  const [logindetails, setlogindetails] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: logindetails.email,
        password: logindetails.password,
      }),
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    if (json.success) {
      //redirect
      localStorage.setItem("token", json.AuthToken);
      navigate("/");
      showalert("success", "You have logged in successfully");
    } 
    else {
      showalert("danger", " Invalid details");
    }
  };
  const onChange = (e) => {
    setlogindetails({ ...logindetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-over-contianer">
      <form onSubmit={handlesubmit} >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label fw-bolder fs-5 text text-light">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            value={logindetails.email}
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text fw-bolder text-light">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label fw-bolder fs-5 text text-light">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="password"
            value={logindetails.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <div className="back-image"></div>
    </div>
  );
};

export default Login;
