const mongoose = require("mongoose");
require("dotenv").config();

const dataBase = async () =>{
try {
     mongoose.connect(process.env.MONGODB_URI);
     console.log("connected to mongodb");
  } catch (error) {
    console.error("error connecting")
  }
}


module.exports = dataBase;