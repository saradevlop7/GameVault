function displayGames(list) {
    const container = document.getElementById('games-container');
    if (!container) return;

    container.innerHTML = '';

    list.forEach(g => {
        container.innerHTML += `
        <div class="col-12 col-sm-6 col-lg-3 mb-4">
            <div class="card h-100 d-flex flex-column shadow-sm">
                <div class="ratio ratio-4x3">
                    <img src="${g.image}" class="card-img-top object-fit-cover" alt="${g.title}">
                </div>
                <div class="card-body d-flex flex-column text-center">
                    <h5 class="card-title text-truncate">${g.title}</h5>
                    <p class="card-text text-muted small mb-2">Genre: ${g.genre}</p>
                    <p class="card-text fw-bold text-success mb-3">${g.price}€</p>
                    <button onclick="addToCart(${g.id})" 
                        class="btn btn-primary mt-auto w-100">
                        Ajouter au panier
                    </button>
                </div>
            </div>
        </div>
        `;
    });
}

function filterGames() {
    const text = document.getElementById('search-input').value.toLowerCase();
    const genre = document.querySelector('.active')?.dataset.genre || 'all';

    const result = games.filter(g =>
        g.title.toLowerCase().includes(text) &&
        (genre === 'all' || g.genre === genre)
    );

    displayGames(result);
}