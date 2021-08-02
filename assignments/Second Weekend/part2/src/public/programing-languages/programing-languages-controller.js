angular.module("pl").controller("programingLanguages", programingLanguages);
function programingLanguages(programingLanguageFactory, authFactory) {
  const vm = this;
  vm.programingLanguages = [];
  vm.isAuthenticated = authFactory.isAuthenticated();
  const _loadProgramingLanguages = () => {
    programingLanguageFactory.getProgramingLanguages(vm.searchText).then((pls) => {
      vm.programingLanguages = pls;
    });
  };
  _loadProgramingLanguages();
  vm.search = () => {
    _loadProgramingLanguages();
  };
  vm.programingLanguage = {};
  vm.addUpdateProgramingLanguage = () => {
    if (vm.programingLanguageForm.$valid) {
      if (!vm.programingLanguage._id) {
        programingLanguageFactory
          .addProgramingLanguage(vm.programingLanguage)
          .then(() => {
            vm.programingLanguage = {};
            _loadProgramingLanguages();
            alert("Success");
            vm.programingLanguageForm.$setPristine();
          })
          .catch(() => {
            alert("Failed");
          });
      } else {
        programingLanguageFactory
          .partialUpdateProgramingLanguage(vm.programingLanguage._id, vm.programingLanguage)
          .then(() => {
            vm.programingLanguage = {};
            _loadProgramingLanguages();
            alert("Updated");
            vm.programingLanguageForm.$setPristine();
          })
          .catch(() => {
            alert("Failed");
          });
      }
    } else {
      debugger;
      vm.programingLanguageForm.$setSubmitted();
    }
  };
  vm.editProgramingLanguage = (programingLanguage) => {
    vm.programingLanguage = programingLanguage;
  };
  vm.deleteProgramingLanguage = (programingLanguage) => {
    if (confirm("are you sure you want to delete this programing language " + programingLanguage.title)) {
      programingLanguageFactory
        .deleteProgramingLanguage(programingLanguage._id)
        .then(() => {
          _loadProgramingLanguages();
          alert("Deleted");
        })
        .catch(() => {
          alert("Failed");
        });
    }
  };
}
