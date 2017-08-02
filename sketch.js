//Globals
var phrase = "to be or not to be"; //characters used MUST be included in 'letters' variable

var iteration = 0; //tracking number of attempts
var letters = "abcdefghijklmnopqrstuvwxyz "; //notice including space and only lower case chars

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
		// phraseAttempt = randPhrase();
		phraseAttempt = keepMatch();
	}else{
		//end the loop phraseAttempt == phrase, 
		fill(225,0,0);
		text("Done!",width/2,400);
		noLoop();
	}
}


function keepMatch(){
//returns phrase where correct letters are kept and incorrect letters are changed to a random letter
	var output="";
	for(var i = 0; i <phrase.length; i++){
		if (phraseAttempt[i]==phrase[i]){
			//correct letter in position 'i'
			output = output + phraseAttempt[i];
		}else{
			//incorrect letter replaced
			output = output + randLetter();
		}
	}
	return output;
}