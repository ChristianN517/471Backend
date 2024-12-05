const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/:UCID/required-courses', studentController.getRequiredCoursesForMajor);
router.get('/:UCID/completed-courses', studentController.getCompletedCourses);
router.get('/:UCID/transfer-credit-courses', studentController.getTransferCreditCourses);

module.exports = router;
