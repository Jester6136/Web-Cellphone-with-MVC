$(document).ready(function () {
	var orders=sessionStorage.getItem('orders');
	orders ="["+orders+"]";
	var data = JSON.parse(orders);
	content="";
	for (let i = 0; i < data.length; i++) {
		var item=`<div class="product-in-cart" id="${data[i].id}">
			<img src="${data[i].img}" alt="">
			<div class="imfor" >
				<h4 class="product-name">${data[i].name}</h4>
				<p>Màu: <span>${data[i].color}</span></p>
				<span class="delete">Xóa</span>
			</div>
			<div class="box-price">
				<p class="Price-now">${data[i].price}</p>
				<p class="Price-old">${data[i].old_price}</p>
				<div class="Quantity">
					<button id="left" class="btn-left">-</button>
					<input type="text" id="quantity" class="val" value="1">	
					<button id="right" class="btn-right">+</button>
				</div>
			</div>
			<div id="line"></div>
		</div>`
		content+=item;
	}
	$('#content').html(content);

	


	left=$('.btn-left')
	right=$('.btn-right')
	sum_price=$('#sum-price span')[0].textContent
	prices=$('.product-in-cart').find('.Price-now')
	tmp=0;
	for (let index = 0; index < prices.length; index++) {
		const element = prices[index].textContent;
		count=$('.product-in-cart').find('.Price-now').siblings('.Quantity').find('#quantity')[index].value;
		tmp+=convertToNumber(element)*count;
	}
	sum_price=convertToMoney(tmp)+' ₫';
	$('#sum-price span')[0].textContent=sum_price
	for(var i = 0 ; i < left.length;i++){
		left[i].onclick=function () {
			if(val[0].value>1){
				val[0].value=parseInt(val[0].value)-1;
			}
			sum_price=$('#sum-price span')[0].textContent
	prices=$('.product-in-cart').find('.Price-now')
	tmp=0;
	for (let index = 0; index < prices.length; index++) {
		const element = prices[index].textContent;
		count=$('.product-in-cart').find('.Price-now').siblings('.Quantity').find('#quantity')[index].value;
		tmp+=convertToNumber(element)*count;
	}
	sum_price=convertToMoney(tmp)+' ₫';
	$('#sum-price span')[0].textContent=sum_price
		}
	}
	for(var i = 0 ; i < right.length;i++){
		right[i].onclick=function () {
			val=$(this).siblings('.val')
			if(val[0].value<100){
				val[0].value=parseInt(val[0].value)+1
			}
			sum_price=$('#sum-price span')[0].textContent
			prices=$('.product-in-cart').find('.Price-now')
			tmp=0;
			for (let index = 0; index < prices.length; index++) {
				const element = prices[index].textContent;
				count=$('.product-in-cart').find('.Price-now').siblings('.Quantity').find('#quantity')[index].value;
				tmp+=convertToNumber(element)*count;
			}
			sum_price=convertToMoney(tmp)+' ₫';
			$('#sum-price span')[0].textContent=sum_price
		}
	}
	
	var delete_btn =$('.delete');
	for(var i = 0 ; i < delete_btn.length;i++){
		delete_btn[i].onclick=function(){
			var id = $('.product-in-cart').attr('id');
			$(this).parent().parent().remove();
			var orders=sessionStorage.getItem('orders');
			orders ="["+orders+"]";
			var data = JSON.parse(orders);

			const index = data.findIndex(x => x.id === id);

			if (index !== undefined) data.splice(index, 1);
			orders=JSON.stringify(data).toString().substring(1,JSON.stringify(data).toString().length-1);

			window.sessionStorage.setItem("orders",orders);
			curent=0;
			for (let i = 0; i < data.length; i++) {
				if(data!=""){
					curent += 1;
				}
			}
			$('#cart-quantity').text('('+curent+')')


			if(orders!=""){
					sum_price=$('#sum-price span')[0].textContent
					prices=$('.product-in-cart').find('.Price-now')
					tmp=0;
					for (let index = 0; index < prices.length; index++) {
						const element = prices[index].textContent;
						count=$('.product-in-cart').find('.Price-now').siblings('.Quantity').find('#quantity')[index].value;
						tmp+=convertToNumber(element)*count;
					}
					sum_price=convertToMoney(tmp)+' ₫';
					$('#sum-price span')[0].textContent=sum_price
				}
			else{
					sum_price=0+' ₫';
					$('#sum-price span')[0].textContent=sum_price
					window.sessionStorage.setItem("orders","");
			}
		}
	}
});
function convertToMoney(st) {
	result= (st).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
	result= result.substring(0,result.length-3)
	return result.replaceAll(',','.');
}
function convertToNumber(params) {
	array=params.substring(0,params.length-1).split('.')
	result="";
	for (let index = 0; index < array.length; index++) {
		const element = array[index];
		result+=element;
	}
	return parseInt(result);
}