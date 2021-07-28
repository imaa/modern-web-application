angular.module("meanGames").controller("gamesController", gamesController);

function gamesController(gamesFactory) {
  const vm = this;
  vm.title = "Mean Games List";
  gamesFactory.getGames().then((games) => {
    vm.games = games;
  });
}
