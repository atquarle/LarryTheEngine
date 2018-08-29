////////////////////////////////////////////////////////////////////////////////////////
// specialized game functionality
////////////////////////////////////////////////////////////////////////////////////////

// Checks for the collision between two objects that have a position,
// width, and height with the object origin located at the top left
function checkCollision(sprite1, sprite2) {
    if(sprite1.x <= sprite2.x && (sprite1.x + sprite1.getWidth()) > sprite2.x) {
        if(sprite1.y <= sprite2.y && (sprite1.y + sprite1.getHeight()) > sprite2.y) return true;
        else if(sprite1.y >= sprite2.y && (sprite2.y + sprite2.getHeight()) > sprite1.y) return true;
    } else if(sprite1.x >= sprite2.x && (sprite2.x + sprite2.getWidth()) > sprite1.x) {
        if(sprite1.y <= sprite2.y && (sprite1.y + sprite1.getHeight()) > sprite2.y) return true;
        else if(sprite1.y >= sprite2.y && (sprite2.y + sprite2.getHeight()) > sprite1.y) return true;
    }

    return false;
}

function createPellet() {
	var r1, r2;
	while(true) {
		var collide = false;
		r1 = getRandomInt(0, playField.width - 10);
		r2 = getRandomInt(0, playField.height - 10);
		r1 -= (r1 % 10);
		r2 -= (r2 % 10);
		for(var i = 0; i < stage.actors.length; i++) {
			if(stage.getActor(i).sprite.x === r1 && stage.getActor(i).sprite.y === r2) {
				collide = true;
				break;
			}
		}
		if(!collide) break;
	}
	var pellet = new GamePiece(new Sprite(textures[PELLET], r1, r2));
	pellet.addFrameTimer(new FrameTimer(ROT_SPEED)) //pellet will "expire" after 60 frames
	stage.addActor(pellet);
}

function setHighScore() {
	if(highestLength > highScore) {
		highScore = highestLength;
		setLocalStorage("highscore", highScore);
	}
}

