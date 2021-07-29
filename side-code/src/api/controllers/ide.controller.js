const mongoose = require("mongoose");
const { getInt } = require("../../helpers/number.helpers");
const apiConfig = require("../configs/api.config");
const { models } = require("../configs/models.config");
const PL = mongoose.model(models.ProgramingLanguage.name);
const getIDEs = (req, res) => {
  const _plId = req.params[apiConfig.pls.id()];
  const skip = req.query.skip >= 0 ? getInt(req.query.skip) : 0;
  const limit =
    req.query.limit > 0 && req.query.limit <= apiConfig.pls.ides.maxListCount()
      ? getInt(req.query.limit)
      : apiConfig.pls.ides.defaultListCount();

  PL.findById(_plId, "+ides")
    .select({
      ides: { $slice: [skip, limit + skip] },
      name: 0,
      description: 0,
      releaseDate: 0,
      founder: 0,
    })
    .exec((err, pl) => {
      const response = { status: 200, data: pl };
      if (err) {
        response.status = 500;
        response.data = { error: `Error Occurred on the sever :${err}` };
      }
      if (!pl) {
        _handlePLNotFound(response, _plId);
      }
      res.status(response.status).json(response.data.ides);
    });
};
const saveIDE = (req, res) => {
  const _plId = req.params[apiConfig.pls.id()];
  const ide = {
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    developer: req.body.developer,
  };
  PL.findById(_plId, "+ides", (err, pl) => {
    const response = { status: 201, data: ide };
    if (err) {
      response.status = 500;
      response.data = {
        error: `Error Occurred on the sever while saving the document:${err}`,
      };
    }
    if (!pl) {
      _handlePLNotFound(response, _plId);
      res.status(response.status).json(response.data);
    } else {
      pl.ides.push(ide);
      pl.save((err, newPL) => {
        if (err) {
          response.status = 500;
          response.data = {
            error: `Error Occurred on the sever while saving the document:${err}`,
          };
        }
        res.status(response.status).json(ide);
      });
    }
  });
};
const getIDE = (req, res) => {
  const _plId = req.params[apiConfig.pls.id()];
  const _ideId = req.params[apiConfig.pls.ides.id()];
  PL.findById(_plId, "+ides", (err, pl) => {
    const response = { status: 200, data: pl };
    if (err) {
      response.status = 500;
      response.data = { error: `Error Occurred on the sever :${err}` };
    }
    if (!pl) {
      _handlePLNotFound(response, _plId);
    } else {
      const ide = pl.ides.id(_ideId);
      if (!ide) {
        _handleNotFound(response, _ideId);
      } else {
        response.data = ide;
      }
    }
    res.status(response.status).json(response.data);
  });
};
const _handleNotFound = (response, _id) => {
  response.status = 404;
  response.data = {
    error: `IDE with the id ${_id} not found`,
  };
};
const _handlePLNotFound = (response, _id) => {
  response.status = 404;
  response.data = {
    error: `Programing language with the id ${_id} not found`,
  };
};
const updateFullIDE = (req, res) => {
  _updateIDE(true, req, res);
};
const updatePartialIDE = (req, res) => {
  _updateIDE(false, req, res);
};
const deleteIDE = (req, res) => {
  const _plId = req.params[apiConfig.pls.id()];
  const _ideId = req.params[apiConfig.pls.ides.id()];
  PL.findById(_plId, "+ides", (err, pl) => {
    const response = { status: 204, data: null };

    if (err) {
      response.status = 500;
      response.data = {
        error: `Error Occurred on the sever while deleting the IDE :${err}`,
      };
      res.status(response.status).json(response.data);
    }
    if (!pl) {
      _handlePLNotFound(response, _plId);
      res.status(response.status).json(response.data);
    } else {
      const ide = pl.ides.id(_ideId);
      if (!ide) {
        _handleNotFound(response, _ideId);
        res.status(response.status).json(response.data);
      } else {
        pl.ides.pull(ide);
        pl.save((err, newPL) => {
          if (err) {
            response.status = 500;
            response.data = {
              error: `Error Occurred on the sever while saving the document:${err}`,
            };
          }
          res.status(response.status).json(response.data);
        });
      }
    }
  });
};
const _updateIDE = (isFullUpdate, req, res) => {
  const _plId = req.params[apiConfig.pls.id()];
  const _ideId = req.params[apiConfig.pls.ides.id()];
  PL.findById(_plId, "+ides", (err, pl) => {
    const response = { status: 204, data: null };

    if (err) {
      response.status = 500;
      response.data = {
        error: `Error Occurred on the sever while deleting the IDE :${err}`,
      };
      res.status(response.status).json(response.data);
    }
    if (!pl) {
      _handlePLNotFound(response, _plId);
      res.status(response.status).json(response.data);
    } else {
      const ide = pl.ides.id(_ideId);
      if (!ide) {
        _handleNotFound(response, _ideId);
        res.status(response.status).json(response.data);
      } else {
        if (req.body.name || isFullUpdate) {
          ide.name = req.body.name;
        }
        if (req.body.developer || isFullUpdate) {
          ide.developer = req.body.developer;
        }
        pl.save((err, newPL) => {
          if (err) {
            response.status = 500;
            response.data = {
              error: `Error Occurred on the sever while saving the document:${err}`,
            };
          }
          res.status(response.status).json(response.data);
        });
      }
    }
  });
};

module.exports = {
  getIDEs: getIDEs,
  getIDE: getIDE,
  updateFullIDE: updateFullIDE,
  updatePartialIDE: updatePartialIDE,
  deleteIDE: deleteIDE,
  saveIDE: saveIDE,
};
