function findProduct() {
    var param =$($('.box-search input'))[0].value.trim().toLowerCase();
    window.sessionStorage.setItem("findingwords", param);
    var ProductTag=$('.product');
    var data=[];
    for(var i = 0 ; i < ProductTag.length;i++){
        if($(ProductTag[i]).find('.product-name')[0].textContent.trim().toLowerCase().includes(param)){
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
    }   
    var currentProduct = window.sessionStorage.getItem("findding");
    newFind=JSON.stringify(data);
    window.sessionStorage.setItem("findding", newFind);
    window.location="FindProduct.html";
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

