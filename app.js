const express = require("express");
const cors = require("cors");
const port = 3000;
const app = express();
const env = require("dotenv");
const mongoose = require("mongoose");
const register = require("./routes/auth");
const adminPanel = require("./routes/adminPanel");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(register);
app.use(adminPanel);
app.use(cors());
env.config(); 
const connection = mongoose.connect(process.env.DB);

if(connection){
    console.log("db conneted");
}




app.listen(port, ()=>{
    console.log("Server started");
});