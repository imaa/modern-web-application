app.factory("UserFactory", function ($http) {
  const _baseUrl = "https://randomuser.me/api/";
  return { gerUsers: getUsers };
  function getUsers(numberOfUsers, gender) {
    return $http
      .get(_baseUrl + `?results=${numberOfUsers}&gender=${gender}`)
      .then(complete)
      .catch(failed);
  }
  function complete(response) {
    return response.data;
  }
  function failed(err) {
    return err.statusText;
  }
});
