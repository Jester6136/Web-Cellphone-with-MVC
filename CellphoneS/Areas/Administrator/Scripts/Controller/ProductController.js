
var myapp = angular.module('Myapp', ['angularUtils.directives.dirPagination','ngFileUpload']);//khai baso module

var checkUnderined = function (o) {
    return typeof(o) == "undefined";
}
var ConvertToJsonString = function (Object) {
    var BrandName = Object.BrandName;
    var CategoryName = Object.CategoryName;
    var DateRelease = Object.DateRelease;
    var ImageName = Object.ImageName;
    var ProductName = Object.ProductName;
    var Memories = Object.Memories;
    var Base_Memories = ``;
    for (var i = 0; i < Memories.length; i++) {
        var MemoryName = Memories[i].MemoryName;
        var Number = Memories[i].Number;
        var Description = Memories[i].Description;
        var Base_Colors = ``;
        var Colors = Memories[i].Colors;
        for (var j = 0; j < Colors.length; j++) {
            var ColorName = Colors[j].ColorName;
            var Price = Colors[j].Price;
            var Quantity = Colors[j].Quantity;
            var ColorImage = Colors[j].ColorImage;
            Base_Colors = Base_Colors+`{
                              "ColorName": "`+ColorName+`",
                              "Price": "`+ Price + `",
                              "Quantity": "`+ Quantity + `",
                              "ColorImage": "`+ColorImage+`"
                            },`
        }
        Base_Colors = Base_Colors.slice(0,-1);
        Base_Memories = Base_Memories+`{
                           "MemoryName": "`+ MemoryName + `",
                           "Number": "`+ Number + `",
                           "Description": "`+ Description + `",
                           "Colors": [`+ Base_Colors +`]
                         },`
    }
    Base_Memories=Base_Memories.slice(0,-1);
    return `{
                  "BrandName": "`+ BrandName+`",
                  "CategoryName": "`+ CategoryName + `",
                  "DateRelease": "`+ DateRelease + `",
                  "ImageName": "`+ ImageName +`",
                  "Memories": [`+ Base_Memories+`],
                  "ProductName": "`+ ProductName +`"
                }`
}
//ProductDetailController
myapp.controller("productsController", function ($http, $scope, $rootScope,Upload) {
    $rootScope.NewProduct = [];
    $http({
        method: 'get',
        url: 'GetProductsByCategory',
        params: {
            categoryID: 'CT00000001'
        }
    }).then(function Success(res) {
        var Products = res.data;
        $scope.Products = Products;

    }, function Error(res) {
        alert("Lấp sản phẩm lỗi");
    })
})
var GetProductDetail = function (details) {
    var detailContents = [];
    for (var i = 0; i < details.length; i++) {
        detailContents.push(`
                        <tr>
                            <td>${details[i].ColorID}</td>
                            <td>${details[i].ColorName}</td>
                            <td><img class="image_index" src="/assets/images/`+ details[i].ColorImage + `"/></td>
                            <td>${details[i].NewPrice}</td>
                            <td>${details[i].OldPrice}</td>
                        </tr>
                    `);
    }
    return detailContents;
}
$('#datatable-details').on('click', 'i[data-toggle]', function () {
    var $this = $(this),
        tr = $(this).closest('tr'),
        productID = $(this).parent().siblings()[0].textContent,
        memoryName = $(this).parent().siblings()[2].textContent;
    if ($this[0].dataset.toggle!='has') {
        $this.removeClass('fa-plus-square-o').addClass('fa-minus-square-o');
        $.get(`https://localhost:44364/Administrator/Product/GetProductDetailsADMIN?productID=${productID}&memoryID=${memoryName}`)
            .done(function (details) {
                var data = GetProductDetail(details);
                var subtable = `<tr><td colspan="8"><table class="table mb-none">
                        <thead>
                            <tr>
                                <th>Mã màu</th>
                                <th>Màu</th>
                                <th>Ảnh</th>
                                <th>Giá hiện tại</th>
                                <th>Giá khởi điểm</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.join(' ')}
                        </tbody>
                    </table></td></tr>`
                tr.after(subtable);
            })
        $this[0].dataset.toggle = 'has';
        
    } else {
        $this.removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
        $this[0].dataset.toggle = '';
        tr.next().remove();
    }
});

