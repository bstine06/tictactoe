console.log("tic tac toe");

const gameboard = (function () {

  let board = [
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
    if (board[yPos][xPos] !== null) {
      return -1; //invalid move
    }
    board[yPos][xPos] = String(mark);
    return 1; //valid move
  }

  const getBoard = () => {
    console.table(board);
    return board;
  }

  const clearBoard = () => {
    board = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
  }

  function checkWinner(board) {
    // Check rows and columns
    for (let i = 0; i < 3; i++) {
        if (board[i][0] !== null && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            return board[i][0]; // Found a winner in a row
        }
        if (board[0][i] !== null && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
            return board[0][i]; // Found a winner in a column
        }
    }

    // Check diagonals
    if (board[0][0] !== null && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        return board[0][0]; // Found a winner in the main diagonal
    }
    if (board[0][2] !== null && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        return board[0][2]; // Found a winner in the other diagonal
    }

    // No winner found
    return null;
}

  return { addMark, getBoard, clearBoard, checkWinner }//return all exposed functions & properties
})();