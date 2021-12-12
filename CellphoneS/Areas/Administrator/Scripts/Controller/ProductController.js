
var myapp = angular.module('Myapp', ['angularUtils.directives.dirPagination','ngFileUpload']);//khai baso module

myapp.factory('Product_ROM', function () {
    return {
        ProductID : "",
        ProductName : "",
        CategoryName : "",
        BrandName : "",
        ImageName : ""
    };
});


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
myapp.controller("productsController", function ($http, $scope, $rootScope, Upload, Product_ROM) {
    $('#dialogConfirmNewProduct').click(function () {
        console.log(Product_ROM);
        $scope.Products.push(Product_ROM);
        Product_ROM.ProductID = "";
        Product_ROM.ProductName = "";
        Product_ROM.CategoryName = "";
        Product_ROM.BrandName = "";
        Product_ROM.ImageName = "";
        $scope.$apply();
    })

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
                            <th></th>
                            <th></th>
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
var GetMemoriesDetail = function (details) {
    var detailContents = [];
    for (var i = 0; i < details.length; i++) {
        detailContents.push(`
                        <tr class="${details[i].ProductID}">
                            <td class=" text-center">
                                <i data-toggle="sub" class="fa fa-plus-square-o text-primary h5 m-none" id="" style="cursor: pointer;color:#a94629 !important;"></i>
                            </td>
                            <td>${details[i].MemoryID}</td>
                            <td>${details[i].MemoryName}</td>
                            <td>${details[i].Description}</td>
                        </tr>
                    `);
    }
    return detailContents;
}
//Cilck extend detail
$('#datatable-details').on('click', 'i[data-toggle]', function () {
    var $this = $(this),
        tr = $(this).closest('tr'),
        productID = $(this).parent().siblings()[0].textContent,
        memoryID = $(this).parent().siblings()[0].textContent;

    if ($this[0].dataset.toggle =='') {
        $this.removeClass('fa-plus-square-o').addClass('fa-minus-square-o');
        $.get(`https://localhost:44364/Administrator/Product/GetMemoriesDetailADMIN?productID=${productID}`)
            .done(function (details) {
                var data = GetMemoriesDetail(details);
                var subtable = `<tr><td colspan="7"><table class="table mb-none">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Mã bộ nhớ</th>
                                <th>Loại bộ nhớ</th>
                                <th>Mô tả</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.join(' ')}
                        </tbody>
                    </table></td></tr>`
                tr.after(subtable);
            })
        $this[0].dataset.toggle = 'has';
        
    }
    else if ($this[0].dataset.toggle == 'sub') {
        $this.removeClass('fa-plus-square-o').addClass('fa-minus-square-o');
        $.get(`https://localhost:44364/Administrator/Product/GetProductDetailsADMIN?memoryID=${memoryID}}`)
            .done(function (details) {
                var data = GetProductDetail(details);
                var subtable = `<tr><td colspan="7"><table class="table mb-none">
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
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
        $this[0].dataset.toggle = 'has2';
    }
    else if ($this[0].dataset.toggle == 'has2') {
        $this.removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
        $this[0].dataset.toggle = 'sub';
        tr.next().remove();
    }
    else if ($this[0].dataset.toggle == 'has') {
        $this.removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
        $this[0].dataset.toggle = '';
        tr.next().remove();
    }
});

//////////////////////Addproduct////////////////////////////
//1
myapp.controller("addProductController", function ($http, $scope, $rootScope, Upload, Product_ROM) {
    $http({
        method: 'get',
        url: '/Product/GetCategoryBrandADMIN'
    }).then(function success(res) {
        var CategoryBrand = JSON.parse(JSON.parse(res.data));
        $scope.Categories = [];
        $scope.Brands = [];
        for (var i = 0; i < CategoryBrand.length; i++) {
            var Catetory = [];
            var category_tmp = CategoryBrand[i];
            Catetory.STT = i;
            Catetory.CategoryID = category_tmp.CategoryID;
            Catetory.CategoryName = category_tmp.CategoryName;
            $scope.Categories.push(Catetory);
            $scope.Categories[i].Brands = [];
            if (category_tmp.Brands != null) {
                for (var j = 0; j < category_tmp.Brands.length; j++) {
                    var Brand = []
                    var brand_tmp = category_tmp.Brands[j];
                    Brand.BrandID = brand_tmp.BrandID;
                    Brand.BrandName = brand_tmp.BrandName;
                    $scope.Categories[i].Brands.push(Brand);
                }
            }
        }
        $scope.CategoryBrand = CategoryBrand;
        $rootScope.NewProduct.CategoryName = $scope.CategoryBrand[0].CategoryName;
        $scope.Brands = $scope.Categories[0].Brands;
        $rootScope.NewProduct.BrandName = $scope.Brands[0].BrandName;
        console.log(CategoryBrand);
    }, function error(res) {
        console.log(res);
    })


    $('.category').on('change', function (e) {
        var optionSelected = $("option:selected", this);
        var index = optionSelected[0].className;
        $scope.Brands = $scope.Categories[index].Brands;
        $rootScope.NewProduct.BrandName = $scope.Brands[0].BrandName;
    });


    $scope.UploadFiles = function (file) {
        $scope.SelectedFiles = file;
        if ($scope.SelectedFiles) {
            Upload.upload({
                url: 'UploadImage',
                data: { files: $scope.SelectedFiles }
            }).then(function Success(res) {
                toastr.success("Thêm ảnh thành công");
            }, function Error(res) {
                toastr.error("Thêm ảnh thất bại");
            })
        }
    }


    $('#dialogConfirmNewProduct').click(function () {
        $rootScope.NewProduct.ProductName = $rootScope.NewProduct.ProductName;
        $rootScope.NewProduct.DateRelease = $('#DateRelease').val();
        $rootScope.NewProduct.ImageName = $('#imageName')[0].textContent;
        $rootScope.NewProduct.CategoryName = $rootScope.NewProduct.CategoryName;
        $rootScope.NewProduct.BrandName = $rootScope.NewProduct.BrandName;
        $rootScope.NewProduct.Memories = $rootScope.Memories;

        $http({
            method: 'POST',
            url: 'InsertProduct',
            data: { p: ConvertToJsonString($rootScope.NewProduct).replace(/\s/g,'') }
        }).then(function Success(res) {
            console.log(res);
            //Set new to current view
            Product_ROM.ProductID = $('#fid').val();
            Product_ROM.ProductName = $rootScope.NewProduct.ProductName;
            Product_ROM.CategoryName = $rootScope.NewProduct.CategoryName;
            Product_ROM.BrandName = $rootScope.NewProduct.BrandName;
            Product_ROM.ImageName = $('#imageName')[0].textContent;
            toastr.success("Thêm thông tin sản phẩm thành công");
            //Reset value table
            $rootScope.NewProduct.ImageName = '';
            $rootScope.NewProduct = [];
            $rootScope.Memories = [];
            $rootScope.Colors = [];
            $rootScope.num = 0;
            $('#imageName').text('')
            $('#impressive_image').removeClass('fileupload-exists').addClass('fileupload-new');
            //Reset ID
            $.get(`/Product/GetNextProductID`).done(
                function (res) {
                    $('#fid').val(res);
                }
            )
        }, function Error(res) {
            toastr.error("Thêm thông tin thất bại");
        })
    })

})

//2
myapp.controller("memoryTable", function ($http, $scope, $rootScope) {
    $rootScope.num = 0;
    $rootScope.Memories = [];


    $scope.addMemory = function (Memory) {
        $rootScope.num = $rootScope.num + 1;
        $scope.Memory.Number = $rootScope.num;
        $scope.Memory.MemoryName = $scope.Memory.MemoryName;
        if (checkUnderined($scope.Memory.Description)) {
            $scope.Memory.Description = "";
        }
        else
            $scope.Memory.Description = $scope.Memory.Description;
        $scope.Memory.Colors = [];
        $rootScope.Memories.push(Memory);
        $scope.Memory = {};
    }

    $(document).on('click', '.removeMemory', function () {
        var nodes = Array.prototype.slice.call(document.getElementById('ttable2').children),
            liRef = $(this).parent().parent()[0];
        var id = nodes.indexOf(liRef);
        $rootScope.Memories.splice($rootScope.Memories.indexOf(id), 1);
        $rootScope.$apply();
    });


    $('#ttable2').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            $.each($('#ttable2 tr.selected'), function (idx, val) {
                $(this).removeClass('selected');
            });
            $(this).addClass('selected');

            var nodes = Array.prototype.slice.call(document.getElementById('ttable2').children),
                liRef = document.getElementsByClassName('selected')[0];
            var id = nodes.indexOf(liRef);
            var Colors = $rootScope.Memories[id].Colors;
            $rootScope.Colors = Colors;
            $scope.$apply();
            $rootScope.$apply();
        }
    });


    $scope.addColor = function (Color) {
        $scope.Color.ColorName = $scope.Color.ColorName;
        $scope.Color.Price = $scope.Color.Price;
        $scope.Color.ColorImage = $('#colorImage')[0].textContent;
        $scope.Color.Quantity = $scope.Color.Quantity;
        $rootScope.Colors.push(Color);
        $scope.Color = {};
        $scope.Color.ColorImage = '';
    }
})

////////////////////////////EditProduct////////////////////////////


////////////////////////////DeleteProduct////////////////////////////



$('#addToTablee').click(function () {
    $.get(`GetNextProductID`).done(
        function (res) {
            $('#fid').val(res);
        }
    )

    $('#dialogAddproduct').show();

});
$('.exit').click(function () {
    $('.workform').hide();
});

