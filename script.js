/*--------------------NAVBAR-COFFEE---------------------*/

function openNav() {
    document.getElementById("main-nav").style.height = "100%";
}

function closeNav() {
    document.getElementById("main-nav").style.height = "0%";
}

document.getElementById("click").addEventListener('click', openNav)

/*----------------------------------------------------------*/

const form = document.querySelector('form');
const searchQuery = document.querySelector('#query');
const imgList = document.querySelector('#images');
const key = '678d2c48054ed28dbd11292c311e2252';


// En function för att kunna skriva och söka.
form.addEventListener('submit', e => {
    e.preventDefault();
    console.log(searchQuery.value);
    // Kallar på funktionen som hämtar bilder från API'et
    getImages(searchQuery.value);
});

// Skriver funktionen där vi hämtar bilder från API'et
async function getImages(query) {
    const response = await fetch(`https://www.flickr.com/services/rest/?api_key=${key}&method=flickr.photos.search&text=${query}&per_page=20&page=6&format=json&nojsoncallback=1`);
    const data = await response.json();
    //console.log(data.photos.photo);   //consolar data från API

    //Skickar argument i form av json data till functionen renderImages
    renderImages(data.photos.photo);
};



function renderImages(array) {
    console.log(array)

    imgList.innerHTML = '';

    array.forEach(value => {
        listUrl = `https://farm${value.farm}.staticflickr.com/${value.server}/${value.id}_${value.secret}_n.jpg`;
        console.log(listUrl);

        const imgListItem = document.createElement('li');
        imgListItem.classList.add('pictures');
        imgListItem.innerHTML = `<img src="${listUrl}" alt="${value.title}"></img>`
        imgList.appendChild(imgListItem);


    });
};