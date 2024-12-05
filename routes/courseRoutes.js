const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.get('/:CourseCode/prerequisites', courseController.getPrerequisites);
router.get('/department/:DepartmentName', courseController.getCoursesByDepartment);
router.get('/department/:DepartmentCode/advanced', courseController.getAdvancedCourses);
router.get('/:CourseCode/enrollment', courseController.countStudentsInCourse);

module.exports = router;
