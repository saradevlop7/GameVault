function displayCart() {
    const container = document.getElementById('cart-container');
    if (!container) return;

    const cart = getCart();
    container.innerHTML = '';

    if (Object.keys(cart).length === 0) {
        container.innerHTML = '<p class="text-center">Votre panier est vide.</p>';
        return;
    }

    let total = 0;

    Object.keys(cart).forEach(id => {
        const game = games.find(item => item.id == id);
        if (game) {
            const qty = cart[id];
            const subtotal = game.price * qty;
            total += subtotal;

            const item = document.createElement('div');
            item.className = 'card mb-3';
            item.innerHTML = `
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-md-2">
                            <img src="${game.image}" class="img-fluid" alt="${game.title}">
                        </div>
                        <div class="col-md-4">
                            <h5>${game.title}</h5>
                            <p>Prix: ${game.price}€</p>
                        </div>
                        <div class="col-md-3">
                            <div class="input-group">
                                <button class="btn btn-outline-secondary decrease-qty" data-id="${id}">-</button>
                                <input type="number" class="form-control text-center" value="${qty}" min="1" data-id="${id}">
                                <button class="btn btn-outline-secondary increase-qty" data-id="${id}">+</button>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <p class="fw-bold">Sous-total: ${subtotal.toFixed(2)}€</p>
                        </div>
                        <div class="col-md-1 text-md-end mt-3 mt-md-0">
                            <button class="btn btn-danger remove-item" data-id="${id}">Supprimer</button>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(item);
        }
    });

    const totalDiv = document.createElement('div');
    totalDiv.className = 'text-end mt-3';
    totalDiv.innerHTML = `<h4>Total: ${total.toFixed(2)}€</h4>`;
    container.appendChild(totalDiv);

    document.querySelectorAll('.decrease-qty').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const cart = getCart();
            if (cart[id] > 1) {
                cart[id]--;
                saveCart(cart);
                displayCart();
            }
        });
    });

    document.querySelectorAll('.increase-qty').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const cart = getCart();
            cart[id]++;
            saveCart(cart);
            displayCart();
        });
    });

    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('change', () => {
            const id = input.dataset.id;
            const qty = parseInt(input.value);
            if (qty > 0) {
                const cart = getCart();
                cart[id] = qty;
                saveCart(cart);
                displayCart();
            } else {
                displayCart();
            }
        });
    });

    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const cart = getCart();
            delete cart[id];
            saveCart(cart);
            displayCart();
        });
    });
}

function order() {
    const cart = getCart();
    if (Object.keys(cart).length === 0) {
        alert('Votre panier est vide !');
        return;
    }

    localStorage.removeItem('cart');
    updateCartCount();
    displayCart();
    alert('Commande passée avec succès ! Merci pour votre achat.');
}
