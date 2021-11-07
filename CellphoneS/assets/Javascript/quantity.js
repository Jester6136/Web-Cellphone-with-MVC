var orders=sessionStorage.getItem('orders');
orders ="["+orders+"]";
var data = JSON.parse(orders);
curent=0;
for (let i = 0; i < data.length; i++) {
    if(data!=""){
        curent += 1;
    }
}
$('#cart-quantity').text('('+curent+')')
