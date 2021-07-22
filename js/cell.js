'use strict'


function reavelCell(i,j,elCell){
    gBoard[i][j].isShown = true;
    if(gBoard[i][j].minesAroundCount!==0){
        elCell.innerHTML = gBoard[i][j].minesAroundCount;
        gGame.shownCount++;
    }
    elCell.classList.add('showen');
    renderScore();
}

function cellMarked(elCell, i, j) {
    var classes = elCell.All
    //update the model
    if(gBoard[i][j].isMarked)  {
        gBoard[i][j].isMarked = false;
        renderCell(elCell, '');
        gGame.markedCount--;
    } 
    else {
        gBoard[i][j].isMarked = true;
        //update the dom
        renderCell(elCell, FLAG);
        gGame.markedCount++;
    }
}


function expandShownLog(board, elCell, i, j) {

    //update the dom and modell
    reavelCell(i,j,elCell);
    
    //not zero-just upload show
    if (gBoard[i][j].minesAroundCount !== 0) return;

    for (var n = i - 1; n <= i + 1; n++) {
        if (n < 0 || n > gBoard.length - 1) continue
        for (var d = j - 1; d <= j + 1; d++) {
            if (d < 0 || d > gBoard[0].length - 1) continue
            if (i === n && j === d) continue
            if ((!gBoard[n][d].isShown && !gBoard[n][d].isMarked )) {
                var elCurrentCell = document.querySelector(`.cell${n}-${d}`);
                expandShownLog(board, elCurrentCell, n, d);
            }  
        }
    }
    return;
}