// Get all quantity inputs
const quantityInputs = document.querySelectorAll('.quantity input');
const cartItems = document.getElementById('cart-items');
const totalElement = document.getElementById('total');
const checkoutButton = document.getElementById('checkout');

// Add event listeners to quantity buttons
document.querySelectorAll('.quantity button').forEach(button => {
    button.addEventListener('click', () => {
        const input = button.parentElement.querySelector('input');
        if (button.classList.contains('plus')) {
            input.value = parseInt(input.value) + 1;
        } else if (button.classList.contains('minus') && input.value > 0) {
            input.value = parseInt(input.value) - 1;
        }
        updateCart();
    });
});

// Function to update the cart
function updateCart() {
    let total = 0;
    cartItems.innerHTML = '';

    quantityInputs.forEach(input => {
        const quantity = parseInt(input.value);
        if (quantity > 0) {
            const price = parseFloat(input.dataset.price);
            const size = input.dataset.size;
            const subtotal = quantity * price;
            total += subtotal;

            cartItems.innerHTML += `
                <p>${quantity}x ${size}kg Brown Rice - ${subtotal.toFixed(2)} PKR</p>
            `;
        }
    });

    totalElement.textContent = total.toFixed(2);
}

// Updated checkout process
checkoutButton.addEventListener('click', () => {
    const total = parseFloat(totalElement.textContent);
    if (total > 0) {
        const bankDetails = `
            Total: ${total.toFixed(2)} PKR
            
            Please transfer the amount to the following bank account:
            Account Name: Almeeraj Rice and Foods
            Account Number: 01276761276
            Bank Name: Meezan Bank Limited            
            Reference: BR${Date.now()} (Please include this reference with your transfer)
        `;
        alert(bankDetails);
        
        // Clear the cart after checkout
        quantityInputs.forEach(input => input.value = 0);
        updateCart();
    } else {
        alert('Your cart is empty!');
    }
});

// Image Slider functionality
const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const slides = document.querySelectorAll('.slider img');
let currentSlide = 0;

function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    slider.style.transform = `translateX(${-currentSlide * 100}%)`;
}

prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

// Initialize the slider
showSlide(0);

// Remove the auto-advance functionality
// setInterval(() => {
//     slideIndex++;
//     showSlide(slideIndex);
// }, 5000);