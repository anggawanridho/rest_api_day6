const express = require('express');
const bookController = require('../controllers/bookController');
const loggingMiddleware = require('../middleware/loggingMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(loggingMiddleware);

router.post('/', roleMiddleware('admin'), bookController.create);

router.get('/', bookController.showAll);

// router.get('/book', bookController.);

router.put('/books', roleMiddleware('admin'), bookController.update);

router.delete('/books', roleMiddleware('admin'), bookController.delete);


module.exports = router;