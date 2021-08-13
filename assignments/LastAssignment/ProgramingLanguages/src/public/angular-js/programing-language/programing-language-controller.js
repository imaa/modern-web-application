angular.module("pl").controller("programingLanguage", programingLanguages);
function programingLanguages(programingLanguageFactory, $routeParams) {
  const vm = this;
  vm.programingLanguage = {};
  programingLanguageFactory.getProgramingLanguage($routeParams.id).then((pl) => {
    vm.programingLanguage = pl;
  });
}
