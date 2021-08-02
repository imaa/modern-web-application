angular
  .module("pl")
  .controller("loginController", function (usersFactory, $window, authFactory, $location) {
    const vm = this;
    vm.logout = () => {
      delete $window.sessionStorage.token;
      vm.update();
      $location.path("/");
    };
    vm.update = () => {
      vm.isAuthenticated = authFactory.isAuthenticated();
      vm.loginUser = authFactory.loginInUser();
      console.log(vm.loginUser);
    };
    vm.update();
    vm.user = {};
    vm.login = () => {
      usersFactory
        .doLogin(vm.user)
        .then((data) => {
          $window.sessionStorage.token = data.token;
          vm.update();
          $location.path("/");
        })
        .catch((err) => {
          alert(err.message);
        });
    };
  })
  .directive("navigation", rating);
function rating() {
  return {
    restrict: "E",
    templateUrl: "./directives/navigation/navigation.html",
    bindToController: true,
    controllerAs: "vm",
    controller: "loginController",
  };
}
