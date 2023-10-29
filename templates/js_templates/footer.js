// Get footer
let footerContainer = getById("footer");

// Function to generate header
function generateFooter() {
    footerContainer.innerHTML = createFooter();
}

function createFooter(){
    return /* html */`
    <div class="links">
        <a href="https://www.instagram.com/" target="_blank"><i class="fa-brands fa-square-instagram"></i></a>
        <a href="https://twitter.com/?lang=de" target="_blank"><i class="fa-brands fa-square-x-twitter"></i></a>
        <a href="https://about.meta.com/de/" target="_blank"><i class="fa-brands fa-meta"></i></a>
        <a href="https://github.com/" target="_blank"><i class="fa-brands fa-square-github"></i></a>
    </div>
    `;
};