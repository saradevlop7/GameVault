function displayCart() {
    const container = document.getElementById('cart-container');
    const cart = getCart();

    container.innerHTML = '';

    if (Object.keys(cart).length === 0) {
        container.innerHTML = '<p>Panier vide</p>';
        return;
    }

    let total = 0;

    for (let id in cart) {
        const game = games.find(g => g.id == id);
        const qty = cart[id];
        const subtotal = game.price * qty;
        total += subtotal;

        container.innerHTML += `
            <div class="card mb-2 p-2">
                <h5>${game.title}</h5>
                <p>${game.price}€ x ${qty}</p>
                <button onclick="removeItem(${id})">Supprimer</button>
            </div>
        `;
    }

    container.innerHTML += `<h4>Total: ${total}€</h4>`;
}

function removeItem(id) {
    const cart = getCart();
    delete cart[id];
    saveCart(cart);
    displayCart();
}

function order() {
    if (Object.keys(getCart()).length === 0) {
        alert('Panier vide');
        return;
    }

    localStorage.removeItem('cart');
    updateCartCount();
    displayCart();
    alert('Commande validée');
}