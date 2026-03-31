function displayGames(gamesToShow) {
    const container = document.getElementById('games-container');
    if (!container) return;

    container.innerHTML = '';
    gamesToShow.forEach(game => {
        const card = document.createElement('div');
        card.className = 'col-12 mb-4';
        card.innerHTML = `
            <div class="card h-100">
                <img src="${game.image}" class="card-img-top" alt="${game.title}">
                <div class="card-body">
                    <h5 class="card-title">${game.title}</h5>
                    <p class="card-text fw-bold">Prix: ${game.price}€</p>
                    <button class="btn btn-primary add-to-cart" data-id="${game.id}">Ajouter au panier</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('games-container')) {
        displayGames(games);
    }
});
