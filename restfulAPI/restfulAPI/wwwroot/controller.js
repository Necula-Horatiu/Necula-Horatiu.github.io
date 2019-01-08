var app = angular.module("mainApp", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "./login/login.html"
        })
});

var serviceBase = location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "") + location.pathname;

if (serviceBase.substr(-1) !== '/')
    serviceBase += '/';

app.constant("backendConfig", {
    url: serviceBase
});