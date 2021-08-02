angular.module("meanGames").factory("gamesFactory", gamesFactory);
function gamesFactory($http) {
  return {
    getGames: getGames,
    getGame: getGame,
    addGame: addGame,
    deleteGame: deleteGame,
    updateGame: updateGame,
    partialUpdateGame: partialUpdateGame,
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
  function addGame(game) {
    return $http.post("api/games/", game).then(complete).catch(failure);
  }
  function deleteGame(id) {
    return $http
      .delete("api/games/" + id)
      .then(complete)
      .catch(failure);
  }
  function updateGame(id, game) {
    return $http
      .put("api/games/" + id, game)
      .then(complete)
      .catch(failure);
  }
  function partialUpdateGame(id, game) {
    return $http
      .put("api/games/" + id, game)
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
