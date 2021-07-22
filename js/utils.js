
'use strict'

function renderBoard(mat, selector) {

    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var cell = ' ';
            var className = `cell cell${i}-${j}`;
            strHTML += `<td onmousedown="cellClicked(${i},${j},event,this)" class=" ${className}"> ${cell} </td>`;
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}

function renderCell(elCell, value) {
    elCell.innerHTML = value;
}



function buildBoard() {
    var board = [];
    var SIZE = gLevel.SIZE;
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            var cell = { minesAroundCount: 0, isShown: false, isMine: false, isMarked: false };
            board[i][j] = cell;
        }
    }
    return board;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function renderHtmlForLIves() {
    var str = '';
    var elLives = document.querySelector('.lives span');
    if (gGame.livesLeft === 0) str += BROKEN_HEART;
    else {
        for (var i = 0; i < gGame.livesLeft; i++)  str += HEART;
    }
    elLives.innerHTML = str;
}

function renderHints() {
    var str = '';
    var elHints = document.querySelector('.hints');
    for (var i = 0; i < gGame.hints; i++)  str += HINT;

    elHints.innerHTML = str;
}

function renderScore() {
    var elScore = document.querySelector('.score span');
    elScore.innerHTML = `${gGame.shownCount}`;
}


function renderRecord() {
    var elRecord = document.querySelector('.record span');
    var value = gBestRecordList[gLevel.indexInRecordList];
    elRecord.innerHTML = `${value}`;
}

function renderSmiley(value) {
    var elSmiley = document.querySelector('.smiley span');
    elSmiley.innerHTML = value;
}

function renderSafeClick() {
    var elSafeClick = document.querySelector('.safe-click span');
    elSafeClick.innerHTML = `${gGame.safeClick} clicks available`;

}

function startTimer() {
    gtime1 = Date.now();
    gmytime = setInterval(timeCycle, 1);
}

function timeCycle() {
    var time2 = Date.now();
    var msTimeDiff = time2 - gtime1;
    var timeDiffStr = new Date(msTimeDiff).toISOString().slice(17, -1);
    document.querySelector('.timer span').innerHTML = timeDiffStr;
}
function stopTimer() {
    clearInterval(gmytime);
    var finishTime = document.querySelector('.timer span').innerHTML;
}
