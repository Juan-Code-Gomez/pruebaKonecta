const db = require("../models");

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await db.Employee.findAll();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve employees" });
  }
};

exports.createEmployee = async (req, res) => {
  const { name, position, hire_date, salary } = req.body;
  try {
    const employee = await db.Employee.create({
      name,
      position,
      hire_date,
      salary,
    });
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: "Failed to create employee" });
  }
};
