// const bcrypt =require("bcryptjs");
// const JWT = require("jsonwebtoken");
// const User= require("../models/user.model");
// //helper to generate JWT
// const generateToken = (user) => {
//     return JWT.sign(
//         {id: user._id, role: user.role},
//         process.env.JWT_SECRET,
//         { expiresIn: "60d" }

//     );
// };
// // @route   POST /api/users/register
// const registerUser = async (req, res) =>{
//     try{
//         const{ name, email, password, role} = req.body;

//         const existingUser = await User.findOne({ email});
//         if(existingUser){
//             return res.status(400).json({message:"user already exists"});
//         }
//         const hashedPassword = await bcrypt.hash(password,8);

//     const newUser = new User({
//         name,
//         email,
//         password :hashedPassword,
//         role : role ||"user"//default role
//     });
//     await newUser.save();

//     res.status(201).json({
//         message: "user registered successfully",
//         user: {
//             id: newUser._id,
//             name:newUser.name,
//             email:newUser.email,
//             role:newUser.role,
//             token:generateToken(newUser),
//         },
//     });
//     }catch (error){
//         res.status(500).json({message: "server error", error: error.message});
//     }
// };

// const loginUser =async(req, res) =>{
//     try{
//         const{email, password}= req.body;

//         // Find user
//         const user = await User.findOne({email});
//         if (!user) return res.status(400).json({message:"invalid credentials"});

//         //compare password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if(!isMatch) return res.status(400).json({message:"invalid  credentials"});

//     res.status(200).json({
//         message:"login successfull",
//         user:{
//             id: user._id,
//             name:user.name,
//             email:user.email,
//             role:user.role,
//             token:generateToken(user),
//         },
//     });
//     }catch (error){
//         res.status(500).json({message: "server error", error:error.message});
//     }
// };
// module.exports ={
//     registerUser,
//     loginUser,
// };

const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const User = require("../models/user.model");

// Helper: generate JWT
const generateToken = (user) => {
  return JWT.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET || "secretkey", // fallback
    { expiresIn: "60d" }
  );
};

// @route   POST /api/users/register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check existing
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await newUser.save();

    // send response
    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(newUser),   // ✅ token separate
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @route   POST /api/users/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // send response
    res.status(200).json({
      message: "Login successful",
      token: generateToken(user),   // ✅ token separate
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
