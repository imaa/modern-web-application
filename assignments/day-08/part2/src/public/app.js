angular.module("pl", ["ngRoute"]).config(config);

function config($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "programing-languages/programing-languages.html",
      controller: "programingLanguages",
      controllerAs: "pl",
    })
    .when("/pl/:id", {
      templateUrl: "programing-language/programing-language.html",
      controller: "programingLanguage",
      controllerAs: "pl",
    });
}