function displayMenu() {
	screen = MENU;
	stage.clearObjects();
	
	var xOffset = 0;
	var yOffset = 30;
	
	//Draw S
	S1 = new GamePiece(new Sprite(textures[BODY_MENU], 120 + xOffset, 60 + yOffset));
	stage.addDrawable(S1);
	S2 = new GamePiece(new Sprite(textures[BODY_MENU], 100 + xOffset, 60 + yOffset));
	stage.addDrawable(S2);
	S3 = new GamePiece(new Sprite(textures[BODY_MENU], 80 + xOffset, 60 + yOffset));
	stage.addDrawable(S3);
	S4 = new GamePiece(new Sprite(textures[BODY_MENU], 60 + xOffset, 80 + yOffset));
	stage.addDrawable(S4);
	S5 = new GamePiece(new Sprite(textures[BODY_MENU], 80 + xOffset, 100 + yOffset));
	stage.addDrawable(S5);
	S6 = new GamePiece(new Sprite(textures[BODY_MENU], 100 + xOffset, 100 + yOffset));
	stage.addDrawable(S6);
	S7 = new GamePiece(new Sprite(textures[BODY_MENU], 120 + xOffset, 120 + yOffset));
	stage.addDrawable(S7);
	S8 = new GamePiece(new Sprite(textures[BODY_MENU], 100 + xOffset, 140 + yOffset));
	stage.addDrawable(S8);
	S9 = new GamePiece(new Sprite(textures[BODY_MENU], 80 + xOffset, 140 + yOffset));
	stage.addDrawable(S9);
	S10 = new GamePiece(new Sprite(textures[BODY_MENU], 60 + xOffset, 140 + yOffset));
	stage.addDrawable(S10);
	
	//Draw N
	N1 = new GamePiece(new Sprite(textures[BODY_MENU], 160 + xOffset, 60 + yOffset));
	stage.addDrawable(N1);
	N2 = new GamePiece(new Sprite(textures[BODY_MENU], 160 + xOffset, 80 + yOffset));
	stage.addDrawable(N2);
	N3 = new GamePiece(new Sprite(textures[BODY_MENU], 160 + xOffset, 100 + yOffset));
	stage.addDrawable(N3);
	N4 = new GamePiece(new Sprite(textures[BODY_MENU], 160 + xOffset, 120 + yOffset));
	stage.addDrawable(N4);
	N5 = new GamePiece(new Sprite(textures[BODY_MENU], 160 + xOffset, 140 + yOffset));
	stage.addDrawable(N5);
	N6 = new GamePiece(new Sprite(textures[BODY_MENU], 180 + xOffset, 80 + yOffset));
	stage.addDrawable(N6);
	N7 = new GamePiece(new Sprite(textures[BODY_MENU], 200 + xOffset, 100 + yOffset));
	stage.addDrawable(N7);
	N8 = new GamePiece(new Sprite(textures[BODY_MENU], 220 + xOffset, 60 + yOffset));
	stage.addDrawable(N8);
	N9 = new GamePiece(new Sprite(textures[BODY_MENU], 220 + xOffset, 80 + yOffset));
	stage.addDrawable(N9);
	N10 = new GamePiece(new Sprite(textures[BODY_MENU], 220 + xOffset, 100 + yOffset));
	stage.addDrawable(N10);
	N11 = new GamePiece(new Sprite(textures[BODY_MENU], 220 + xOffset, 120 + yOffset));
	stage.addDrawable(N11);
	N12 = new GamePiece(new Sprite(textures[BODY_MENU], 220 + xOffset, 140 + yOffset));
	stage.addDrawable(N12);
	
	//Draw A
	A1 = new GamePiece(new Sprite(textures[BODY_MENU], 280 + xOffset, 60 + yOffset));
	stage.addDrawable(A1);
	A2 = new GamePiece(new Sprite(textures[BODY_MENU], 300 + xOffset, 60 + yOffset));
	stage.addDrawable(A2);
	A3 = new GamePiece(new Sprite(textures[BODY_MENU], 260 + xOffset, 80 + yOffset));
	stage.addDrawable(A3);
	A4 = new GamePiece(new Sprite(textures[BODY_MENU], 260 + xOffset, 100 + yOffset));
	stage.addDrawable(A4);
	A5 = new GamePiece(new Sprite(textures[BODY_MENU], 260 + xOffset, 120 + yOffset));
	stage.addDrawable(A5);
	A6 = new GamePiece(new Sprite(textures[BODY_MENU], 260 + xOffset, 140 + yOffset));
	stage.addDrawable(A6);
	A7 = new GamePiece(new Sprite(textures[BODY_MENU], 280 + xOffset, 100 + yOffset));
	stage.addDrawable(A7);
	A8 = new GamePiece(new Sprite(textures[BODY_MENU], 300 + xOffset, 100 + yOffset));
	stage.addDrawable(A8);
	A9 = new GamePiece(new Sprite(textures[BODY_MENU], 320 + xOffset, 80 + yOffset));
	stage.addDrawable(A9);
	A10 = new GamePiece(new Sprite(textures[BODY_MENU], 320 + xOffset, 100 + yOffset));
	stage.addDrawable(A10);
	A11 = new GamePiece(new Sprite(textures[BODY_MENU], 320 + xOffset, 120 + yOffset));
	stage.addDrawable(A11);
	A12 = new GamePiece(new Sprite(textures[BODY_MENU], 320 + xOffset, 140 + yOffset));
	stage.addDrawable(A12);
	
	//Draw K
	K1 = new GamePiece(new Sprite(textures[BODY_MENU], 360 + xOffset, 60 + yOffset));
	stage.addDrawable(K1);
	K2 = new GamePiece(new Sprite(textures[BODY_MENU], 360 + xOffset, 80 + yOffset));
	stage.addDrawable(K2);
	K3 = new GamePiece(new Sprite(textures[BODY_MENU], 360 + xOffset, 100 + yOffset));
	stage.addDrawable(K3);
	K4 = new GamePiece(new Sprite(textures[BODY_MENU], 360 + xOffset, 120 + yOffset));
	stage.addDrawable(K4);
	K5 = new GamePiece(new Sprite(textures[BODY_MENU], 360 + xOffset, 140 + yOffset));
	stage.addDrawable(K5);
	K6 = new GamePiece(new Sprite(textures[BODY_MENU], 420 + xOffset, 60 + yOffset));
	stage.addDrawable(K6);
	K7 = new GamePiece(new Sprite(textures[BODY_MENU], 400 + xOffset, 80 + yOffset));
	stage.addDrawable(K7);
	K8 = new GamePiece(new Sprite(textures[BODY_MENU], 380 + xOffset, 100 + yOffset));
	stage.addDrawable(K8);
	K9 = new GamePiece(new Sprite(textures[BODY_MENU], 400 + xOffset, 120 + yOffset));
	stage.addDrawable(K9);
	K10 = new GamePiece(new Sprite(textures[BODY_MENU], 420 + xOffset, 140 + yOffset));
	stage.addDrawable(K10);
	
	//Draw E
	E1 = new GamePiece(new Sprite(textures[BODY_MENU], 460 + xOffset, 60 + yOffset));
	stage.addDrawable(E1);
	E2 = new GamePiece(new Sprite(textures[BODY_MENU], 460 + xOffset, 80 + yOffset));
	stage.addDrawable(E2);
	E3 = new GamePiece(new Sprite(textures[BODY_MENU], 460 + xOffset, 100 + yOffset));
	stage.addDrawable(E3);
	E4 = new GamePiece(new Sprite(textures[BODY_MENU], 460 + xOffset, 120 + yOffset));
	stage.addDrawable(E4);
	E5 = new GamePiece(new Sprite(textures[BODY_MENU], 460 + xOffset, 140 + yOffset));
	stage.addDrawable(E5);
	E6 = new GamePiece(new Sprite(textures[BODY_MENU], 480 + xOffset, 60 + yOffset));
	stage.addDrawable(E6);
	E7 = new GamePiece(new Sprite(textures[BODY_MENU], 500 + xOffset, 60 + yOffset));
	stage.addDrawable(E7);
	E8 = new GamePiece(new Sprite(textures[BODY_MENU], 480 + xOffset, 100 + yOffset));
	stage.addDrawable(E8);
	E9 = new GamePiece(new Sprite(textures[BODY_MENU], 500 + xOffset, 100 + yOffset));
	stage.addDrawable(E9);
	E10 = new GamePiece(new Sprite(textures[BODY_MENU], 480 + xOffset, 140 + yOffset));
	stage.addDrawable(E10);
	E11 = new GamePiece(new Sprite(textures[BODY_MENU], 500 + xOffset, 140 + yOffset));
	stage.addDrawable(E11);
	
	var instructions = new Text("Press Space to begin", 195, 400, "#FF7700", "20px Verdana");
	stage.addDrawable(instructions);
}

