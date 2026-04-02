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

function filterGames() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const selectedGenre = document.querySelector('.category-btn.active')?.dataset.genre || 'all';

    const filtered = games.filter(game =>
        game.title.toLowerCase().includes(searchTerm) &&
        (selectedGenre === 'all' || game.genre === selectedGenre)
    );

    displayGames(filtered);
}
