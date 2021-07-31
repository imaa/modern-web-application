const configs = {
    api: {
        prefix: "/api",
        weather: {
            id: () => "id",
            path: () => "/weather/",
            fullPath: () => configs.api.weather.path() + ":" + configs.api.weather.id(),
            maxListLimit: () => 100,
            defaultListLimit: () => 5
        }
    },
    models: {
        weather: {
            name: "Weather",
            collectionName: "data"
        }
    }
}
module.exports = configs