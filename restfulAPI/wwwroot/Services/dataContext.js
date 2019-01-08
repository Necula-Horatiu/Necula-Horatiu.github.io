(function () {
    'use strict'

    angular.module('mainApp').service('dataContext', ['httpService', function (httpService) {
        var service = {
            getDummy: getDummy,
            postDummy: postDummy,
            logDummy: logDummy
        };


        function getDummy() {
            return httpService.get('api/dummy');
        }

        function postDummy(nume, varsta, username, parola) {
            return httpService.post('api/dummy', { Nume: nume, Varsta: varsta, Username: username, Parola: parola });
        }

        function logDummy(username, parola) {
            return httpService.post('api/dummy/login', { username: username, parola: parola });
        }

        return service;
    }]);
})();