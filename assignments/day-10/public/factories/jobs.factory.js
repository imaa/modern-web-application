angular.module("JobFinder").factory("jobsFactory", jobsFactory);
function jobsFactory($http) {
  function getJobs(skip = 0, limit = 10, term = "", fromDate = "", toDate = "") {
    return $http
      .get(`/api/jobs?skip=${skip}&limit=${limit}&term=${term}&fromDate=${fromDate}&toDate=${toDate}`)
      .then(complete)
      .catch(failure);
  }
  function getJob(id) {
    return $http.get(`/api/jobs/${id}`).then(complete).catch(failure);
  }
  function addJob(job) {
    return $http.post(`/api/jobs`, job).then(complete).catch(failure);
  }
  function updatePartial(id, job) {
    return $http.put(`/api/jobs/${id}`, job).then(complete).catch(failure);
  }
  function deleteJob(id) {
    return $http.delete(`/api/jobs/${id}`).then(complete).catch(failure);
  }
  function getReviews(jobId) {
    return $http.get(`/api/jobs/${jobId}/reviews?limit=50`).then(complete).catch(failure);
  }
  function addReview(jobId, review) {
    return $http.post(`/api/jobs/${jobId}/reviews`, review).then(complete).catch(failure);
  }
  function complete(response) {
    return response.data;
  }
  function failure(error) {
    throw error?.data ?? error;
  }
  return {
    getJobs: getJobs,
    addJob: addJob,
    getJob: getJob,
    updatePartial: updatePartial,
    deleteJob: deleteJob,
    getReviews: getReviews,
    addReview: addReview,
  };
}
