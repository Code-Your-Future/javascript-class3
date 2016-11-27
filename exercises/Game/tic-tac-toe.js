var theBox;
var content;
var winner;
var turn = 0;
var theCanvas;
var c;
var cxt;
var squaresFill = 0;


    window.onload=function(){
      theBox = new Array();
      content = new Array();
      winner = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
      for(var i = 0; i <= 8; i++){
      theBox[i] = false;
      content[i]='';
      }
    }

    
    function canvasClicked(canvasNumber){
      theCanvas = "canvas"+canvasNumber;
      c = document.getElementById(theCanvas);
      cxt = c.getContext("2d");

      if(theBox[canvasNumber-1] ==false){
        if(turn%2==0){
          cxt.beginPath();
          cxt.moveTo(20,20);
          cxt.lineTo(130,130);
          cxt.moveTo(130,20);
          cxt.lineTo(20,130);
          cxt.lineWidth = 5;
          cxt.stroke();
          cxt.closePath();
          content[canvasNumber-1] = 'X';
        }
        else{
          cxt.beginPath();
          cxt.arc(75,75,60,0,Math.PI*2);
          cxt.lineWidth = 5;
          cxt.stroke();
          cxt.closePath();
          content[canvasNumber-1] = 'O';
        }
        turn++;
        theBox[canvasNumber-1] = true;
        squaresFill++;
        checkWinners(content[canvasNumber-1]);

        if(squaresFill ==9){
          alert("THE GAME IS OVER!");
          location.reload(true);
        }
      }
      else{
        alert("THAT SPACE IS ALREADY OCCUPIED");
      }
    }
    
    function checkWinners(symbol){
      for(var a = 0; a < winner.length; a++){
      if(content[winner[a][0]]==symbol&&content[winner[a][1]]== symbol&&content[winner[a][2]]==symbol){
        alert(symbol+ " WON!");
        playAgain();
      }
      }
    }

    function playAgain(){
      if(confirm("Do you want to play again?")==true){
        location.reload(true);
      }
      else{
        alert("GoodBye!");
        location.reload(true);
    }
    }

    function reset(){
      location.reload(true);
    }

  document.addEventListener("click", function(){
    document.getElementById("heading").innerHTML = "TIC TAC TOE";
});