import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import notevalue from "../context/notes/noteContext";
import userimg from "../user-info.png";
export default function Nav() {
  const context = useContext(notevalue);
  const { showuser, userdata } = context;
  const navigate = useNavigate();
  const handlelogoutclick = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  let location = useLocation();
  useEffect(() => {
    showuser();
    // eslint-disable-next-line
  }, [location]);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <div className="logo"></div>
          <Link className="navbar-brand " to="/">
            SnapNotes
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse navsizing" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {localStorage.getItem("token")?<div className="show user d-flex mx-5">
              <div className="showuser-img mx-2">
                <img src={userimg} alt="" id="user-info" />
              </div>
              <div className="showuser-details">
                <p className="w-10 text-white border border-light rounded p-1 name">{userdata.name}</p>
                <p className="w-10 text-white border border-light rounder p-1 email">{userdata.email}</p>
              </div>
            </div>:""}
            {!localStorage.getItem("token") ? (
              <form className="d-flex" role="search">
                Explain
                <Link
                  className="btn btn-primary mx-2"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-primary mx-2"
                  to="/signup"
                  role="button"
                >
                  Signup
                </Link>
              </form>
            ) : (
              <button onClick={handlelogoutclick} className="btn btn-primary">
                Log Out
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
