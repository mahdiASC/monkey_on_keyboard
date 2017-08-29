var phrase = "to be or not to be"; //characters used MUST be included in 'letters' variable
var letters = " abcdefghijklmnopqrstuvwxyz"; //notice including space and only lower case chars

var config = {
	lineH: 30, //lineHeight
	monkeys: [], //used to store Monkey objectss
	ycord: 2
}


function Monkey(title, pickFunc){
	this.title = title;
	this.y = config.ycord;
	config.ycord+=4;
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
	sepLine(config.lineH*this.y);
	fill('green');
	text(this.title, width/2,config.lineH*(this.y+1))
	fill('white');
	text("Iterations: " + (this.iteration-1),width/2,config.lineH*(this.y+2));
	text("Current attempt: " + this.phraseAttempt,width/2,config.lineH*(this.y+3));	
}

function setup(){
	
	config.monkeys.push(new Monkey('USING ONLY RANDOMNESS',function(){
		var output = "";
		for (var i = 0; i<phrase.length; i++){
			output = output + letters[Math.floor(Math.random()*letters.length)];
		}
		return output;
	}));

	config.monkeys.push(new Monkey('BRUTE FORCE',function(){
		var output="";
		this.curL = this.curL || 1; //current length of string
		this.tracker = this.tracker || new Array(this.curL).fill(0); //used for keeping track of index for each letter position
		
		//reset once whole array is at last mark
		if(this.tracker.every((x)=>x>=letters.length-1)){
			this.curL++;
			this.tracker=new Array(this.curL).fill(0);
		}
		
		var iterPick = this.tracker.length-1; //pick in tracker to increment
		while(this.tracker[iterPick]>=letters.length-1){
			this.tracker[iterPick]=0;
			iterPick--;
		}

		this.tracker[iterPick]++;

		//tranforming array into letters
		for(var k of this.tracker){
			output = output + letters[k];
		}
		return output;
	}));

	config.monkeys.push(new Monkey('RANDOM BUT KEEPING CORRECT LETTERS',function(){
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
	
	config.monkeys.push(new Monkey('USING EACH LETTER FROM "ALPHABET"',function(){
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
	
	createCanvas(800,config.lineH*4.5*config.monkeys.length);
}

function draw(){
	background(0);
	
	//Drawing text to canvas
	fill(225);
	textSize(30);
	textAlign(CENTER,CENTER);
	text('Target Phrase: ' + phrase,width/2,config.lineH);
	
	for(var k of config.monkeys){
		k.writeText();
	}

	if(config.monkeys.every((x)=>x.phraseAttempt==phrase)){
		//end of simulation (v. unlikely!)
		noLoop();
	}
}

function sepLine(y){
	fill('white');
	rect(0,y,width,2);
}

function recIncrease(arr, limit){
	// takes array and recursively increments last item, until limit
	
}