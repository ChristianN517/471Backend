const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
const Completed = sequelize.define('Completed', {
    StudentCourseCode: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'StudentCourses',
        key: 'StudentCourseCode',
      },
    },
    TransferCredit: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    InUniversity: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
  return Completed;
};