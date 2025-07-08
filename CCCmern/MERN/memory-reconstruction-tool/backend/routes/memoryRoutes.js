const express = require('express');
const router = express.Router();
const memoryController = require('../controllers/memoryController');

router.post('/create', memoryController.createMemory);

module.exports = router;
