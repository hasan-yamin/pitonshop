
let token: string = <string>localStorage.getItem('tempUserAuth');
let products: any[] = []
getProducts()

/* *********** Start Logout **************/
let logOut: HTMLButtonElement = <HTMLButtonElement>document.getElementById('logout');
logOut.addEventListener('click', function () {
    // delete session data from local storage
    localStorage.removeItem('userAuth');
    localStorage.removeItem('tempUserAuth');
    window.location.href = "index.html";
})
/* *********** End Logout **************/

/************** get all products from backend ***************/
function getProducts() {
    axios({
        method: 'GET',
        url: 'https://assignment-api.piton.com.tr/api/v1/product/all',
        headers: {
            'access-token': token
        }
    }).then(function (response: any) {
        products = response.data['products']
        if (products.length > 0) {
            // send products to show to user
            showProducts(products)
        }

    });
}
/************** End get all products from backend ***************/

/************** show all products to user ***************/
function showProducts(products: any[]) {
    // all products will be append to => 'productsDiv' 
    let productsDiv: HTMLDivElement = <HTMLDivElement>document.getElementById('products')
    products.forEach((product: { price: number, name: string, id: number, image: string, }) => {
        //create container for each product
        let productDiv = document.createElement('div')
        productDiv.className = 'product'
        productDiv.setAttribute('id', `product-no-${product.id}`)
        productDiv.innerHTML = ` 
                <div class="favorite">
                    <i class="fa-solid fa-heart like"  style="display:none"  onclick="unLike(${product.id})"></i>
                    <i class="fa-regular fa-heart unlike"  onclick="like(${product.id})"></i>
                </div>
                <div class="picture"><img src="https://assignment-api.piton.com.tr${product.image}" alt=""></div>
                <div class="title">${product.name}</div>
                <div class="price">${product.price}.00 &euro;</div> 
                `
        productsDiv.appendChild(productDiv)
        // when click on product image, will redirect to product details page
        let productImage: HTMLDivElement = <HTMLDivElement>document.querySelector(`#product-no-${product.id} .picture`)
        productImage.addEventListener('click', function () {
            window.location.href = `product-details.html?id=${product.id}`;
            localStorage.setItem('tempUserAuth', token);
        })
    });
}
/************** show all products to user ***************/

/************** like and unlike functions ***************/
function like(id: number) {
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
    }).then(function (response: any) {
        if (response.status === 200) {
            let likeIcon: SVGElement = <SVGElement>document.querySelector(`#product-no-${id} .like`)
            likeIcon.style.display = 'block'
            let unlikeIcon: SVGElement = <SVGElement>document.querySelector(`#product-no-${id} .unlike`)
            unlikeIcon.style.display = 'none'
        }

    })
}
function unLike(id: number) {
    axios({
        method: 'POST',
        url: 'https://assignment-api.piton.com.tr/api/v1/product/unlike',
        headers: {
            'access-token': token
        },
        data: {
            productId: id
        }
    }).then(function (response: any) {
        if (response.status === 200) {
            let likeIcon: SVGElement = <SVGElement>document.querySelector(`#product-no-${id} .like`)
            likeIcon.style.display = 'none'
            let unlikeIcon: SVGElement = <SVGElement>document.querySelector(`#product-no-${id} .unlike`)
            unlikeIcon.style.display = 'block'
        }
    })
}
/************** End like and unlike functions ***************/

// remove temp UserAuth when close page
window.addEventListener('beforeunload', () => {
    localStorage.removeItem('tempUserAuth');
});