angular.module("pl").controller("programingLanguages", programingLanguages);
function programingLanguages(programingLanguageFactory) {
  const vm = this;
  vm.programingLanguages = [];
  programingLanguageFactory.getProgramingLanguages().then((pls) => {
    vm.programingLanguages = pls;
  });
}
