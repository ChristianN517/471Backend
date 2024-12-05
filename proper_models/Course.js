const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
const Course = sequelize.define('Course', {
    CourseCode: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    DepartmentCode: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Departments',
        key: 'DepartmentCode',
      },
    },
    CourseNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 100,
        max: 799,
      },
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT,
    },
    Keywords: {
      type: DataTypes.STRING, //storing keywords as a string
    },
  });
  return Course;
};