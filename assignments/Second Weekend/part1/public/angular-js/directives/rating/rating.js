angular.module("meanGames").directive("rating", rating);
function rating() {
  return {
    restrict: "E",
    templateUrl: "./angular-js/directives/rating/rating.html",
    bindToController: true,
    controllerAs: "vm",
    controller: "gameController",
  };
}
