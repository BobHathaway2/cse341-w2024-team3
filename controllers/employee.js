const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
const result = await mongodb.getDatabase().db().collection('employees').find();
    result.toArray().then((employees) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(employees);
    });
};

const getSingle = async (req, res) => {
   const employeeId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('employees').find({ _id: employeeId });
    result.toArray().then((employees) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(employees[0]);
    });
};

const createEmployee = async (req, res) => {
    const employee = {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        StartedDate: req.body.StartedDate,
        Pay: req.body.Pay,
        Contract: req.body.Contract,
        Age: req.body.Age
    };
    const response = await mongodb.getDatabase().db().collection('employees').insertOne(employee);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the employee.');
    }
};


const updateEmployee = async (req, res) => {
    const employeeId = new ObjectId(req.params.id);
    const employee = {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        StartedDate: req.body.StartedDate,
        Pay: req.body.Pay,
        Contract: req.body.Contract,
        Age: req.body.Age
    };
    const response = await mongodb.getDatabase().db().collection('employees').replaceOne({_id: employeeId}, employee);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the employee.');
    }
};

const deleteEmployee = async (req, res) => {
    const employeeId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('employees').deleteOne({ _id: employeeId });
    if (result.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Error occurred when deleting employee.')
    }
  };

module.exports = {
    getAll,
    getSingle,
    createEmployee,
    updateEmployee,
    deleteEmployee
};