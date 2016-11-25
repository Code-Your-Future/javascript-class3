var player;
var xScore = 10;
var oScore = 10;


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

function setBlock (blockNumber) {
  document.getElementById("block" + blockNumber).innerText = document.turn;
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

      if (getBlock(turn) === ""){
          if (aI(1,3) || aI(4,7) || aI(5,9)){
             if(getBlock(1) === ""){setBlock(1);}else{ setBlock(turn);}
        } else if(aI(1,3) || aI(5,8)){
           if(getBlock(2) === ""){setBlock(2);}else{ setBlock(turn);}
        } else if(aI(1,2) || aI(6,9) || aI(5,7)){
            if(getBlock(3) === ""){setBlock(3);}else{ setBlock(turn);}
        } else if(aI(5,6) || aI(1,7)){
            if(getBlock(4) === ""){setBlock(4);}else{ setBlock(turn);}
         }else if(aI(4,6) || aI(2,8) || aI(1,9) || aI (3,7)){
            if(getBlock(5) === ""){setBlock(5);}else{ setBlock(turn);}
         } else if(aI(3,9) || aI(4,5)){
            if(getBlock(6) === ""){setBlock(6);}else{setBlock(turn);}
         } else if(aI(1,4) || aI(8,9) || aI(5,3)){
            if(getBlock(7) === ""){setBlock(7);}else{setBlock(turn);}
         } else if(aI(2,5) || aI(7,9)){
             if(getBlock(8) === ""){setBlock(8);}else{setBlock(turn);}
         } else if(aI(7,8) || aI(1,5) || aI(3,6)){
             if(getBlock(9) === ""){setBlock(9);}else{setBlock(turn);}
         } else {
           setBlock(turn);
         }
        switchTurns();
        // I donn't know how it worked but it works ----------------------------------------------------------------
        // I tried different parameter for playBtn() and I'm not sure how it's working right now
        playBtn ();
      }
    }
}

function aI (block1, block2) {
  if(getBlock(block1) === document.turn && getBlock(block2) === document.turn) {
    return true
  }
  return false;
}
