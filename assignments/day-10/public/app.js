angular.module("JobFinder", ["ngRoute", "angular-jwt"]).config(config).run(run);

function config($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "/templates/home/home.html",
    })
    .when("/jobs", {
      templateUrl: "/templates/jobs/jobs.html",
      bindToController: true,
      controller: "JobsController",
      controllerAs: "vm",
    })
    .when("/jobs/add", {
      templateUrl: "/templates/jobs/add-job/add-job.html",
      bindToController: true,
      controller: "AddJobController",
      controllerAs: "vm",
    })
    .when("/jobs/update/:jobId", {
      templateUrl: "/templates/jobs/add-job/add-job.html",
      bindToController: true,
      controller: "AddJobController",
      controllerAs: "vm",
    })
    .when("/jobs/:jobId", {
      templateUrl: "/templates/jobs/job/job.html",
      bindToController: true,
      controller: "jobController",
      controllerAs: "vm",
    })
    .when("/register", {
      templateUrl: "/templates/register/register.html",
      bindToController: true,
      controller: "registerController",
      controllerAs: "vm",
    })
    .otherwise({ redirectTo: "/" });
}
function run() {}
