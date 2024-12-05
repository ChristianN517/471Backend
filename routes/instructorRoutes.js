const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructorController');

router.get('/:GivenName/:LastName/courses', instructorController.getCoursesByInstructor);

module.exports = router;
