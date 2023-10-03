// Function to get element by Id
function getById(elementName) {
    return document.getElementById(elementName);
};

// Get header container per Id
let navContainer = getById("nav");

// Function to generate header
function generateNavBar() {
    navContainer.innerHTML = createNavBar();
}

// Function to create header
function createNavBar() {
    return /* html */`
    <div class="logo-container">
        <img class="logo" id="logo" src="./images/logo.png">
    </div>
    <div class="toggle-btn" id="toggle-btn" onclick="toggleHamburgerMenu()">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
    </div>
    <ul class="nav-links" id="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Products</a></li>
        <li><a href="#">Contact</a></li>
        <li id="cart-list-icon"><a href="#">
            <span id="cart-icon" class="material-symbols-outlined">shopping_bag</span>
        </a></li>
    </ul>
    `;
};

function toggleHamburgerMenu(){
    let navLinks = document.getElementById("nav-links");
    let toggleBtn = document.getElementById("toggle-btn");
    let logo = document.getElementById("logo");

    navLinks.classList.toggle("active");
    logo.classList.toggle("active");

    console.log("testi")
}