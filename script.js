// Function to get element by Id
function getById(elementName) {
    return document.getElementById(elementName);
};


// init function
function init() {
    generateNavBar();    
    renderProducts();  
};


function renderProducts(){
    let productsContainer = getById("products-container");

    fetchProductData()
        .then((data) => {

            // Empty productscontainer first
            productsContainer.innerHTML = "";

            for(let i = 0; i < data.length; i++) {
                let product = data[i];
                productsContainer.innerHTML += createProducts(product);
            }
        })
        .catch((error) => {
            console.log('Error while loading data');
        });
}


// Fetch json data for products
function fetchProductData() {
    return new Promise((resolve, reject) => {
        fetch('./data.json')
            .then((response) => {
                if (!response.ok){
                    reject("Fetch error: " +response.status);
                } else {
                    return response.json();
                    }
                })
                .then((json) => {
                    resolve(json);
                })
                .catch((error) => {
                    reject("Error: " + error);
                });   
            });
        }


function createProducts(product) {
    return  /* html */ `
        <div class="product">
            <img src="${product.img}">
            <p class="product-desc">${product.productDesc}</p>
            <p class="price">${product.price}</p>
            <div class="product-buttons">
                <button class="buy-btn">Buy</button>
                <div class="decrease-increase-btns">
                    <button class="increase">+</button>
                    <button class="decrease">-</button>
                </div>
            </div>
        </div>
        `;
}