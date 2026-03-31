function displayGames(gamesToShow) {
    const container = document.getElementById('games-container');
    if (!container) return;

    container.innerHTML = '';
    gamesToShow.forEach(game => {
        const item = document.createElement('div');
        item.className = 'col-12 mb-3';
        item.innerHTML = `
            <h5>${game.title}</h5>
            <p>${game.price}€</p>
        `;
        container.appendChild(item);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('games-container')) {
        displayGames(games);
    }
});
