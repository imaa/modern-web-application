app.controller("UserController", function (UserFactory) {
  const vm = this;
  vm.numberOfUsers = 10;
  vm.gender = "";
  vm.users = [];
  vm.onChange = () => {
    UserFactory.gerUsers(vm.numberOfUsers, vm.gender)
      .then((res) => {
        vm.users = res.results;
      })
      .catch();
  };
  vm.onChange();
});
