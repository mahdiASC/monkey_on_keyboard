//Globals
var phrase = "to be or not to be"; //characters used MUST be included in 'letters' variable

var iteration1 = 0; //tracking number of attempts
var iteration2 = 0; //tracking number of attempts
var iteration3 = 0; //tracking number of attempts

var letters = "abcdefghijklmnopqrstuvwxyz "; //notice including space and only lower case chars

var phraseAttempt1 = ""; //the attempt to match the 'phrase'
var phraseAttempt2 = ""; //the attempt to match the 'phrase'
var phraseAttempt3 = ""; //the attempt to match the 'phrase'

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
	iteration1++; //new attempt
	iteration2++; //new attempt
	iteration3++; //new attempt
	
	//Drawing text to canvas
	fill(225);
	textSize(30);
	textAlign(CENTER,CENTER);
	text('Target Phrase: ' + phrase,width/2,50);
	
	//Random Letters
	sepLine();
	text('USING ONLY RANDOMNESS', width/2,75)
	text("Iteration: " + iteration1,width/2,100);
	text("Current attempt: " + phraseAttempt1,width/2,125);
	
	if(phraseAttempt1 != phrase){
		phraseAttempt1 = randPhrase();
	}

	//keeping correct letters by position
	sepLine();
	text('KEEPING CORRECT LETTERS', width/2,150)
	text("Iteration: " + iteration2,width/2,175);
	text("Current attempt: " + phraseAttempt2,width/2,200);

	if(phraseAttempt2 != phrase){
		phraseAttempt2 = keepMatch();
	}

	//proc. of elim.
	sepLine();
	text('USING EACH LETTER FROM "ALPHABET"', width/2,225)
	text("Iteration: " + iteration3,width/2,250);
	text("Current attempt: " + phraseAttempt3,width/2,275);

	if(phraseAttempt3 != phrase){
		// phraseAttempt = randPhrase();
		phraseAttempt3 = keepMatchWithMemory();
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

function keepMatchWithMemory(){
	//checks each position for current letter in alphabet
	//does not repeat letters already tried
	var output="";
	for(var i = 0; i <phrase.length; i++){
		if (phraseAttempt[i]==phrase[i]){
			//correct letter in position 'i'
			output = output + phraseAttempt[i];
		}else{
			//incorrect letter replaced
			output = output + letters[iteration3-1];
		}
	}
	return output;
}

function sepLine(x,y){
	fill('white');
	rect(x,y,width,2);
}