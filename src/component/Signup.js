import React, { useState,useContext } from "react";
import notevalue from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const context = useContext(notevalue);
  const { showalert } = context;
  const [Signupdetails, setSignupdetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/signup`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: Signupdetails.name,
        email: Signupdetails.email,
        password: Signupdetails.password,
      }),
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    if (json.success) {
      //redirect
      // localStorage.setItem("token",json.AuthToken)
      showalert("success"," Signed up successfully please login ")
      navigate("/login");
    } else {
      showalert("danger", " Invalid details");
    }
  };
  const onChange = (e) => {
    setSignupdetails({ ...Signupdetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="back-container">
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label fw-bolder fs-5 text text-light">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            name="name"
            minLength={4}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label fw-bolder fs-5 text text-light">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            onChange={onChange}
            required
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
            type="password"
            className="form-control"
            id="password"
            name="password"
            minLength={5}
            onChange={onChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onSubmit={handlesubmit}
        >
          Login
        </button>
      </form>
      <div className="backsign-image"></div>
    </div>
  );
};

export default Signup;
