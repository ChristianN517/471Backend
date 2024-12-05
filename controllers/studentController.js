const { Student, Course, GraduationRequirement, Major, Completed, Enrolled, StudentCourse } = require('../proper_models');

module.exports = {
  // Find the courses a student must complete for their major's program
  async getRequiredCoursesForMajor(req, res) {
    const { UCID } = req.params;

    try {
      const courses = await Course.findAll({
        attributes: ['CourseCode', 'Title', 'Description'],
        include: [
          {
            model: GraduationRequirement,
            include: [
              {
                model: Major,
                include: [{ model: Student, where: { UCID } }],
              },
            ],
          },
        ],
      });

      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Find completed courses for a student
  async getCompletedCourses(req, res) {
    const { UCID } = req.params;

    try {
      const courses = await Course.findAll({
        attributes: ['CourseCode', 'Title'],
        include: [
          {
            model: StudentCourse,
            where: { UCID },
            include: [{ model: Completed }],
          },
        ],
      });

      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Find transfer credit courses
  async getTransferCreditCourses(req, res) {
    const { UCID } = req.params;

    try {
      const courses = await Course.findAll({
        attributes: ['CourseCode', 'Title'],
        include: [
          {
            model: StudentCourse,
            where: { UCID },
            include: [
              {
                model: Completed,
                where: { TransferCredit: true, InUniversity: true },
                required: false,
              },
              {
                model: Enrolled,
                where: { TransferCredit: true, InUniversity: true },
                required: false,
              },
            ],
          },
        ],
      });

      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
