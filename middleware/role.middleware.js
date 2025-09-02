// middleware/role.middleware.js

// // middleware/role.middleware.js

// Middleware to authorize roles
// // middlewares/role.middleware.js
// function roleMiddleware(...allowedRoles) {
//   return (req, res, next) => {
//     try {
//       // Make sure user is authenticated first
//       if (!req.user || !req.user.role) {
//         return res.status(401).json({ message: "Unauthorized: No user role found" });
//       }

//       // Check if user's role is allowed
//       if (!allowedRoles.includes(req.user.role)) {
//         return res.status(403).json({ message: "Forbidden: Access denied" });
//       }

//       next(); // continue if authorized
//     } catch (err) {
//       console.error("Role Middleware Error:", err);
//       res.status(500).json({ message: "Server error in role middleware" });
//     }
//   };
// }

// module.exports = roleMiddleware;
// middlewares/role.middleware.js

// Protect middleware (auth check)
// const protect = (req, res, next) => {
//   // your token/auth logic here
//   next();
// };

// // Role-based authorization
// const authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ message: "Not authorized" });
//     }
//     next();
//   };
// };

// module.exports = { protect, authorize };

// role.middleware.js
// middlewares/role.middleware.js
function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: insufficient role" });
    }
    next();
  };
}

module.exports = authorize;
