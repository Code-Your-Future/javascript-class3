var player;
function players () {
   player = prompt("how many player do you want 1 or 2");
   if (player === "1") {
    //  window.alert("this one is not done yet");
    //  players();
    computerChoice(game());
   }else if (player === "2") {
     game();
   } else {
     console.error("wrong input");
     displayMessage(" wrong input restat the game please");
    /*  i need to disable this function
        playBtn();  */
   }
}
var xScore = 10;
var oScore = 10;
function reset () {
  var blocks = document.getElementsByTagName('td').length;
  for (var i = 1; i <= blocks; i++) {
    document.getElementById("block" + i).innerText = "";
  }
  players();
}
// start game with onload() event in the html file
function game() {
  document.turn = prompt("choose X or O for your enemy").toUpperCase();
  if (document.turn !== "X" && document.turn !== "O") {
    game();
  }
  document.win = null;              // check for winning to stop the game
  displayMessage(document.turn + " should start");

}

// this is for demonstration purpose
function displayMessage(message) {
  document.getElementById('message').innerText = message;
}
// handle onclik() listener in the html file
function playBtn (square) {
  /* the square parameter is a document object right now
  (in this case square is a <td> tag that we selected) */
  if (document.win !== null) {
    displayMessage(document.win + " won this game click restat the game to play again");
  }else if(square.innerText === ""){
    square.innerText = document.turn;
    switchTurns();
    if (player === "1"){computerChoice();}
  } else {
    displayMessage("This place is already occuoied, please try another block");
  }
}
// if X done switch to O
function switchTurns () {
  // if check winner is true
  if (checkWinner(document.turn)){
    displayMessage(document.turn + " has won");
    /* setting the value of document.turn variable to document.win
    to stop overriding the rest of empty blocks in the game
    (check function playBtn()) */
    document.win = document.turn;
    getScore(document.turn);
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
  // all winning possibility of rows
  if (checkLine(1,2,3, turn) || checkLine(4,5,6, turn) || checkLine(7,8,9, turn) ||
      checkLine(1,4,7, turn) || checkLine(2,5,8, turn) || checkLine(3,6,9, turn) ||
      checkLine(1,5,9, turn) || checkLine(3,5,7, turn)) {
    result = true;
  }
  return result;
}
// check for the rows
function checkLine (a, b, c, turn){
  var outCome = false;
  /* inside of this if statment I put
    if ((getBlock(a) && (getBlock(a) && (getBlock(a)) === turn) {}
  which is wrong */
  if (getBlock(a) === turn && getBlock(b) === turn && getBlock(c) === turn ) {
    outCome = true;
  }
  return outCome;
}
// get block posiiton from html file
function getBlock (blockNumber) {
  // returning the X or O inside <td> tag by its number :)
  return document.getElementById("block" + blockNumber).innerText;
}

function getScore(turn) {
  if (turn === "X") {
    document.getElementById(turn +"Score").innerText = turn + ":" + xScore.toString();
    xScore += 10;
  }else {
    document.getElementById(turn +"Score").innerText = turn + ":" + oScore.toString();
    oScore += 10;
  }

}
function computerChoice(userChoice) {
  // this while is missing possibility in the argument which is all blocks are full
    while (document.win === null) {
      var turn = Math.floor(Math.random() * 9) + 1;
      if (document.getElementById("block" + turn).innerText === ""){
        document.getElementById("block" + turn).innerText = document.turn;
        switchTurns();
        // I donn't know how it worked but it works ----------------------------------------------------------------
        // I tried different parameter for playBtn() and I'm not sure how it's working right now
        playBtn ();
      }
    }
}
