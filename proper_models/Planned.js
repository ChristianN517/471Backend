const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
const Planned = sequelize.define('Planned', {
    StudentCourseCode: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'StudentCourses',
        key: 'StudentCourseCode',
      },
    },
    Wishlist: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    Card: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    Waitlist: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });
  return Planned;
};