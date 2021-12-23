myapp.controller('homeController', function ($http, $scope, $rootScope) {
    $scope.Products = [];
    $http({
        method: 'get',
        params: {},
        url: '/Home/GetTop15ProductPhone'
    }).then(function success(res) {
        var Products = JSON.parse(JSON.parse(res.data));
        console.log(Products);
        Products = Products.map(function (product) {
            product.NewPrice = numberFormat.format(product.NewPrice)
            product.OldPrice = numberFormat.format(product.OldPrice)
            return product
        })
        $scope.Products = Products;
    }, function error(res) {
        console.log(res)
    })
    $scope.getProduct = function (pd) {
        localStorage.setItem('product', JSON.stringify(pd))
    }

    $scope.OldProducts = []
    $http({
        method: 'get',
        params: {},
        url: '/Home/GetOldProducts'
    }).then(function success(res) {
        var Products = JSON.parse(JSON.parse(res.data));
        console.log(Products);
        Products = Products.map(function (product) {
            product.NewPrice = numberFormat.format(product.NewPrice)
            product.OldPrice = numberFormat.format(product.OldPrice)
            return product
        })
        $scope.OldProducts = Products;
    }, function error(res) {
        console.log(res)
    })

})


const numberFormat = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});