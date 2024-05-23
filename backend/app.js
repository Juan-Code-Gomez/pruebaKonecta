require("dotenv").config();
const express = require("express");
const db = require("./models");
const authRoutes = require('./routes/auth');
const employeeRoutes = require('./routes/employees');
const requestRoutes = require('./routes/requests');


const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/requests', requestRoutes);


const PORT = process.env.PORT || 5000;

db.sequelize.sync().then(() => {
  console.log("Database & tables created!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
