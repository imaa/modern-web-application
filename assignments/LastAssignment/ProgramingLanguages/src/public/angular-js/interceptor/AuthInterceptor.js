angular.module("pl").factory("AuthInterceptor", AuthInterceptor);
function AuthInterceptor($location, $q, $window) {
  return { request: request, response: response, responseError: responseError };
  function request(config) {
    config.headers = config.headers || {};
    if ($window.sessionStorage.token) {
      config.headers.Authorization = "Bearer " + $window.sessionStorage.token;
    }
    return config;
  }
  function response(response) {
    return response || $q.when(response);
  }
  function responseError(rejection) {
    if (rejection.status === 401 || rejection.status === 403) {
      delete $window.sessionStorage.token;
      $location.path("/");
    }
    return $q.reject(rejection);
  }
}
