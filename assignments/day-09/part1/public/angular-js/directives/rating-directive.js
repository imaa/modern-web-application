angular.module("meanGames").directive("rating", rating);
function rating() {
  return {
    restrict: "E",
    templateUrl: "./angular-js/directives/rating.html",
    bindToController: true,
    controllerAs: "vm",
    controller: "gameController",
  };
}
