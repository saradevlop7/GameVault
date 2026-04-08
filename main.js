document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    if (document.getElementById('games-container')) {
        displayGames(games);

        document.getElementById('search-input').oninput = filterGames;

        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('.category-btn')
                    .forEach(b => b.classList.remove('active'));

                btn.classList.add('active');
                filterGames();
            };
        });
    }

    if (document.getElementById('cart-container')) {
        displayCart();
        document.getElementById('order-btn').onclick = order;
    }
});