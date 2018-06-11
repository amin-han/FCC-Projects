var score = {
    player: 0,
    draws: 0,
    computer: 0
  },
  winLine,
  maxVal = 10,
  minVal = -10,
  allowMoves = true;

function evalCollection(a, b, c) {
  if (a && b && c) {
    if (a === b && b === c)
      return a * maxVal;
    else return null;
  }
}

function isBoardFull(board) {
  if (board.every(function(element) {
      return element;
    })) return true;
  else return false;

}

function getEmpty(state) {
  var results = [];
  state.forEach(function(el, index) {
    if (!el)
      results.push(index);
  });
  return results;
}

function evalBoard(state) {
  return evalCollection(state[0], state[1], state[2]) ||
    evalCollection(state[3], state[4], state[5]) ||
    evalCollection(state[6], state[7], state[8]) ||
    evalCollection(state[0], state[3], state[6]) ||
    evalCollection(state[1], state[4], state[7]) ||
    evalCollection(state[2], state[5], state[8]) ||
    evalCollection(state[0], state[4], state[8]) ||
    evalCollection(state[2], state[4], state[6]);
}

function Move(position, player, state) {
  this.position = position
  this.player = player;
  this.state = [];
  this.children = [];
  state.forEach(function(el) {
    this.state.push(el);
  }, this);
  this.state[position] = player;
}

function generateScores(move) {

  if (evalBoard(move.state)) return evalBoard(move.state);
  if (isBoardFull(move.state)) return 0;
  else {
    var empty = getEmpty(move.state);
    var scores = [];

    empty.forEach(function(position, index) {
      move.children[index] = new Move(position, move.player * -1, move.state);
    });
    for (var i = 0; i < move.children.length; i++) {
      scores.push(generateScores(move.children[i]));
    }

    if (move.player == -1) return Math.max.apply(null, scores);
    if (move.player == 1) return Math.min.apply(null, scores);
  }

}

function getBestMove(state, player) {
  var empty = getEmpty(state);
  var scores = [];
  var returnPos;
  var defaultMove = new Move(returnPos, player, state)
  var children = [];
  var min = 1;
  var max = -1;
  var maxindex = 0;
  var minindex = 0;
  empty.forEach(function(position, index) {
    children[index] = new Move(position, player, state);

    scores[index] = generateScores(children[index]);
    if (scores[index] >= max) {
      maxindex = index;
      max = scores[index];
    }
    if (scores[index] <= min) {
      minindex = index;
      min = scores[index];
    }
  });
  if (player == 1) return children[maxindex].position;
  else return children[minindex].position;
}

function generateStartPosition() {
  return 2 * Math.floor(5 * Math.random());
}

function resetBoard() {
  if (winLine) winLine.style.display = "none";
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var current;
  for (var i = 0; i < 9; i++) {
    current = document.getElementById(i);
    current.innerHTML = "";
  }
}

function isGameOver() {
  var full = isBoardFull(board);
  var winner = evalBoard(board);
  if (winner) {
    console.log("winner is: " + winner + " and humanplayer is: " + humanPlayer);
    allowMoves = false;
    winLine = drawWin();
    if (winner == (humanPlayer * maxVal)) {
      changeMessage("You win! Play again?");
      score.player++;
      updateScore(winner);
    } else if (winner == (humanPlayer * minVal)) {
      changeMessage("The computer wins! Play again?");
      score.computer++;
      updateScore(winner);

    }

  }
  if (full && !winner) {
    allowMoves = false;
    score.draws++;
    updateScore(winner);
    changeMessage("It's a draw. Play again?");
  }

}

function changeMessage(message) {
  var target = document.getElementById("display-message");
  target.textContent = message;
}

function updateScore(boardScore) {
  var target;
  var displayScore;
  if (boardScore == humanPlayer * 10) {
    target = document.getElementById("your-score");
    displayScore = score.player;
  } else if (boardScore == humanPlayer * -10) {
    target = document.getElementById("computer-score");
    displayScore = score.computer;
  } else {
    target = document.getElementById("draws");
    displayScore = score.draws;
  }
  target.textContent = displayScore.toString();

}

function setUpListeners() {
  boardFE.addEventListener("click", function(event) {
    var selected = event.target.id;
    if (selected && board[selected] === 0 && allowMoves) {
      board[selected] = humanPlayer;
      placeChoice(humanPlayer, selected);

      isGameOver();
      if (allowMoves) {
        var response = getBestMove(board, humanPlayer * -1);
        placeChoice(humanPlayer * -1, response);
        board[response] = humanPlayer * -1;
        isGameOver();
      }
    }
  });
}

function placeChoice(player, position) {
  var targetCell = document.getElementById(position.toString());
  if (player == 1) {
    targetCell.innerHTML = '<p class="x-color">X</p>';
    board[position] = 1;
  } else if (player == -1) {
    targetCell.innerHTML = '<p class="o-color">O<p/>';
    board[position] == -1;
  }
}

function getWinLine() {
  if (board[0] && board[0] === board[1] && board[1] === board[2])
    return 1;
  if (board[3] && board[3] === board[4] && board[4] === board[5])
    return 2;
  if (board[6] && board[6] === board[7] && board[7] === board[8])
    return 3;
  return null;
}

function getWinCol() {
  if (board[0] && board[0] === board[3] && board[3] === board[6])
    return 1;
  if (board[1] && board[1] === board[4] && board[4] === board[7])
    return 2;
  if (board[2] && board[2] === board[5] && board[5] === board[8])
    return 3;
  return null;
}

function getWinDiag() {
  if (board[0] && board[0] === board[4] && board[4] === board[8])
    return 1;
  if (board[2] && board[2] === board[4] && board[4] === board[6])
    return 2;
  return null;
}

function drawWin() {
  var line = getWinLine();
  var target;
  if (line) target = document.getElementById("line-" + line);
  var col = getWinCol();
  if (col) target = document.getElementById("col-" + col);
  var diag = getWinDiag();
  if (diag) target = document.getElementById("diag-" + diag);
  target.style.display = "block";
  return target;
}

var boardFE = document.getElementsByClassName("board")[0];

var compStart = document.getElementById("computer-start");
compStart.addEventListener("click", function() {
  resetBoard();
  allowMoves = true;
  humanPlayer = -1;
  setUpListeners();
  var loc = generateStartPosition();
  placeChoice(humanPlayer * -1, loc);
  board[loc] = humanPlayer * -1;
  changeMessage("Game in progress...");
});

var playerStart = document.getElementById("player-start");
playerStart.addEventListener("click", function() {
  resetBoard();
  allowMoves = true;
  humanPlayer = 1;
  changeMessage("Game in progress...");
  setUpListeners();
});
