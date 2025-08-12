// Swiper
var swiper = new Swiper(".home", {
        spaceBetween: 30,
        centeredSlides: true,
        
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
});

let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}
let cart = [];

// Add to cart
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productBox = this.parentElement;
        const name = productBox.getAttribute('data-name');

        // Get selected size and price
        const sizeSelect = productBox.querySelector('.size-select');
        const size = sizeSelect.value;
        const price = parseFloat(sizeSelect.selectedOptions[0].getAttribute('data-price'));

        // Add product to cart
        cart.push({ name, size, price });
        updateCart();
    });
});

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        let li = document.createElement('li');
        li.innerHTML = `${item.name} (${item.size}) - ₱${item.price.toFixed(2)}
            <button onclick="removeFromCart(${index})">x</button>`;
        cartItems.appendChild(li);
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.length;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

document.getElementById('clear-cart').addEventListener('click', function() {
    cart = [];
    updateCart();
});

document.getElementById('cart-icon').addEventListener('click', function(e) {
    const dropdown = document.getElementById('cart-dropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    e.stopPropagation();
});

// Close cart when clicking outside
document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('cart-dropdown');
    const cartIcon = document.getElementById('cart-icon');
    if (!dropdown.contains(e.target) && !cartIcon.contains(e.target)) {
        dropdown.style.display = 'none';
    }
});
