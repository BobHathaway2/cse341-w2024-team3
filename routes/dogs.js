const router = require('express').Router();
const storesController = require('../controllers/stores.js');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/:id', validation.checkMongoId, storesController.getSingle);
router.get('/', storesController.getAll);
router.post('/', isAuthenticated, validation.savestore, storesController.createstore);
router.put('/:id', isAuthenticated, validation.checkMongoId, validation.savestore, storesController.updatestore);
router.delete('/:id', isAuthenticated, validation.checkMongoId, storesController.deletestore);

module.exports = router;