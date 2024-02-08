const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const getSingle = async (req, res) => {
  //#swagger.tags=['stores']
  const storeId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('stores').find({ _id: storeId });
  result.toArray().then((stores) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(stores[0]);
  });
};

const getAll = async (req, res) => {
  //#swagger.tags=['stores']
  const result = await mongodb.getDatabase().db().collection('stores').find();
  result.toArray().then((stores) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(stores);
  });
};

const createstore = async (req, res) => {
  //#swagger.tags=['stores']
  const store = {
    Name: req.body.Name,
    Location: req.body.Location,
    NumMovies: req.body.NumMovies,
    Rent: req.body.Rent,
    Employees: req.body.Employees
  };
  const result = await mongodb.getDatabase().db().collection('stores').insertOne(store);
  if (result.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when creating store.')
  }
};

const updatestore = async (req, res) => {
  //#swagger.tags=['stores']
  const storeId = new ObjectId(req.params.id);
  const store = {
    Name: req.body.Name,
    Location: req.body.Location,
    NumMovies: req.body.NumMovies,
    Rent: req.body.Rent,
    Employees: req.body.Employees
  };
  const result = await mongodb.getDatabase().db().collection('stores').replaceOne({ _id: storeId }, store);
  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when creating store.')
  }
};

const deletestore = async (req, res) => {
  //#swagger.tags=['stores']
  const storeId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('stores').deleteOne({ _id: storeId });
  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when deleting store.')
  }
};


module.exports = {
  getSingle,
  getAll,
  createstore,
  updatestore,
  deletestore
};
