
const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
const Program = sequelize.define('Program', {
    ProgramID: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 50], //max 50 characters
      },
    },
    Type: {
      type: DataTypes.ENUM('open', 'bachelors', 'honours', 'masters', 'phd', 'exchange'),
      allowNull: false,
    },
    RequiredUnits: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: [[30, 60, 120, 150]],
      },
    },
    OfferedByFaculty: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Faculties',
        key: 'FacultyID',
      },
    },
  });
  return Program;
};
  