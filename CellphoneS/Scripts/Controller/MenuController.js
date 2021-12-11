
/// <reference path="../angular.min.js" />
var myapp = angular.module('MyApp', ['angularUtils.directives.dirPagination']);//khai baso module

myapp.controller("menuController", function ($scope, $http, $rootScope) {
    $http.get("/Home/GetMenu").then(function Success(res) {
        var table = JSON.parse(JSON.parse(res.data));
        var keys = Object.keys(table);
        ids = keys.map(function (key) {
            var dollar = key.indexOf('$')+1
            return key.slice(dollar,-40)
        });
        categoriesName = keys.map(function (key) {
            var dollar = key.indexOf('$')
            return key.slice(0, dollar)
        });
        icons = keys.map(function (key) { return key.slice(-40).trim() })

        
        menu = {};

        //Create object categories
        var categories=[];
        for (let i = 0; i < keys.length; i++) {
            var category = new Object();
            category.categoryID = ids[i];
            category.categoryName = categoriesName[i];
            category.icon = icons[i]
            //Add list brands in each category
            var brands=[]
            brand_ref = table[keys[i]];
            for (let j = 0; j < brand_ref.length; j++) {
                brands.push({ BrandID: brand_ref[j].BrandID, BrandName: brand_ref[j].BrandName, CategoryID: brand_ref[j].CategoryID });
            }
            category.brands = brands;
            categories.push(category)
        }
        $scope.PushBrand = function (categoryID) {
            var category = categoryID
            localStorage.setItem("category", category)
        }

        $scope.PushBrand = function (categoryID, brandID) {
            var brand = categoryID + brandID
            localStorage.setItem("brand",brand)
        }
        //sort categories by CategoryID
        categories.sort((a, b) => parseInt(a.categoryID.slice(-8)) - parseInt(b.categoryID.slice(-8)))

        $scope.categories = categories;
    }, function Error(err) {
        alert(err);
    })
})
myapp.controller("loginController", function ($rootScope, $window, $http, $scope) {
    if (sessionStorage.getItem('login') != null) {
        var islogin = sessionStorage.getItem('login');
        var user = JSON.parse(sessionStorage.getItem('khach'));
    }
    if (islogin == "1") {
        $rootScope.Status = user.CustomerName;
    }
    else {
        $rootScope.Status='Login'
    }
    $('#c').click(function () {
        $('.mainn').hide();
    })  
    $rootScope.close = "";
    $rootScope.Khach = null;
    $rootScope.remember = false;
    $rootScope.userName = "";
    $rootScope.Logout = function () {
        document.getElementById('dropdownMenuButton').style.display = 'none';
        location.reload();
    };  
    $rootScope.Login = function (un, pw, rp) {
        $http({
            method: 'get',
            params: {
                us: un,
                pw: pw,
                rp: rp
            },
            url:'/Home/Login'
        }).then(function (d) {
            if (d.data.login == "0") {
                $rootScope.Status = "Login"
            }
            else {
                sessionStorage.setItem("login", d.data.login);
                sessionStorage.setItem("khach", JSON.stringify(d.data.Khach));
                $rootScope.Status = d.data.Khach.CustomerName
                $('.mainn').hide();
                location.reload();
            }
        }, function error(e) {
            sessionStorage.setItem("login", "0");
            sessionStorage.setItem("khach", "");
        });
    }
    $rootScope.LInLout = function () {
        if ($rootScope.lInOut == "SignIn") {
            $rootScope.Finout = "#myModal";
        }
        else {
            $rootScope.Finout = "";
            $rootScope.Logout();
        }
    }

   $('#login').click(function () {
       $('.mainn').show();
   })

    $('#login1').click(function () {
        var email = $('#mail').val();
        var pass = $('#pass').val();
    })

})
