const state = {
    secret: generatePasscode(),
    grid: Array(6)
        .fill()
        .map(() => Array(5).fill('')),
    currentRow: 0,
    currentCol: 0,
};

function generatePasscode() {
    const randomNumbers = [];

    for (let i = 0; i < 5; i++) {
        const randomNum = Math.floor(Math.random() * 10);
        randomNumbers.push(randomNum);
    }

    return randomNumbers;
}

function updateGrid() {
    for (let i = 0; i < state.grid.length; i++) {
        for (let j = 0; j < state.grid[i].length; j++) {
            const box = document.getElementById(`box${i}${j}`);
            box.textContent = state.grid[i][j];
        }
    }
}

function drawBox(container, row, col, letter = '') {
    const box = document.createElement('div');
    box.className = 'box';
    box.id = `box${row}${col}`;
    box.textContent = letter;

    container.appendChild(box);
    return box;

}

function drawGrid(container) {
    const grid = document.createElement('div');
    grid.className = 'grid';

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            drawBox(grid, i, j);
        }
    }

    container.appendChild(grid);
}

function registerKeyboardEvent() {
    document.body.onkeydown = (e) => {
        const key = e.key;

        if (key === 'Enter') {
            if (state.currentCol == 5) {
                const passcode = getCurrentPasscode();
                
                if (isPasscodeValid(passcode)) {
                    revealPasscode(passcode);
                    state.currentRow++;
                    state.currentCol = 0;
                } else {
                    const error = document.getElementById("error");
                    error.classList.add('error-popup');
    
                    setTimeout(() => {
                        error.classList.remove('error-popup');
                    }, 3000);
                }
            } else {
                const error = document.getElementById("error");
                error.classList.add('error-popup');
                const row = state.currentRow;

                for (let i = 0; i < 5; i++) {
                    const box = document.getElementById(`box${row}${i}`);

                    setTimeout(() => {
                        box.classList.add('wrong');
                    }, 100);

                    setTimeout(() => {
                        box.classList.remove('wrong');
                    }, 2700);

                }

                setTimeout(() => {
                    error.classList.remove('error-popup');
                }, 3000);
            }
        } 

        if (key === 'Backspace') {
            removeNumber();
        }

        if (isNumber(key)) {
            addNumber(key);
        }

        updateGrid();
    }
}

function isNumber(key) {
    return key.length === 1 && key.match(/[0-9]/i);
}

function getCurrentPasscode() {
    return state.grid[state.currentRow].join('');
}

function isPasscodeValid(passcode) {
    return passcode.length === 5 && [...passcode].every(char => !isNaN(char) && char.trim() !== '');
}

function revealPasscode(guess) {
    const row = state.currentRow;

    for (let i = 0; i < 5; i++) {
        const box = document.getElementById(`box${row}${i}`);
        const number = state.grid[row][i];

        if (number == state.secret[i]) {
            box.classList.add('right');
        } else if (state.secret.includes(parseInt(number))) {
            box.classList.add('empty');
        } else {
            box.classList.add('wrong');
        }
    }

    const isWinner = state.secret.join('') === guess;
    const isGameOver = state.currentRow === 5;

    if (isWinner) {
        const popup = document.getElementById("congratulations");
        popup.classList.add("open-popup");
        document.getElementById("overlay").classList.add("show");
    } else if (isGameOver) {
        const popupL = document.getElementById("loser");
        popupL.classList.add("open-popup");
        document.getElementById("overlay").classList.add("show");
    }
}

function displayPasscode(passcode) {
    const passcodeBox = document.getElementById("correctcode");
    const passcodeBox2 = document.getElementById("correctcode2");
    passcodeBox.textContent = `${passcode.join('')}`;
    passcodeBox2.textContent = `${passcode.join('')}`;
}

const code = state.secret;
displayPasscode(code);

function addNumber(number) {
    if (state.currentCol === 5) return;
    state.grid[state.currentRow][state.currentCol] = number;
    state.currentCol++;
}

function removeNumber() {
    if (state.currentCol === 0) return;
    state.grid[state.currentRow][state.currentCol - 1] = '';
    state.currentCol--;
} 

function startup() {
    const game = document.getElementById('game');
    drawGrid(game);

    registerKeyboardEvent();

    console.log(state.secret);
}

startup();