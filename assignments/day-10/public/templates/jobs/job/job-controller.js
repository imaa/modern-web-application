angular.module("JobFinder").controller("jobController", addJobController);
function addJobController(jobsFactory, $routeParams, $location, authFactory) {
  const vm = this;
  vm.jobId = $routeParams["jobId"];
  vm.deleteJob = (id) => {
    if (confirm("Are your sure you want to delete this job?")) {
      jobsFactory
        .deleteJob(id)
        .then(() => {
          alert("Success");
          $location.path("/jobs");
        })
        .catch();
    }
  };
  vm.deleteSkill = (sid) => {
    if (confirm("Are your sure you want to delete this skill?")) {
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
    }
  };
  vm.postReview = (id) => {
    vm.error = null;
    vm.success = false;
    if (vm.reviewForm.$valid) {
      vm.loginUser = authFactory.loginInUser();
      if (vm.loginUser) {
        vm.review.nameOfReviewer = vm.loginUser.name;
        jobsFactory
          .addReview(vm.job._id, vm.review)
          .then(() => {
            vm.review = {};
            vm.getReviews();
            vm.success = true;
            vm.reviewForm.$setPristine();
          })
          .catch((err) => {
            vm.error = err?.message ?? err.statusText;
          });
      } else {
        vm.error = "You have to login to add review";
      }
    }
  };
  vm.getJob = () => {
    if (vm.jobId) {
      jobsFactory
        .getJob(vm.jobId)
        .then((job) => {
          vm.job = job;
          vm.getReviews();
        })
        .catch((err) => {
          vm.error = err?.message ?? err.statusText;
        });
    }
  };
  vm.getJob();
  vm.getReviews = function () {
    jobsFactory
      .getReviews(vm.jobId)
      .then((reviews) => {
        vm.reviews = reviews;
      })
      .catch((err) => {
        debugger;
        vm.error = err?.message ?? err.statusText;
      });
  };
}
