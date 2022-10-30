

document.addEventListener('DOMContentLoaded', () => {
    axios.get('http://localhost:3000/products?page=1')
        .then((res) => {
            const products = res.data;
            console.log(products);
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
        let prodId = e.target.parentElement.parentElement.id;
        //console.log(e.target.parentElement.parentElement.id);
        if (e.target.parentElement.parentElement.id in cartItems) {
            return
        }

        axios.post(`http://localhost:3000/cart/${prodId}`)
            .then(result => {
                console.log(result);
            })
            .catch(err=>console.log(err))
        
    }
    if (Number.isInteger(+e.target.innerText) && e.target.parentElement.id==="pagination") {
        // console.log(e.target.innerText);
        axios.get(`http://localhost:3000/products?page=${e.target.innerText}`)
        .then((res) => {
            const products = res.data;
            e.target.classList.add('active');
            for (let i = 0; i < products.length ; i++){
                addProductsToStorePage(products[i]);
            }
            return
        })
        .catch(err => {
        console.log(err)
    })
    }
}

 


