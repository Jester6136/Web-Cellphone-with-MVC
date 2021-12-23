myapp.controller('ProductDetailController', function ($http, $scope, $rootScope) {
    var ROM_product = JSON.parse(localStorage.getItem('product'));
    console.log(ROM_product)
    //Set begin price
    $rootScope.OldPrice = ROM_product.OldPrice;
    $rootScope.NewPrice = ROM_product.NewPrice;
    $rootScope.SelectedProduct =[];
    $rootScope.SelectedProduct.ProductID = ROM_product.ProductID;
    $rootScope.SelectedProduct.MemoryID = ROM_product.MemoryID;

    //Get Product
    $http({
        method: 'get',
        params: { productID: ROM_product.ProductID },
        url: '/Products/GetProductDetail'
    }).then(function Success(res) {
        //Set rootscope product input
        var product = JSON.parse(JSON.parse(res.data))[0];
        $rootScope.Product = [];
        //Set product format
        for (var i = 0; i < product.Memories.length; i++) {
            var memo = product.Memories[i]
            memo.NewPrice = numberFormat.format(memo.NewPrice)
            memo.OldPrice = numberFormat.format(memo.OldPrice)
        }
        //Set product memory
        $rootScope.Product.Memories = product.Memories;

        //Selected product
        $rootScope.SelectedProduct.ProductName = product.ProductName;



        var Selected_Memo;
        for (var i = 0; i < product.Memories.length; i++) {
            if (product.Memories[i].MemoryID == ROM_product.MemoryID) {
                Selected_Memo = product.Memories[i];
                $rootScope.Product.Memories[i].active = 'active'
            }

            for (var j = 0; j < product.Memories[i].Colors.length; j++) {
                //Get begin image color
                if (product.Memories[i].Colors[j].ColorID == ROM_product.ColorID)
                    $rootScope.BigImage = product.Memories[i].Colors[j].ColorImage;
                product.Memories[i].Colors[j].Price = numberFormat.format(product.Memories[i].Colors[j].Price)
            }
            //Set product memory colors
            $rootScope.Product.Memories[i].Colors = product.Memories[i].Colors;
        }


        $rootScope.Colors = Selected_Memo.Colors
        $rootScope.Product.ProductName = product.ProductName;
        $rootScope.Product.ProductID = product.ProductID;
        $rootScope.Product.CategoryName = product.CategoryName;
        $rootScope.Product.BrandName = product.BrandName;
        $rootScope.Product.ImageName = product.ImageName;

    }, function Error(res) {
        console.log(res);
    })
    //chang status memo
    $('.config').on('click', '.box-option-config', function () {
        if ($(this).hasClass('active')) {
        }
        else {
            $.each($('.config div.active'), function (idx, val) {
                $(this).removeClass('active');
            });
            $(this).addClass('active');
            var name_memo = $(document.getElementsByClassName('active')[0]).children('p')[0].textContent
        }
    })
    //change status color
    $('.color').on('click', '.box-option-color', function () {
        if ($(this).hasClass('active')) {
        }
        else {
            $.each($('.color div.active'), function (idx, val) {
                $(this).removeClass('active');
            });
            $(this).addClass('active');
            /*  var name_memo = $(document.getElementsByClassName('active')[0]).children('p')[0].textContent*/
        }
    })


    //Change memoryname
    $(document).ready(function () {
        memo_VIEW = $('.memoname')
        for (var i = 0; i < memo_VIEW.length; i++) {
            if ($(memo_VIEW[i]).text() == Selected_Memo.MemoryName) {
                $(memo_VIEW[i]).parent().addClass('active')
            }
        }
    })

    //change memory
    $scope.selectColor = function (memo) {
        $rootScope.OldPrice = memo.OldPrice;
        $rootScope.NewPrice = memo.NewPrice;
        $rootScope.Colors = memo.Colors
        $rootScope.SelectedProduct.MemoryID = memo.MemoryID;
        $rootScope.SelectedProduct.MemoryName = memo.MemoryName;
    }
    //change image color
    $scope.selectBigImage = function (color) {
        $rootScope.BigImage = color.ColorImage;
    }
    //change color price
    $scope.selectColorPrice = function (color) {
        $rootScope.SelectedProduct.ColorID = color.ColorID
        $rootScope.SelectedProduct.ColorName = color.ColorName
        $rootScope.SelectedProduct.NewPrice = color.Price
        $rootScope.SelectedProduct.OldPrice = ROM_product.OldPrice;
    }
    //add to cart
    $scope.addCart = function (SelectedProduct) {
        //If login
        if (sessionStorage.getItem('login') != null && sessionStorage.getItem('login') == "1") {
            //Get object cart
            $scope.tocart = []
            var user = JSON.parse(sessionStorage.getItem('khach'));
            $scope.tocart.UserID = user.CustomerID
            $scope.tocart.ColorID = SelectedProduct.ColorID;
            $scope.tocart.MemoryID = SelectedProduct.MemoryID;
            $scope.tocart.ProductID = SelectedProduct.ProductID;
            var newcartJson = ConvertToJsonString($scope.tocart).replace(/\s/g, '');
            console.log(newcartJson);
            //If have
            if (typeof SelectedProduct.ColorID !== 'undefined') {
                $http({
                    method: 'post',
                    params: { cart: newcartJson },
                    url: "/Cart/InsertCart"
                }).then(function success(res) {
                    $rootScope.CartQuantity += 1;
                    localStorage.setItem('cartQuantity', $rootScope.CartQuantity);
                    window.location.href = '/Cart/Index';
                    console.log(res);
                }, function error(res) {
                    console.log(res);
                    console.log('loi add cart')
                })
            }
            else {
                toastr.info("Hãy chọn màu");
            }
        }
        else {
            toastr.info("Hãy đăng nhập");
        }
       
    }
})

const numberFormat = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

var ConvertToJsonString = function (Object) {
    var UserID = Object.UserID
    var ColorID = Object.ColorID;
    var MemoryID = Object.MemoryID;
    var ProductID = Object.ProductID;

    var base = ``;
    return `{"UserID": "` + UserID + `",
            "ColorID": "` + ColorID + `",
            "MemoryID": "` + MemoryID + `",
            "ProductID": "` + ProductID + `"
            }`
}

