angular.module("pl").factory("programingLanguageFactory", programingLanguageFactory);
function programingLanguageFactory($http) {
  return {
    getProgramingLanguages: getPLs,
    getProgramingLanguage: getPL,
  };
  function getPLs() {
    return $http.get("api/programingLanguages").then(complete).catch(failure);
  }
  function getPL(id) {
    return $http
      .get("api/programingLanguages/" + id)
      .then(complete)
      .catch(failure);
  }
  function complete(response) {
    return response.data;
  }
  function failure(response) {
    return response.statusText;
  }
}
