const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
const Department = sequelize.define('Department', {
    DepartmentCode: {
      type: DataTypes.STRING,
      primaryKey: true,
      validate: {
        len: [4, 4], //must be exactly 4 characters
      },
    },
    FacultyID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Faculties',
        key: 'FacultyID',
      },
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Department;
};