document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    if (document.getElementById('games-container')) {
        displayGames(games);

        const input = document.getElementById('search-input');
        if (input) {
            input.addEventListener('input', filterGames);
        }
    }

    if (document.getElementById('cart-container')) {
        displayCart();

        const btn = document.getElementById('order-btn');
        if (btn) btn.onclick = order;
    }
});