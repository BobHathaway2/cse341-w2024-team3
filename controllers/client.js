const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
//#swagger.tags=['clients']
    const result = await mongodb.getDatabase().db().collection('clients').find();
    result.toArray().then((clients) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(clients);
    });
};

const getSingle = async (req, res) => {
//#swagger.tags=['clients']
const clientId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('clients').find({ _id: clientId });
    result.toArray().then((clients) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(clients[0]);
    });
};

const createClient = async (req, res) => {
//#swagger.tags=['clients']
    const client = {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        StartedDate: req.body.StartedDate,
        Pay: req.body.Pay,
        Contract: req.body.Contract,
        Age: req.body.Age
    };
    const response = await mongodb.getDatabase().db().collection('clients').insertOne(client);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the client.');
    }
};


const updateClient = async (req, res) => {
    //#swagger.tags=['clients']
    const clientId = new ObjectId(req.params.id);
    const client = {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        StartedDate: req.body.StartedDate,
        Pay: req.body.Pay,
        Contract: req.body.Contract,
        Age: req.body.Age
    };
    const response = await mongodb.getDatabase().db().collection('clients').replaceOne({_id: clientId}, client);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the client.');
    }
};

const deleteClient = async (req, res) => {
    //#swagger.tags=['clients']
    const clientId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('clients').deleteOne({ _id: clientId });
    if (result.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Error occurred when deleting client.')
    }
  };

module.exports = {
    getAll,
    getSingle,
    createClient,
    updateClient,
    deleteClient
};