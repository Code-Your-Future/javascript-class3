//Memory Game
// variables
var startPlayButton = false;
var firstImage;
var secondImage;
var score = 0;
var clickCount = 0;
var firstImageId;
var defaultImage = "./img/startImage.jpg"
var compareCompleted;
var activeImages = [];
var imagePosition = [];
document.getElementById("startPlay").addEventListener("click",startGame);
// document.getElementById("startPlay").addEventListener("click",setTimeout(hideImage,2000)); // not working on click
// document.getElementById("startPlay").onclick = setTimeout(hideImage,2000); //not working on click
// document.getElementById("startPlay").onclick = hideImage(); //not working on click
function startGame() {
	hideImage();
	variableValueReset();
	reorderImages();
	displayResult();
};
function clickedImg(id) {
	if ((compareCompleted)&&(startPlayButton)&&(activeImages[id])) {
		compareCompleted = false;
		activeImages[id] = false;
		showImage(id);
		compare(id);
	};
};
function hideImage() {
	for (var i = 0; i < document.images.length; i++) {
		document.images[i].src = defaultImage;
		document.images[i].style.border = "5px solid grey";
	};
};
// for (var i = 0; i <= document.images.length -1; i++) {
// 	document.images[i].addEventListener("click",showImage(i));
// };
function showImage(imageId) {
	document.images[parseInt(imageId)].src = imagePosition[parseInt(imageId)];
	document.images[parseInt(imageId)].style.border = "5px solid red";
};
function displayResult() {
	document.getElementById("result").innerHTML = "your score is: " + score + "<br/>" ;
};
function compare(imageId) {
	switch (clickCount) {
		case 0:
			firstImage = imagePosition[parseInt(imageId)];
			clickCount++;
			firstImageId = parseInt(imageId);
			compareCompleted = true;
			break;
		case 1:
			secondImage = imagePosition[parseInt(imageId)];
			clickCount = 0;
			if (firstImage === secondImage) {
				score++
				displayResult();
				compareCompleted = true;
			}
			else {
				setTimeout(notEqual,500);
				function notEqual() {
					document.images[firstImageId].src = defaultImage;
					document.images[parseInt(imageId)].src = defaultImage;
					activeImages[firstImageId] = true;
					activeImages[imageId] = true;
					document.images[firstImageId].style.border = "5px solid grey";
					document.images[parseInt(imageId)].style.border = "5px solid grey";
					compareCompleted = true;
				};
			};
			break;
		default :
			break;
	};
};
function reorderImages() {
	var random;
	var temp;
	while (imagePosition.length != document.images.length) {
		random = randomNumber(25);// 25-1 is the number of images in the img folder
		if (repeatInArray(imagePosition,"./img/" + random + ".jpg") === 0) {
			imagePosition.push("./img/" + random + ".jpg");
			imagePosition.push("./img/" + random + ".jpg");
		};
		for (var i = 0; i < imagePosition.length; i++) {
			random = randomNumber(imagePosition.length);
			temp = imagePosition[i];
			imagePosition[i] = imagePosition[random];
			imagePosition[random] = temp;
		};
	};
};
// random number between 0 and range-1
function randomNumber (range) {
	return Math.floor(Math.random()*range);
}; 
function repeatInArray(arr,num) {
	var repeat = 0;
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] === num) {
			repeat++
		};
	};
	return repeat;
};
function variableValueReset() {
	score = 0;
	clickCount = 0;
	startPlayButton = true;
	compareCompleted = true;
	imagePosition = [];
	activeImagesTrueValue();
};
function activeImagesTrueValue() {
	activeImages = [];
	for (var i = 0; i < document.images.length; i++) {
		activeImages.push(true);
	};
};
