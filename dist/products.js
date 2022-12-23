"use strict";
let token = localStorage.getItem('userAuth');
let products = [];
getProducts();
/* *********** Start Logout **************/
let logOut = document.getElementById('logout');
logOut.addEventListener('click', function () {
    // delete session data from local storage
    localStorage.removeItem('userAuth');
    console.log('logedout...');
    window.location.href = "index.html";
});
/* *********** End Logout **************/
/* [1] 'GET' get all tasks from firebase db */
function getProducts() {
    axios({
        method: 'GET',
        url: 'https://assignment-api.piton.com.tr/api/v1/product/all',
        // responseType: 'stream',
        headers: {
            'access-token': token
        }
    }).then(function (response) {
        products = response.data['products'];
        // console.log('response : ', response);
        // console.log('data : ', response.data['products'][0]);
        // console.log('id : ', response.data['products'][0].id);
        // console.log('name : ', response.data['products'][0].name);
        // console.log('price : ', response.data['products'][0].price);
        // console.log('image : ', response.data['products'][0].image);
        // console.log('description : ', response.data['products'][0].description);
        // console.log('likes : ', response.data['products'][0].likes);
        if (products.length > 0) {
            console.log('we have ', products.length, ' products');
            showProducts(products);
        }
    });
}
function showProducts(products) {
    let productsDiv = document.getElementById('products');
    products.forEach((product, index) => {
        // console.log('product : ', index, '*************************************');
        // console.log('id : ', product.id);
        // console.log('name : ', product.name);
        // console.log('price : ', product.price);
        // console.log('image : ', product.image);
        // console.log('description : ', product.description);
        // console.log('likes : ', product.likes);
        let productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.setAttribute('id', `product-no-${product.id}`);
        productDiv.innerHTML = ` 
                <div class="favorite">
                    <i class="fa-solid fa-heart like"  style="display:none"  onclick="unLike(${product.id})"></i>
                    <i class="fa-regular fa-heart unlike"  onclick="like(${product.id})"></i>
                </div>
                <div class="picture"><img src="https://assignment-api.piton.com.tr${product.image}" alt=""></div>
                <div class="title">${product.name}</div>
                <div class="price">${product.price}.00 &euro;</div> 
        `;
        productsDiv.appendChild(productDiv);
    });
}
function like(id) {
    console.log('clicked on  : ', id);
    let likeIcon = document.querySelector(`#product-no-${id} .like`);
    likeIcon.style.display = 'block';
    let unlikeIcon = document.querySelector(`#product-no-${id} .unlike`);
    unlikeIcon.style.display = 'none';
    axios({
        method: 'POST',
        url: 'https://assignment-api.piton.com.tr/api/v1/product/like',
        // responseType: 'stream',
        headers: {
            'access-token': token
        },
        data: {
            productId: id
        }
    }).then(function (response) {
        console.log('response : ', response);
    });
}
function unLike(id) {
    console.log('clicked on  : ', id);
    let likeIcon = document.querySelector(`#product-no-${id} .like`);
    likeIcon.style.display = 'none';
    let unlikeIcon = document.querySelector(`#product-no-${id} .unlike`);
    unlikeIcon.style.display = 'block';
    axios({
        method: 'POST',
        url: 'https://assignment-api.piton.com.tr/api/v1/product/unlike',
        // responseType: 'stream',
        headers: {
            'access-token': token
        },
        data: {
            productId: id
        }
    }).then(function (response) {
        console.log('response : ', response);
    });
}
//# sourceMappingURL=products.js.map