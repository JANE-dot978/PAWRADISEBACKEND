// const express = require("express");
// const router = express.Router();
// const { registerUser, loginUser } = require("../controllers/auth.controller");
// const { registerSchema } = require("../helpers/validationSchemas");

// // Register
// router.post("/register", async (req, res, next) => {
//   try {
//     await registerSchema.validateAsync(req.body);
//     registerUser(req, res, next);
//   } catch (err) {
//     next(err);
//   }
// });

// // Login
// router.post("/login", loginUser);

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const { registerUser, loginUser } = require("../controllers/auth.controller");

// // Register
// router.post("/register", registerUser);

// // Login
// router.post("/login", loginUser);

// module.exports = router;
const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/auth.controller");

// Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;


