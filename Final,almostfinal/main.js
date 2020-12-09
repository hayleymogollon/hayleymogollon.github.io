let carts = document.querySelectorAll('.add-cart'); 
let products = [
    {
        name: 'Lucas',
        tag: 'lucas',
        price: 1,
        inCart: 0
    },
    {
        name: 'Skwinkle',
        tag: 'skwinkle',
        price: 2,
        inCart: 0
    },
    {
        name: 'Pelon',
        tag: 'pelon',
        price: 1,
        inCart: 0
    },
    {
        name: 'Rockaleta',
        tag: 'rockaleta',
        price: 1,
        inCart: 0
    },
    {
        name: 'Picafresas',
        tag: 'picafresas',
        price: 5,
        inCart: 0
    },
    {
        name: 'Paletas Vero',
        tag: 'paletas vero',
        price: 2,
        inCart: 0
    },
    {
        name: 'Pulparindo',
        tag: 'pulparindo',
        price: 3,
        inCart: 0
    },
    {
        name: 'Rellerindos',
        tag: 'rellerindos',
        price: 2,
        inCart: 0
    },
]

for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i])
        totalCost(products[i])
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product, action) {

    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if( action ) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
        console.log("action running");
    } else if( productNumbers ) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    
    setItems(product); // this allows for specific product to appear, rather than the list of arrays 
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems); // pass from JSON to regular Java

    if(cartItems != null) { // if something there already exists
        let currentProduct = product.tag;

        if (cartItems[currentProduct] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[currentProduct].inCart += 1;

    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product //unless its the first time clicking
        }
    }
    
    localStorage.setItem("productsInCart", JSON.stringify (cartItems));
}

function totalCost(product, action) {
    // console.log("The product price is", product.price);
    let cart = localStorage.getItem('totalCost');
    
    if( action) {
        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart - product.price);
    } else if(cart != null) {
        cart = parseInt(cart);//converting from string to number 
        localStorage.setItem("totalCost", cart + product.price);
    }else {
        localStorage.setItem("totalCost", product.price);
    }

}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    let cart = localStorage.getItem("totalCost");
    cart = parseInt(cart);

    let productContainer = document.querySelector
    (".products");
    
    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map( (item, index) => {
            productContainer.innerHTML += 
            `<div class="product"><ion-icon name="close-outline"></ion-icon><img src="./images/${item.tag}.jpg" width="200" height="200">
                <span class="sm-hide">${item.name}</span>
            </div>
            <div class="price sm-hide">$${item.price}</div>
            <div class="quantity">
                <ion-icon class="decrease" name="chevron-back-outline"></ion-icon>
                    <span>${item.inCart}</span>
                <ion-icon class="increase" name="chevron-forward-outline"></ion-icon>
            </div>
            <div class="total">$${item.inCart * item.price}</div>`;
        });

        productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">Total</h4>
            <h4 class="basketTotal">$${cart}</h4>
            </div>`
           
           
        deleteButtons();
        manageQuantity();
    }
}
function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for(let i=0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            if( cartItems[currentProduct].inCart > 1 ) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product ion-icon');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    console.log(cartItems);

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
           
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}

onLoadCartNumbers();
displayCart();

$('.dropdown-toggle').dropdown('update');

$(document).ready(function(){
    // Add smooth scrolling to all links
    $("a").on('click', function(event) {
  
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();
  
        // Store hash
        var hash = this.hash;
  
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){
     
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });
  });
  // https://www.w3schools.com/howto/howto_css_smooth_scroll.asp source