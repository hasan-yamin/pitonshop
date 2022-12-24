"use strict";
let productId; // ID for product will appear in product details page
let usertoken = localStorage.getItem('tempUserAuth'); //user authentication token
window.addEventListener('load', function () {
    // obtain product ID from url
    productId = +window.location.href.slice(window.location.href.indexOf('?id=') + 4);
    // send html request to get product details
    getProductDetails(productId);
});
/****************** get Product Details HTML request ***********************/
function getProductDetails(productId) {
    axios({
        method: 'GET',
        url: `https://assignment-api.piton.com.tr/api/v1/product/get/${productId}`,
        headers: {
            'access-token': usertoken
        }
    }).then(function (response) {
        if (response.status === 200) {
            // show product details to User
            showProduct(response.data['product']);
        }
    });
}
/****************** get Product Details HTML request ***********************/
/****************** show Product Details function ***********************/
function showProduct(product) {
    // container for all deatails
    let productDiv = document.getElementById('product-details');
    let image = document.createElement('div');
    image.className = 'image';
    image.innerHTML = `<img src="https://assignment-api.piton.com.tr${product.image}" alt="">`;
    productDiv.appendChild(image);
    let details = document.createElement('div');
    details.className = 'details';
    details.innerHTML = `
                        <div class="favorite">
                        ${product.likes.length} likes <i class="fa-solid fa-heart like"></i>
                        </div>
                        <div class="title">${product.name}</div>
                        <div class="description">${product.description}</div>
                        <div class="price">${product.price}.00 &euro;</div>
    `;
    productDiv.append(details);
}
/****************** End show Product Details function ***********************/
// go to main page when click on logo
function mainPage() {
    window.location.href = "products.html";
    localStorage.setItem('tempUserAuth', usertoken);
}
/* *********** Start Logout **************/
let signOut = document.getElementById('logout');
signOut.addEventListener('click', function () {
    // delete session data from local storage
    localStorage.removeItem('userAuth');
    localStorage.removeItem('tempUserAuth');
    window.location.href = "index.html";
});
/* *********** End Logout **************/
// remove temp UserAuth when close page
window.addEventListener('beforeunload', () => {
    localStorage.removeItem('tempUserAuth');
});
