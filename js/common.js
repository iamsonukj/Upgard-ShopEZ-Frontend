$(document).ready(function(){
updateCartCount();
});

function updateCartCount(){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

cart.forEach(item => {
total += item.qty || 1;
});

$("#cartCount").text(total);

}