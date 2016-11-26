/**
    *   Tic tac toe game code fragment, 
    *   written by Sentayhu, 2016
*/
var flag=false;
/**
    *   Define a play board using two dimenssional array, and assign
    *   null value to each element of the array.
    *   @Type {playBoard<Array>}
*/ 
var playBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]
/** *   initialize initial player move to false state 
    *   @Type {playerMov<<boolean>}
*/
var playerMove = false;

/** *   No one movie at the initial state 
    *   @param {if <boolean>} arg
*/
if (playerMove) {
    agentMove();
}
/**
    *   Add on click event listener to all buttons during the page loads
    *   @param {addEventListener<load, anonymous function,boolean>} arg
*/

window.addEventListener('load',function(){
/**
    *   Retrun NodeList using element object (button tag) and iterate the array
    *   @param {querySelectorAll<element>} arg
    *   
*/
Array.prototype.forEach.call(

    document.querySelectorAll("button"),
/*
    *   Define anonymous function to add event listener for each selected element node
    *   @param {function<element>} arg
    *   @param {addEventListener<windows.event>} arg
*/ 
    function (element) {            
        element.addEventListener( 
            "click",
/**
    *   Define anonymous function to excute the user move on the play board.
    *   @type {string} arg return the id value of a given target element 
    *   @param {getAttribute<id>} arg     access trough attribute called 'id'
    *   @param {parseInt<number>} arg parsing a string value to numbers , prun the string take the numbers only 
*/
            function (event) {  
                
                    var selectedButton=event.target.getAttribute('id'); 
                    if(selectedButton != "newGame" ){  
                        if(!flag){     
                            var row = parseInt(selectedButton[1]) 
                            var col = parseInt(selectedButton[2]) 
/** 
    *   If player move, the array (play board) will be updated with the new value.
    *   Change player move state to Agent(the Computer)
    *   Update the playing board (Mark X or O), using the function 
    *   Move Agent function excuted 
    *   @param {playerMove<boolean>} arg
*/               
                            if (!playerMove) { 
                                playBoard[row][col] = false; 
                                playerMove = true; 
                                updateMove(); 
                                agentMove();
                            }
                        }
                    }else {
/**
    *   Reset the playing board
*/                    
                    restartGame();
                    }
                
            } , false);
    }
);
});

/** *   Define reset playing board function 
    *   @type {playBoard<Array>}
*/
function restartGame() {
    flag=false;
    playBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
/** *   Chenge player move state */
    playerMove = false;
    updateMove();
}

/**
    *   Update playing board and return the result of the game.
    *   @param {updateMove<Array>} arg  pass the updated playing board as an array.
    *   @return {getWinner<Array>};
    *   @type {winner<number,null>} return 1 if the Agent(computer) win and -1 otherwise, 0 for tie 
*/
function updateMove() {
    updateButtons();
    var winner = getWinner(playBoard);
    var turn=document.getElementById("gameTurn");
    var finalResult=document.getElementById("result"); 
    var usrMsg="pending....";
   
    if(winner == 1){
        usrMsg= "Agent Won!" ;
        flag=true;
    }else if (winner == 0){
        usrMsg= "Player Won!" ;
        flag=true;
    }else if (winner == -1){
        usrMsg=  "Tie!";
        flag=true;
    } 
    
    finalResult.innerHTML=usrMsg;
    turn.innerHTML=playerMove ? "Agent's Move" : "Player Move";
}
/**
    *   Define the function to get the finial game result
    *   @param {board<Array>} arg , pass updated playing board
    *   @type {allNotNull<boolean>}
    *   @type {vals<Array>}  array of boolean , it has global scope
    *   @return {number} 
*/
function getWinner(board) {
    vals = [true, false];
    var allNotNull = true;
    for (var k = 0; k < vals.length; k++) {
        var value = vals[k];
/**
    *   Check the rows , columns and the two diagonals have the same value  
    *   @type {diagonalComplete1<boolean>}
    *   @type {diagonalComplete2<boolean>}
*/      
        var diagonalComplete1 = true;
        var diagonalComplete2 = true;
/** *   Check the two diagonals has the same value */
        for (var i = 0; i < 3; i++) {
            if (board[i][i] != value) {
                diagonalComplete1 = false;
            }
            if (board[2 - i][i] != value) {
                diagonalComplete2 = false;
            }
            var rowComplete = true;
            var colComplete = true;
/** *   Check each column in a given row has the same value */
            for (var j = 0; j < 3; j++) {
                if (board[i][j] != value) {
                    rowComplete = false;
                }
                if (board[j][i] != value) {
                    colComplete = false;
                }
                if (board[i][j] == null) {
                    allNotNull = false;
                }
            }
/**
    *   return if the game result 
    *   @return {number}
*/
            if (rowComplete || colComplete) {
                return value ? 1 : 0;
            }
        }
        if (diagonalComplete1 || diagonalComplete2) {
            return value ? 1 : 0;
        }
    }
/**
    *   Agent loose , return -1
    *   @return {number}
*/
    if (allNotNull) {
        return -1;
    }
/** * keep playing, more move remaining  */
    return null;
}
/**
    *   Define playing board Update function
    *   @type {idVal<string>}  and replace the playing board by X and O
*/

function updateButtons() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            var idVal =document.getElementById("b" + i + "" + j);
            idVal.innerHTML=playBoard[i][j] == false ? "x" : playBoard[i][j] == true ? "o" : "";
        }
    }
}

/**
    *   Define Agent Move function, ruining the depth first search algorithms to find the best
    *   move, all possible path are traversed recursively 
    *   @return {minimaxMove<Array>}
    *   @param {playBoard<Array>} 
*/
function agentMove() {
    playBoard = getMinMaxMove(playBoard);
    playerMove = false;
    updateMove();
}
/**
    *   Define the function traverse all leafe node and get the maximum value to take the best move 
    *   @return {getMinmaxRecursivly<Array>}  get the best agent move
    *   @param {getMinMaxMove<Array,boolean>}  pass the array and the agent move as TRUE 
*/
function getMinMaxMove(board) {
    return getMinmaxRecursivly(board, true)[1];
}
/**
    *   Define the recursive function to get the maxmimum value (the best move)
    *   by traversing and compaire the min max value of each leafe node(best path).
    *   @Type {winner<number>} 
    *   @return {getMinmaxRecursivly<Array, boolean>}
*/

function getMinmaxRecursivly(board, player) {
/**
    *   Check whether the game is finished or not
    *   @Type {winner<number>}
    *   @return {getWinner<Array>}
*/    
    var winner = getWinner(board);
    if (winner != null) {
        switch(winner) {
            case 1:
                // Agent wins
                return [1, board];
            case 0:
                // Player wins
                return [-1, board];
            case -1:
                // Tie
                return [0, board];
        }
    } else {
/**
    *   Get the best move , by traversing each leaf node, calculate each node value (min and Max)
    *   @Type {nextVal<number>}  eather 1 , -1 or 0. evaluate the minmum and then evaluate the maximum
    *   @Type {nextBoard<Array>}
*/
        var nextVal = null;
        var nextBoard = null;
        
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (board[i][j] == null) {
                    board[i][j] = player;
                    var value = getMinmaxRecursivly(board, !player)[0];
                    if ((player && (nextVal == null || value > nextVal)) || (!player && (nextVal == null || value < nextVal))) {
                        nextBoard = board.map(function(arr) {
                            return arr.slice();
                        });
                        nextVal = value;
                    }
                    board[i][j] = null;
                }
            }
        }
        return [nextVal, nextBoard];
    }
}
