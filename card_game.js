//I have a headache, I should have done tic tac toe!!
var deckOfCards = ['LIME','LIME','NAVY','NAVY',
					'PINK','PINK','CYAN','CYAN',
					'AQUA','AQUA','TEAL','TEAL',
					'BLUE','BLUE','GOLD','GOLD',
					'GREY','GREY','RUBY','RUBY',
					'ROSE','ROSE','SAND','SAND',
					'WINE','WINE','PLUM','PLUM',];
var deckOfCardValues = [];
var deckOfCardIds = [];
var cardsTurned = 0;
var score = 28;
var brainScore = "";
//Fisher-Yates algorithm used to shuffle deckOfCards
Array.prototype.shuffleCards = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}
function newGame(){
	cardsTurned = 0;
	var output = '';
    deckOfCards.shuffleCards();
	for(var i = 0; i < deckOfCards.length; i++){
		output += '<div id="tile_'+i+'" onclick="logTurnedCard(this,\''+deckOfCards[i]+'\')"></div>';
	}
	document.getElementById('boardCanvas').innerHTML = output;
}
function logTurnedCard(card, value){
	if(card.innerHTML === "" && deckOfCardValues.length < 2){
		card.style.background = 'pink';
		card.innerHTML = value;
		if(deckOfCardValues.length === 0){
			deckOfCardValues.push(value);
			deckOfCardIds.push(card.id);
		} else if(deckOfCardValues.length === 1){
			deckOfCardValues.push(value);
			deckOfCardIds.push(card.id);
			if(deckOfCardValues[0] === deckOfCardValues[1]){
				cardsTurned += 2;
				deckOfCardValues = [];
				deckOfCardIds = [];
				if(cardsTurned === deckOfCards.length){
					if (score < 10) {
						brainScore = "Terribly Forgetful";
					} else if (score < 28) {
						brainScore = "Looking Normal";
					} else {
						brainScore = "Ready for MENSA";
					}
						alert("Score of " + score + " means your memory is : " + brainScore);

				var playAgain = confirm("GAME OVER. Play Again?");
				if (playAgain === true) {
				document.getElementById('boardCanvas').innerHTML = "";
				newGame();
					} else {
						window.close();
					}
				}
			} else {
				function hideCard(){
				    var cardOne = document.getElementById(deckOfCardIds[0]);
				    var cardTwo = document.getElementById(deckOfCardIds[1]);
				    cardOne.style.background = 'url(playing-card-suits-pattern.jpg) no-repeat';
				    cardOne.style.transition = "background 1.0s ease-in 0s";
            	    cardOne.innerHTML = "";
				    cardTwo.style.background = 'url(playing-card-suits-pattern.jpg) no-repeat';
            	    cardTwo.innerHTML = "";
				    deckOfCardValues = [];
            	    deckOfCardIds = [];
				}
				setTimeout(hideCard, 500);
			}
		}
	}

}