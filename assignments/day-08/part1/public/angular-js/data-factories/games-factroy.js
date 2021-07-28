angular.module("meanGames").factory("gamesFactory", gamesFactory);
function gamesFactory($http) {
  return {
    getGames: getGames,
    getGame: getGame,
  };
  function getGames() {
    return $http.get("api/games").then(complete).catch(failure);
  }
  function getGame(id) {
    return $http
      .get("api/games/" + id)
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
