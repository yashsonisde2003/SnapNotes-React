const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_key = "your_security_key";
const fetchuser = require("../middleware/fetchuser");

//login 1: create a user using: POST'/api/auth/createuser'. no login required
router.post(
  "/signup",
  [
    body("name", "name entered must be atleast 4 characters").isLength({
      min: 4,
    }),
    body("email", "please enter a valid email").isEmail(),
    body("password", "password entered must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    // if there is error return bad request and show all error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    // check whether the user with SAME EMAIL EXIST
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({
            success,
            error: "sorry a user with the same email already exist",
          });
      } //create a new user
      const salt = bycrypt.genSaltSync(10);
      const secpass = bycrypt.hashSync(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const AuthToken = jwt.sign(data, jwt_key);
      success = true;
      res.json({ success, AuthToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);
// login 2:authenticate a user using:POST '/api/auth/login': no login required
router.post(
  "/login",
  [
    body("email", "please enter a valid email").isEmail(),
    body("password", "password cannot be empty").exists(),
  ],
  async (req, res) => {
    let success = false;
    // if there is error return bad request and show all error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with Correct Credentials" });
      }
      const passwordCompare = await bycrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({
            success,
            error: "Please try to login with Correct Credentials",
          });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const AuthToken = jwt.sign(data, jwt_key);
      success = true;
      res.send({ success, AuthToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);
//Route 3:get logged in user details sing POST "auth/api/getuser". login required
router.post("/details", fetchuser, async (req, res) => {
  try {
    userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});
module.exports = router;
