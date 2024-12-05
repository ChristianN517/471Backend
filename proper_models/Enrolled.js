const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
const Enrolled = sequelize.define('Enrolled', {
    StudentCourseCode: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'StudentCourses',
        key: 'StudentCourseCode',
      },
    },
    NotStarted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    InProgress: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
  return Enrolled;
};
  