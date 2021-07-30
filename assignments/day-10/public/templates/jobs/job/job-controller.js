angular.module("JobFinder").controller("jobController", addJobController);
function addJobController(jobsFactory, $routeParams, $location) {
  const vm = this;
  vm.jobId = $routeParams["jobId"];
  vm.deleteJob = (id) => {
    if (confirm("Are your sure you want to delete this job?")) {
      jobsFactory
        .deleteJob(id)
        .then((jobs) => {
          alert("Success");
          $location.path("/jobs");
        })
        .catch();
    }
  };
  if (vm.jobId) {
    jobsFactory
      .getJob(vm.jobId)
      .then((job) => {
        vm.job = job;
      })
      .catch((err) => {
        vm.error = err?.message ?? err.statusText;
      });
  }
}
