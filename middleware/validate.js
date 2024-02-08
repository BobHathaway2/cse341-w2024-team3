const validator = require('../helpers/validate');

const savestore = (req, res, next) => {
  const validationRule = {
    Name: 'required|min:1|max:50|string',
    Location: 'required|min:1|max:50|string',
    NumMovies: 'required|numeric',
    Rent: 'required|',
    Employees: 'required|numeric'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};


const savemovie = (req, res, next) => {
    const validationRule = {
      Name: 'required|min:1|max:50|string',
      Description: 'required|min:1|max:256|string',
      Director: 'required|min:1|max:50|string',
      DistributedBy: 'required|min:1|max:150|string',
      ProductionCompany: 'required|min:1|max:150|string',
      Cinematography:  'required|min:1|max:50|string',
      BoxOffice: 'required|max:150|string',
      ReleaseDate: 'required|date',
      MusicBy: 'required|min:1|max:50|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };

  const saveEmployee = (req, res, next) => {
    const validationRule = {
      FirstName: 'required|min:1|max:50|string',
      LastName: 'required|min:1|max:50|string',
      StartedDate: 'required|date',
      Pay: 'required|min:1|max:50|string',
      Contract: ['required', { 'in': ["yes", "Yes", "YES", "no", "No", "NO"] }],
      ProductionCompany: 'required|min:1|max:150|string',
      Cinematography:  'required|min:1|max:50|string',
      BoxOffice: 'required|max:150|string',
      ReleaseDate: 'required|date',
      MusicBy: 'required|min:1|max:50|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };

  const saveClient = (req, res, next) => {
    const validationRule = {
      FirstName: 'required|min:1|max:50|string',
      LastName: 'required|min:1|max:50|string',
      MovieName:  'required|min:1|max:50|string',
      Paid:  'required|min:1|max:50|string',
      MovieOut: 'required|date',
      MovieIn: 'required}date'
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };
  
  const checkMongoId = (req, res, next) => {
    const validationRule = {
      id: 'required|min:24|max:24|string'
    };
    validator(req.params, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  }
module.exports = {
  savestore,
  savemovie,
  saveEmployee,
  saveClient,
  checkMongoId
};
