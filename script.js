let cartState = {};

function getCart() {
    return cartState;
}

function saveCart(cart) {
    cartState = cart;
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
});
