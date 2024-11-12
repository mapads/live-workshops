// server/routes/goalRoutes.js
const Router = require('express');
const router = Router();
const { createApplication } = require('../controllers/applicationController');

router.post('/apply', createApplication);

module.exports = router;