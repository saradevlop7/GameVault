function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : {};
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const count = Object.values(getCart()).reduce((sum, qty) => sum + qty, 0);
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        countElement.textContent = count;
    }
}

function displayGames(gamesToShow) {
    const container = document.getElementById('games-container');
    if (!container) return;

    container.innerHTML = '';
    gamesToShow.forEach(game => {
        const card = document.createElement('div');
        card.className = 'col-12 mb-4';
        card.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${game.image}" class="card-img-top" alt="${game.title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${game.title}</h5>
                    <p class="card-text">Genre: ${game.genre}</p>
                    <p class="card-text fw-bold">Prix: ${game.price}€</p>
                    <button class="btn btn-primary mt-auto add-to-cart" data-id="${game.id}">Ajouter au panier</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            addToCart(parseInt(btn.dataset.id));
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
                    <h5>${game.title}</h5>
                    <p>Prix: ${game.price}€</p>
                    <div class="input-group mb-2">
                        <button class="btn btn-outline-secondary decrease-qty" data-id="${id}">-</button>
                        <input type="number" class="form-control text-center" value="${qty}" min="1" data-id="${id}">
                        <button class="btn btn-outline-secondary increase-qty" data-id="${id}">+</button>
                    </div>
                    <p class="fw-bold">Sous-total: ${subtotal.toFixed(2)}€</p>
                    <button class="btn btn-danger remove-item" data-id="${id}">Supprimer</button>
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

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    if (document.getElementById('games-container')) {
        displayGames(games);
        document.getElementById('search-input').addEventListener('input', filterGames);

        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.category-btn').forEach(item => item.classList.remove('active'));
                btn.classList.add('active');
                filterGames();
            });
        });

        document.querySelector('.category-btn[data-genre="all"]').classList.add('active');
    }

    if (document.getElementById('cart-container')) {
        displayCart();
    }
});
