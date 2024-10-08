document.addEventListener('DOMContentLoaded', (event) => {
    const exportButton = document.getElementById('export-button');
    const playerSquares = document.querySelectorAll('.player-square');
    const substituteSquares = document.querySelectorAll('.substitutes-square');

    exportButton.addEventListener('click', () => {
        const playerNames = getPlayerNames();
        console.log('Players in the composition:', playerNames);

        // Store original input values and their parents
        const originalInputValues = {};
        const numberInputs = document.querySelectorAll('.number-input, .substitute-number-input');
        numberInputs.forEach(input => {
            originalInputValues[input.id] = {
                value: input.value,
                parent: input.parentNode // Store the parent of the input
            };
        });

        // Replace inputs with text
        numberInputs.forEach(input => {
            const playerNameSpan = input.nextElementSibling;
            playerNameSpan.textContent = input.value + " - " + playerNameSpan.textContent.split(' - ')[1];
            playerNameSpan.style.borderRadius = "5px";
            playerNameSpan.style.padding = "0 5px";
            input.remove();
        });

        // Remove delete buttons and borders for empty squares
        const allSquares = [...playerSquares, ...substituteSquares];
        allSquares.forEach(square => {
            const deleteButton = square.querySelector('.delete-button');
            if (deleteButton) {
                deleteButton.style.display = 'none';
            }
            if (!square.innerHTML.trim()) {
                square.style.border = 'none';
            }
        });

        // Use html2canvas to capture the composition
        html2canvas(document.querySelector('.team-container')).then(canvas => {
            const link = document.createElement('a');
            link.download = 'composition.png';
            link.href = canvas.toDataURL('image/png');
            link.click();

            // Restore delete buttons and borders
            allSquares.forEach(square => {
                const deleteButton = square.querySelector('.delete-button');
                if (deleteButton) {
                    deleteButton.style.display = 'block';
                }
                if (!square.innerHTML.trim()) {
                    square.style.border = '3px dashed white';
                }
            });

            // Restore inputs with their original values
            for (const inputId in originalInputValues) {
                const { value, parent } = originalInputValues[inputId];
                const playerNameSpan = parent.querySelector('span'); // Find the span in the parent
                const playerName = playerNameSpan.textContent.split(' - ')[1];
                playerNameSpan.textContent = " - " + playerName;
                playerNameSpan.style = "";
                playerNameSpan.className = "substitute-name";
                const newInput = document.createElement('input');
                newInput.value = value;
                newInput.min = 1;
                newInput.max = 99;
                newInput.classList.add('substitute-number-input');
                parent.insertBefore(newInput, playerNameSpan);
            }
        });
    });

    function getPlayerNames() {
        const playerSquares = document.querySelectorAll('.player-square');
        const playerNames = [];

        playerSquares.forEach(square => {
            const playerNameElement = square.querySelector('span');
            if (playerNameElement) {
                const playerName = playerNameElement.textContent.split(' - ')[1];
                if (playerName) {
                    playerNames.push(playerName);
                }
            }
        });

        return playerNames;
    }
});