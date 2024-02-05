const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const getSingle = async (req, res) => {
  //#swagger.tags=['movies']
  const movieId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('movies').find({ _id: movieId });
  result.toArray().then((movies) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(movies[0]);
  });
};

const getAll = async (req, res) => {
  //#swagger.tags=['movies']
  const result = await mongodb.getDatabase().db().collection('movies').find();
  result.toArray().then((movies) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(movies);
  });
};

const createmovie = async (req, res) => {
  //#swagger.tags=['movies']
  const movie = {
    year: req.body.year,
    make: req.body.make,
    model: req.body.model,
    color: req.body.color,
    engine: req.body.engine,
    transmission: req.body.transmission,
    gears: req.body.gears,
    shifter: req.body.shifter
  };
  const result = await mongodb.getDatabase().db().collection('movies').insertOne(movie);
  if (result.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when creating movie.')
  }
};

const updatemovie = async (req, res) => {
  //#swagger.tags=['movies']
  const movieId = new ObjectId(req.params.id);
  const movie = {
    year: req.body.year,
    make: req.body.make,
    model: req.body.model,
    color: req.body.color,
    engine: req.body.engine,
    transmission: req.body.transmission,
    gears: req.body.gears,
    shifter: req.body.shifter
  };
  const result = await mongodb.getDatabase().db().collection('movies').replaceOne({ _id: movieId }, movie);
  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when creating movie.')
  }
};

const deletemovie = async (req, res) => {
  //#swagger.tags=['movies']
  const movieId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('movies').deleteOne({ _id: movieId });
  if (result.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred when deleting movie.')
  }
};


module.exports = {
  getSingle,
  getAll,
  createmovie,
  updatemovie,
  deletemovie
};
