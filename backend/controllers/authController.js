const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");

exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.User.create({
      username,
      password: hashedPassword,
      role,
    });
    res.status(201).json(user);
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ error: "User registration failed" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db.User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};
