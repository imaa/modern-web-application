angular.module("pl", ["ngRoute", "angular-jwt"]).config(config).run(run);

function config($routeProvider, $httpProvider) {
  $httpProvider.interceptors.push("AuthInterceptor");
  $routeProvider
    .when("/", {
      templateUrl: "home/home.html",
    })
    .when("/register", {
      templateUrl: "register/register.html",
      controller: "registerController",
      controllerAs: "vm",
    })
    .when("/profile", {
      templateUrl: "profile/profile.html",
      controller: "profileController",
      controllerAs: "vm",
      access: { restricted: true },
    })
    .when("/pls", {
      templateUrl: "programing-languages/programing-languages.html",
      controller: "programingLanguages",
      controllerAs: "vm",
    })
    .when("/pl/:id", {
      templateUrl: "programing-language/programing-language.html",
      controller: "programingLanguage",
      controllerAs: "pl",
    });
}
function run($rootScope, $location, $window, authFactory) {
  $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
    if (
      nextRoute.access &&
      nextRoute.access.restricted &&
      !$window.sessionStorage.token &&
      !authFactory.isAuthenticated()
    ) {
      event.preventDefault(); // Do not go to that path
      $location.path("/"); // Instead go to the root
    }
  });
}
