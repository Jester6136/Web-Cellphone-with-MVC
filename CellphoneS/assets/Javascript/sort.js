
function getInRange(param){
    var r1 = param.split('-')[0];
    var r2 = param.split('-')[1];
    var id=r1+r2;
    for(var i=0;i<$('.sort-group li').length;i++){
        $($('.sort-group li')[i]).css('text-decoration', 'none')
    }   
    $('#'+id).css('text-decoration', 'underline')
    var ProductTag=$('.product');
    var data=[];
    for(var i = 0 ; i < ProductTag.length;i++){
        var id=$(ProductTag[i]).attr('id')
        var img=$(ProductTag[i]).find('img').attr('src');
        var name=$(ProductTag[i]).find('.product-name')[0].textContent;
        var specialPrice=$(ProductTag[i]).find('.special-price')[0].textContent;
        if($(ProductTag[i]).find('.old-price')[0].textContent==undefined){
            oldPrice="";
        }
        else{   
            var oldPrice=$(ProductTag[i]).find('.old-price')[0].textContent;
        }
        if($($('.offers')[i]).hasClass('display-none')==true){
            offers="";
        }
        else{
            var offers=$($('.offers')[i]).text().trim();
        }
        var rating=$(ProductTag[i]).find('.rating p')[0].textContent;
        var price =convertToNumber(specialPrice);
        var product = {
            'id':id,
            'img':img,
            'name':name,
            'specialPrice':price,
            'oldPrice':oldPrice,
            'offers':offers,
            'rating':rating
        }
        if(r2!=""){
            if(product.specialPrice>parseInt(r1+'000000') && product.specialPrice<parseInt(r2+'000000'))
            data.push(product);
        }
        else{
            if(product.specialPrice>parseInt(r1+'000000')){
                data.push(product);
            }
        }
    }
        var content = ''
        for (var i = 0;i<data.length;i++){
            content += Create_Product(data[i].id,data[i].img,data[i].name,convertToMoney(data[i].specialPrice),data[i].oldPrice,data[i].offers,data[i].rating )
        }    
        $('.list-product').html(content)
        for(var i = 0 ; i < ProductTag.length;i++){
            if($($('.offers')[i]).text().trim()==""){
                $($('.offers')[i]).addClass('display-none')
            }
        }
}
function sortProduct(params) {
        for(var i=0;i<$('.sort-by li').length;i++){
            $($('.sort-by li')[i]).css('text-decoration', 'none')
        }
        $('#'+params).css('text-decoration', 'underline')
        var ProductTag=$('.product');
        var data=[];
        for(var i = 0 ; i < ProductTag.length;i++){
            var id=$(ProductTag[i]).attr('id')
            var img=$(ProductTag[i]).find('img').attr('src');
            var name=$(ProductTag[i]).find('.product-name')[0].textContent;
            var specialPrice=$(ProductTag[i]).find('.special-price')[0].textContent;
            if($(ProductTag[i]).find('.old-price')[0].textContent==undefined){
                oldPrice="";
            }
            else{
                var oldPrice=$(ProductTag[i]).find('.old-price')[0].textContent;
            }
            if($($('.offers')[i]).hasClass('display-none')==true){
                offers="";
            }
            else{
                var offers=$($('.offers')[i]).text().trim();
            }
            var rating=$(ProductTag[i]).find('.rating')[0].textContent.trim();
            var product = {
                'id':id,
                'img':img,
                'name':name,
                'specialPrice':convertToNumber(specialPrice),
                'oldPrice':oldPrice,
                'offers':offers,
                'rating':rating
            }
            data.push(product);
        }
    if(params=='sort-high'){
        data.sort(Sort_price_Decrease('specialPrice'))
    }
    else if(params=='sort-low'){
        data.sort(Sort_price_Increase('specialPrice'))
    }
    var content = ''
    for (var i = 0;i<data.length;i++){
        content += Create_Product(data[i].id,data[i].img,data[i].name,convertToMoney(data[i].specialPrice),data[i].oldPrice,data[i].offers,data[i].rating )
    }    
    $('.list-product').html(content)
    for(var i = 0 ; i < ProductTag.length;i++){
        if($($('.offers')[i]).text().trim()==""){
            $($('.offers')[i]).addClass('display-none')
        }
    }
}

function reLoad(param) {
    window.location=param;
}
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

function Sort_price_Increase(att){
    return function(a,b){
        if (a[att] > b[att])
            return 1
        else if (a[att] < b[att])
            return -1
        return 0
    }
}
function Sort_price_Decrease(att){
    return function(a,b){
        if (a[att] > b[att])
            return -1
        else if (a[att] < b[att])
            return 1
        return 0
    }
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

