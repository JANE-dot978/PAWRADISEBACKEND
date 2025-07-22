const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');
const { protect } = require('../middleware/auth.middleware');
const restrictTo = require('../middleware/role.middleware');

// ✅ Only Admin & Employee can access
router.get(
  '/',
  protect,
  restrictTo('admin', 'employee'),
  reportController.generateReport
);

module.exports = router;


