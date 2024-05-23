require("dotenv").config();
const express = require("express");
const db = require("./models");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

db.sequelize.sync().then(() => {
  console.log("Database & tables created!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
