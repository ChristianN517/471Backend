const { Sequelize } = require('sequelize');
const path = require('path');

//initialize Sequelize
const sequelize = new Sequelize({
    dialect: 'sqlite', //use 'postgres' or 'mysql' for those databases
    storage: path.join(__dirname, '../database.sqlite'), //path to SQLite database file
    logging: false,
});

//import models
const Faculty = require('./Faculty')(sequelize, Sequelize.DataTypes);
const Department = require('./Department')(sequelize, Sequelize.DataTypes);
const Course = require('./Course')(sequelize, Sequelize.DataTypes);
const Program = require('./Program')(sequelize, Sequelize.DataTypes);
const GraduationRequirement = require('./GraduationRequirement')(sequelize, Sequelize.DataTypes);
const Major = require('./Major')(sequelize, Sequelize.DataTypes);
const Minor = require('./Minor')(sequelize, Sequelize.DataTypes);
const Concentration = require('./Concentration')(sequelize, Sequelize.DataTypes);
const Student = require('./Student')(sequelize, Sequelize.DataTypes);
const Admin = require('./Admin')(sequelize, Sequelize.DataTypes);
const Instructor = require('./Instructor')(sequelize, Sequelize.DataTypes);
const StudentCourse = require('./StudentCourse')(sequelize, Sequelize.DataTypes);
const Planned = require('./Planned')(sequelize, Sequelize.DataTypes);
const Enrolled = require('./Enrolled')(sequelize, Sequelize.DataTypes);
const Completed = require('./Completed')(sequelize, Sequelize.DataTypes);
const Maintains = require('./Maintains')(sequelize, Sequelize.DataTypes);
const Teaches = require('./Teaches')(sequelize, Sequelize.DataTypes);
const SBelongF = require('./SBelongF')(sequelize, Sequelize.DataTypes);

//set up relationships 

//Student to Major 
Student.belongsTo(Major, { foreignKey: 'MajorsIn', targetKey: 'MajorID' });
Student.belongsTo(Minor, { foreignKey: 'MinorsIn', targetKey: 'MinorID' });
Student.belongsTo(Concentration, { foreignKey: 'ConcentratesIn', targetKey: 'ConcentrationID' });

//Major to Program
Major.belongsTo(Program, { foreignKey: 'ProgramID', targetKey: 'ProgramID' });

//GraduationRequirement to Program
GraduationRequirement.belongsTo(Program, { foreignKey: 'ProgramID', targetKey: 'ProgramID' });

//Maintains (Admin to Courses) 
Maintains.belongsTo(Admin, { foreignKey: 'AdminEmployeeID', targetKey: 'EmployeeID' });
Maintains.belongsTo(Course, { foreignKey: 'CourseCode', targetKey: 'CourseCode' });

//Teaches (Instructor to Courses)
Teaches.belongsTo(Instructor, { foreignKey: 'InstructorEmployeeID', targetKey: 'EmployeeID' });
Teaches.belongsTo(Course, { foreignKey: 'CourseCode', targetKey: 'CourseCode' });

//SBelongF (Student to Faculty) 
SBelongF.belongsTo(Student, { foreignKey: 'UCID', targetKey: 'UCID' });
SBelongF.belongsTo(Faculty, { foreignKey: 'FacultyID', targetKey: 'FacultyID' });

//Instructors to Courses
Instructor.hasMany(Teaches, { foreignKey: 'InstructorEmployeeID' });
Course.hasMany(Teaches, { foreignKey: 'CourseCode' });

//Admins to Courses 
Admin.hasMany(Maintains, { foreignKey: 'AdminEmployeeID' });
Course.hasMany(Maintains, { foreignKey: 'CourseCode' });

//Courses to GraduationRequirements 
Course.hasMany(GraduationRequirement, { foreignKey: 'CourseCode' });

//StudentCourses to Courses 
StudentCourse.belongsTo(Course, { foreignKey: 'CourseCode', targetKey: 'CourseCode' });
Course.hasMany(StudentCourse, { foreignKey: 'CourseCode' });

//Enrolled to StudentCourses 
Enrolled.belongsTo(StudentCourse, { foreignKey: 'StudentCourseCode', targetKey: 'StudentCourseCode' });
StudentCourse.hasMany(Enrolled, { foreignKey: 'StudentCourseCode' });

//Completed to StudentCourses 
Completed.belongsTo(StudentCourse, { foreignKey: 'StudentCourseCode', targetKey: 'StudentCourseCode' });
StudentCourse.hasMany(Completed, { foreignKey: 'StudentCourseCode' });

//SBelongF Faculty relationship 
Faculty.hasMany(SBelongF, { foreignKey: 'FacultyID' });
Student.hasMany(SBelongF, { foreignKey: 'UCID' });

//relating prerequisites (PrereqCourse to MainCourse) 
Course.belongsToMany(Course, {
  through: 'Prerequisite',
  as: 'PrereqCourse',
  foreignKey: 'MainCourse',
  otherKey: 'PrereqCourse',
});


// export models and sequelize instance
module.exports = {
    sequelize,
    Faculty,
    Department,
    Course,
    Program,
    GraduationRequirement,
    Major,
    Minor,
    Concentration,
    Student,
    Admin,
    Instructor,
    StudentCourse,
    Planned,
    Enrolled,
    Completed,
    Maintains,
    Teaches,
    SBelongF,
};
