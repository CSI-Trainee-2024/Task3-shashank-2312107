
        
const grid = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score');
const restartButton = document.getElementById('restart');
let count = 0; 
let gameOver = false; 
let box = [];


function initGame() {
    grid.innerHTML = ''; 
    count = 0; 
    gameOver = false; 
    scoreDisplay.textContent = `Safe Clicks: ${count}`; 
    box = [];

    for (let i = 0; i < 36; i++) {
        const cell = document.createElement('div');
        cell.classList.add('box');
        cell.addEventListener('click', checkBomb);
        grid.appendChild(cell);
        box.push(cell); 
    }
    for (let i = 0; i < 16; i++) {
        let randomIndex = Math.floor(Math.random() * 36);
        while (box[randomIndex].value === 'bomb') {
            randomIndex = Math.floor(Math.random() * 36);
        }
        box[randomIndex].innerHTML = '<span id="bomb" class="bomb">💣</span>';
        box[randomIndex].value = 'bomb';
    }
}
initGame();
function checkBomb() {
    if (gameOver) return;
    
    if (this.value === "bomb") {
        gameOver = true; 
        console.log('Game Over');
        const bombs = document.querySelectorAll('#bomb');
        for (let i = 0; i < bombs.length; i++) {
            bombs[i].style.opacity = 1;
            setTimeout(() => {
                bombs[i].classList.add('rotate');
                setTimeout(() => {
                    bombs[i].classList.add('active');
                }, 1600);
            }, 200);
        }
        for (let i = 0; i < box.length; i++) {
            if (box[i].value === 'bomb') {
                box[i].style.backgroundColor = "rgb(243, 29, 29)";
            }
        }
        setTimeout(() => {
            alert("You clicked a bomb! Game Over!");
        }, 400);
    } else {
        this.style.backgroundColor = 'rgb(214, 214, 214)';
        this.innerHTML = "💎";
        this.value = 'safe';
        count++;
        scoreDisplay.textContent = `Safe Clicks: ${count}`; 
        this.removeEventListener('click', checkBomb);
        checkWinner();
    }
}

function checkWinner() {
    if (count === (box.length - 16)) {
        gameOver = true; 
        setTimeout(() => {
            alert("You win!");
        }, 300); 
    }
}
restartButton.addEventListener('click', initGame);