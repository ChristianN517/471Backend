const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser'); 
const { Sequelize, DataTypes } = require('sequelize');

//initialize Sequelize connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(__dirname, '../database.sqlite'),
});

// load models
const Faculty = require('../proper_models/Faculty')(sequelize, DataTypes);
const Department = require('../proper_models/Department')(sequelize, DataTypes);
const Course = require('../proper_models/Course')(sequelize, DataTypes);
const Program = require('../proper_models/Program')(sequelize, DataTypes);
const GraduationReqs = require('../proper_models/GraduationRequirement')(sequelize, DataTypes);
const Major = require('../proper_models/Major')(sequelize, DataTypes);
const Minor = require('../proper_models/Minor')(sequelize, DataTypes);
const Concentration = require('../proper_models/Concentration')(sequelize, DataTypes);
const Student = require('../proper_models/Student')(sequelize, DataTypes);
const Admin = require('../proper_models/Admin')(sequelize, DataTypes);
const Instructor = require('../proper_models/Instructor')(sequelize, DataTypes);


//seed a single CSV file
async function seedFromCSV(model, csvFilePath) {
  const data = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on('data', (row) => data.push(row))
      .on('end', async () => {
        try { 
          await model.bulkCreate(data);
          console.log(`Seeded data from ${path.basename(csvFilePath)} successfully!`);
          resolve();
        } catch (err) {
          console.error(`Error seeding data from ${path.basename(csvFilePath)}:`, err);
          reject(err);
        }
      });
  });
}

//main seeding function
async function seedDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');

    //sync database 
    await sequelize.sync({ force: true });

    //seed CSV files
    const seedsDir = path.resolve(__dirname, './');
    await seedFromCSV(Faculty, path.join(seedsDir, 'faculties.csv'));
    await seedFromCSV(Department, path.join(seedsDir, 'departments.csv'));
    await seedFromCSV(Course, path.join(seedsDir, 'courses.csv'));
    await seedFromCSV(Program, path.join(seedsDir, 'programs.csv'));
    await seedFromCSV(GraduationReqs, path.join(seedsDir, 'graduation_reqs.csv'));
    await seedFromCSV(Major, path.join(seedsDir, 'majors.csv'));
    await seedFromCSV(Minor, path.join(seedsDir, 'minors.csv'));
    await seedFromCSV(Concentration, path.join(seedsDir, 'concentrations.csv'));
    await seedFromCSV(Student, path.join(seedsDir, 'students.csv'));
    await seedFromCSV(Admin, path.join(seedsDir, 'admins.csv'));
    await seedFromCSV(Instructor, path.join(seedsDir, 'instructors.csv'));
    

    console.log('Database seeding completed!');
  } catch (err) {
    console.error('Error during database seeding:', err);
    process.exit(1); 
  }
}

module.exports = seedDatabase;
