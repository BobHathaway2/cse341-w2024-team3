const router = require('express').Router();
const moviesController = require('../controllers/movies.js');
const validation = require('../middleware/validate.js');
const { isAuthenticated } = require('../middleware/authenticate.js');

router.get('/:id', validation.checkMongoId, moviesController.getSingle);
router.get('/', moviesController.getAll);
router.post('/', isAuthenticated, validation.savemovie, moviesController.createmovie);
router.put('/:id', isAuthenticated, validation.checkMongoId, validation.savemovie, moviesController.updatemovie);
router.delete('/:id', isAuthenticated, validation.checkMongoId, moviesController.deletemovie);

module.exports = router;
