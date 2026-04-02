function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : {};
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const countElement = document.getElementById('cart-count');
    if (!countElement) return;

    const cart = getCart();
    const count = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
    countElement.textContent = count;
}

function addToCart(id) {
    const cart = getCart();
    cart[id] = (cart[id] || 0) + 1;
    saveCart(cart);
    alert('Jeu ajouté au panier !');
}
