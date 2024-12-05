const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

const Student = sequelize.define('Student', {
  UCID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    validate: {
      is: /^30[0-9]{6}$/, //UCID must match 30XXXXXX
    },
  },
  GivenName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  LastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [0, 20], //max 20 characters
    },
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      contains: '@ucalgary.ca', //check if the email domain is correct
    },
  },
  DOB: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[1-2][0-9]{3}-[0-1][0-9]-[0-3][0-9]$/, // yyyy-mm-dd format
    },
  },
  Intake: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[1-2][0-9]{3}$/, //yyyy format
    },
  },
  Year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 4,
    },
  },
  MajorsIn: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Majors', //must match the model name
      key: 'MajorID',
    },
  },
  MinorsIn: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Minors',
      key: 'MinorID',
    },
  },
  ConcentratesIn: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Concentrations',
      key: 'ConcentrationID',
    },
  },
});

    return Student;
};
