const express = require('express');
const router = express.Router();

const validation = require('../middleware/validate');
const employeesController = require('../controllers/employee');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', employeesController.getAll);

router.get('/:id', validation.checkMongoId, employeesController.getSingle);

router.post('/', isAuthenticated, validation.saveEmployee, employeesController.createEmployee); // validation.checkEmployee

router.put('/:id', isAuthenticated, validation.checkMongoId, validation.saveEmployee, employeesController.updateEmployee);

router.delete('/:id', isAuthenticated, validation.checkMongoId, employeesController.deleteEmployee);



module.exports = router;