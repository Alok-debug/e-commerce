const adminForm = document.getElementById('form');
let updateDataId = [];

document.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://localhost:3000/admin/products')
        .then((res) => {
            const products = res.data;
            for (let i = 0; i < products.length ; i++){
                addProductsToAdminPage(products[i].id,products[i].title, products[i].price, products[i].imageUrl);
            }
        })
        .then(() => {
            ready()
        }
        ).catch(err => {
        console.log(err)
    })
})

// for update operation

var updatebtnn = document.getElementById('updateProduct_btn');
updatebtnn.addEventListener('click', updateDataToDatabase);

async function updateDataToDatabase(e) {
    e.preventDefault();
    const obj={
        "title": `${document.getElementById('title').value}`,
        "price": `${document.getElementById('price').value}`,
        "imageUrl": `${document.getElementById('imageUrl').value}`,
        "description":`${document.getElementById('description').value}`,
    }
    document.getElementById('updateProduct_btn').style.display = 'none';
    document.getElementById('addProduct_btn').style.display = 'block';
    try {
        console.log(updateDataId[0]);
        const dataPosted = await axios.put(`http://localhost:3000/admin/edit-product/${updateDataId[0]}`, obj);
        updateDataId.pop();
        console.log(`data updated successfully ${dataPosted}`);
    }
    catch (err) {
        console.log(err);
    }
}


function addProductsToAdminPage(prodId,title, price, imageUrl) {
    var product = document.createElement('div')
    product.classList.add('admin-Product__item');
    product.id =prodId;

    var productContent = `<div class="product__details">
    <span class="shop-item-title">${title}</span>
    <img class="shop-item-image" src=${imageUrl}>
    <span class="shop-item-price">$${price}</span>
     </div>

    <div class="Admin__actions">
    <button class="deletebtn button" id="deletebtn" type="button">delete Product</button>
    <button class="editbtn button" id="editbtn" type="button">Edit Product</button>
    </div>`
    product.innerHTML = productContent
    document.getElementsByClassName('products__container')[0].append(product);
    
}



adminForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const obj={
        "title": `${document.getElementById('title').value}`,
        "price": `${document.getElementById('price').value}`,
        "imageUrl": `${document.getElementById('imageUrl').value}`,
        "description":`${document.getElementById('description').value}`,
    }
    
    axios.post('http://localhost:3000/admin/add-product',obj)
        .then((data) => {
            console.log(data);
        }).catch(err=>{
    console.log(err)
    })
})


function ready() {
    //const productsPage = document.getElementById('products__page');
    document.addEventListener('click', clicklistener)
}

function clicklistener(e) {
    if (e.target.id === 'deletebtn') {
        const targetProductID = e.target.parentElement.parentElement.id;
        axios.delete(`http://localhost:3000/admin/delete-product/${targetProductID}`).then((res)=>{console.log(res)}).catch(err=>console.log(err))
    }
    if (e.target.id === 'editbtn') {
        const targetProductID = e.target.parentElement.parentElement.id;
        document.getElementById('updateProduct_btn').style.display = 'block';
        document.getElementById('addProduct_btn').style.display = 'none';
        axios.get(`http://localhost:3000/admin/edit-product/${targetProductID}`)
            .then((res) => {
                const product = res.data;
                console.log(product.description);
                updateDataId.push(product.id);
                document.getElementById('title').value = product.title;
                document.getElementById('price').value = product.price;
                document.getElementById('imageUrl').value = product.imageUrl;
                document.getElementById('description').value = product.description;
            })
            .catch(err => console.log(err))
    }


}
