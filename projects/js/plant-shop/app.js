//Variable que mantiene el estado visible del cart
var cartVisible = false;

//Espermos que todos los elementos de la pàgina cargen para ejecutar el script
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){
    
    //Agregremos funcionalidad a los botones eliminar del cart
    var buttonDeleteItem = document.getElementsByClassName('btn-delete');
    for(var i=0;i<buttonDeleteItem.length; i++){
        var button = buttonDeleteItem[i];
        button.addEventListener('click',deleteItemCart);
    }

    //Agrego funcionalidad al boton sumar amount
    var botonesSumaramount = document.getElementsByClassName('add-amount');
    for(var i=0;i<botonesSumaramount.length; i++){
        var button = botonesSumaramount[i];
        button.addEventListener('click',sumaramount);
    }

     //Agrego funcionalidad al buton restar amount
    var botonessubtractAmount = document.getElementsByClassName('subtract-amount');
    for(var i=0;i<botonessubtractAmount.length; i++){
        var button = botonessubtractAmount[i];
        button.addEventListener('click',subtractAmount);
    }

    //Agregamos funcionalidad al boton Add to cart
    var botonesAgregarAlcart = document.getElementsByClassName('buttom-item');
    for(var i=0; i<botonesAgregarAlcart.length;i++){
        var button = botonesAgregarAlcart[i];
        button.addEventListener('click', agregarAlcartClicked);
    }

    //Agregamos funcionalidad al botón comprar
    document.getElementsByClassName('btn-pay')[0].addEventListener('click',pagarClicked)
}
//Eliminamos todos los elementos del cart y lo ocultamos
function pagarClicked(){
    alert("Thank you for purchasing");
    //Elimino todos los elmentos del cart
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    actualizarTotalcart();
    ocultarcart();
}
//Funcion que controla el boton clickeado de Add to cart
function agregarAlcartClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var title = item.getElementsByClassName('item-title')[0].innerText;
    var price = item.getElementsByClassName('item-price')[0].innerText;
    var imgSrc = item.getElementsByClassName('img-item')[0].src;

    addItemCart(title, price, imgSrc);

    doVisibleCart();
}

//Funcion que hace visible el cart
function doVisibleCart(){
    cartVisible = true;
    var cart = document.getElementsByClassName('cart')[0];
    cart.style.marginRight = '0';
    cart.style.opacity = '1';

    var items =document.getElementsByClassName('container-items')[0];
    items.style.width = '60%';
}

//Funcion que agrega un item al cart
function addItemCart(title, price, imgSrc){
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemscart = document.getElementsByClassName('cart-items')[0];

    //controlamos que el item que intenta ingresar no se encuentre en el cart
    var namesItemCart = itemscart.getElementsByClassName('cart-item-title');
    for(var i=0;i < namesItemCart.length;i++){
        if(namesItemCart[i].innerText==title){
            alert("The item is already in the cart");
            return;
        }
    }

    var itemCartContent = `
        <div class="cart-item">
            <img src="${imgSrc}" width="80px" alt="">
            <div class="cart-item-detalles">
                <span class="cart-item-title">${title}</span>
                <div class="selector-amount">
                    <i class="fa-solid fa-minus subtract-amount"></i>
                    <input type="text" value="1" class="cart-item-amount" disabled>
                    <i class="fa-solid fa-plus add-amount"></i>
                </div>
                <span class="cart-item-price">${price}</span>
            </div>
            <button class="btn-delete">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemCartContent;
    itemscart.append(item);

    //Agregamos la funcionalidad eliminar al nuevo item
     item.getElementsByClassName('btn-delete')[0].addEventListener('click', deleteItemCart);

    //Agregmos al funcionalidad restar amount del nuevo item
    var botonsubtractAmount = item.getElementsByClassName('subtract-amount')[0];
    botonsubtractAmount.addEventListener('click',subtractAmount);

    //Agregamos la funcionalidad sumar amount del nuevo item
    var botonSumaramount = item.getElementsByClassName('add-amount')[0];
    botonSumaramount.addEventListener('click',sumaramount);

    //Actualizamos total
    actualizarTotalcart();
}
//Aumento en uno la amount del elemento seleccionado
function sumaramount(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var amountActual = selector.getElementsByClassName('cart-item-amount')[0].value;
    amountActual++;
    selector.getElementsByClassName('cart-item-amount')[0].value = amountActual;
    actualizarTotalcart();
}
//Resto en uno la amount del elemento seleccionado
function subtractAmount(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var amountActual = selector.getElementsByClassName('cart-item-amount')[0].value;
    amountActual--;
    if(amountActual>=1){
        selector.getElementsByClassName('cart-item-amount')[0].value = amountActual;
        actualizarTotalcart();
    }
}

//Elimino el item seleccionado del cart
function deleteItemCart(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Actualizamos el total del cart
    actualizarTotalcart();

    //la siguiente funcion controla si hay elementos en el cart
    //Si no hay elimino el cart
    ocultarcart();
}
//funcion que controla si hay elementos en el cart. Si no hay oculto el cart.
function ocultarcart(){
    var cartItems = document.getElementsByClassName('cart-items')[0];
    if(cartItems.childElementCount==0){
        var cart = document.getElementsByClassName('cart')[0];
        cart.style.marginRight = '-100%';
        cart.style.opacity = '0';
        cartVisible = false;
    
        var items =document.getElementsByClassName('container-items')[0];
        items.style.width = '100%';
    }
}
//Actualizamos el total de cart
function actualizarTotalcart(){
    //seleccionamos el container cart
    var cartcontainer = document.getElementsByClassName('cart')[0];
    var cartItems = cartcontainer.getElementsByClassName('cart-item');
    var total = 0;
    //recorremos cada elemento del cart para actualizar el total
    for(var i=0; i< cartItems.length;i++){
        var item = cartItems[i];
        var priceElemento = item.getElementsByClassName('cart-item-price')[0];
        var price = parseFloat(priceElemento.innerText.replace('$','').replace('.',''));
        var amountItem = item.getElementsByClassName('cart-item-amount')[0];
        console.log(price);
        var amount = amountItem.value;
        total = total + (price * amount);
    }
    total = Math.round(total * 100)/100;

    document.getElementsByClassName('cart-total-price')[0].innerText = +total.toLocaleString("es") + ",00"+'€';

    //Hago scroll hasta el div del carrito al clickar en añadir a la cesta
    function scrolltoCart() {
        const cartDiv = document.getElementById('cart');
        cartDiv.scrollIntoView({behavior: 'smooth'});
    }

    scrolltoCart();
}