const mongoose = require("mongoose");

let mongoURI = "mongodb://127.0.0.1:27017/inotebook";
const connecttomongo = () => {
  mongoose.connect(mongoURI);
  console.log('connection successfull')
};


module.exports=connecttomongo;