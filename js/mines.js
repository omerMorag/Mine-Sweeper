'use strict'


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
            var x = getRandomInt(10);
            if (x < 3 && countMine > 0) {
                gBoard[i][j].isMine = true;
                countMine--;
            }
        }
    }
}

