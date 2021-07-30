const { config } = require("dotenv");
const mongoose = require("mongoose");
const configs = require("../configs");
const { HTTP_STATUS } = require("../helpers/httpStatus");
const { numbers } = require("../helpers/numbers");
const { jobResponse, completeRequest } = require("../helpers/response");
const Job = mongoose.model(configs.dbConfig.models.job.name);
function getSkills(req, res) {
  const _id = req.params[configs.apiConfig.job.id()];
  const skip = req.query.skip >= 0 ? numbers.getInt(req.query.skip) : 0;
  const limit =
    req.query.limit > 0 && req.query.limit <= configs.apiConfig.job.skill.maxListLimit()
      ? numbers.getInt(req.query.limit)
      : configs.apiConfig.job.skill.defaultListLimit();

  Job.findById(_id, "+skills")
    .select({
      skills: { $slice: [skip, limit + skip] },
    })
    .exec((err, job) => {
      const response = jobResponse(HTTP_STATUS.OK, job?.skills);
      if (err) {
        response = serverErrorResponse();
      }
      if (!job) {
        response.status = HTTP_STATUS.NOT_FOUND;
        response.data = { message: `Job with the following id ${_id} not found` };
      }
      completeRequest(res, response);
    });
}
function getSkill(req, res) {
  const _id = req.params[configs.apiConfig.job.id()];
  const _sid = req.params[configs.apiConfig.job.skill.id()];
  Job.findById(_id, "+skills").exec((err, job) => {
    const response = jobResponse(HTTP_STATUS.OK, null);
    if (err) {
      response = serverErrorResponse();
    }
    if (!job) {
      response.status = HTTP_STATUS.NOT_FOUND;
      response.data = { message: `Job with the following id ${_id} not found` };
    } else {
      skill = job.skills.id(_sid);
      if (!skill) {
        response.status = HTTP_STATUS.NOT_FOUND;
        response.data = { message: `Skill with the following id ${_id} not found` };
      } else {
        response.status = HTTP_STATUS.OK;
        response.data = skill;
      }
    }
    completeRequest(res, response);
  });
}
function deleteSkill(req, res) {
  const _id = req.params[configs.apiConfig.job.id()];
  const _sid = req.params[configs.apiConfig.job.skill.id()];
  Job.findById(_id, "+skills").exec((err, job) => {
    const response = jobResponse(HTTP_STATUS.NO_CONTENT, null);
    if (err) {
      response = serverErrorResponse();
      completeRequest(res, response);
    }
    if (!job) {
      response.status = HTTP_STATUS.NOT_FOUND;
      response.data = { message: `Job with the following id ${_id} not found` };
      completeRequest(res, response);
    } else {
      skill = job.skills.id(_sid);
      if (!skill) {
        response.status = HTTP_STATUS.NOT_FOUND;
        response.data = { message: `Skill with the following id ${_id} not found` };
        completeRequest(res, response);
      } else {
        job.skills.pull(_sid);
        job.save((err, job) => {
          if (err) {
            response.status = HTTP_STATUS.SERVER_ERROR;
            response.data = { message: "Error occurred while adding new skill" };
          } else {
            response.data = skill;
          }
          completeRequest(res, response);
        });
      }
    }
  });
}
function addSkill(req, res) {
  const _id = req.params[configs.apiConfig.job.id()];
  const skill = {
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    level: req.body.level,
  };
  Job.findById(_id, "+skills").exec((err, job) => {
    const response = jobResponse(HTTP_STATUS.CREATED, null);
    if (err) {
      response = serverErrorResponse();
      completeRequest(res, response);
    }
    if (!job) {
      response.status = HTTP_STATUS.NOT_FOUND;
      response.data = { message: `Job with the following id ${_id} not found` };
      completeRequest(res, response);
    } else {
      job.skills.push(skill);
      job.save((err, job) => {
        if (err) {
          response.status = HTTP_STATUS.SERVER_ERROR;
          response.data = { message: "Error occurred while adding new skill" };
        } else {
          response.data = skill;
        }
        completeRequest(res, response);
      });
    }
  });
}
function updateFullSkill(req, res) {
  _updateSkill(true, req, res);
}
function updatePartialSkill(req, res) {
  _updateSkill(false, req, res);
}
function _updateSkill(isFullUpdate, req, res) {
  const _id = req.params[configs.apiConfig.job.id()];
  const _sid = req.params[configs.apiConfig.job.skill.id()];
  Job.findById(_id, "+skills").exec((err, job) => {
    const response = jobResponse(HTTP_STATUS.NO_CONTENT, null);
    if (err) {
      response = serverErrorResponse();
      completeRequest(res, response);
    }
    if (!job) {
      response.status = HTTP_STATUS.NOT_FOUND;
      response.data = { message: `Job with the following id ${_id} not found` };
      completeRequest(res, response);
    } else {
      skill = job.skills.id(_sid);
      if (req.body.title || isFullUpdate) {
        skill.title = req.body.title;
      }
      if (req.body.level || isFullUpdate) {
        skill.level = numbers.getInt(req.body.level);
      }
      job.save((err, job) => {
        if (err) {
          response = serverErrorResponse();
        }
        completeRequest(res, response);
      });
    }
  });
}
module.exports = {
  getSkill: getSkill,
  getSkills: getSkills,
  updateFullSkill: updateFullSkill,
  updatePartialSkill: updatePartialSkill,
  deleteSkill: deleteSkill,
  addSkill: addSkill,
};
