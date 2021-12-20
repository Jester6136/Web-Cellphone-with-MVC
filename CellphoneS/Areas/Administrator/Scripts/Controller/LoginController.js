var myapp = angular.module('app_login', []);//khai baso module


myapp.controller("loginController", function ($rootScope, $window, $http, $scope) {
    $rootScope.Id = "";
    $rootScope.Pas = "";
    if (sessionStorage.getItem('login') != null) {
        var islogin = sessionStorage.getItem('login');
    }

    $rootScope.Login = function (un, pw) {
        $http({
            method: 'get',
            params: {
                id: un,
                pas: pw 
            },
            url: 'CheckStaff'
        }).then(function (d) {
            console.log(d);
            if (d.data == "") {
                $rootScope.Status = "Login"
            }
            else {
                console.log(d.data);
                sessionStorage.setItem("login", JSON.stringify(d.data));
                //$rootScope.Status = d.data.Khach.CustomerName
                location.replace("/Administrator/Product/Index");
            }
        }, function error(e) {
            console.log(e);
            sessionStorage.setItem("login", "");
        });
    }

})


