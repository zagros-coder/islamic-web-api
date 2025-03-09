const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Admin = require("../models/adminModel");

const bcrypt = require("bcrypt");


// router.post("/register", async(req,res)=>{
//    try{
//     const {name,email,password} = req.body;

//     if (!name|| !password || !email) {
//         return res.status(400).json({ message: "All fields are required" });
//       }

//       const foundUser = await User.find({email});

//       if(foundUser){
        
//         return res.status(400).json({ message: "user already exist" });
//       }

//       const hasshedPassword = await bcrypt.hash(password,10);
    
//     const newUser = await User.create({
//         name,
//         email,
//         password:hasshedPassword
//     });
  

//     return res.status(201).json({message:"user created succesfuly"});
//    }catch(err){
//     return res.status(400).json({message:err.message})
//    }

// });


// router.post("/login", async (req, res) => {
//     try {
//         console.log("Request Body:", req.body); // Debugging

//         // Extract email and password
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         // Find the user by email
//         const foundUser = await User.findOne({ email });

//         if (!foundUser) {
//             return res.status(400).json({ message: "User does not exist" });
//         }

//         // Ensure foundUser has a valid password
//         if (!foundUser.password) {
//             return res.status(500).json({ message: "User password is missing in database" });
//         }

//         // Compare passwords
//         const comparePass = await bcrypt.compare(password, foundUser.password);

//         if (!comparePass) {
//             return res.status(400).json({ message: "Wrong password" });
//         }

//         return res.status(200).json({ message: "Logged in successfully" });

//     } catch (error) {
//         console.error("Login Error:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });



router.post("/admin/register",async(req,res)=>{
    const {user_name,password} = req.body;

    if (!user_name|| !password ) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const hashPass = await bcrypt.hash(password,10);

      const admin = await Admin.create({
        user_name,
        password:hashPass
      });
      res.status(200).json({message:"Admin registerd"});
});

router.post("/admin/login",async(req,res)=>{
   try{
    const {user_name,password} = req.body

    if(!user_name||!password){
        return res.status(404).json({message:"send all required fields"});
    }

    
    const findAdmin = await Admin.findOne({user_name});
    if(!findAdmin){
        return res.status(404).json({message:"admin doesn't exist"});
    }
    const compare = await bcrypt.compare(password ,findAdmin.password);

    if(!compare){
        return res.status(401).json({message:"wrong admin password"})
    }

    return res.status(200).json({message:"welcome Admin :)"});
   } catch(err){
    return res.status(400).json({message:err.message})
   }
});


router.post("/logout",(req,res)=>{
   
    return res.status(200).json({message:"loged out"});
});

router.get("/",(req,res)=>{
    res.send("hi")
})

module.exports = router;