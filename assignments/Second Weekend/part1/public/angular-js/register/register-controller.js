angular.module("meanGames").controller("profileController", registerController);

function registerController(usersFactory) {
  const vm = this;
  vm.title = "Register new user";
  vm.register = () => {
    vm.error = "";
    if (vm.registerForm.$valid) {
      if (vm.user.password !== vm.user.confirmPassword) {
        vm.error = "Password and confirm password should match";
      } else {
        usersFactory
          .register(vm.user)
          .then((result) => {
            vm.success = true;
          })
          .catch((err) => {
            vm.error = err?.message ?? err.statusText;
          });
      }
    }
  };
  vm.clearForm = () => {
    vm.error = null;
    vm.success = false;
    vm.user = {};
    vm.registerForm.$setPristine();
  };
}
