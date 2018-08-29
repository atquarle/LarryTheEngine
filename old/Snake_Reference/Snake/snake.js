//////////////////
//Austin Quarles//
//////////////////

canvas = document.getElementById("whyupdate");
context = canvas.getContext('2d');

canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mouseup", handleMouseUp);
canvas.addEventListener("mousemove", handleMouseMove);
document.addEventListener("keydown", handleKeyPress);

var stage = new Stage();
var keyboard = new Keyboard();

LoadContent();

var actors = new Array();
var snake = new Array();
var part = new Actor(new Sprite(50, 50, 10, 10, "Body", getSource("Body")));
var r1 = getRandomInt(0, canvas.width - 10);
var r2 = getRandomInt(0, canvas.height - 10);
r1 -= (r1 % 10);
r2 -= (r2 % 10);
var pellet = new Actor(new Sprite(r1, r2, 10, 10, "Pellet", getSource("Pellet")));
part.speed = 10;
snake.push(part);
stage.addActor(part);
stage.addActor(pellet);
var turningPart = new Array();
var pause = false;

function Actor(sprite) {
	this.sprite = sprite;
	this.speed = 0;
	this.direction = {x: 0, y: 0};
	this.collisions = new Array();
	this.inView = true;
	this.update = function() {
		this.sprite.X += (this.speed * this.direction.x);
		this.sprite.Y += (this.speed * this.direction.y);
		this.collisions = new Array();
		for(var i = 0; i < stage.actors.length; i++) {
			if(stage.getActor(i) !== this && checkCollision(this.sprite, stage.getActor(i).sprite)) {
				this.collisions.push(stage.getActor(i)); 
			}
		}
		if(checkLeaveView(this.sprite)) {
			this.inView = false;
		} else {
			this.inView = true;
		}
	}
	this.draw = function() {
		context.drawImage(this.sprite.image, this.sprite.X, this.sprite.Y, this.sprite.width, this.sprite.height);
	}
}

function checkLeaveView(sprite) {
	if(sprite.X < 0 || (sprite.X + sprite.width) > canvas.width) return true;
	if(sprite.Y < 0 || (sprite.Y + sprite.height) > canvas.height) return true;
	return false;
}

function Stage() {
	this.actors = new Array();
	this.camera = null;
	this.addActor =  function(actor) {
		this.actors.push(actor);
	}
	this.removeActor = function(actor) {
		for(var i = 0; i < this.actors.length; i++) {
			if(actor === this.actors[i]) this.actors.splice(i, 1);
		}
	}
	this.removeActorByIndex = function(i) {
		this.actors.splice(i, 1);
	}
	this.getActor = function(index) {
		if(isInteger(index) && index >= 0 && index < this.actors.length) return this.actors[index];
	}
	this.update = function() {
		for(var i = 0; i < this.actors.length; i++) {
			this.actors[i].update();
		}
	}
	this.draw = function() {
		for(var i = 0; i < this.actors.length; i++) {
			this.actors[i].draw();
		}
	}
}

