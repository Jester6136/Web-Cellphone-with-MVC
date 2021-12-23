
myapp.controller("ProductsBrand", function ($http, $scope, $rootScope) {
    var brand = localStorage.getItem('brand');
    var categoryID = brand.slice(0, 10);
    var brandID = brand.slice(-10);

    $scope.maxSize = 2;
    $scope.totalCount = 0;

    $scope.pageIndex = 1;
    $scope.pageSize = 5;
    $scope.SearchName = '';

    $scope.GetProductsbyBrandPagination = function (index) {
        $http({
            method: 'get',
            url: '/Products/GetProductsbyBrandPagination',
            params: {
                pageIndex: $scope.pageIndex,
                pageSize: $scope.pageSize,
                productName: $scope.SearchName,
                categoryID: categoryID,
                brandID: brandID
            }
        }).then(function Success(res) {
            var Products = res.data.Products;
            Products = Products.map(function (product) {
                product.NewPrice = numberFormat.format(product.NewPrice)
                product.OldPrice = numberFormat.format(product.OldPrice)
                return product
            })
            $scope.Products = Products;
            $scope.totalCount = res.data.TotalCount;
            console.log($scope.Products);
        }, function Error(res) { })
    }
    
    $scope.GetProductsbyBrandPagination($scope.pageIndex)   

    $scope.sortcolumn = "NewPrice";
    $scope.reverse = true;
    $scope.direct = "Ascending";

    $scope.option = function (d) {
        if (d == '0') {
            $scope.reverse = false;
            $scope.direct = "Decreasing"
        }
        else {
            $scope.reverse = true;
            $scope.direct = "Ascending";
        }
    }

    $scope.getProduct = function (pd) {
        localStorage.setItem('product', JSON.stringify(pd))
    }


    //$http({
    //    method: 'get',
    //    url: '/Product/GetProductsBrand',
    //    params: { categoryID: categoryID, brandID: brandID }
    //}).then(function Success(res) {
    //    var Products = res.data;
    //    Products = Products.map(function (product) {
    //        product.NewPrice = numberFormat.format(product.NewPrice)
    //        product.OldPrice = numberFormat.format(product.OldPrice)
    //        return product
    //    })
    //    $scope.Products = res.data;
    //    console.log($scope.Products[0]);
    //}, function Error(res) { })
})


myapp.controller('productssort', function ($scope, $rootScope, $http) {
    //Begin setting
    $scope.sortcolumn = "NewPrice";
    $scope.reverse = true;
    $scope.direct = "Ascending";

    $scope.option = function (d) {
        if (d = '0') {
            $scope.reverse = false;
            $scope.direct = "Decreasing"
        }
        else {
            $scope.reverse = true;
            $scope.direct = "Ascending";
        }
    }
})




const numberFormat = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});