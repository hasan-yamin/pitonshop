
let token: string = <string>localStorage.getItem('userAuth');
let products: any[] = []
getProducts()

/* *********** Start Logout **************/
let logOut: HTMLButtonElement = <HTMLButtonElement>document.getElementById('logout');
logOut.addEventListener('click', function () {
    // delete session data from local storage
    localStorage.removeItem('userAuth');
    console.log('logedout...')
    window.location.href = "index.html";
})
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
    }).then(function (response: any) {
        products = response.data['products']
        // console.log('response : ', response);
        // console.log('data : ', response.data['products'][0]);
        // console.log('id : ', response.data['products'][0].id);
        // console.log('name : ', response.data['products'][0].name);
        // console.log('price : ', response.data['products'][0].price);
        // console.log('image : ', response.data['products'][0].image);
        // console.log('description : ', response.data['products'][0].description);
        // console.log('likes : ', response.data['products'][0].likes);
        if (products.length > 0) {
            console.log('we have ', products.length, ' products')
            showProducts(products)
        }

    });
}
function showProducts(products: any[]) {
    let productsDiv: HTMLDivElement = <HTMLDivElement>document.getElementById('products')
    products.forEach((product: any, index: number) => {
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
        productDiv.addEventListener('click', function () {
            window.location.href = `product-details.html?id=${product.id}`;
        })
        productsDiv.appendChild(productDiv)
    });
}
function like(id: number) {
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
    }).then(function (response: any) {
        console.log('response : ', response.data);
        let likeIcon: SVGElement = <SVGElement>document.querySelector(`#product-no-${id} .like`)
        likeIcon.style.display = 'block'
        let unlikeIcon: SVGElement = <SVGElement>document.querySelector(`#product-no-${id} .unlike`)
        unlikeIcon.style.display = 'none'
    })
}
function unLike(id: number) {
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
    }).then(function (response: any) {
        console.log('response : ', response.data);
        let likeIcon: SVGElement = <SVGElement>document.querySelector(`#product-no-${id} .like`)
        likeIcon.style.display = 'none'
        let unlikeIcon: SVGElement = <SVGElement>document.querySelector(`#product-no-${id} .unlike`)
        unlikeIcon.style.display = 'block'
    })
}