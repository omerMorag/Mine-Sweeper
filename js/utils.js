
'use strict'

function renderBoard(mat, selector) {

    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var cell =' ';
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

function innerHtmlForLIves(){
    var str='';
    for(var i=0;i<gGame.livesLeft;i++){
        str+=HEART;
    }
    return str;
}

