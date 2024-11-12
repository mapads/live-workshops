// server/routes/goalRoutes.js
const express = require('express');
const router = express.Router();
const { createGoal, getGoals } = require('../controllers/goalController');

router.post('/goals', createGoal);
router.get('/goals', getGoals);

module.exports = router;