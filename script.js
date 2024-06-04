const batman = document.getElementById('batman');
const alphabetContainer = document.getElementById('alphabet-container');
const scoreElement = document.getElementById('score');
const winMessage = document.getElementById('win-message');

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
let collectedLetters = 0;
const totalLettersToCollect = 20;

// Create alphabet letters and place them randomly in the game container
function createAlphabet() {
    for (let i = 0; i < totalLettersToCollect; i++) {
        const letter = document.createElement('div');
        letter.classList.add('alphabet');
        letter.textContent = alphabet[i % 26]; // loop through alphabet
        letter.style.top = `${Math.random() * 570}px`; // 600px (container height) - 30px (letter height)
        letter.style.left = `${Math.random() * 770}px`; // 800px (container width) - 30px (letter width)
        alphabetContainer.appendChild(letter);
    }
}

// Move Batman with arrow keys
document.addEventListener('keydown', (event) => {
    const rect = batman.getBoundingClientRect();
    switch (event.key) {
        case 'ArrowUp':
            if (rect.top > 0) batman.style.top = `${rect.top - 10}px`;
            break;
        case 'ArrowDown':
            if (rect.top < 550) batman.style.top = `${rect.top + 10}px`;
            break;
        case 'ArrowLeft':
            if (rect.left > 0) batman.style.left = `${rect.left - 10}px`;
            break;
        case 'ArrowRight':
            if (rect.left < 750) batman.style.left = `${rect.left + 10}px`;
            break;
    }
    checkCollision();
});

// Check collision with letters
function checkCollision() {
    const batmanRect = batman.getBoundingClientRect();
    const letters = document.querySelectorAll('.alphabet');
    letters.forEach(letter => {
        const letterRect = letter.getBoundingClientRect();
        if (
            batmanRect.left < letterRect.left + letterRect.width &&
            batmanRect.left + batmanRect.width > letterRect.left &&
            batmanRect.top < letterRect.top + letterRect.height &&
            batmanRect.top + batmanRect.height > letterRect.top
        ) {
            alphabetContainer.removeChild(letter);
            collectedLetters++;
            scoreElement.textContent = collectedLetters;
            if (collectedLetters === totalLettersToCollect) {
                winMessage.style.display = 'block';
            }
        }
    });
}

// Initialize game
function init() {
    batman.style.top = '0px';
    batman.style.left = '0px';
    createAlphabet();
}

init();
