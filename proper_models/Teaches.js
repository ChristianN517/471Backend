const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
const Teaches = sequelize.define('Teaches', {
  InstructorEmployeeID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Instructors',
      key: 'EmployeeID',
    },
    primaryKey: true,
  },
  CourseCode: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Courses',
      key: 'CourseCode',
    },
    primaryKey: true,
  },
}, {
  tableName: 'Teaches',
  timestamps: false,
});

    return Teaches;
};
