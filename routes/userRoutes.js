const express = require('express');
const userController = require('../controllers/userController');
const loggingMiddleware = require('../middleware/loggingMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(loggingMiddleware);

// router.get('/', roleMiddleware('admin'), userController.);
router.post('/login', userController.auth);
router.post('/register', userController.create);


module.exports = router;