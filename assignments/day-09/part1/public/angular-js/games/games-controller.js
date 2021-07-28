angular.module("meanGames").controller("gamesController", gamesController);

function gamesController(gamesFactory) {
  const vm = this;
  vm.title = "Mean Games List";
  const _loadGames = () => {
    gamesFactory.getGames().then((games) => {
      vm.games = games;
    });
  };
  _loadGames();
  vm.game = {};
  vm.addUpdateGame = () => {
    if (vm.gameForm.$valid) {
      if (!vm.game._id) {
        gamesFactory
          .addGame(vm.game)
          .then(() => {
            vm.game = {};
            _loadGames();
            alert("Success");
            vm.gameForm.$setPristine();
          })
          .catch(() => {
            alert("Failed");
          });
      } else {
        gamesFactory
          .partialUpdateGame(vm.game._id, vm.game)
          .then(() => {
            vm.game = {};
            _loadGames();
            alert("Updated");
            vm.gameForm.$setPristine();
          })
          .catch(() => {
            alert("Failed");
          });
      }
    } else {
      debugger;
      vm.gameForm.$setSubmitted();
    }
  };
  vm.editGame = (game) => {
    vm.game = game;
    vm.game.designer = game.designers[0];
  };
  vm.deleteGame = ($event, game) => {
    console.log(game);
    $event.preventDefault();
    if (confirm("are you sure you want to delete this game " + game.title)) {
      gamesFactory
        .deleteGame(game._id)
        .then(() => {
          _loadGames();
          alert("Deleted");
        })
        .catch(() => {
          alert("Failed");
        });
    }
  };
}
