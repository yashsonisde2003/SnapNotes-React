import "./App.css";
import Nav from "./component/Nav";
import Home from "./component/Home";
import About from "./component/About";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notestate from "./context/notes/NoteState";
import Alert from "./component/Alert";
import Login from "./component/Login";
import Signup from "./component/Signup";

function App() {
  return (
    <Notestate>
      <Router>
        <Nav />
        <Alert message="This is to give a message aboout the note" />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </Notestate>
  );
}

export default App;
