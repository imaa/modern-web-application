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
  } else {
    vm.job = {};
    vm.job.location = {};
    vm.job.location.coordinates = [];
  }

  vm.deleteSkill = (skill) => {
    if (confirm("Are your sure you want to delete this skill?")) {
      if (skill._id) {
        jobsFactory
          .deleteSkill(vm.job._id, sid)
          .then(() => {
            jobsFactory
              .getSkills(vm.job._id)
              .then((skills) => {
                this.job.skills = skills;
              })
              .catch();
            alert("Success");
          })
          .catch();
      } else {
        vm.job.skills.splice(vm.job.skills.indexOf(skill), 1);
        alert("Success");
      }
    }
  };
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
  vm.addSkill = () => {
    if (!vm.job.skills) {
      vm.job.skills = [];
    }
    vm.job.skills.push(vm.skill);
    vm.skill = [];
  };
  vm.clearForm = () => {
    vm.error = null;
    vm.success = false;
    $location.path("/");
    vm.job = {};
    vm.job.location = {};
    vm.job.location.coordinates = [];
    vm.jobForm.$setPristine();
  };
}
