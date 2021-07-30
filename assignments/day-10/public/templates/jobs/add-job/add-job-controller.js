angular.module("JobFinder").controller("AddJobController", addJobController);
function addJobController(jobsFactory, $routeParams, $location) {
  const vm = this;
  vm.jobId = $routeParams["jobId"];
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
  vm.saveJob = () => {
    vm.error = null;
    if (vm.jobForm.$valid) {
      if (vm.jobId) {
        jobsFactory
          .updatePartial(vm.jobId, vm.job)
          .then(() => {
            vm.success = true;
            setTimeout(() => {
              vm.success = false;
            }, 3000);
          })
          .catch((err) => {
            vm.error = err;
          });
      } else {
        jobsFactory
          .addJob(vm.job)
          .then(() => {
            vm.success = true;
            setTimeout(() => {
              vm.success = false;
            }, 3000);
          })
          .catch((err) => {
            vm.error = err;
          });
      }
    }
  };
  vm.clearForm = () => {
    vm.error = null;
    vm.success = false;
    $location.path("/");
    vm.job = {};
    vm.job.location = [];
    vm.jobForm.$setPristine();
  };
}
