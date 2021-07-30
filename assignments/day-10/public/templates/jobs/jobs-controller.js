angular.module("JobFinder").controller("JobsController", jobsController);
function jobsController(jobsFactory) {
  const vm = this;
  vm.jobs = [];
  vm.deleteJob = (id) => {
    if (confirm("Are your sure you want to delete this job?")) {
      jobsFactory
        .deleteJob(id)
        .then((jobs) => {
          vm.getJobs(0, 10);
        })
        .catch();
    }
  };
  vm.getJobs = (skip, limit, searchText, fromDate, toDate) => {
    jobsFactory
      .getJobs(skip, limit, searchText, fromDate, toDate)
      .then((jobs) => {
        vm.jobs = jobs;
      })
      .catch();
  };
  vm.getJobs(0, 10);
  vm.filter = () => {
    vm.getJobs(0, 10, vm.searchText?.trim(), vm.fromDate, vm.toDate);
  };
}
