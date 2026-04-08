function displayCart() {
    const container = document.getElementById('cart-container');
    if (!container) return;

    const cart = getCart();
    container.innerHTML = '';

    if (Object.keys(cart).length === 0) {
        container.innerHTML = '<p class="text-center">Panier vide</p>';
        return;
    }

    let total = 0;

    for (let id in cart) {
        const game = games.find(g => g.id == id);
        const qty = cart[id];
        const sub = game.price * qty;
        total += sub;

        container.innerHTML += `
        <div class="card mb-3">
            <div class="card-body row align-items-center">
                <div class="col-md-2">
                    <img src="${game.image}" class="img-fluid">
                </div>
                <div class="col-md-4">
                    <h5>${game.title}</h5>
                    <p>${game.price}€</p>
                </div>
                <div class="col-md-3">
                    <button onclick="changeQty(${id}, -1)">-</button>
                    ${qty}
                    <button onclick="changeQty(${id}, 1)">+</button>
                </div>
                <div class="col-md-2">
                    ${sub.toFixed(2)}€
                </div>
                <div class="col-md-1">
                    <button onclick="removeItem(${id})">X</button>
                </div>
            </div>
        </div>
        `;
    }

    container.innerHTML += `<h4 class="text-end">${total.toFixed(2)}€</h4>`;
}

function changeQty(id, val) {
    const cart = getCart();
    cart[id] += val;

    if (cart[id] <= 0) delete cart[id];

    saveCart(cart);
    displayCart();
}

function removeItem(id) {
    const cart = getCart();
    delete cart[id];
    saveCart(cart);
    displayCart();
}

function order() {
    if (Object.keys(getCart()).length === 0) {
        alert('Vide !');
        return;
    }

    localStorage.removeItem('cart');
    updateCartCount();
    displayCart();
    alert('Commande OK');
}