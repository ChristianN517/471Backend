const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const seedDatabase = require('./seeds/seed');  //import the seed function
const { sequelize } = require('./proper_models'); //import Sequelize instance
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const instructorRoutes = require('./routes/instructorRoutes');

//initialize Express backend
const app = express();

seedDatabase();

app.get('/', (req, res) => {
    res.send('server is running');
  });

//middleware
app.use(cors());
app.use(bodyParser.json());

//use routes
app.use(express.json());

app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/instructors', instructorRoutes);

//synchronize Sequelize models
sequelize.sync({ force: false }).then(() => {
  console.log('Database synchronized');
});

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
