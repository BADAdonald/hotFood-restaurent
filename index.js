function addLikes (e){
    let likesnumber = Number(e.nextElementSibling.innerText) +1;
    e.nextElementSibling.innerText = likesnumber
}

let menuTitle = document.getElementById('menutitle')
let menuList = document.getElementById('menuList')
menuTitle.addEventListener('click',()=>{
    menuList.style.display='block'
})

var shop = document.getElementById('shopbag')
var cartBox = document.querySelector('.cartBox')
var close =  document.querySelector('.close')
shop.addEventListener('click',()=>{
    cartBox.style.visibility = 'visible'
})

close.addEventListener('click',()=>{
    cartBox.style.visibility="hidden"
})

if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready()
}

function ready(){
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    console.log(removeCartItemButtons);
    for(var i=0; i<removeCartItemButtons.length;i++){
        var button = removeCartItemButtons[i]
        console.log(button)
        button.addEventListener('click',removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    console.log(quantityInputs)
    for(var i=0; i<quantityInputs.length;i++){
        var input =quantityInputs[i]
        console.log(input)
        input.addEventListener('change',quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('orderpro');
    for(var i = 0; i<addToCartButtons.length;i++){
        var button = addToCartButtons[i]
        console.log(button)
        button.addEventListener('click',addToCartClicked)
    }
}

function removeCartItem(event){
    var buttomClicked = event.target
    buttomClicked.parentElement.parentElement.remove()
    UpdateCart()
}

function quantityChanged(event){
    var input = event.target
    console.log(input)
    if(isNaN(input.value) || input.value<=0){
        input.value = 1
    }
    UpdateCart()
}
var titleList = [];
var cartNumber = document.getElementById('number')
console.log(cartNumber)

function addToCartClicked(event){
    var button = event.target
    var post = button.parentElement.parentElement.parentElement
    var title = post.getElementsByClassName('productitle')[0].innerText
    var price = post.getElementsByClassName('price')[0].innerText
    var imageSrc = post.getElementsByClassName('img-cart')[0].src
   if(!titleList.includes(title)){
    titleList.push(title)
   }

   cartNumber.innerHTML = titleList.length
   addItemToCart(title,price,imageSrc)
   UpdateCart()
}


function addItemToCart(title,price,imageSrc){
    var cartRow =  document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames  = cartItems.getElementsByClassName('cart-item-title')
   for(var i = 0; i < cartItemNames.length; i++){
    if(cartItemNames[i].innerHTML == title){
        alert('is inside the cart')
        return
    }
   }

    var cartRowContents = `
    <div class="cart-item cart-column">
                <img class="cart-item-image" src="${imageSrc}" width="100px" height="100px">
                <span class="cart-item-title">${title}</span>
            </div>
            <span class="cart-price cart-column size">${price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger" type="button">REMOVE</button>
            </div>`

            cartRow.innerHTML = cartRowContents
            cartItems.appendChild(cartRow)

            cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)
            cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged)
}


function UpdateCart(){
    var total = 0;
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    for(var i = 0; i<cartRows.length;i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement =  cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerHTML.replace('$',''))
        var quantity = quantityElement.value
        total = total +(price*quantity)
    }
    total = Math.round(total*100)/100;
    document.getElementsByClassName('cart-total-price')[0].innerText='$'+ total;
}
