//////////////////////Addproduct////////////////////////////
//1
myapp.controller("addProductController", function ($http, $scope, $rootScope, Upload) {
    var CategoryName = $('#category')[0].value;
    var BrandName = $('#brand')[0].value;

    $scope.UploadFiles = function (file) {
        $scope.SelectedFiles = file;
        if ($scope.SelectedFiles) {
            Upload.upload({
                url: 'UploadImage',
                data: { files: $scope.SelectedFiles }
            }).then(function Success(res) {
                alert('Upload success');
            }, function Error(res) {
                alert('Upload fail');
            })
        }
    }


    $('#dialogConfirmNewProduct').click(function () {
        $rootScope.NewProduct.ProductName = $rootScope.NewProduct.ProductName;
        $rootScope.NewProduct.DateRelease = $('#DateRelease').val();
        $rootScope.NewProduct.ImageName = $('#imageName')[0].textContent;
        $rootScope.NewProduct.CategoryName = CategoryName;
        $rootScope.NewProduct.BrandName = BrandName;
        $rootScope.NewProduct.Memories = $rootScope.Memories;
        console.log($rootScope.NewProduct)
        console.log(ConvertToJsonString($rootScope.NewProduct).replace(/\s/g, ''))

        $http({
            method: 'POST',
            url: 'InsertProduct',
            data: { p: ConvertToJsonString($rootScope.NewProduct).replace(/\s/g,'') }
        }).then(function Success(res) {
            console.log('ngu2');
            console.log(res);
        }, function Error(res) {
            console.log(res);
        })

        $rootScope.NewProduct.ImageName = '';
    })

})

//2
myapp.controller("memoryTable", function ($http, $scope, $rootScope) {

    $scope.num = 0;
    $scope.Memories = [];
    $rootScope.Memories = [];


    $scope.addMemory = function (Memory) {
        $scope.num = $scope.num + 1;
        $scope.Memory.Number = $scope.num;
        $scope.Memory.MemoryName = $scope.Memory.MemoryName;
        if (checkUnderined($scope.Memory.Description)) {
            $scope.Memory.Description = "";
        }
        else
            $scope.Memory.Description = $scope.Memory.Description;
        $scope.Memory.Colors = [];
        $scope.Memories.push(Memory);

        $rootScope.Memories.push(Memory);
        $scope.Memory = {};
    }

    $('#ttable2').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            $.each($('#ttable2 tr.selected'), function (idx, val) {
                $(this).removeClass('selected');
            });
            $(this).addClass('selected');

            var id = parseInt($('#ttable2 tr.selected').children()[0].textContent) - 1;
            var Colors = $rootScope.Memories[id].Colors;
            $scope.Colors = Colors;
            $scope.$apply();
        }
    });



    $scope.addColor = function (Color) {
        var id = parseInt($('#ttable2 tr.selected').children()[0].textContent) - 1;
        $scope.Color.ColorName = $scope.Color.ColorName;
        $scope.Color.Price = $scope.Color.Price;
        $scope.Color.ColorImage = $('#colorImage')[0].textContent;
        $scope.Color.Quantity = $scope.Color.Quantity;
        $scope.Colors.push(Color);
        $scope.Color = {};
        $scope.Color.ColorImage = '';
    }
})

////////////////////////////EditProduct////////////////////////////


////////////////////////////DeleteProduct////////////////////////////



$('#addToTablee').click(function () {
    $('#dialogAddproduct').show();
});


$('.exit').click(function () {
    $('.workform').hide();
});