function Keyboard() {
	this.keyCodeBuffer = new Queue();
	this.lastKeyCode = null;
	this.addKeyCode = function(key) {
		if(isInteger(key)) {
			this.keyCodeBuffer.add(key);
			this.lastKeyCode = key;
		} else console.log("Input value, \"" + key + "\", is not a valid integer.");
	}
	this.peekKeyCode = function() {
		return this.keyCodeBuffer.peek();
	}
	this.removeKeyCode = function() {
		return this.keyCodeBuffer.remove();
	}
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function Queue() {
	this.queue = new Array();
	this.add = function(value) {
		this.queue.push(value);
	}
	this.peek = function() {
		if(this.queue.length === 0) return null;
		return Object.create(this.queue[0]);
	}
	this.remove = function() {
		if(this.queue.length === 0) return null;
		var head = this.queue[0];
		this.queue.splice(0, 1);
		return head;
	}
}

function getSource(name) {
	for(var i = 0; i < resources.length; i++) {
		if(resources[i].name === name) return resources[i].src;
	}
	return null;
}

function isInteger(x) {
	return (typeof x === 'number') && (x % 1 === 0);
}

function handleKeyPress(e) {
	keyboard.addKeyCode(e.keyCode);
}

function LoadContent() {
	addResource("Body", "Body.png");
	addResource("Pellet", "Pellet.png");
}

function update() {
	if(snake.length === 0) return;
	
	var keyCode = keyboard.removeKeyCode();
	
	if(keyCode === 32) pause = !pause;
	
	if(!pause) {
		switch(keyCode) {
			case 37:
				if(snake[0].direction.x <= 0) {
					snake[0].direction.x = -1;
					snake[0].direction.y = 0;
					turningPart.push({index: 1, x: -1, y: 0});
				}
				break;
			case 38:
				if(snake[0].direction.y <= 0) {
					snake[0].direction.x = 0;
					snake[0].direction.y = -1;
					turningPart.push({index: 1, x: 0, y: -1});
				}
				break;
			case 39:
				if(snake[0].direction.x >= 0) {
					snake[0].direction.x = 1;
					snake[0].direction.y = 0;
					turningPart.push({index: 1, x: 1, y: 0});
				}
				break;
			case 40:
				if(snake[0].direction.y >= 0) {
					snake[0].direction.x = 0;
					snake[0].direction.y = 1;
					turningPart.push({index: 1, x: 0, y: 1});
				}
				break;
		}
	} else return;
	
	stage.update();
	
	if(turningPart.length > 0) {
		for(var i = 0; i < turningPart.length; i++) {
			var command = turningPart[i];
			if(command.index >= snake.length) {
				turningPart.splice(i, 1);
				i--;
			} else {
				snake[command.index].direction.x = command.x;
				snake[command.index].direction.y = command.y;
				command.index++;
			}
		}
	}
	
	if(!stage.getActor(0).inView) {
		snake = new Array();
		for(var k = 0; k < stage.actors.length;) {
			stage.removeActorByIndex(k);
		}
		return;
	}
	
	for(var i = 0; i < stage.getActor(0).collisions.length; i++) {
		for(var j = 0; j < stage.actors.length; j++) {
			if(stage.getActor(0).collisions[i] === stage.getActor(j) && stage.getActor(j).sprite.name === "Pellet") {
				stage.removeActor(stage.getActor(j));
				var lastPart = snake[snake.length-1];
				var x = (lastPart.sprite.X + (lastPart.sprite.width * -lastPart.direction.x));
				var y = (lastPart.sprite.Y + (lastPart.sprite.height * -lastPart.direction.y));
				var newPart = new Actor(new Sprite(x, y, 10, 10, "Body", getSource("Body")));
				newPart.speed = lastPart.speed;
				newPart.direction.x = lastPart.direction.x;
				newPart.direction.y = lastPart.direction.y;
				
				stage.addActor(newPart);
				snake.push(newPart);
				
				r1 = getRandomInt(0, canvas.width - 10);
				r2 = getRandomInt(0, canvas.height - 10);
				r1 -= (r1 % 10);
				r2 -= (r2 % 10);
				pellet = new Actor(new Sprite(r1, r2, 10, 10, "Pellet", getSource("Pellet")));
				stage.addActor(pellet);
			} else if((stage.getActor(0).collisions[i] === stage.getActor(j) && stage.getActor(j).sprite.name === "Body")) {
				snake = new Array();
				for(var k = 0; k < stage.actors.length;) {
					stage.removeActorByIndex(k);
				}
				return;
			}
		}
	}
}

function draw() {
  canvas.width = canvas.width;
  
  //Draw Background
  context.fillStyle = "#0077FF";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	
  /*context.fillStyle = "#FF7700";
	context.fillRect(50, 50, 5, 5);*/
  
  stage.draw();
  
  //Draw Gameover
  if(snake.length === 0) {
	  context.fillStyle = "#FF7700";
	  context.font = "30px Verdana";
	  context.fillText("GAMEOVER", 210, 250);
  }
  
  //Draw Sidespace Outline
  /*context.beginPath();
  context.lineWidth = "1";
  context.strokeStyle = "black";
  context.rect(sidespaceBox.X, sidespaceBox.Y, sidespaceBox.width, sidespaceBox.height);
  context.stroke();

    for (var iter = 0; iter < sidespace.length; iter++) {
    context.drawImage(sidespace[iter].image, sidespace[iter].X, sidespace[iter].Y, sidespace[iter].width, sidespace[iter].height);

  }

    for (var iter = 0; iter < workspace.length; iter++) {
    context.drawImage(workspace[iter].image, workspace[iter].X, workspace[iter].Y, workspace[iter].width, workspace[iter].height);

  }*/

}

function game_loop() {
  update();
  draw();
}


setInterval(game_loop, 80);
