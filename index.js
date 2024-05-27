let menuHamburguesa = document.getElementById('menuHamburguesa')
let buttonToggleMenu = document.getElementById('buttonToggleMenu')
let lineone = document.getElementById('lineone')
let linetwo = document.getElementById('linetwo')
let linethree = document.getElementById('linethree')

buttonToggleMenu.addEventListener('click', () => {
    if (!menuHamburguesa.classList.contains('opened')) {
        menuHamburguesa.classList.add('opened')
        lineone.style.top = '50%'
        lineone.style.transform = 'rotate(45deg)'
        linetwo.style.width = '0'
        linethree.style.top = '50%'
        linethree.style.transform = 'rotate(-45deg)'
    } else {
        menuHamburguesa.classList.remove('opened')
        lineone.style.top = '0'
        lineone.style.transform = 'rotate(0)'
        linetwo.style.width = '100%'
        linethree.style.top = '100%'
        linethree.style.transform = 'rotate(0)'
    }
})

// Fetch Products
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

// Validate Contact Form
const form = document.querySelector('.contacto');
const nameInput = document.getElementById('nombre');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('telefono');
const subjectSelect = document.getElementById('asunto');
const messageTextarea = document.getElementById('mensaje');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    let isValid = true;

    // Validate name (not empty)
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Please enter your name');
        isValid = false;
    } else {
        clearError(nameInput);
    }

    // Validate email (valid format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email');
        isValid = false;
    } else {
        clearError(emailInput);
    }

    // Validate phone (optional, but if entered, must have at least 8 digits)
    if (phoneInput.value.trim() !== '' && phoneInput.value.length < 8) {
        showError(phoneInput, 'Please enter a valid phone number (at least 8 digits)');
        isValid = false;
    } else {
        clearError(phoneInput);
    }

    // Validate subject (an option must be selected)
    if (subjectSelect.value === '') {
        showError(subjectSelect, 'Please select a subject');
        isValid = false;
    } else {
        clearError(subjectSelect);
    }

    // Validate message (not empty)
    if (messageTextarea.value.trim() === '') {
        showError(messageTextarea, 'Please enter a message');
        isValid = false;
    } else {
        clearError(messageTextarea);
    }

    // If all fields are valid, submit the form
    if (isValid) {
        form.submit();
    }
});

function showError(input, message) {
    const group = input.parentElement;
    group.classList.add('error');

    let errorSpan = group.querySelector('.error-message');

    if (!errorSpan) {
        errorSpan = document.createElement('span');
        errorSpan.classList.add('error-message');
        group.appendChild(errorSpan);
    }

    errorSpan.textContent = message;
}

function clearError(input) {
    const group = input.parentElement;
    group.classList.remove('error');
    const errorSpan = group.querySelector('span');
    if (errorSpan) {
        errorSpan.remove();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    getProducts();
});
