(function () {
    'use strict';
    angular.module('mainApp').controller('loginController', ['dataContext', function (dataContext) {
        var vm = this;

        vm.login = false;

        vm.inregistrare = function () {
            vm.login = false;
        };

        vm.logare = function () {
            vm.login = true;
        };

        vm.test = function () {
            console.log(vm.nume + " " + vm.varsta);
        };

        dataContext.getDummy().then(
            function (response) {
                console.log(response.data);
            },
            function (err) {
                console.log(err);
            }
        );

        vm.save = function () {
            vm.username = vm.nume.replace(/ /g, '');
            vm.parola = vm.username + vm.varsta;
            dataContext.postDummy(vm.nume, vm.varsta, vm.username, vm.parola).then(
                function (response) {
                    console.log('Succes');
                },
                function (err) {
                    console.log(err);
                }
            );
        };

        vm.log = function () {
            dataContext.logDummy(vm.username, vm.pass).then(
                function (response) {
                    if (response.data === "") {
                        alert('Nume / parola gresita!');
                    } else {
                        alert('Bine ai venit ' + response.data.nume);
                    }
                },
                function (err) {
                    console.log(err);
                }
            );
        }
    }]);
})();