angular.module("Weather").factory("weatherFactory", weatherFactory);
function weatherFactory($http) {
    return {
        getList: getList,
        getSingle: getSingle,
        deleteOne: deleteOne
    }
    function getList(skip = 0, limit = 10, lng = "", lat = "", distance = "") {
        return $http.get(`/api/weather?skip=${skip}&limit=${limit}&lng=${lng}&lat=${lat}&distance=${distance}`).then(complete).catch(failure);
    }
    function getSingle(id) {
        return $http.get("/api/weather/" + id).then(complete).catch(failure);
    }
    function deleteOne(id) {
        return $http.delete("/api/weather/" + id).then(complete).catch(failure);
    }
    function complete(response) {
        return response.data;
    }
    function failure(err) {
        throw err;
    }
}