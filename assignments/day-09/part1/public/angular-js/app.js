angular.module("meanGames", ["ngRoute"]).config(config);

function config($routeProvider) {
  $routeProvider
    .when("/", {
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
