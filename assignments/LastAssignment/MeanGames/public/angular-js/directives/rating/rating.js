angular.module("meanGames").directive("rating", rating);
function rating() {
  return {
    restrict: "E",
    templateUrl: "./directives/rating/rating.html",
    bindToController: true,
    controllerAs: "vm",
    controller: "gameController",
  };
}
