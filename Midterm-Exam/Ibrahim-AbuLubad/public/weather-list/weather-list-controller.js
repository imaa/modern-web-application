angular.module("Weather").controller("WeatherListController", weatherListController);
function weatherListController(weatherFactory) {
    const vm = this;
    vm.data = [];
    vm.page = 0;
    vm.limit = 5;
    vm.skip = () => vm.page * vm.limit;
    _loadList = () => {
        weatherFactory.getList(vm.skip(), vm.limit, vm.lng, vm.lat, vm.distance).then((data) => {
            vm.data = data;
        }).catch((err) => {
            console.log(err);
        });
    }
    _loadList();
    vm.delete = (itemId) => {
        if (confirm("Are you sure you want to remove this reading ?")) {
            weatherFactory.deleteOne(itemId).then((data) => {
                _loadList();
                alert("Delete success");
            }).catch((err) => {
                console.log(err);
            });
        }
    }
    vm.search = () => {
        _loadList();
    }
    vm.previuse = () => {
        vm.page--;
        _loadList()
    }
    vm.next = () => {
        vm.page++;
        _loadList()
    }
}