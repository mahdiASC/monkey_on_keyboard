//Globals
var phrase = "to be or not to be";

var iteration = 0; //tracking number of attempts
var letters = "abcdefghijklmnopqrstuvwxyz "; //notice including space

var phraseAttempt = ""; //the attempt to match the 'phrase'

function randLetter(){
	//returns a random letter
	return letters[Math.floor(Math.random()*letters.length)];
}

function randPhrase(){
	//returns a random phrase
	var output = "";
	for (var i = 0; i<phrase.length; i++){
		output = output + randLetter();
	}
	return output;
}

function setup(){
	createCanvas(800,800);
}

function draw(){
	background(0);
	iteration++; //new attempt

	//Drawing text to canvas
	fill(225);
	textSize(30);
	textAlign(CENTER,CENTER);
	text(phrase,width/2,100);
	text("Iteration: " + iteration,width/2,200);
	text("Current Word: " + phraseAttempt,width/2,300);

	/////////////////////////////////////////////////////
	//Dictating how to handle current word not matching//
	/////////////////////////////////////////////////////
	if(phraseAttempt != phrase){
		phraseAttempt = randPhrase();
	}else{
		//end the loop phraseAttempt == phrase, 
		fill(225,0,0);
		text("Done!",width/2,400);
		noLoop();
	}
}

