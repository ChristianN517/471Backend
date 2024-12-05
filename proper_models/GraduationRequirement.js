const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
const GraduationRequirement = sequelize.define('GraduationRequirement', {
    GradReqID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    ProgramID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Programs',
        key: 'ProgramID',
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
  });
  return GraduationRequirement;
};
  