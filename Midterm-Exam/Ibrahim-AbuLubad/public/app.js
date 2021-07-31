angular.module("Weather", ["ngRoute"]).config(config);
function config($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "/weather-list/weather-list.html",
            bindToController: true,
            controller: "WeatherListController",
            controllerAs: "vm",
        })
        .when("/weather/:id", {
            templateUrl: "/weather-info/weather-info.html",
            bindToController: true,
            controller: "WeatherInfoController",
            controllerAs: "vm",
        })
        .otherwise({ redirectTo: "/" });
}