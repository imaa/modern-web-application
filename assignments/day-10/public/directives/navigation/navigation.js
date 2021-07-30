angular.module("JobFinder").directive("navigation", navigation);
function navigation() {
  return {
    restrict: "E",
    templateUrl: "./directives/navigation/navigation.html",
  };
}
