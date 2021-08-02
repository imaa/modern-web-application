angular.module("meanGames", ["ngRoute", "angular-jwt"]).config(config);

function config($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "angular-js/home/home.html",
    })
    .when("/register", {
      templateUrl: "angular-js/register/register.html",
      controller: "registerController",
      controllerAs: "vm",
    })
    .when("/profile", {
      templateUrl: "angular-js/profile/profile.html",
      controller: "profileController",
      controllerAs: "vm",
    })
    .when("/games", {
      templateUrl: "angular-js/games/games.html",
      controller: "gamesController",
      controllerAs: "vm",
    })
    .when("/game/:id", {
      templateUrl: "angular-js/game/game.html",
      controller: "gameController",
      controllerAs: "ctrl",
    });
}
