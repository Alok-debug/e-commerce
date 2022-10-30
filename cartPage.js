if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    // const purchaseBtn = document.getElementsByClassName('btn-purchase')[0];
    // purchaseBtn.addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addItemToCart(item) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementById('cart-items');
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${item.imageUrl}" width="100" height="100">
            <span class="cart-item-title">${item.title}</span>
        </div>
        <span class="cart-price cart-column">${item.price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="${item.cartItem.quantity}" >
            <button class="btn btn-danger" type="button" id="${item.id}">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    // cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}

window.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://localhost:3000/cart').then(cartdetails => {
        const cartItemsData = cartdetails.data;
        cartItemsData.forEach((item) => {
            addItemToCart(item);
            updateCartTotal();
        })
    }).catch(err=>console.log(err))
})

document.body.addEventListener('click', doSomeThing);

function doSomeThing(e) {
    if (e.target.innerText === "REMOVE") {
        const productIdToBeDeleted = e.target.id;
        console.log(`productID: ${productIdToBeDeleted}`);
        const itemToBeDeleted = e.target.parentElement.parentElement;
        
        axios.post(`http://localhost:3000/cart-delete-item/${productIdToBeDeleted}`)
            .then(result => {
                itemToBeDeleted.remove();
                updateCartTotal();

            })
            .catch(err => console.log(err));
        
    }

    if (e.target.innerText === "PURCHASE") {

        axios.post('http://localhost:3000/create-order')
            .then(result => {

                console.log(result);
            })
            .catch(err => console.log(err))
    }
}
