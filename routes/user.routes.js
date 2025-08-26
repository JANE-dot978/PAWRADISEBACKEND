const express= require("express");
const router = express.Router();
const{
    registerUser,
    loginUser
}=require("../controllers/user.controller");

 router.post("/register", registerUser);

 router.post("/login", loginUser);

 module.exports = router;
// const express = require("express");
// const router = express.Router();
// const { getUsers, getUserById, updateUser, deleteUser } = require("../controllers/user.controller");

// // Example user routes
// router.get("/", getUsers);          // GET all users
// router.get("/:id", getUserById);    // GET single user by ID
// router.put("/:id", updateUser);     // UPDATE user
// router.delete("/:id", deleteUser);  // DELETE user

// module.exports = router;

