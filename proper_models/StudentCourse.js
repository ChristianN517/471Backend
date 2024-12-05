const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
const StudentCourse = sequelize.define('StudentCourse', {
    UCID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Students',
        key: 'UCID',
      },
    },
    CourseCode: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Courses',
        key: 'CourseCode',
      },
    },
    StudentCourseCode: {
      type: DataTypes.VIRTUAL, // Composite key as a combination of UCID and CourseCode
      get() {
        return `${this.UCID}_${this.CourseCode}`;
      },
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: ['UCID', 'CourseCode'],
      },
    ],
  });
  return StudentCourse;
};