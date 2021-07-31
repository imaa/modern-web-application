angular.module("Weather").controller("WeatherInfoController", weatherListController);
function weatherListController(weatherFactory, $routeParams) {
    const vm = this;
    vm.weatherInfo = {};
    weatherFactory.getSingle($routeParams.id).then((info) => {
        vm.weatherInfo = info;
    }).catch((err) => {
        console.log(err);
    });
}