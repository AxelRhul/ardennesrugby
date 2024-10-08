document.addEventListener('DOMContentLoaded', (event) => {
    const players = document.querySelectorAll('.player-list li');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    const playerList = document.getElementById('player-list');

    const playerItemHeight = players[0].offsetHeight;
    const listHeight = playerList.offsetHeight;
    const playersPerPage = Math.floor(listHeight / (playerItemHeight*1.5));

    let currentPage = 1;
    let filteredPlayers = Array.from(players);
    const totalPages = () => Math.ceil(filteredPlayers.length / playersPerPage);

    function updatePlayerList() {
        const start = (currentPage - 1) * playersPerPage;
        const end = start + playersPerPage;

        players.forEach(player => player.style.display = 'none');
        filteredPlayers.slice(start, end).forEach(player => player.style.display = '');

        pageInfo.textContent = `Page ${currentPage} sur ${totalPages()}`;
        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === totalPages();
    }

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePlayerList();
        }
    });

    nextPageButton.addEventListener('click', () => {
        if (currentPage < totalPages()) {
            currentPage++;
            updatePlayerList();
        }
    });

    updatePlayerList();

    // Update pagination when search is updated
    document.addEventListener('searchUpdated', (e) => {
        filteredPlayers = e.detail.filteredPlayers;
        currentPage = 1;
        updatePlayerList();
    });
});