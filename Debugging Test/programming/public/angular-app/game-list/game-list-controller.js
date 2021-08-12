angular.module("meanGames").controller("GamesController", GamesController);

function GamesController($route, GameDataFactory, AuthFactory) {
    var vm = this;
    vm.title = "Mean Games App";
    vm.isSubmitted = false;
    GameDataFactory.getAllGames().then(function (response) {
        vm.games = response;
    });

    vm.isLoggedIn = function () {
        if (AuthFactory.isLoggedIn) {
            return true;
        }
        else {
            return false;
        }
    };

    vm.addGame = function () {
        var postData = {
            title: vm.newGameTitle,
            price: vm.newGamePrice,
            rate: vm.newGameRating,
            year: vm.newGameYear,
            rating: vm.newGameRating,
            minPlayers: vm.newGameMinPlayers,
            maxPlayers: vm.newGameMaxPlayers,
            minAge: vm.newGameMinAge,
            designers: vm.newGameDesigner,
        };
        if (vm.gameForm.$valid) {
            GameDataFactory.postGame(postData).then(function (response) {
                console.log("Game saved");
                $route.reload();
            }).catch(function (error) {
                console.log(error);
            });
        } else {
            vm.isSubmitted = true;
        }
    };
}
