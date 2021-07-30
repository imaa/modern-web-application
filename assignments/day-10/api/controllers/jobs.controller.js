const mongoose = require("mongoose");
const configs = require("../configs");
const { HTTP_STATUS } = require("../helpers/httpStatus");
const { numbers } = require("../helpers/numbers");
const { jobResponse, completeRequest } = require("../helpers/response");
const Job = mongoose.model(configs.dbConfig.models.job.name);
function _getQuery(req) {
  const query = {};

  if (req.query.lng && req.query.lat) {
    const lng = numbers.getFloat(req.query.lng);
    const lat = numbers.getFloat(req.query.lat);
    if (lng && lat) {
      query = {
        location: {
          $geometry: {
            $near: {
              type: "Point",
              coordinates: { lng, lat },
            },
            $maxDistance: 1000,
            $minDistance: 0,
          },
        },
      };
    }
  } else if (req.query.term) {
    query.title = { $regex: req.query.term, $options: "i" };
  } else if (req.query.fromDate) {
    if (!query.postDate) {
      query.postDate = {};
    }
    query.postDate.$gte = new Date(req.query.fromDate);
  } else if (req.query.toDate) {
    if (!query.postDate) {
      query.postDate = {};
    }
    query.postDate.$lt = new Date(req.query.toDate);
  }
  return query;
}
function getJobs(req, res) {
  const query = _getQuery(req);
  Job.find(query)
    .skip(req.query.skip >= 0 ? numbers.getInt(req.query.skip) : 0)
    .limit(
      req.query.limit > 0 && req.query.limit <= configs.apiConfig.job.maxListLimit()
        ? numbers.getInt(req.query.limit)
        : configs.apiConfig.job.defaultListLimit()
    )
    .exec((err, jobs) => {
      let response = jobResponse(HTTP_STATUS.OK, jobs);
      if (err) {
        console.log(err);
        response = serverErrorResponse();
      }
      completeRequest(res, response);
    });
}
function getJob(req, res) {
  const _id = req.params[configs.apiConfig.job.id()];
  Job.findById(_id).exec((err, job) => {
    let response = jobResponse(HTTP_STATUS.OK, job);
    if (err) {
      response.status = HTTP_STATUS.SERVER_ERROR;
      response.data = { message: "Error occurred while finding the job" };
    }
    if (!job) {
      response.status = HTTP_STATUS.NOT_FOUND;
      response.data = { message: `Job with the following id ${_id} not found` };
    }
    completeRequest(res, response);
  });
}
function deleteJob(req, res) {
  const _id = req.params[configs.apiConfig.job.id()];
  let response = jobResponse(HTTP_STATUS.NO_CONTENT, null);
  Job.findOneAndDelete(_id).exec((err, job) => {
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
function addJob(req, res) {
  let response = jobResponse(HTTP_STATUS.NOT_ACCEPTED, null);
  const job = new Job({
    title: req.body.title,
    salary: numbers.getFloat(req.body.salary),
    description: req.body.description,
    postDate: req.body.postDate,
    experience: req.body.experience,
  });
  if (req.body.location) {
    job.location = {
      companyName: req.body.location.companyName,
      street: req.body.location.street,
      zip: req.body.location.street,
      state: req.body.location.street,
      city: req.body.location.city,
      coordinates: req.body.location.coordinates,
    };
  }
  job.validate((err) => {
    if (err) {
      response.data = { message: "Validation error : " + err };
      completeRequest(res, response);
    } else {
      Job.create(job, (err, job) => {
        response.status = HTTP_STATUS.CREATED;
        response.data = job;
        if (err) {
          response = serverErrorResponse();
        }
        completeRequest(res, response);
      });
    }
  });
}
function updateFullJob(req, res) {
  _updateJob(true, req, res);
}
function updatePartialJob(req, res) {
  _updateJob(false, req, res);
}
function _updateJob(isFullUpdate, req, res) {
  const _id = req.params[configs.apiConfig.job.id()];
  const jobUpdate = {};
  if (!req.body.title || isFullUpdate) {
    jobUpdate.title = req.body.title;
  }
  if (!req.body.salary || isFullUpdate) {
    jobUpdate.salary = numbers.getFloat(req.body.salary);
  }
  if (!req.body.description || isFullUpdate) {
    jobUpdate.description = req.body.description;
  }
  if (!req.body.postDate || isFullUpdate) {
    jobUpdate.postDate = req.body.postDate;
  }
  if (!req.body.experience || isFullUpdate) {
    jobUpdate.experience = req.body.experience;
  }
  if (req.body.location || isFullUpdate) {
    job.location = {};

    if (req.body.location.companyName || isFullUpdate) {
      job.location.companyName = req.body.location.companyName;
    }
    if (req.body.location.street || isFullUpdate) {
      job.location.street = req.body.location.street;
    }
    if (req.body.location.zip || isFullUpdate) {
      job.location.zip = req.body.location.zip;
    }
    if (req.body.location.state || isFullUpdate) {
      job.location.state = req.body.location.state;
    }
    if (req.body.location.city || isFullUpdate) {
      job.location.city = req.body.location.city;
    }
    if (req.body.location.coordinates || isFullUpdate) {
      job.location.coordinates = req.body.location.coordinates;
    }
  }
  Job.findByIdAndUpdate(_id, jobUpdate, (err, doc) => {
    let response = jobResponse(HTTP_STATUS.NO_CONTENT, null);
    if (err) {
      response = serverErrorResponse();
    }
    if (!doc) {
      response.status = HTTP_STATUS.NOT_FOUND;
      response.data = { message: `Job with the following id ${_id} not found` };
    }
    completeRequest(res, response);
  });
}
module.exports = {
  getJob: getJob,
  getJobs: getJobs,
  updateFullJob: updateFullJob,
  updatePartialJob: updatePartialJob,
  deleteJob: deleteJob,
  addJob: addJob,
};
