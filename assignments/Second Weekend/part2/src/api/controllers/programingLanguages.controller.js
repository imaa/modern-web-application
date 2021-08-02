const mongoose = require("mongoose");
const { getInt } = require("../../helpers/number.helpers");
const apiConfig = require("../configs/api.config");
const { models } = require("../configs/models.config");
const PL = mongoose.model(models.ProgramingLanguage.name);
const getProgramingLanguages = (req, res) => {
  let query = {};
  if (req.query.term && req.query.term.length > 0) {
    query.name = { $regex: req.query.term, $options: "i" };
  }
  PL.find(query)
    .skip(req.query.skip >= 0 ? getInt(req.query.skip) : 0)
    .limit(
      req.query.limit > 0 && req.query.limit <= apiConfig.pls.maxListCount()
        ? getInt(req.query.limit)
        : apiConfig.pls.defaultListCount()
    )
    .exec((err, pls) => {
      const response = { status: 200, data: pls };
      if (err) {
        response.status = 500;
        response.data = { error: `Error Occurred on the sever :${err}` };
      }
      res.status(response.status).json(response.data);
    });
};
const saveProgramingLanguage = (req, res) => {
  const pl = new PL({
    name: req.body.name,
    description: req.body.description,
    releaseDate: req.body.releaseDate,
    founder: req.body.founder,
  });
  PL.create(pl, (err, savePL) => {
    const response = { status: 201, data: savePL };
    if (err) {
      response.status = 500;
      response.data = {
        error: `Error Occurred on the sever while saving the document:${err}`,
      };
    }
    res.status(response.status).json(response.data);
  });
};
const getProgramingLanguage = (req, res) => {
  const _id = req.params[apiConfig.pls.id()];
  PL.findById(_id, (err, pl) => {
    const response = { status: 200, data: pl };
    if (err) {
      response.status = 500;
      response.data = { error: `Error Occurred on the sever :${err}` };
    }
    if (!pl) {
      _handleNotFound(response, _id);
    }
    res.status(response.status).json(response.data);
  });
};
const _handleNotFound = (response, _id) => {
  response.status = 404;
  response.data = {
    error: `Programing language with the id ${_id} not found`,
  };
};
const updateFullProgramingLanguage = (req, res) => {
  _updateProgramingLanguage(true, req, res);
};
const updatePartialProgramingLanguage = (req, res) => {
  _updateProgramingLanguage(false, req, res);
};
const deleteProgramingLanguage = (req, res) => {
  const _id = req.params[apiConfig.pls.id()];
  PL.findByIdAndDelete(_id, (err, pl) => {
    const response = { status: 204, data: null };
    if (err) {
      response.status = 500;
      response.data = {
        error: `Error Occurred on the sever while deleting the programing language :${err}`,
      };
    }
    if (!pl) {
      _handleNotFound(response, _id);
    }
    res.status(response.status).json(response.data);
  });
};
const _updateProgramingLanguage = (isFullUpdate, req, res) => {
  const _id = req.params[apiConfig.pls.id()];

  const pl = {};
  if (req.body.name || isFullUpdate) {
    pl.name = req.body.name;
  }
  if (req.body.description || isFullUpdate) {
    pl.description = req.body.description;
  }
  if (req.body.releaseDate || isFullUpdate) {
    pl.releaseDate = req.body.releaseDate;
  }
  if (req.body.founder || isFullUpdate) {
    pl.founder = req.body.founder;
  }
  PL.findByIdAndUpdate(_id, pl, (err, pl) => {
    const response = { status: 204, data: null };
    if (err) {
      response.status = 500;
      response.data = {
        error: `Error Occurred on the sever while deleting the programing language :${err}`,
      };
    }
    if (!pl) {
      _handleNotFound(response, _id);
    }
    res.status(response.status).json(response.data);
  });
};

module.exports = {
  getProgramingLanguages: getProgramingLanguages,
  getProgramingLanguage: getProgramingLanguage,
  updateFullProgramingLanguage: updateFullProgramingLanguage,
  updatePartialProgramingLanguage: updatePartialProgramingLanguage,
  deleteProgramingLanguage: deleteProgramingLanguage,
  saveProgramingLanguage: saveProgramingLanguage,
};
