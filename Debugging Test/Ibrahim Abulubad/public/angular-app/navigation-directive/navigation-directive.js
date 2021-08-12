angular.module("meanGames").directive("gamesNavigation", GamesNavigation);
function GamesNavigation() {
  return {
    restrict: "E",
    templateUrl: "angular-app/navigation-directive/navigation-directive.html"
  };
}