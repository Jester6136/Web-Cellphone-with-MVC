
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

