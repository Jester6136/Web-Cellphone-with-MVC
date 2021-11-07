$(document).ready(function () {
	var product=sessionStorage.getItem('findding');
    var words = sessionStorage.getItem('findingwords');
    var title = $($('#finddingwords')).text('Sản phẩm tìm kiếm cho \"'+words+'\"');
	product ="["+product+"]";
	var data = JSON.parse(product);
	content="";
    for (var i = 0;i<data[0].length;i++){
        element=data[0];
        content += Create_Product(element[i].id,element[i].img,element[i].name,convertToMoney(element[i].specialPrice),element[i].oldPrice,element[i].offers,element[i].rating )
    }   
    if(content==""){
        content='Không có kết quả tìm kiếm nào trùng khớp'
    }
    
    $('.list-product').html(content)
    //phần này để sau
    for(var i = 0 ; i < ProductTag.length;i++){
        if($($('.rating')[i]).text().trim()==""){
            $($('.rating')[i]).addClass('display-none')
        }
        if($($('.offers')[i]).text().trim()==""){
            $($('.offers')[i]).addClass('display-none')
        }
    }
});


function Create_Product(id,img,name,spreacialPrice,oldPrice,offers,rating){
    var product=`<div id="${id}" class="product col-4 col-m-5 col-s-10">
                    <div class="product-img">
                        <img src="${img}" alt="">
                    </div>
                    <div class="product-info">
                        <h4 class="product-name">${name}</h4>
                        <div class="price">
                            <p class="special-price">${spreacialPrice}&nbsp;₫</p>
                            <p class="old-price">${oldPrice}</p>
                        </div>
                        <div class="offers">
                            <p>${offers}</p>
                        </div>
                        <div class="rating">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <p>${rating}</p>
                        </div>
                        <div class="product-btn">
                            <a href="ProductDetail.html"><button class="buy-btn">Mua ngay</button></a>
                            <a href=""><button class="compare">So sánh</button></a>
                        </div>
                    </div>
                    </div>`
        return product
    }

    function convertToMoney(st) {
        result= (st).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        result= result.substring(0,result.length-3)
        return result.replaceAll(',','.');
    }
    function convertToNumber(params) {
        array=params.substring(0,params.length-2).split('.')
        result="";
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            result+=element;
        }
        return parseInt(result);
    }