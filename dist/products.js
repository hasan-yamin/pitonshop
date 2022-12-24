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
        if (products.length > 0) {
            console.log('we have ', products.length, ' products');
            showProducts(products);
        }
    });
}
function showProducts(products) {
    let productsDiv = document.getElementById('products');
    products.forEach((product, index) => {
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
        let productImage = document.querySelector(`#product-no-${product.id} .picture`);
        productImage.addEventListener('click', function () {
            window.location.href = `product-details.html?id=${product.id}`;
        });
    });
}
function like(id) {
    console.log('clicked on  : ', id);
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
        console.log('response : ', response.data);
        let likeIcon = document.querySelector(`#product-no-${id} .like`);
        likeIcon.style.display = 'block';
        let unlikeIcon = document.querySelector(`#product-no-${id} .unlike`);
        unlikeIcon.style.display = 'none';
    });
}
function unLike(id) {
    console.log('clicked on  : ', id);
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
        console.log('response : ', response.data);
        let likeIcon = document.querySelector(`#product-no-${id} .like`);
        likeIcon.style.display = 'none';
        let unlikeIcon = document.querySelector(`#product-no-${id} .unlike`);
        unlikeIcon.style.display = 'block';
    });
}
