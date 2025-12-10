let cart = [];
let total = 0;

function scrollTo(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
    showCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = '';
    total = 0;
    
    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; padding: 0.5rem; background: #f9f9f9; border-radius: 3px;">
                <span>${item.name}</span>
                <div>
                    <span>${item.price} SEK</span>
                    <button onclick="removeFromCart(${index})" style="margin-left: 0.5rem; background: #ff4444; color: white; border: none; border-radius: 3px; padding: 0.2rem 0.5rem; cursor: pointer;">×</button>
                </div>
            </div>
        `;
        cartItems.appendChild(itemDiv);
        total += item.price;
    });
    
    cartTotal.textContent = `Totalt: ${total} SEK`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    if (cart.length === 0) {
        hideCart();
    }
}

function showCart() {
    document.getElementById('cart').classList.add('open');
}

function hideCart() {
    document.getElementById('cart').classList.remove('open');
}

function checkout() {
    if (cart.length === 0) {
        alert('Din kundvagn är tom!');
        return;
    }
    
    const orderSummary = cart.map(item => `${item.name}: ${item.price} SEK`).join('\n');
    const subject = 'Granola Beställning';
    const body = `Beställningssammanfattning:\n${orderSummary}\n\nTotalt: ${total} SEK\n\nVänligen bekräfta denna beställning och ange leveransdetaljer.`;
    
    // Try to open email client
    try {
        const emailBody = body.replace(/\n/g, '%0D%0A');
        window.location.href = `mailto:nike.weiler@gmail.com?subject=${subject}&body=${emailBody}`;
    } catch (error) {
        // Fallback: show order details and email address
        alert(`${body}\n\nSkicka denna beställning till: nike.weiler@gmail.com`);
    }
    
    cart = [];
    updateCart();
    hideCart();
}

// Close cart when clicking outside
document.addEventListener('click', function(e) {
    const cartElement = document.getElementById('cart');
    const buyButtons = document.querySelectorAll('.buy-btn');
    
    if (!cartElement.contains(e.target) && ![...buyButtons].includes(e.target)) {
        hideCart();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});