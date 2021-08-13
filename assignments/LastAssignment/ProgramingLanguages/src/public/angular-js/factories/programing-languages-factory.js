angular.module("pl").factory("programingLanguageFactory", programingLanguageFactory);
function programingLanguageFactory($http) {
  return {
    getProgramingLanguages: getPLs,
    getProgramingLanguage: getPL,
    addProgramingLanguage: addProgramingLanguage,
    deleteProgramingLanguage: deleteProgramingLanguage,
    updateProgramingLanguage: updateProgramingLanguage,
    partialUpdateProgramingLanguage: partialUpdateProgramingLanguage,
  };
  function getPLs(searchText = "") {
    return $http
      .get("api/programingLanguages?limit=50&term=" + searchText)
      .then(complete)
      .catch(failure);
  }
  function getPL(id) {
    return $http
      .get("api/programingLanguages/" + id)
      .then(complete)
      .catch(failure);
  }
  function addProgramingLanguage(programingLanguage) {
    return $http.post("api/programingLanguages/", programingLanguage).then(complete).catch(failure);
  }
  function deleteProgramingLanguage(id) {
    return $http
      .delete("api/programingLanguages/" + id)
      .then(complete)
      .catch(failure);
  }
  function updateProgramingLanguage(id, programingLanguage) {
    return $http
      .put("api/programingLanguages/" + id, programingLanguage)
      .then(complete)
      .catch(failure);
  }
  function partialUpdateProgramingLanguage(id, programingLanguage) {
    return $http
      .put("api/programingLanguages/" + id, programingLanguage)
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
