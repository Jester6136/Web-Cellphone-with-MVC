
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
            url: '/Product/GetProductsbyBrandPagination',
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


const numberFormat = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});