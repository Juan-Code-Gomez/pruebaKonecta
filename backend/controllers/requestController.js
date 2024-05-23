const db = require("../models");

exports.getAllRequests = async (req, res) => {
  const { page = 1, limit = 10, status, employee_id, code } = req.query;

  const offset = (page - 1) * limit;
  const where = {};

  if (status) {
    where.status = status;
  }

  if (employee_id) {
    where.employee_id = employee_id;
  }

  if (code) {
    where.code = code;
  }

  try {
    const requests = await db.Request.findAndCountAll({
      where,
      limit: parseInt(limit, 10),
      offset,
      include: [
        {
          model: db.Employee,
          as: "employee",
          attributes: ["id", "name"],
        },
      ],
    });

    res.json({
      totalItems: requests.count,
      totalPages: Math.ceil(requests.count / limit),
      currentPage: parseInt(page, 10),
      data: requests.rows,
    });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ error: "Failed to retrieve requests" });
  }
};

exports.createRequest = async (req, res) => {
  const { code, description, summary, status, employee_id } = req.body;
  try {
    const request = await db.Request.create({
      code,
      description,
      summary,
      status,
      employee_id,
    });
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ error: "Failed to create request" });
  }
};

exports.deleteRequest = async (req, res) => {
  const { id } = req.params;
  try {
    await db.Request.destroy({ where: { id } });
    res.status(204).send("Successfully Removed");
  } catch (error) {
    res.status(500).json({ error: "Failed to delete request" });
  }
};
