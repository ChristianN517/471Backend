const { Course, Instructor, Teaches } = require('../proper_models');

module.exports = {
  //list courses taught by a specific instructor
  async getCoursesByInstructor(req, res) {
    const { GivenName, LastName } = req.params;

    try {
      const courses = await Course.findAll({
        attributes: ['CourseCode', 'Title'],
        include: [
          {
            model: Teaches,
            include: [
              {
                model: Instructor,
                where: { GivenName, LastName },
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
