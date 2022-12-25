require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const bodyParser = require("body-parser");

//import routes
const studentRoutes = require('./routes/studentRoutes.js');
const staffRoutes = require('./routes/staffRoutes.js');
const teacherRoutes = require('./routes/teacherRoutes.js');
const classRoutes = require('./routes/classRoutes.js');
const authRoute = require('./routes/auth.js');


mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/api/user',authRoute);
app.use(express.json());
app.use('/api', studentRoutes);
app.use('/api',staffRoutes);
app.use('/api',teacherRoutes);
app.use('/api',classRoutes);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`);
})