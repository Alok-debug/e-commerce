const allProducts = document.getElementById('allProducts');

allProducts.addEventListener('click', seeData);

function seeData(e) {
    //console.log(e.target.innerHTML);
    if (e.target.innerHTML == 'Add to cart') {
        console.log(e.target.id);
    }
    
}