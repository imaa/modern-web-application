angular.module("JobFinder").factory("authFactory", authFactory);
function authFactory(jwtHelper, $window) {
  const self = this;

  return {
    loginInUser: () => self.loginInUser,
    isAuthenticated: () => {
      if ($window.sessionStorage.token) {
        self.loginInUser = jwtHelper.decodeToken($window.sessionStorage.token);
      } else {
        self.loginInUser = null;
      }
      return self.loginInUser?.id ? true : false;
    },
  };
}
