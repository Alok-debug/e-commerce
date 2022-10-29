document.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://localhost:3000/products')
        .then((res) => {
            const products = res.data;
            for (let i = 0; i < products.length ; i++){
                addProductsToStorePage(products[i]);
            }
            return
        })
        .catch(err => {
        console.log(err)
    })
})

function addProductsToStorePage(product) {
    var productcontainer = document.createElement('div')
    productcontainer.classList.add('shop-item');
    productcontainer.id =product.id;

    var productContent = `<span class="shop-item-title">${product.title}</span>
    <img class="shop-item-image" src=${product.imageUrl}>
    <div class="shop-item-details">
        <span class="shop-item-price">$${product.price}</span>
        <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
    </div>`
    productcontainer.innerHTML = productContent
    document.getElementsByClassName('shop-items')[0].append(productcontainer);
} 

var cartItems = [];

document.addEventListener('click', doSomeThing);

function doSomeThing(e) {
    if (e.target.innerText === "ADD TO CART") {
        //console.log(e.target.parentElement.parentElement.id);
        if (e.target.parentElement.parentElement.id in cartItems) {
            return
        }
        cartItems.push(e.target.parentElement.parentElement.id);
        console.log(cartItems);
    }
}



// exports.module= { cartItems };

