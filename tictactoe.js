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
  
  const addPlayer = (mark, isUserControlled) => {
    if (players.length > 1) {
      throw new Error('Maximum 2 players can be added');
    }
    const newPlayer = createPlayer(mark, isUserControlled);
    players.push(newPlayer);
  }

  const startGame = () => {
    turn = 0;
  }

  let turn = 2;
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

  return { addPlayer, addMark, startGame, checkWinner, getTurn }

})();



const displayController = (function () {

  const boardDisplay = document.querySelector('#gameboard');
  const spaces = document.querySelectorAll('.space');
  
  document.getElementById("game-options-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let player0Mark = document.getElementById("mark-0").value;
    let player1Mark = document.getElementById("mark-1").value;
    let player0UserControl = document.getElementById("user-control-0").value;
    let player1UserControl = document.getElementById("user-control-1").value;

    game.addPlayer(player0Mark, player0UserControl);
    game.addPlayer(player1Mark, player1UserControl);
    game.startGame();
  });

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

  return { addMark, updateMessage, displayPostgame }

})();