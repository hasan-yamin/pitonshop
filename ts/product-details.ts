
let productId: number;
let usertoken = <string>localStorage.getItem('tempUserAuth');
window.addEventListener('load', function () {
    productId = +window.location.href.slice(window.location.href.indexOf('?id=') + 4)
    console.log('productId: ', productId);
    getProductDetails(productId)
});
function getProductDetails(productId: number) {
    console.log('productId: ', productId);

    axios({
        method: 'GET',
        url: `https://assignment-api.piton.com.tr/api/v1/product/get/${productId}`,
        // responseType: 'stream',
        headers: {
            'access-token': usertoken
        }
    }).then(function (response: any) {
        console.log('id : ', response.data['product'].id);
        // console.log('name : ', response.data['product'].name);
        // console.log('price : ', response.data['product'].price);
        // console.log('image : ', response.data['product'].image);
        // console.log('description : ', response.data['product'].description);
        // console.log('likes : ', response.data['product'].likes);
        showProduct(response.data['product'])
    });
}
function showProduct(product: { image: string; likes: any; name: any; description: any; price: any; }) {
    let productDiv: HTMLDivElement = <HTMLDivElement>document.getElementById('product-details')
    let image: HTMLDivElement = document.createElement('div')
    image.className = 'image'
    image.innerHTML = `<img src="https://assignment-api.piton.com.tr${product.image}" alt="">`
    productDiv.appendChild(image)

    let details: HTMLDivElement = document.createElement('div')
    details.className = 'details'
    details.innerHTML = `
                        <div class="favorite">
                        ${product.likes.length} likes <i class="fa-solid fa-heart like"></i>
                        </div>
                        <div class="title">${product.name}</div>
                        <div class="description">${product.description}</div>
                        <div class="price">${product.price}.00 &euro;</div>
    `
    productDiv.append(details)

}
function mainPage() {
    window.location.href = "products.html";
    localStorage.setItem('tempUserAuth', usertoken);
}

/* *********** Start Logout **************/
let signOut: HTMLButtonElement = <HTMLButtonElement>document.getElementById('logout');
signOut.addEventListener('click', function () {
    // delete session data from local storage
    localStorage.removeItem('userAuth');
    localStorage.removeItem('tempUserAuth');
    console.log('logedout...')
    window.location.href = "index.html";
})
/* *********** End Logout **************/
// remove temp UserAuth when close page
window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload', event)
    localStorage.removeItem('tempUserAuth');  
});