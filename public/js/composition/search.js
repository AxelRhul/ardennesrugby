// search.js
document.addEventListener('DOMContentLoaded', (event) => {
    const players = document.querySelectorAll('.player-list li');
    const searchBar = document.getElementById('search-bar');

    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredPlayers = Array.from(players).filter(player => {
            const playerName = player.getAttribute('data-nom').toLowerCase() + ' ' + player.getAttribute('data-prenom').toLowerCase();
            return playerName.includes(searchTerm);
        });

        players.forEach(player => player.style.display = 'none');
        filteredPlayers.forEach(player => player.style.display = '');

        // Dispatch a custom event to update pagination
        const event = new CustomEvent('searchUpdated', { detail: { filteredPlayers } });
        document.dispatchEvent(event);
    });
});