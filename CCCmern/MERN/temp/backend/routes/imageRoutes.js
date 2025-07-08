const express = require('express');
const router = express.Router();
const { generateKeyframe } = require('../controllers/imageController');

router.post('/generate', generateKeyframe);

module.exports = router;
