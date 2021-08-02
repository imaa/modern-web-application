angular.module("meanGames").controller("gameController", gameController);

function gameController(gamesFactory, $routeParams) {
  const vm = this;
  vm.title = "Mean Games List";

  gamesFactory.getGame($routeParams.id).then((game) => {
    vm.game = game;
    vm.ratings = new Array(game.rate);
  });
}
