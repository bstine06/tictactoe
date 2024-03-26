console.log("tic tac toe");

const gameboard = (function () {

  let boardArray = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  const addMark = (mark, xPos, yPos) => {
    if (xPos > 2 || xPos < 0 || yPos > 2 || yPos < 0) {
      throw new Error('Mark coordinates must be between 0 and 2');
    }
    if (!(mark === 'o' || mark === 'x')) {
      throw new Error(`Mark must be 'o' or 'x'.`);
    }
    if (boardArray[yPos][xPos] !== null) {
      return -1; //invalid move
    }
    boardArray[yPos][xPos] = String(mark);
    return 1; //valid move
  }

  const showBoard = () => {
    console.table(boardArray);
  }

  const clearBoard = () => {
    boardArray = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
  }

  return { addMark, showBoard, clearBoard }//return all exposed functions & properties
})();