function beginGame() {
	screen = GAME;
	stage.clearObjects();
	
	playField = new Box(0, 0, 600, 510, "black", "1");
	snake = [];
	pause = false;

	highestLength = 1;
	score = new Text("Score: " + highestLength, 235, 537, "#FF7700", "20px Verdana");
	bodyLength = new Text("Length: " + highestLength, 65, 537, "#FF7700", "20px Verdana");
	highScoreText = new Text("High Score: " + highScore, 385, 537, "#FF7700", "20px Verdana");

	part = new GamePiece(new Sprite(textures[BODY], 50, 50));

	part.speed = 10;
	part.direction.x = 1;
	snake.push(part);
	stage.addActor(part);
	stage.addFrameTimer(new FrameTimer(SPAWN_FREQUENCY)); //New pellet will be added every 20 frames
	stage.addDrawable(playField);
	stage.addDrawable(score);
	stage.addDrawable(bodyLength);
	stage.addDrawable(highScoreText);

	createPellet();

	turningPart = [];
}

// update draw
function draw() {
    // draw Background
    context.fillStyle = "#0077FF";
    context.fillRect(0, 0, canvas.width, canvas.height);

    stage.draw();
}

// update loop
function update() {
	
	switch (screen) {
		case MENU:
			//Main MENU
			var keyCode = keyboard.removeKeyCode();
			if(keyCode === KEY_SPACE) {
				beginGame();
			}
			break;
			
		case GAME:
			var keyCode = keyboard.removeKeyCode();
			
			if(snake.length === 0) {
				if(keyCode === KEY_SPACE) {
					displayMenu();
				}
				return;
			}

			if(keyCode === KEY_SPACE) {
				pause = !pause;
				if(pause) {
					stage.addDrawable(new Text("Paused", 250, 250, "#FF7700", "30px Verdana"));
				} else {
					stage.removeDrawableByIndex(stage.drawables.length - 1);
				}
			}
				
			// game paused
			if (pause) {
				return
			}
			// game running normally
			else {
				switch (keyCode) {
					case KEY_LEFT:
						if (snake[0].direction.x <= 0) {
							snake[0].direction.x = -1;
							snake[0].direction.y = 0;
							turningPart.push({index: 1, x: -1, y: 0});
						}
						break;
					case KEY_UP:
						if (snake[0].direction.y <= 0) {
							snake[0].direction.x = 0;
							snake[0].direction.y = -1;
							turningPart.push({index: 1, x: 0, y: -1});
						}
						break;
					case KEY_RIGHT:
						if (snake[0].direction.x >= 0) {
							snake[0].direction.x = 1;
							snake[0].direction.y = 0;
							turningPart.push({index: 1, x: 1, y: 0});
						}
						break;
					case KEY_DOWN:
						if (snake[0].direction.y >= 0) {
							snake[0].direction.x = 0;
							snake[0].direction.y = 1;
							turningPart.push({index: 1, x: 0, y: 1});
						}
						break;
				}
			}

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

			if (!playField.checkSpriteWithin(stage.getActor(0).sprite)) {
				setHighScore();
				snake = [];
				stage.clearObjects();
				stage.addDrawable(new Text("GAME OVER", 210, 220, "#FF7700", "30px Verdana"));
				stage.addDrawable(new Text("Score: " + highestLength, 255, 270, "#FF7700", "20px Verdana"));
				stage.addDrawable(new Text("High Score: " + highScore, 235, 320, "#FF7700", "20px Verdana"));
				stage.addDrawable(new Text("Press Space to continue", 215, 420, "#FF7700", "15px Verdana"));
				return;
			}

			for (var i = 0; i < stage.getActor(0).collisions.length; i++) {
				for (var j = 0; j < stage.actors.length; j++) {
					if(stage.getActor(0).collisions[i] === stage.getActor(j) && stage.getActor(j).sprite.image === textures[PELLET].image) {
						stage.removeActor(stage.getActor(j));
						var lastPart = snake[snake.length-1];
						var x = (lastPart.sprite.x + (lastPart.sprite.getWidth() * -lastPart.direction.x));
						var y = (lastPart.sprite.y + (lastPart.sprite.getHeight() * -lastPart.direction.y));
						var newPart = new GamePiece(new Sprite(textures[BODY], x, y));
						newPart.speed = lastPart.speed;
						newPart.direction.x = lastPart.direction.x;
						newPart.direction.y = lastPart.direction.y;

						stage.addActor(newPart);
						snake.push(newPart);
					} else if((stage.getActor(0).collisions[i] === stage.getActor(j) && stage.getActor(j).sprite.image === textures[BODY].image)) {
						setHighScore();
						snake = new Array();
						stage.clearObjects();
						stage.addDrawable(new Text("GAME OVER", 210, 220, "#FF7700", "30px Verdana"));
						stage.addDrawable(new Text("Score: " + highestLength, 255, 270, "#FF7700", "20px Verdana"));
						stage.addDrawable(new Text("High Score: " + highScore, 235, 320, "#FF7700", "20px Verdana"));
						stage.addDrawable(new Text("Press Space to continue", 215, 420, "#FF7700", "15px Verdana"));
						return;
					} else if((stage.getActor(0).collisions[i] === stage.getActor(j) && stage.getActor(j).sprite.image === textures[PELLET_ROTTEN].image)) {
						stage.removeActor(stage.getActor(j));
						
						for(var k = snake.length - 1; k >= snake.length - ROTTEN_PENALTY; k--) {
							if(k < 0) break;
							stage.removeActor(snake[k]);
						}
						
						var pos = snake.length - ROTTEN_PENALTY;
						if(pos < 0) pos = 0;
						snake.splice(pos, snake.length - pos);
						
						if(snake.length === 0) {
							setHighScore();
							stage.clearObjects();
							stage.addDrawable(new Text("GAME OVER", 210, 220, "#FF7700", "30px Verdana"));
							stage.addDrawable(new Text("Score: " + highestLength, 255, 270, "#FF7700", "20px Verdana"));
							stage.addDrawable(new Text("High Score: " + highScore, 235, 320, "#FF7700", "20px Verdana"));
							stage.addDrawable(new Text("Press Space to continue", 215, 420, "#FF7700", "15px Verdana"));
							return;
						}
					}
				}
			}
			
			//Timer Checks
			if(stage.getTimer(0).expired) { //Timer that spawns a new pellet
				createPellet();
				stage.getTimer(0).resetTimer();
			}
			
			for(var i = 0; i < stage.actors.length; i++) {
				var act = stage.getActor(i);
				for(var j = 0; j < act.timers.length; j++) {
					if(act.sprite.image === textures[PELLET].image && act.getTimer(j).expired) {
						act.changeTexture(textures[PELLET_ROTTEN]); //Change pellet to rotten pellet
					}
				}
			}
			
			if(snake.length > highestLength) {
				highestLength = snake.length;
				score.fillText = "Score: " + highestLength;
			}
			
			bodyLength.fillText = "Length: " + snake.length;
			break;
	}
}

