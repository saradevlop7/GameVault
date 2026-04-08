function displayGames(list) {
    const container = document.getElementById('games-container');
    container.innerHTML = '';

    list.forEach(game => {
        container.innerHTML += `
            <div class="col-3 mb-3">
                <div class="card p-2 text-center">
                    <img src="${game.image}" style="height:150px">
                    <h5>${game.title}</h5>
                    <p>${game.price}€</p>
                    <button onclick="addToCart(${game.id})">Ajouter</button>
                </div>
            </div>
        `;
    });
}

function filterGames() {
    const text = document.getElementById('search-input').value.toLowerCase();

    const filtered = games.filter(g =>
        g.title.toLowerCase().includes(text)
    );

    displayGames(filtered);
}