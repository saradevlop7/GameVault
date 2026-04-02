document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    if (document.getElementById('games-container')) {
        displayGames(games);

        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', filterGames);
        }

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