////////////////////////////////////////////////////////////////////////////////////////
// Initiate the game
////////////////////////////////////////////////////////////////////////////////////////

const MENU = 0, GAME = 1, KEY_LEFT = 37, KEY_RIGHT = 39, KEY_DOWN = 40, KEY_UP = 38, KEY_SPACE = 32, SPAWN_FREQUENCY = 30, ROT_SPEED = 90, ROTTEN_PENALTY = 3;

var stage = new Stage();
var keyboard = new Keyboard();

var textures = [
    new Texture("Body.png", 20, 20),
    new Texture("Body.png", 10, 10),
    new Texture("Pellet.png", 10, 10),
	new Texture("Pellet_Rotten.png", 10, 10)
];
const BODY_MENU = 0, BODY = 1, PELLET = 2, PELLET_ROTTEN = 3;

var playField;
var snake;
var pause;

var highestLength;
var score;
var bodyLength;
var highScoreText;

var part;
var turningPart;

var S1, S2, S3, S4, S5, S6, S7, S8, S9, S10;
var N1, N2, N3, N4, N5, N6, N7, N8, N9, N10, N11, N12;
var A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12;
var K1, K2, K3, K4, K5, K6, K7, K8, K9, K10;
var E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11;

var highScore = localStorage.getItem("highscore");
if(highScore === null) highScore = 0;
var screen;
displayMenu();

// start the game
// calls the update and draw loop
startGame(80);