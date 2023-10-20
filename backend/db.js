const mongoose = require("mongoose");

let mongoURI = "your_mongodb_connection_string";
const connecttomongo = () => {
  mongoose.connect(mongoURI);
  console.log('connection successfull')
};


module.exports=connecttomongo;
