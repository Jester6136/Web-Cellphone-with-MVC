myapp.controller('cartController', function ($http, $scope, $rootScope) {
    if (localStorage.getItem("cartQuantity") === null) {
        $rootScope.CartQuantity = 0
    }
    else {
        $rootScope.CartQuantity = localStorage.getItem('cartQuantity');
    }
    $scope.Order = [];
    $scope.Cart = []
    $scope.sumPrice = 0;
    $scope.sumPriceShow = "0";
    if (sessionStorage.getItem('login') != null && sessionStorage.getItem('login') == "1") {
        var user = JSON.parse(sessionStorage.getItem('khach'));
        var UserID = user.CustomerID
        var DeliveryAddress = user.DeliveryAddress;
        var Phone = user.Phone;
        var CustomerName = user.CustomerName;
        $scope.Order.CustomerID = UserID;
        $scope.Order.CustomerName = CustomerName;
        $scope.Order.DeliveryAddress = DeliveryAddress;
        $scope.Order.Phone = Phone;


        $http({
            method: 'get',
            params: { userID: UserID },
            url: '/Cart/GetCart'
        }).then(function success(res) {
            var json_obj = JSON.parse(JSON.parse(res.data))
            $scope.Cart = json_obj;

            for (var i = 0; i < $scope.Cart.length; i++) {
                var product = $scope.Cart[i]
                product.Quantity = 1;
                product.Price = product.NewPrice
                $scope.sumPrice += product.Price;
                product.NewPrice = numberFormat.format(product.NewPrice)
                product.OldPrice = numberFormat.format(product.OldPrice)
            }
            $scope.sumPriceShow = numberFormat.format($scope.sumPrice);
            console.log($scope.Cart )
        }, function error(res) {
            console.log(res);
        })
    }
    else {
        toastr.info("Hãy đăng nhập để xem giỏ hàng của bạn");
    }

    $scope.delete = function (obj) {
        $scope.Cart.splice($scope.Cart.indexOf(obj), 1);
        $http({
            method: 'post',
            url: '/Cart/DeleteCart',
            params: {cartID : obj.CartID}
        }).then(function success() {
            toastr.success("Đã xóa sản phẩm khỏi giỏ hàng")
            $rootScope.CartQuantity -= 1;
            localStorage.setItem('cartQuantity', $rootScope.CartQuantity);
        }, function error() {
            toastr.info("Lỗi giỏ hàng");
        })
    }
    $scope.sub = function (obj) {
        if (obj.Quantity > 1) {
            obj.Quantity -= 1;
            $scope.sumPrice -= obj.Price;
            $scope.sumPriceShow = numberFormat.format($scope.sumPrice);
        }
    }
    $scope.add = function (obj) {
        if (obj.Quantity < 999) {
            obj.Quantity += 1;
            $scope.sumPrice += obj.Price;
            $scope.sumPriceShow = numberFormat.format($scope.sumPrice);
        }
    }
    $scope.addOrder = function () {
        $scope.Order.Amount = $scope.sumPrice;
        $scope.Order.OrderDetail = $scope.Cart
        console.log($scope.Order);
        $http({
            method: 'post',
            params: { json: ConvertToJsonString($scope.Order) },
            url: '/Order/InsertOrder'
        }).then(function success() {
            toastr.success("Đặt hàng thành công");
            //Reset Cart
            $scope.Cart = []
            $scope.sumPrice = 0;
            $scope.sumPriceShow = numberFormat.format("0");
            $rootScope.CartQuantity = 0;
            localStorage.setItem('cartQuantity', $rootScope.CartQuantity);
            localStorage.setItem('cartQuantity',0);
        }, function error(res) {
            console.log(res);
        })
    }

})

const numberFormat = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

function ConvertToJsonString(obj) {
    var CustomerID = obj.CustomerID;
    var DeliveryAddress = obj.DeliveryAddress;
    var Phone = obj.Phone;
    var Amount = obj.Amount;
    var OrderDetails = "";
    for (var i = 0; i < obj.OrderDetail.length; i++) {
        var OrderDetail = obj.OrderDetail[i];
        var ColorID = OrderDetail.ColorID;
        var MemoryID = OrderDetail.MemoryID;
        var ProductID = OrderDetail.ProductID;
        var Quantity = OrderDetail.Quantity;
        OrderDetails += `{
                    "ColorID" : "`+ ColorID+`",
                    "MemoryID" : "`+ MemoryID+`",
                    "ProductID" : "`+ ProductID+`",
                    "Quantity" : "`+ Quantity+`"
                            },`
    }
    OrderDetails = OrderDetails.slice(0, -1);
    var main = `{`;
    main += `"CustomerID": "` + CustomerID + `",
            "DeliveryAddress":"`+ DeliveryAddress + `",
            "Phone":"`+ Phone + `",
            "Amount":"`+ Amount + `",
            "OrderDetails" : [`+ OrderDetails + `]}`
    return main;
}