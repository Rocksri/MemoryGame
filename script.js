const cards = [
    'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F'
];

let shuffledCards = [];
let flippedCards = [];
let score = 0;

const gameBoard = document.getElementById('game_board');

function shuffleCards() {
    shuffledCards = [...cards];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }
}


function createCards() {
    gameBoard.innerHTML = '';

    shuffledCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = `
            <div class="front">${card}</div>
        `;
        cardElement.addEventListener('click', () => flipCard(cardElement));
        gameBoard.appendChild(cardElement);

        const frontElement = document.querySelector('.front');

        frontElement.addEventListener('mousedown', (event) => {
            event.preventDefault();
            event.stopPropagation();
        });

        frontElement.addEventListener('dblclick', (event) => {
            event.preventDefault();
            event.stopPropagation();
        });
    });
}

function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            setTimeout(() => {
                if (flippedCards[0].innerText === flippedCards[1].innerText) {
                    // Match
                    score++;
                    document.getElementById('score').textContent = score;
                    flippedCards[0].removeEventListener('click', flipCard);
                    flippedCards[1].removeEventListener('click', flipCard);
                } else {
                    // No match
                    flippedCards[0].classList.remove('flipped');
                    flippedCards[1].classList.remove('flipped');
                    score--;
                    document.getElementById('score').textContent = score;
                }
                flippedCards = [];
            }, 500);
        }
    }
}


function restartGame() {
    score = 0;
    document.getElementById('score').textContent = score;
    shuffleCards();
    createCards();
}

shuffleCards();
createCards();

document.getElementById('restart').addEventListener('click', restartGame);