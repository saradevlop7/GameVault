
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

function displayGames(gamesToShow) {
    const container = document.getElementById('games-container');
    if (!container) return;

    container.innerHTML = '';
    gamesToShow.forEach(game => {
        const card = document.createElement('div');
        card.className = 'col-12 col-sm-6 col-lg-3 mb-4';
        card.innerHTML = `
            <div class="card h-100 d-flex flex-column shadow-sm">
                <div class="ratio ratio-4x3">
                    <img src="${game.image}" class="card-img-top object-fit-cover" alt="${game.title}">
                </div>
                <div class="card-body d-flex flex-column text-center">
                    <h5 class="card-title text-truncate">${game.title}</h5>
                    <p class="card-text text-muted small mb-2">Genre: ${game.genre}</p>
                    <p class="card-text fw-bold text-success mb-3">${game.price}€</p>
                    <button class="btn btn-primary mt-auto w-100 add-to-cart" data-id="${game.id}">Ajouter au panier</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            addToCart(id);
        });
    });
}

function addToCart(id) {
    const cart = getCart();
    cart[id] = (cart[id] || 0) + 1;
    saveCart(cart);
    alert('Jeu ajouté au panier !');
}

function filterGames() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const selectedGenre = document.querySelector('.category-btn.active')?.dataset.genre || 'all';

    const filtered = games.filter(game =>
        game.title.toLowerCase().includes(searchTerm) &&
        (selectedGenre === 'all' || game.genre === selectedGenre)
    );

    displayGames(filtered);
}

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

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    if (document.getElementById('games-container')) {
        displayGames(games);

        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', filterGames);

        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.category-btn').forEach(item => item.classList.remove('active'));
                btn.classList.add('active');
                filterGames();
            });
        });

        const defaultCategory = document.querySelector('.category-btn[data-genre="all"]');
        if (defaultCategory) {
            defaultCategory.classList.add('active');
        }
    }

    if (document.getElementById('cart-container')) {
        displayCart();

        const orderButton = document.getElementById('order-btn');
        if (orderButton) {
            orderButton.addEventListener('click', order);
        }
    }
});
