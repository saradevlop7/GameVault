function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : {};
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const el = document.getElementById('cart-count');
    if (!el) return;

    const cart = getCart();
    let total = 0;

    for (let id in cart) {
        total += cart[id];
    }

    el.textContent = total;
}


function addToCart(id) {
    const cart = getCart();
    cart[id] = (cart[id] || 0) + 1;
    saveCart(cart);
    alert('Jeu ajouté au panier !');
}
