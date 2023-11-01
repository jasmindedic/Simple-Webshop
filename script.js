let productNumber = 0;
let buyBtnNumber = 0;
let addBtnNumber = 0;
let buyAmountNumber = 0;
let testAmountNumber = 0;
let itemCounter = 0;

let test = {};

// Function to get element by Id
function getById(elementName) {
    return document.getElementById(elementName);
};


// init function
function init() {
    loadData();
    generateNavBar();
    renderProducts();
    generateFooter();
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
                testAmountNumber++;
                productsContainer.innerHTML += createProducts(product);
            }
            console.log(test)

            contextReturn()
                .then(()=> {
                    let keys = Object.keys(test);
                    for (let i = 0; i < keys.length; i++){
                        let buyBtnId = document.getElementById(`testAmount${i}`);
                    }
                })
                .catch(() => {
                    console.log(Error)
                });

            let getSavedData = loadData();
            for (let j = 0; j < getSavedData.length; j ++) {
                let testKey = `product${j}`;
                if (testKey < 1){
                    for (let i = 1; i <= data.length; i++) {
                        let productKey = `product${i}`;
                        test[productKey] = 0;
                        console.log(`Initialized test value for product ${i}: ${test[productKey]}`);
                    };
                }
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


/* function buyButtonUpdate(itemCounter) {
    return `
            <p class="item-num">${itemCounter}</p>
    `;
} */

function addItem(add) {
    let pressedProductNumber = add.parentNode.parentNode.children[0].children[0].id.slice(7);
    let buyAmount = getById(`buyAmount${pressedProductNumber}`);

            let currentCounter = test[`product${pressedProductNumber}`];
            currentCounter++;
            test[`product${pressedProductNumber}`] = currentCounter;

            /* buyAmount.innerHTML = ""; */
            /* buyAmount.innerHTML = buyButtonUpdate(currentCounter); */

              /* test */
              let testAmount = getById(`testAmount${pressedProductNumber}`);
              console.log(testAmount);
              testAmount.innerHTML = currentCounter;
              /* test */

            saveData();
            console.log(`fetch erfolgreich`);
};

function removeItem(remove){
    let pressedProductNumber = remove.parentNode.parentNode.children[0].children[0].id.slice(7);
    let buyAmount = getById(`buyAmount${pressedProductNumber}`);

            let currentCounter = test[`product${pressedProductNumber}`];
            currentCounter--;
            test[`product${pressedProductNumber}`] = currentCounter;

            /* buyAmount.innerHTML = ""; */
            /* buyAmount.innerHTML = buyButtonUpdate(currentCounter); */

             /* test */
             let testAmount = getById(`testAmount${pressedProductNumber}`);
             console.log(testAmount);
             testAmount.innerHTML = currentCounter;
             /* test */

            saveData();
}

function saveData() {
    let testData = JSON.stringify(test);
    localStorage.setItem("products", testData);
}

function loadData() {
    let loadedData = JSON.parse(localStorage.getItem("products"));
    test = loadedData;

    return loadedData;
}

function contextReturn() {
    return new Promise((resolve, reject) => {
            resolve("Success :)");
            reject("Failed Promise :/");
    })
}



function createProducts(product) {
    return  /* html */ `
        <div id="productNumber${productNumber}" class="product">
            <img src="${product.img}">
            <p class="product-desc">${product.productDesc}</p>
            <p class="price">${product.price}</p>
            <div class="product-buttons">
                <div id="buy-btn-container"> 
                    <button id="buy-btn${buyBtnNumber}" class="buy-btn">Buy</button>
                    <span id="buyAmount${buyAmountNumber}">
                        <p id="testAmount${testAmountNumber}" class="item-num">${itemCounter}</p>
                    </span>
                </div>
                <div class="decrease-increase-btns">
                    <button onclick="addItem(this)" id="add-btn${addBtnNumber}" class="increase">+</button>
                    <button onclick="removeItem(this)" class="decrease">-</button>
                </div>
            </div>
        </div>
        `;
}
