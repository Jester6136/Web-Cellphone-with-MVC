function myFunction() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");
  
    if (dots.style.display === "none") {    
      dots.style.display = "inline";
      btnText.innerHTML = "Read more"; 
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less"; 
      moreText.style.display = "inline";
    }
  }
$(document).ready(function () {
    $(() => {
    $('.small-pic img').click(function() {
        var imgPath =$(this).attr('src');
        $('.big-img').attr('src',imgPath);
    })
})
    $('.price .special-price')[0].textContent=$('.box-option-config.active')[0].children[1].textContent
	var price=$('.config')
	for (var i = 0; i < $(price).find('.box-option-config').length; i++) {
	    $(price).find('.box-option-config')[i].onclick=function () {
            for(var k=0;k<$(price).find('.box-option-config').length;k++){
                $(price).find('.box-option-config')[k].classList.remove('active')
            }
            this.classList.add('active');
            $('.price .special-price')[0].textContent=this.children[1].textContent
        }
	}
    var price_color=$('.color')
	for (var i = 0; i < $(price_color).find('.box-option-color').length; i++) {
	    $(price_color).find('.box-option-color')[i].onclick=function () {
            for(var k=0;k<$(price_color).find('.box-option-color').length;k++){
                $(price_color).find('.box-option-color')[k].classList.remove('active')
            }
            this.classList.add('active');
            $('.price .special-price')[0].textContent=this.children[1].textContent
        }
	}
    $('.buynow').click(function () {
        var id=$('.product-name').attr('id');
        var name = $('.top-view h2').text().trim();
        var price = $('.price .special-price')[0].textContent;
        var old_price=$('.old-price')[0].innerText.split(':')[1].trim();
        var img = $('.big-img').attr('src');
        var color=$('.box-option-color.active')[0].children[0].textContent
        var order={
            "id":id,
            "img":img,
            "name":name,
            "price":price,
            "old_price":old_price,
            "color":color
        };

        var currentProduct = window.sessionStorage.getItem("orders");
        var newOrders = "";
        if(currentProduct!=null)
            if(currentProduct.toString()==""){
                newOrders=JSON.stringify(order);
            }
            else
           newOrders =  currentProduct+","+JSON.stringify(order);
        else
            newOrders = JSON.stringify(order);
        window.sessionStorage.setItem("orders", newOrders);
        window.location="Shopping Cart.html";
        
    })
});