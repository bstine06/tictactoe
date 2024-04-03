console.log("tic tac toe");

const gameboard = (function () {

  let board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  const getBoard = () => {
    return board;
  }

  const clearBoard = () => {
    board = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
  }

  const addMark = (mark, yPos, xPos) => {
    console.log(`adding mark ${mark} to ${yPos}, ${xPos}`)
    board[yPos][xPos] = mark;
  }

  return { addMark, getBoard, clearBoard }//return all exposed functions & properties
})();



function createPlayer (mark, isUserControlled) {
  return { mark, isUserControlled };
}



const game = (function () {

  const players = [];
  players.push(createPlayer('x', true));
  players.push(createPlayer('o', true));

  let turn = 0;
  const getTurn = () => {return turn};

  let round = 0;

  const addMark = (yPos, xPos) => {
    if (xPos > 2 || xPos < 0 || yPos > 2 || yPos < 0) {
      throw new Error('Mark coordinates must be between 0 and 2');
    }
    if (gameboard.getBoard()[yPos][xPos] !== null) {
      return -1; //invalid move
    }
    gameboard.addMark(players[turn].mark,yPos,xPos)
    displayController.addMark(players[turn].mark, yPos, xPos);
    updateGameStateAfterTurn();
  }

  function updateGameStateAfterTurn() {
    round++;
    if (checkWinner(gameboard.getBoard())) {
      turn = 2;
      displayController.displayPostgame(checkWinner(gameboard.getBoard()));
      return
    }
    if (round > 8) {
      turn = 2;
      displayController.displayPostgame("tie");
      return
    }
    if (turn === 0) {
      turn = 1;
    } else if (turn === 1) {
      turn = 0;
    }
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

  return { addMark, checkWinner, getTurn }

})();



const displayController = (function () {

  const boardDisplay = document.querySelector('#gameboard');
  const spaces = document.querySelectorAll('.space');

  spaces.forEach((space) => {
    space.addEventListener('click', (e)=> {
      if (game.getTurn() < 2) {
        const coords = e.target.id.split("-").splice(1);
        game.addMark(coords[0], coords[1]);
      }
    })
  });

  const addMark = (mark, yPos, xPos) => {
    let targetId = `#space-${yPos}-${xPos}`;
    const targetNode = document.querySelector(targetId);
    targetNode.textContent = mark;
    targetNode.classList.remove('untaken');
  }

  const displayPostgame = (mark) => {
    spaces.forEach((space) => {
      space.classList.remove('untaken')
    });
    console.log(mark);
  }

  return { addMark, displayPostgame }

})();