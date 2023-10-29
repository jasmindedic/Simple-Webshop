let productNumber = 0;
let buyBtnNumber = 0;
let addBtnNumber = 0;
let buyAmountNumber = 0;
let itemCounter = 0;

let test = {};

// Function to get element by Id
function getById(elementName) {
    return document.getElementById(elementName);
};


// init function
function init() {
    generateNavBar();
    renderProducts();
};


function renderProducts() {
    let productsContainer = getById("products-container");

    fetchProductData()
        .then((data) => {

            // Empty productscontainer first
            productsContainer.innerHTML = "";

            for (let i = 0; i < data.length; i++) {
                let product = data[i];
                productNumber++;
                buyBtnNumber++;
                addBtnNumber++;
                buyAmountNumber++;
                productsContainer.innerHTML += createProducts(product);
            }

            for (let i = 0; i < data.length; i++) {
                let productKey = `product${i}`;
                test[productKey] = 0;
            };

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
                if (!response.ok) {
                    reject("Fetch error: " + response.status);
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



function buyButtonUpdate(itemCounter) {
    return /* html */`
            <p class="item-num">${itemCounter}</p>
    `;
}


function addItem(add) {
    let pressedProductNumber = add.parentNode.parentNode.children[0].children[0].id.slice(7);
    let buyAmount = getById(`buyAmount${pressedProductNumber}`);

    /*  if (buyAmount.innerHTML != "") {
         itemCounter++;
         console.log("workiiiii")
     }
 
     buyAmount.innerHTML = "";
     buyAmount.innerHTML = buyButtonUpdate(itemCounter); */

    fetchProductData()
        .then((data) => {
            let dataLength = data.length;

            /* for (let i = 0; i < data.length; i++) {
                let productKey = `product${i}`;
                test[productKey] = 0;
            }; */

            /* let objectCounter = 0;
            for (let key in test) {
                if (test.hasOwnProperty(key)) {
                    objectCounter++;
                }
            }; */

            /* for (let i = 0; i < objectCounter; i++) {
                let propertyName = `product${i}`;
                if (pressedProductNumber == test[propertyName]) {
                    console.log(`pressedPoroductnumber: ${pressedProductNumber} und test: ${test[propertyName]}`);
                }
            } */

           /*  let productCounter = `product${pressedProductNumber}`;
            test[productCounter] += 1;
            let counti = test[productCounter]; */

            let currentCounter = test[`product${pressedProductNumber}`];
            currentCounter++;
            test[`product${pressedProductNumber}`] = currentCounter;

            /* debugger; */

            buyAmount.innerHTML = "";
            buyAmount.innerHTML = buyButtonUpdate(currentCounter);

            console.log(`fetch erfolgreich`);
        })
        .catch((error) => {
            console.log('Error while loading data');
        });

    console.log("save test");
};


function createProducts(product) {
    return  /* html */ `
        <div id="productNumber${productNumber}" class="product">
            <img src="${product.img}">
            <p class="product-desc">${product.productDesc}</p>
            <p class="price">${product.price}</p>
            <div class="product-buttons">
                <div id="buy-btn-container"> 
                    <button id="buy-btn${buyBtnNumber}" class="buy-btn">Buy</button>
                    <span id="buyAmount${buyAmountNumber}"></span>
                </div>
                <div class="decrease-increase-btns">
                    <button onclick="addItem(this)" id="add-btn${addBtnNumber}" class="increase">+</button>
                    <button onclick="removeItem()" class="decrease">-</button>
                </div>
            </div>
        </div>
        `;
}
