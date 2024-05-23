const express = require('express');
const router = express.Router();
const { getAllEmployees, createEmployee } = require('../controllers/employeeController');
const auth = require('../middlewares/auth');

router.get('/', auth(), getAllEmployees);
router.post('/', auth(['admin']), createEmployee);

module.exports = router;