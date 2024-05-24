let menuHamburguesa = document.getElementById('menuHamburguesa')
let buttonToggleMenu = document.getElementById('buttonToggleMenu')
let lineone = document.getElementById('lineone')
let linetwo = document.getElementById('linetwo')
let linethree = document.getElementById('linethree')

buttonToggleMenu.addEventListener('click', () =>{
    if(!menuHamburguesa.classList.contains('opened')){
        menuHamburguesa.classList.add('opened')
        lineone.style.top = '50%'
        lineone.style.transform = 'rotate(45deg)'
        linetwo.style.width = '0'
        linethree.style.top = '50%'
        linethree.style.transform = 'rotate(-45deg)'
    }else{
        menuHamburguesa.classList.remove('opened')
        lineone.style.top = '0'
        lineone.style.transform = 'rotate(0)'
        linetwo.style.width = '100%'
        linethree.style.top = '100%'
        linethree.style.transform = 'rotate(0)'
    }
})

const productContainer = document.querySelector('.containerCardsProduct');

async function getProducts() {
    try {
        const response = await fetch('https://codo-a-codo-js.vercel.app/products.json');
        const products = await response.json();

        for (let product of products) {
            const cardProduct = document.createElement('div');
            cardProduct.classList.add('cardProduct');

            const cardInfo = document.createElement('div');
            cardInfo.classList.add('cardInfo');

            const image = document.createElement('img');
            image.src = product.image;
            image.alt = product.name;

            const oldPrice = document.createElement('span');
            oldPrice.classList.add('oldPrice');
            oldPrice.textContent = product.oldPrice;

            const newPrice = document.createElement('span');
            newPrice.classList.add('newPrice');
            newPrice.textContent = product.newPrice;

            cardInfo.appendChild(image);
            cardInfo.appendChild(oldPrice);
            cardInfo.appendChild(newPrice);

            cardProduct.appendChild(cardInfo);

            productContainer.appendChild(cardProduct);
        }
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    getProducts();
});
