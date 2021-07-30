angular.module("JobFinder").controller("registerController", registerController);
function registerController(usersFactory, $routeParams, $location) {
  const vm = this;
  vm.register = () => {
    vm.error = "";
    if (vm.userForm.$valid) {
      if (vm.user.password !== vm.user.confirmPassword) {
        vm.error = "Password and confirm password should match";
      } else {
        usersFactory
          .register(vm.user)
          .then((result) => {
            vm.success = true;
            setTimeout(() => {
              $location.path("/");
            }, 2000);
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
    vm.userForm.$setPristine();
  };
}
