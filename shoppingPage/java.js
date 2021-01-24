let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Ashley Roberts Outfit Original',
        tag: 'ashleyOutfit',
        price: 1990,
        inCart: 0
    },
    {
        name: 'Ashley Roberts Outfit Budget',
        tag: 'ashleyrobertsCheap',
        price: 211,
        inCart: 0
    }
]
// Looping throgh items
for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}
// Refresh the page and the number next to the cart
// stays the same 
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}
// setting the span number next to the shopping cart icon
function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
   
    if(cartItems != null) {

        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]:product
            }
        }
        cartItems[product.tag].inCart += 1;

    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    console.log("My cartCost is", cartCost);

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost" , product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    //convert from json object to javascript object
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');


    if(cartItems && productContainer ){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <i class="far fa-times-circle"></i>
                <img src="img/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class = "price">€${item.price},00</div>
            <div class = "quantity"> 
                <i class="fas fa-arrow-left"></i>
                <span>${item.inCart}</span>
                <i class="fas fa-arrow-right"></i>
            </div>
            <div class="total">
                     €${item.inCart * item.price},00
            </div>
            `
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    €${cartCost},00
                </h4>
        `
    }
}
function myFunction() {
    alert("Ordered!");
}
function myotherFunction() {
    alert("Added to cart!");
}
onLoadCartNumbers();
displayCart();