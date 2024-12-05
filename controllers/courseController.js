const { Course, Prerequisites, Department, Enrolled, StudentCourse } = require('../proper_models');

module.exports = {
  //find prerequisites for a course
  async getPrerequisites(req, res) {
    const { CourseCode } = req.params;

    try {
      const prerequisites = await Prerequisites.findAll({
        attributes: ['PrereqCourse'],
        where: { MainCourse: CourseCode },
      });

      res.status(200).json(prerequisites);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  //list all courses in a department
  async getCoursesByDepartment(req, res) {
    const { DepartmentName } = req.params;

    try {
      const courses = await Course.findAll({
        attributes: ['CourseCode', 'Title'],
        include: [
          {
            model: Department,
            where: { Name: DepartmentName },
          },
        ],
      });

      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  //filter courses above a 300 level in a department
  async getAdvancedCourses(req, res) {
    const { DepartmentCode } = req.params;

    try {
      const courses = await Course.findAll({
        attributes: ['CourseCode', 'Title'],
        where: {
          DepartmentCode,
          CourseNumber: {
            [Op.gt]: 300,
          },
        },
      });

      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  //count enrolled students in a course
  async countStudentsInCourse(req, res) {
    const { CourseCode } = req.params;

    try {
      const count = await Enrolled.count({
        include: [
          {
            model: StudentCourse,
            where: { CourseCode },
          },
        ],
      });

      res.status(200).json({ NumberOfStudents: count });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
