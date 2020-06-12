const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const board = document.getElementById("board");
const cellElement = document.querySelectorAll('[data-cell]');
const WINNING_COMBINATION = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

const winningMessageElement = document.getElementById("winningMessage");
const restartButton=document.getElementById("resturtButton");
const winningMessageTextElement = document.querySelector('[data-wining-message-text]')
let circleTurn

startgame();

restartButton.addEventListener('click' , startgame);

function startgame() {
    circleTurn = false;
    cellElement.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click' , handelClick)
        cell.addEventListener('click', handelClick, { once: true })
    })
    setBoardHoverclass();
    winningMessageElement.classList.remove('show');

}


function handelClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placemark(cell, currentClass);
    if (checkWin(currentClass)) {
        // console.log('winner');
        endGame(false);
    }
    else if (isDraw()) {
        endGame(true);
    }
    else {
        swapTurn();
        setBoardHoverclass()
    }

}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "Draw!!!"

    }
    else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!!!`;

    }
    winningMessageElement.classList.add('show');
}

function isDraw(){
    return [...cellElement].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
        
    })
}

function placemark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurn() {
    circleTurn = !circleTurn;
}

function setBoardHoverclass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    }
    else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATION.some(combination => {
        return combination.every(index => {
            return cellElement[index].classList.contains(currentClass);
        })
    })
}