// const express = require("express");
// const router = express.Router();
// const { getAllUsers, getUserById, updateUser, deleteUser } = require("../controllers/user.controller");
// const { protect } = require("../middleware/auth.middleware");
// const { authorize } = require("../middleware/role.middleware"); // this works now

// // Admin-only user management
// router.get("/", protect, authorize("admin"), getAllUsers);
// router.get("/:id", protect, authorize("admin"), getUserById);
// router.put("/:id", protect, authorize("admin"), updateUser);
// router.delete("/:id", protect, authorize("admin"), deleteUser);

// module.exports = router;
const express = require("express");
const router = express.Router();
const roleMiddleware = require("../middleware/role.middleware");

// Example protected routes
router.get("/admin-dashboard", roleMiddleware("admin"), (req, res) => {
  res.json({ message: "Welcome Admin Dashboard" });
});

router.get("/employee-dashboard", roleMiddleware("employee"), (req, res) => {
  res.json({ message: "Welcome Employee Dashboard" });
});

router.get("/user-dashboard", roleMiddleware("user"), (req, res) => {
  res.json({ message: "Welcome User Dashboard" });
});

module.exports = router;


