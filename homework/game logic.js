
function game() {
  document.turn = 'X';
  document.win = null;
  var turns = Math.random();
  if (turns < 0.5) {
    document.turn = "O"
  }
  displayMessage(document.turn + " should start");
}

function displayMessage(message) {
  document.getElementById('message').innerText = message;
}

function playBtn (square) {
  if (document.win !== null) {
    displayMessage(document.win + " won this game click restat the game to play again");
  }else if(square.innerText === ""){
    square.innerText = document.turn;
    switchTurns();
  } else {
    displayMessage("This place is already occuoied, please try another block");
  }
}

function switchTurns () {
  if (checkWinner(document.turn)){
    displayMessage(document.turn + " has won");
    document.win = document.turn;
  }else if (document.turn === "X") {
    document.turn = "O";
    displayMessage("It's " + document.turn + "'s turn");
  } else {
    document.turn = "X";
    displayMessage("It's " + document.turn + "'s turn");
  }
}

function checkWinner (turn) {
  var result = false;
  if (checkLine(1,2,3, turn) || checkLine(4,5,6, turn) || checkLine(7,8,9, turn) ||
      checkLine(1,4,7, turn) || checkLine(2,5,8, turn) || checkLine(3,6,9, turn) ||
      checkLine(1,5,9, turn) || checkLine(3,5,7, turn)) {
    result = true;
  }
  return result;
}

function checkLine (a, b, c, turn){
  var outCome = false;
  if (getBlock(a) === turn && getBlock(b) === turn && getBlock(c) === turn ) {
    outCome = true;
  }
  return outCome;
}

function getBlock (blockNumber) {
  return document.getElementById("block" + blockNumber).innerText;
}
