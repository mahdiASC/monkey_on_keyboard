var phrase = "to be or not to be"; //characters used MUST be included in 'letters' variable
var letters = " abcdefghijklmnopqrstuvwxyz"; //notice including space and only lower case chars

var lineH = 30; //lineheight
var monkeys = []; //used to store Monkey objectss

function Monkey(title, y, pickFunc){
	this.title = title;
	this.y = y;
	this.pickFunc = ()=> pickFunc.call(this);
	this.func = function(){
		if(this.phraseAttempt != phrase){
			this.iteration++; //new attempt	
			this.phraseAttempt = this.pickFunc();
		}
	};
	this.iteration = 0;
	this.phraseAttempt = '';
}

Monkey.prototype.writeText = function(){
	this.func();
	sepLine(lineH*this.y);
	fill('green');
	text(this.title, width/2,lineH*(this.y+1))
	fill('white');
	text("Iterations: " + (this.iteration-1),width/2,lineH*(this.y+2));
	text("Current attempt: " + this.phraseAttempt,width/2,lineH*(this.y+3));	
}

function setup(){
	createCanvas(800,430);
	
	monkeys.push(new Monkey('USING ONLY RANDOMNESS',2,function(){
		var output = "";
		for (var i = 0; i<phrase.length; i++){
			output = output + letters[Math.floor(Math.random()*letters.length)];
		}
		return output;
	}));

	monkeys.push(new Monkey('RANDOM BUT KEEPING CORRECT LETTERS',6,function(){
		var output="";
		for(var i = 0; i <phrase.length; i++){
			if (this.phraseAttempt[i]==phrase[i]){
				//correct letter in position 'i'
				output = output + this.phraseAttempt[i];
			}else{
				output = output + letters[Math.floor(Math.random()*letters.length)];
			}
		}
		return output;
	}));

	monkeys.push(new Monkey('USING EACH LETTER FROM "ALPHABET"',10,function(){
		var output="";
		for(var i = 0; i <phrase.length; i++){
			if (this.phraseAttempt[i]==phrase[i]){
				//correct letter in position 'i'
				output = output + this.phraseAttempt[i];
			}else{
				//incorrect letter replaced
				output = output + letters[this.iteration-1];
			}
		}
		return output;
	}));	
}

function draw(){
	background(0);
	
	//Drawing text to canvas
	fill(225);
	textSize(30);
	textAlign(CENTER,CENTER);
	text('Target Phrase: ' + phrase,width/2,lineH);
	
	for(var k of monkeys){
		k.writeText();
	}
}

function sepLine(y){
	fill('white');
	rect(0,y,width,2);
}