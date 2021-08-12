angular.module("meanGames").controller("LoginController", LoginController);

function LoginController($http, $location, $window, AuthFactory, jwtHelper) {
  var vm = this;

  vm.loggedInUser= "None";
  
  vm.isLoggedIn = function () {
    if (AuthFactory.isLoggedIn) { return true }
    else { return false; }
  };

  vm.login = function () {
    if (vm.username && vm.password) {
      var user = {
        username: vm.username,
        password: vm.password
      };
      $http.post("/api/users/login", user).then(function (response) {
        console.log("Login processing");
        if (response.data.success) {
          $window.sessionStorage.token = response.data.token;
          AuthFactory.isLoggedIn = true;
          var token = $window.sessionStorage.token;
          var decodedToken = jwtHelper.decodeToken(token);
          vm.loggedinUser = decodedToken.username;
          console.log("Login Success");
        }
      }).catch(function (err) {
        console.log(err);
      });
    }
  }

  vm.logout = function () {
    AuthFactory.isLoggedIn = false;
    delete $window.sessionStorage.token;
    $location.path("/");
  }

  vm.isActiveTab = function (url) {
    var currentPath = $location.path().split("/")[1];
    return (url === currentPath ? "active" : "");
  }
}