const db = require("../models");

exports.getAllEmployees = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const offset = (page - 1) * limit;

  try {
    const employees = await db.Employee.findAndCountAll({
      limit: parseInt(limit, 10),
      offset,
    });

    res.json({
      totalItems: employees.count,
      totalPages: Math.ceil(employees.count / limit),
      currentPage: parseInt(page, 10),
      data: employees.rows,
    });
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
