angular.module("meanGames").controller("profileController", registerController);

function registerController(authFactory) {
  const vm = this;
  vm.title = "User Profile";
  vm.isAuthenticated = authFactory.isAuthenticated();
  vm.loginUser = authFactory.loginInUser();
  console.log(vm.loginUser);
}
