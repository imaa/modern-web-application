angular.module("meanGames").controller("RegisterController", RegisterController);

function RegisterController($http) {
    var vm = this;
    vm.register = function () {
        var user = {
            username: vm.username, 
            password: vm.password
        };
        console.log("Register");
        console.log("user ",user);
        if (!vm.username || !vm.password) { 
            vm.err = "Please add a username and password.";
        }
        else {
            if (vm.password !== vm.passwordRepeat) {
                vm.err = "Please make sure the passwords match.";
            } else {
                console.log("vm.username ", vm.username);
                console.log("vm.password ", vm.password);
                console.log("user ", user);
                $http.post("/api/users/register", user).then(function (result) {
                    console.log(result);
                    vm.message = "Successful registration, please login.";
                    // vm.message = "Tintin.";
                    vm.err = "";
                }).catch(function (err) {
                    console.log(err);
                });
            }
        }
    }
};