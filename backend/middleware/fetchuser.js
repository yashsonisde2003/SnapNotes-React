const jwt = require("jsonwebtoken");
const jwt_key = "yash.sde@2003";

const fetchuser = (req, res, next) => {
  //Get the user from the jwt token and add id to the req.object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({error:"please enter a valid token to fetch details"});
  }
  try {
    const string = jwt.verify(token, jwt_key);
    req.user = string.user;
    next();
  } catch (error) {
    res.status(401).send({error:"please enter a valid token to fetch details"});
  }
};
module.exports = fetchuser;
