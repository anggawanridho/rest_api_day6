const express = require('express');
const bookController = require('../controllers/bookController');
const loggingMiddleware = require('../middleware/loggingMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(loggingMiddleware);

router.get('/', bookController.showAll);

router.post('/', roleMiddleware('admin'), bookController.create);

router.get('/:idBuku', bookController.showById);

router.put('/:idBuku', roleMiddleware('admin'), bookController.update);

router.delete('/:idBuku', roleMiddleware('admin'), bookController.delete);


module.exports = router;