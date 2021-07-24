'use strict'


function safeClick() {
    if (gGame.safeClick > 0 && gGame.isOn) {
        gGame.safeClick--;
        renderSafeClick();
        var arr = []
        for (var i = 0; i < gBoard.length; i++) {
            for (var j = 0; j < gBoard[0].length; j++) {
                if (!gBoard[i][j].isMine && !gBoard[i][j].isMarked && !gBoard[i][j].isShown) {
                    arr.push({ row: i, col: j });
                }
            }
        }
        var index = getRandomInt(arr.length);
        var elCurrentCell = document.querySelector(`.cell${arr[index].row}-${arr[index].col}`);
        elCurrentCell.classList.add('safe');
        setTimeout(() => {
            elCurrentCell.classList.remove('safe');
        }, 100);
    }
}

function getHint(i, j, elCell) {
    for (var n = i - 1; n <= i + 1; n++) {
        if (n < 0 || n > gBoard.length - 1) continue
        for (var d = j - 1; d <= j + 1; d++) {
            if (d < 0 || d > gBoard[0].length - 1) continue
            if ((!gBoard[n][d].isShown)) {
                var elCurrentCell = document.querySelector(`.cell${n}-${d}`);
                if (gBoard[n][d].isMine) renderCell(elCurrentCell, MINE);
                if (gBoard[n][d].minesAroundCount > 0) renderCell(elCurrentCell, gBoard[n][d].minesAroundCount);
                elCurrentCell.classList.add('showen');
            }
        }
    }
    setTimeout(() => {
        for (var n = i - 1; n <= i + 1; n++) {
            if (n < 0 || n > gBoard.length - 1) continue
            for (var d = j - 1; d <= j + 1; d++) {
                if (d < 0 || d > gBoard[0].length - 1) continue
                if ((!gBoard[n][d].isShown)) {
                    var elCurrentCell = document.querySelector(`.cell${n}-${d}`);
                    elCurrentCell.classList.remove('showen');
                    renderCell(elCurrentCell, ' ');

                }
            }
        }
    }, 200);
    gGame.isHintOn = false;
}


function hintPress() {
    if(!gGame.isOn) return
    gGame.hints--;
    renderHints();
    gGame.isHintOn = true;
}