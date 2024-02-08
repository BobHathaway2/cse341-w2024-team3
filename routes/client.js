const express = require('express');
const router = express.Router();

const validation = require('../middleware/validate');
const clientController = require('../controllers/client');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', clientController.getAll);

router.get('/:id', validation.checkMongoId, clientController.getSingle);

router.post('/', isAuthenticated, validation.saveClient, clientController.createClient); // validation.checkClient,

router.put('/:id', isAuthenticated, validation.saveClient, validation.checkMongoId, clientController.updateClient);

router.delete('/:id', isAuthenticated, validation.checkMongoId, clientController.deleteClient);



module.exports = router;