angular.module("JobFinder").factory("usersFactory", usersFactory);
function usersFactory($http) {
  function doLogin(user) {
    return $http.post(`/api/accounts/login`, user).then(complete).catch(failure);
  }
  function register(user) {
    return $http.post(`/api/accounts/register`, user).then(complete).catch(failure);
  }
  function complete(response) {
    return response.data;
  }
  function failure(error) {
    throw error?.data ?? error;
  }
  return {
    doLogin: doLogin,
    register: register,
  };
}
