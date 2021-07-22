'use strict'

const MINE = '&#128163';
const FLAG = '&#128681';
const SAD = '&#128531';
const HAPPY = '&#128512';
const HEART = '&#10084';
const BROKEN_HEART = '&#128148';
const HINT = '&#128161';
const WINN = '&#129321';


//Statement of Global Variables
var gGame = {
    isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0
    , livesLeft: 3, IsItFirstClick: true, userChoseLevel: false
    , hints: 3, isHintOn: false, safeClick: 3
};
var gLevel = { SIZE: 4, MINES: 2, indexInRecordList: 0 };
var gBoard;
var gBestRecordList = [0, 0, 0];
var gtime1 = Date.now();
var gmytime;




//******************************************init function*************************************************** */
function initGameInModel() {
    //update model
    gGame.shownCount = 0;
    gGame.markedCount = 0;
    gGame.secsPassed = 0;
    gGame.livesLeft = 3;
    gGame.IsItFirstClick = true;
    gGame.hints = 3;
    gGame.isHintOn = false;
    gGame.safeClick = 3;
}

function initGameInDomBeforLevelChose() {
    var elData = document.querySelector('.data');
    var elLevel = document.querySelector('.level');
    var elBoard = document.querySelector('.board-container');
    var elDataDown = document.querySelector('.data-down');
    var elLives = document.querySelector('.lives span');
    elData.style.display = 'none';
    elLevel.style.display = 'inline';
    elBoard.style.display = 'none';
    elDataDown.style.display = 'none';
}

function initGameAfterLevelChose() {
    var elData = document.querySelector('.data');
    var elLevel = document.querySelector('.level');
    var elDataDown = document.querySelector('.data-down');
    var elBoard = document.querySelector('.board-container');
    elLevel.style.display = 'none';
    elData.style.display = 'inline';
    elDataDown.style.display = 'inline';
    renderHtmlForLIves();
    renderHints();
    renderSmiley(HAPPY);
    renderRecord();
    renderScore();
    renderSafeClick();
    elBoard.style.display = 'inline';
}

function initGame() {
    //update model && dom
    if (!gGame.userChoseLevel)
        initGameInModel();
    initGameInDomBeforLevelChose()

    if (gGame.userChoseLevel) {
        initGameAfterLevelChose();
        gBoard = buildBoard();
        renderBoard(gBoard, '.board-container');
    }
}



function gameOver(isWon) {
    stopTimer();
    gGame.isOn = false;
    gGame.userChoseLevel = false;
    var elDataDown = document.querySelector('.data-down');
    checkIfRecord();

    if (isWon) {
        renderSmiley(WINN);
    }

    else{
        renderSmiley(SAD);
    }
}


function userChoseLevel(level) {
    gGame.isOn = true;
    gGame.userChoseLevel = true;
    switch (level) {
        case 'Easy':
            gLevel.SIZE = 4;
            gLevel.MINES = 2;
            gLevel.indexInRecordList = 0;
            gGame.livesLeft = 2;
            break;

        case 'Medium':
            gLevel.SIZE = 8;
            gLevel.MINES = 12;
            gLevel.indexInRecordList = 1;
            break;
        case 'Hard':
            gLevel.SIZE = 12;
            gLevel.MINES = 30;
            gLevel.indexInRecordList = 2;
            break;
    }
    initGame();
}


function cellClicked(i, j, elMoushButtn, elCell) {

    if (!gGame.isOn)  return;
        var x = elMoushButtn.which;
        if (gGame.IsItFirstClick && x === 1) {
            startTimer();
            gGame.IsItFirstClick = false;
            setMinesOnBoard(gBoard, i, j);
            setMinesNegsCount(gBoard);

        }
        switch (elMoushButtn.which) {
            case 1:
                if (gGame.isHintOn) getHint(i, j, elCell);
                else if (!gBoard[i][j].isShown && !gBoard[i][j].isMarked) {
                    if (gBoard[i][j].isMine) {
                        boomClick(elCell, i, j);
                    }
                    else {
                        if (gBoard[i][j].minesAroundCount === 0) expandShownLog(gBoard, elCell, i, j);
                        else reavelCell(i, j, elCell);
                        if (checkGameOver()) gameOver(true);
                    }
                }
                break;
            case 2:
                break;
            case 3:
                cellMarked(elCell, i, j);
                if (checkGameOver()) gameOver(true);
                break;
        }
    
}


function boomClick(elCell, i, j) {
    gBoard[i][j].isShown = true;
    if (gGame.livesLeft > 1) {
        elCell.innerHTML = MINE;
        gGame.livesLeft--;
        renderHtmlForLIves();
    }
    else {
        gGame.livesLeft--;
        renderHtmlForLIves();
        elCell.style.backgroundColor = "red";
        //move on mine on boarf
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
        gameOver(false);
    }
}

function checkGameOver() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isMine) {
                if (!gBoard[i][j].isMarked && !gBoard[i][j].isShown) return false;

            }
            else
                if (!gBoard[i][j].isShown) return false;
        }
    }
    return true;
}



function smileyPress() {
        gGame.isOn =false;
        gameOver(false);
        gGame.isOn = true;
        initGame();
}


function checkIfRecord() {
    if (gBestRecordList[gLevel.indexInRecordList] < gGame.shownCount) {
        gBestRecordList[gLevel.indexInRecordList] = gGame.shownCount;
        renderRecord();
    }
}



