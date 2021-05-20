/*--------------------NAVBAR-COFFEE---------------------*/

function openNav() {
    document.getElementById("main-nav").style.height = "100%";
}

function closeNav() {
    document.getElementById("main-nav").style.height = "0%";
}

document.getElementById("click").addEventListener('click', openNav)

/*----------------------------------------------------------*/

// Variabler
const form = document.querySelector('form');
const searchQuery = document.querySelector('#query');
const imgList = document.querySelector('#images');
const imgLoad = document.querySelector('#imgLoad');
const key = '678d2c48054ed28dbd11292c311e2252';
const lightbox = document.querySelector('#lightbox');
const img = document.querySelector('img');
let pageIndex = 0;


// En function för att kunna skriva och söka.
form.addEventListener('submit', e => {
    e.preventDefault(); // förhindrar beteendet som normalt sker när man submitar ett formulär.
    imgList.innerHTML = ''; // Rensar min lista där bilderna ska vara inför varje sökning
    pageIndex = 1;
    // Kallar på funktionen som hämtar bilder från API'et
    getImages(searchQuery.value, pageIndex);
});


// Skriver funktionen där vi hämtar bilder från API'et
async function getImages(query, page) {
    const response = await fetch(`https://www.flickr.com/services/rest/?api_key=${key}&method=flickr.photos.search&text=${query}&per_page=18&page=${page}&sort=relevance&format=json&nojsoncallback=1`);
    const data = await response.json();

    //Skickar argument i form av json data till functionen renderImages
    renderImages(data.photos.photo);
};


// Function för att visa bilderna på sidan
function renderImages(images) {

    //Filrerar.
    images.forEach(image => {
        const listUrl = `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}`;
        const imgListItem = document.createElement('li'); // Skapar ny list element
        imgListItem.innerHTML = `<img src="${listUrl}_n.jpg" data-imageurl="${listUrl}_z.jpg" alt="${image.title}"></img>` // skapar img-taggar
        imgList.appendChild(imgListItem); // Lägger till img items på listan.

    });

};

/*--------------------------LightBox--------------------------*/


imgList.addEventListener('click', e => {
    loadLightbox(e.target.dataset.imageurl) // target är objektet man klickar på och hämtar data attributet på imageurl. 
})

function loadLightbox(url) {
    //Visa innehåll i lightbox
    img.src = url
    toggleLightbox()
};

function toggleLightbox() {
    lightbox.classList.toggle('hide'); // Togglar av
}

document.getElementById('lightboxClose').addEventListener('click', toggleLightbox) // Togglar på hide class

/*-----------------------LOAD-MORE-IMG-BUTTON--------------------*/

// En function för att kunna skriva och söka.
document.getElementById('loadMoreBtn').addEventListener('click', e => {
    e.preventDefault();
    // Kallar på funktionen som hämtar bilder från API'et
    getImages(searchQuery.value, pageIndex++);
});