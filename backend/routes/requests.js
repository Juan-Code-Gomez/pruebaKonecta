const express = require('express');
const router = express.Router();
const { getAllRequests, createRequest, deleteRequest } = require('../controllers/requestController');
const auth = require('../middlewares/auth');

router.get('/', auth(), getAllRequests);
router.post('/', auth(['admin']), createRequest);
router.delete('/:id', auth(['admin']), deleteRequest);

module.exports = router;