var app = angular.module("Numbers", ["ngRoute"]).config(routeConfig);

function routeConfig($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "./user/user.html",
      controller: "UserController",
      controllerAs: "uCtrl",
    })
    .otherwise({ redirectTo: "/" });
}
