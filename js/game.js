'use strict'

const MINE = '&#128163';
const FLAG = '&#128681';
const SAD = '&#128531';
const HAPPY = '&#128512';
const HEART = '&#128151';

//Statement of Global Variables
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0, livesLeft: 3, IsItFirstClick: true,userChoseLevel:false };
var gLevel = { SIZE: 4, MINES: 2 };
var gBoard;


function initGame() {
    //update model
    gGame.shownCount = 0;
    gGame.markedCount = 0;
    gGame.secsPassed = 0;
    gGame.livesLeft = 3;
    gGame.IsItFirstClick = true;
    
    //update dom
    var elLevel = document.querySelector('.level');
    elLevel.style.disply='inline';

    var elData = document.querySelector('.data');
    var elSmiley = document.querySelector('.smiley span');
    elSmiley.innerHTML=HAPPY;
    var elLives = document.querySelector('.lives span');

   if(gGame.userChoseLevel){
    elLevel.style.display='none';
    elData.style.display='inline';
    gBoard = buildBoard();
    renderBoard(gBoard, '.board-container');
    elLives.innerHTML = innerHtmlForLIves();
    elSmiley.innerHTML = HAPPY;
   }
}


function gameOver() {
    gGame.isOn = false;
    var elSmiley = document.querySelector('.smiley span');
    elSmiley.innerHTML = SAD;
    gGame.userChoseLevel=false;

}

//move on the board-and update every cell neNeighbor
function setMinesNegsCount(board) {
    var SIZE = gLevel.SIZE;
    for (var i = 0; i < SIZE; i++) {
        for (var j = 0; j < SIZE; j++) {
            if (!board[i][j].isMine)
                board[i][j].minesAroundCount = getMinesNeighbor(i, j);
        }
    }
}

function getMinesNeighbor(i, j) {
    var mines = 0;
    for (var n = i - 1; n <= i + 1; n++) {
        if (n < 0 || n > gBoard.length - 1) continue
        for (var d = j - 1; d <= j + 1; d++) {
            if (d < 0 || d > gBoard[0].length - 1) continue
            if (i === n && j === d) continue
            if (gBoard[n][d].isMine) mines++;
        }
    }
    return mines;
}

function setMinesOnBoard(elCell, row, col) {
    var SIZE = gLevel.SIZE;
    var countMine = gLevel.MINES;
    for (var i = 0; i < SIZE; i++) {
        for (var j = 0; j < SIZE; j++) {
            if (row == i && col == j) continue;
            var x = getRandomInt(2);
            console.log(x);
            if (x && countMine > 0) {
                gBoard[i][j].isMine = true;
                countMine--;
            }
        }
    }
}



function userChoseLevel(level) {
    gGame.isOn = true;
    gGame.userChoseLevel=true;
    switch (level) {
        case 'Easy':
            gLevel.SIZE = 4;
            gLevel.MINES = 2;
            break;

        case 'Medium':
            gLevel.SIZE = 8;
            gLevel.MINES = 12;
            break;
        case 'Hard':
            gLevel.SIZE = 12;
            gLevel.MINES = 30;
            break;
    }
    initGame();
}

function cellMarked(elCell, i, j) {
    gGame.markedCount++;
    var classes = elCell.All
    //update the model
    gBoard[i][j].isMarked = true;
    //update the dom
    renderCell(elCell, FLAG);
}

function cellClicked(i, j, elMoushButtn, elCell) {
    var x = elMoushButtn.which;
    if (gGame.IsItFirstClick && x === 1) {
        gGame.IsItFirstClick = false;
        setMinesOnBoard(gBoard,i,j);
        setMinesNegsCount(gBoard);

    }
    switch (elMoushButtn.which) {
        case 1:
            if (gBoard[i][j].isMine) boomClick(elCell, i, j);
            else if (gBoard[i][j].minesAroundCount === 0) expandShown(gBoard, elCell, i, j);
            else {
                gBoard[i][j].isShown = true;
                elCell.innerHTML = gBoard[i][j].minesAroundCount;
                gGame.shownCount++;
            }
            break;
        case 2:
            break;
        case 3:
            cellMarked(elCell, i, j);
            break;
    }
}


function boomClick(elCell, i, j) {
    var elLives = document.querySelector('.lives span');
    if (gGame.livesLeft > 1) {
        gBoard[i][j].isShown = true;
        elCell.innerHTML = MINE;
        gGame.livesLeft--;
        elLives.innerHTML = innerHtmlForLIves();
    }
    else {
        gGame.livesLeft--;
        elLives.innerHTML = innerHtmlForLIves();
        elCell.style.backgroundColor = "red";
        for (var i = 0; i < gBoard.length; i++) {
            for (var j = 0; j < gBoard[0].length; j++) {
                if (gBoard[i][j].isMine) {
                    //updateThe model
                    gBoard[i][j].isShown = true;
                    var elCurrentCell = document.querySelector(`.cell${i}-${j}`);
                    //updateThe DOM
                    elCurrentCell.innerHTML = MINE;
                }
            }
        }
        gameOver();
    }
}

function checkGameOver() {
    var gameIsOver = true;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isMine) {
                if (!gBoard[i][j].isMarked) gameIsOver = false;;
            }
            else {
                if (!gBoard[i][j].isShown) gameIsOver = false;;
            }
        }
    }
    return gameIsOver;
}


function expandShown(board, elCell, i, j) {
    debugger;
    //updateThe model
    gBoard[i][j].isShown = true;
    elCell.innerHTML = gBoard[i][j].minesAroundCount;
    // elCell.style.background-color=gold
    gGame.shownCount++;
    if (gBoard[i][j].minesAroundCount !== 0) return;

    for (var n = i - 1; n <= i + 1; n++) {
        if (n < 0 || n > gBoard.length - 1) continue
        for (var d = j - 1; d <= j + 1; d++) {
            if (d < 0 || d > gBoard[0].length - 1) continue
            if (i === n && j === d) continue
            if (!gBoard[n][d].isMine) {
                var elCurrentCell = document.querySelector(`.cell${n}-${d}`);
                expandShown(board, elCurrentCell, n, d);
            }
            else
                return
        }
    }
}

function smileyPress() {
    gameOver();
    gGame.isOn === true;
    setTimeout(initGame, 200);
}