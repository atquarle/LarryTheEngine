////////////////////////////////////////////////////////////////////////////////////////
// specialized game functionality
////////////////////////////////////////////////////////////////////////////////////////

// Checks for the collision between two objects that have a position,
// width, and height with the object origin located at the top left

function generateRandomId() {
	var id = "";
	for(var i = 0; i < 10; i++) {
		var rand = Math.floor(Math.random() * 10);
		id += "" + rand;
	}
	return id;
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
	
	var xOffset = 10;
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
	
	menu = new Menu(new Sprite(textures[CURSOR], 0, 0), 35, 260, 3, 0, 70);
	
	var option1 = new Text("Local Multiplayer", 70, 280, "#FF7700", "25px Verdana");
	var option2 = new Text("Online Multiplayer", 70, 350, "#FF7700", "25px Verdana");
	var option3 = new Text("Player vs AI", 70, 420, "#FF7700", "25px Verdana");
	stage.addDrawable(option1);
	stage.addDrawable(option2);
	stage.addDrawable(option3);
	stage.addDrawable(menu);
}

function displayLobby() {
	screen = LOBBY;
	stage.clearObjects();
	
	stage.addDrawable(new Text("WAITING...", 215, 220, "#FF7700", "30px Verdana"));
	stage.addDrawable(new Text("Press Escape to return", 215, 370, "#FF7700", "15px Verdana"));
}

function beginGame() {
	screen = GAME;
	stage.clearObjects();
	
	playField = new Box(0, 0, 600, 510, "black", "1");
	snake = [];
	snake2 = [];
	pause = false;

	highestLength = 1;
	highestLength2 = 1;
	p1Score = new Text("Orange: " + highestLength, 105, 537, "#FF7700", "20px Verdana");
	p2Score = new Text("Yellow: " + highestLength2, 385, 537, "#FF7700", "20px Verdana");

	part = new GamePiece(new Sprite(textures[BODY], 550, 450));
	part2 = new GamePiece(new Sprite(textures[BODY2], 50, 50));

	part.speed = 10;
	part.direction.x = -1;
	part2.speed = 10;
	part2.direction.x = 1;
	snake.push(part);
	snake2.push(part2);
	stage.addActor(part);
	stage.addActor(part2);
	stage.addFrameTimer(new FrameTimer(SPAWN_FREQUENCY)); //New pellet will be added every 20 frames
	stage.addDrawable(playField);
	stage.addDrawable(p1Score);
	stage.addDrawable(p2Score);

	createPellet();

	turningPart = [];
	turningPart2 = [];
}

function beginGameOnline() {
	screen = GAME_ONLINE;
	stage.clearObjects();
	
	playField = new Box(0, 0, 600, 510, "black", "1");
	snake = [];
	snake2 = [];
	pause = false;

	highestLength = 1;
	highestLength2 = 1;
	p1Score = new Text("Orange: " + highestLength, 105, 537, "#FF7700", "20px Verdana");
	p2Score = new Text("Yellow: " + highestLength2, 385, 537, "#FF7700", "20px Verdana");

	part = new GamePiece(new Sprite(textures[BODY], 550, 450));
	part2 = new GamePiece(new Sprite(textures[BODY2], 50, 50));

	part.speed = 10;
	part.direction.x = -1;
	part2.speed = 10;
	part2.direction.x = 1;
	snake.push(part);
	snake2.push(part2);
	stage.addActor(part);
	stage.addActor(part2);
	stage.addFrameTimer(new FrameTimer(SPAWN_FREQUENCY)); //New pellet will be added every 20 frames
	stage.addDrawable(playField);
	stage.addDrawable(p1Score);
	stage.addDrawable(p2Score);

	createPellet();

	turningPart = [];
	turningPart2 = [];
}

function beginGameAI() {
	screen = AI;
	stage.clearObjects();
	
	playField = new Box(0, 0, 600, 510, "black", "1");
	snake = [];
	snake2 = [];
	pause = false;

	target = new Line(new Point(0, 0), new Point(0, 0));

	highestLength = 1;
	highestLength2 = 1;
	p1Score = new Text("Orange: " + highestLength, 105, 537, "#FF7700", "20px Verdana");
	p2Score = new Text("Yellow: " + highestLength2, 385, 537, "#FF7700", "20px Verdana");

	part = new GamePiece(new Sprite(textures[BODY], 550, 450));
	part2 = new GamePiece(new Sprite(textures[BODY2], 50, 50));

	part.speed = 10;
	part.direction.x = -1;
	part2.speed = 10;
	part2.direction.x = 1;
	snake.push(part);
	snake2.push(part2);
	stage.addActor(part);
	stage.addActor(part2);
	stage.addFrameTimer(new FrameTimer(SPAWN_FREQUENCY)); //New pellet will be added every 20 frames
	stage.addDrawable(playField);
	stage.addDrawable(p1Score);
	stage.addDrawable(p2Score);

	createPellet();

	turningPart = [];
	turningPart2 = [];
}

function displayVictor() {
	if(highestLength > highestLength2) stage.addDrawable(new Text("ORANGE WINS", 195, 220, "#FF7700", "30px Verdana"));
	else if(highestLength2 > highestLength) stage.addDrawable(new Text("YELLOW WINS", 195, 220, "#FF7700", "30px Verdana"));
	else stage.addDrawable(new Text("NOBODY WINS", 195, 220, "#FF7700", "30px Verdana"));
	
	stage.addDrawable(new Text("Orange: " + highestLength, 185, 290, "#FF7700", "20px Verdana"));
	stage.addDrawable(new Text("Yellow: " + highestLength2, 325, 290, "#FF7700", "20px Verdana"));
	stage.addDrawable(new Text("Press Space to continue", 215, 370, "#FF7700", "15px Verdana"));
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
			var keyCode = keyboard.removeKeyCode(PLAYER1_KEYBUFFER);
			if(keyCode === KEY_SPACE || keyCode === KEY_CTRL || keyCode === KEY_ENTER) {
				if(menu.getSelection() == GAME - 1) beginGame();
				else if(menu.getSelection() == AI - 1) beginGameAI();
				else {
					host = confirm("Are you hosting?");
					var id;
					if (host == true) {
						id = prompt("Please enter your hosting ID.");
						if(id == null) return;
						peer = new Peer(id, {key: 'hri2b35kr7umobt9'});
						peer.on('connection', function(connection) {
							  connection.on('open', function() {
								 beginGameOnline(); 
							  });
							
							  connection.on('data', function(data) {
								  console.log(data);
								  if(data == KEY_UP) data = KEY_W;
								  if(data == KEY_RIGHT) data = KEY_D;
								  if(data == KEY_LEFT) data = KEY_A;
								  if(data == KEY_DOWN) data = KEY_S;
								  keyboard.addKeyCode(data);
							  });
							  
							  conn = connection;
						});
						
						peer.on('disconnected', function() {
							stage.clearObjects();
							displayMenu();
							peer.destroy();
						});
					} else {
						hostId = prompt("Please enter the host ID to connect to.");
						if(hostId == null) return;
						peer = new Peer(CONNECTING_ID, {key: 'hri2b35kr7umobt9'});
						peer.on('open', function(id) {
						   console.log('connected to server');
							conn = peer.connect(hostId);
							conn.on('open', function(data) {
								beginGameOnline();
							});
							
							conn.on('data', function(data) {
								var action = data[0];
								data.splice(0, 1);
								
								switch(action) {
									
								case 0: //Actor Position Update
									for(var i = 0; i < data.length; i++) {
										stage.getActor(i).sprite.x = data[i].x;
										stage.getActor(i).sprite.y = data[i].y;
									}
									break;
									
								case 1: //Create a new Actor
									var x = data[0].x;
									var y = data[0].y;
									var newActor = new GamePiece(new Sprite(textures[data[0].texture], x, y), x, y);
									stage.addActor(newActor);
									break;
									
								case 2: //Change Sprite Texture
									stage.getActor(data[0].index).changeTexture(textures[data[0].texture]);
									break;
									
								case 3: //Remove Actor
									for(var i = 0; i < data.length; i++) {
										stage.removeActorByIndex(data[i].index);
									}
									break;
									
								case 4: //Game End
									highestLength = data[0].orange;
									highestLength2 = data[0].yellow;
									stage.clearObjects();
									snake = [];
									snake2 = [];
									displayVictor();
									console.log("here");
									break;
								}
							});
						});
						
						peer.on('disconnected', function() {
							stage.clearObjects();
							displayMenu();
							peer.destroy();
						});
					}
					displayLobby();
				}
			} else if(keyCode === KEY_UP){
				menu.previousSelection();
			} else if(keyCode == KEY_DOWN) {
				menu.nextSelection();
			}
			break;
			
		case LOBBY:
			var keyCode = keyboard.removeKeyCode(PLAYER1_KEYBUFFER);
			if(keyCode == KEY_ESCAPE) {
				peer.destroy();
				displayMenu();
			}
			break;
			
		case GAME:
			var keyCode = keyboard.removeKeyCode(PLAYER1_KEYBUFFER);
			var keyCode2 = keyboard.removeKeyCode(PLAYER2_KEYBUFFER);
			
			if(snake.length === 0) {
				if(keyCode === KEY_SPACE) {
					displayMenu();
				}
				return;
			}

			if(keyCode === KEY_SPACE || keyCode2 == KEY_SPACE) {
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
				
				switch (keyCode2) {
					case KEY_A:
						if (snake2[0].direction.x <= 0) {
							snake2[0].direction.x = -1;
							snake2[0].direction.y = 0;
							turningPart2.push({index: 1, x: -1, y: 0});
						}
						break;
					case KEY_W:
						if (snake2[0].direction.y <= 0) {
							snake2[0].direction.x = 0;
							snake2[0].direction.y = -1;
							turningPart2.push({index: 1, x: 0, y: -1});
						}
						break;
					case KEY_D:
						if (snake2[0].direction.x >= 0) {
							snake2[0].direction.x = 1;
							snake2[0].direction.y = 0;
							turningPart2.push({index: 1, x: 1, y: 0});
						}
						break;
					case KEY_S:
						if (snake2[0].direction.y >= 0) {
							snake2[0].direction.x = 0;
							snake2[0].direction.y = 1;
							turningPart2.push({index: 1, x: 0, y: 1});
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
			
			if(turningPart2.length > 0) {
				for(var i = 0; i < turningPart2.length; i++) {
					var command = turningPart2[i];
					if(command.index >= snake2.length) {
						turningPart2.splice(i, 1);
						i--;
					} else {
						snake2[command.index].direction.x = command.x;
						snake2[command.index].direction.y = command.y;
						command.index++;
					}
				}
			}

			if (!playField.checkSpriteWithin(stage.getActor(0).sprite)) {
				highestLength2 += 10;
				setHighScore();
				snake = [];
				snake2 = [];
				stage.clearObjects();
				displayVictor();
				return;
			}
			
			if (!playField.checkSpriteWithin(stage.getActor(1).sprite)) {
				highestLength += 10;
				setHighScore();
				snake = [];
				snake2 = [];
				stage.clearObjects();
				displayVictor();
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
					} else if((stage.getActor(0).collisions[i] === stage.getActor(j) && (stage.getActor(j).sprite.image === textures[BODY].image || stage.getActor(j).sprite.image === textures[BODY2].image))) {
						if(stage.getActor(0).collisions[i] !== stage.getActor(1)) highestLength2 += 10;
						setHighScore();
						snake = new Array();
						snake2 = new Array();
						stage.clearObjects();
						displayVictor();
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
							snake2 = [];
							highestLength2 += 2;
							setHighScore();
							stage.clearObjects();
							displayVictor();
							return;
						}
					}
				}
			}
			
			for (var i = 0; i < stage.getActor(1).collisions.length; i++) {
				for (var j = 0; j < stage.actors.length; j++) {
					if(stage.getActor(1).collisions[i] === stage.getActor(j) && stage.getActor(j).sprite.image === textures[PELLET].image) {
						stage.removeActor(stage.getActor(j));
						var lastPart = snake2[snake2.length-1];
						var x = (lastPart.sprite.x + (lastPart.sprite.getWidth() * -lastPart.direction.x));
						var y = (lastPart.sprite.y + (lastPart.sprite.getHeight() * -lastPart.direction.y));
						var newPart = new GamePiece(new Sprite(textures[BODY2], x, y));
						newPart.speed = lastPart.speed;
						newPart.direction.x = lastPart.direction.x;
						newPart.direction.y = lastPart.direction.y;

						stage.addActor(newPart);
						snake2.push(newPart);
					} else if((stage.getActor(1).collisions[i] === stage.getActor(j) && (stage.getActor(j).sprite.image === textures[BODY].image || stage.getActor(j).sprite.image === textures[BODY2].image))) {
						if(stage.getActor(1).collisions[i] !== stage.getActor(0)) highestLength += 10;
						setHighScore();
						snake = new Array();
						snake2 = new Array();
						stage.clearObjects();
						displayVictor();
						return;
					} else if((stage.getActor(1).collisions[i] === stage.getActor(j) && stage.getActor(j).sprite.image === textures[PELLET_ROTTEN].image)) {
						stage.removeActor(stage.getActor(j));
						
						for(var k = snake2.length - 1; k >= snake2.length - ROTTEN_PENALTY; k--) {
							if(k < 0) break;
							stage.removeActor(snake2[k]);
						}
						
						var pos = snake2.length - ROTTEN_PENALTY;
						if(pos < 0) pos = 0;
						snake2.splice(pos, snake2.length - pos);
						
						if(snake2.length === 0) {
							snake = [];
							highestLength += 10;
							setHighScore();
							stage.clearObjects();
							displayVictor();
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
				p1Score.fillText = "Orange: " + highestLength;
			}
			
			if(snake2.length > highestLength2) {
				highestLength2 = snake2.length;
				p2Score.fillText = "Yellow: " + highestLength2;
			}
			
			break;
		
		case GAME_ONLINE:
			//HOST ACTIONS
			if(host) {
				var keyCode = keyboard.removeKeyCode(PLAYER1_KEYBUFFER);
				var keyCode2 = keyboard.removeKeyCode(PLAYER2_KEYBUFFER);
				
				if(snake.length === 0) {
					if(keyCode === KEY_SPACE) {						
						peer.destroy();
						displayMenu();
					}
					return;
				}

				if(keyCode === KEY_SPACE || keyCode2 == KEY_SPACE) {
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
					
					switch (keyCode2) {
						case KEY_A:
							if (snake2[0].direction.x <= 0) {
								snake2[0].direction.x = -1;
								snake2[0].direction.y = 0;
								turningPart2.push({index: 1, x: -1, y: 0});
							}
							break;
						case KEY_W:
							if (snake2[0].direction.y <= 0) {
								snake2[0].direction.x = 0;
								snake2[0].direction.y = -1;
								turningPart2.push({index: 1, x: 0, y: -1});
							}
							break;
						case KEY_D:
							if (snake2[0].direction.x >= 0) {
								snake2[0].direction.x = 1;
								snake2[0].direction.y = 0;
								turningPart2.push({index: 1, x: 1, y: 0});
							}
							break;
						case KEY_S:
							if (snake2[0].direction.y >= 0) {
								snake2[0].direction.x = 0;
								snake2[0].direction.y = 1;
								turningPart2.push({index: 1, x: 0, y: 1});
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
				
				if(turningPart2.length > 0) {
					for(var i = 0; i < turningPart2.length; i++) {
						var command = turningPart2[i];
						if(command.index >= snake2.length) {
							turningPart2.splice(i, 1);
							i--;
						} else {
							snake2[command.index].direction.x = command.x;
							snake2[command.index].direction.y = command.y;
							command.index++;
						}
					}
				}

				if (!playField.checkSpriteWithin(stage.getActor(0).sprite)) {
					highestLength2 += 10;
					setHighScore();
					snake = [];
					snake2 = [];
					stage.clearObjects();
					conn.send([4, {orange: highestLength, yellow: highestLength2}]);
					displayVictor();
					return;
				}
				
				if (!playField.checkSpriteWithin(stage.getActor(1).sprite)) {
					highestLength += 10;
					setHighScore();
					snake = [];
					snake2 = [];
					stage.clearObjects();
					conn.send([4, {orange: highestLength, yellow: highestLength2}]);
					displayVictor();
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
							
							conn.send([3, {index: j}]);
							conn.send([1, {texture: BODY, x: x, y: y}]);
						} else if((stage.getActor(0).collisions[i] === stage.getActor(j) && (stage.getActor(j).sprite.image === textures[BODY].image || stage.getActor(j).sprite.image === textures[BODY2].image))) {
							if(stage.getActor(0).collisions[i] !== stage.getActor(1)) highestLength2 += 10;
							setHighScore();
							snake = new Array();
							snake2 = new Array();
							stage.clearObjects();
							conn.send([4, {orange: highestLength, yellow: highestLength2}]);
							displayVictor();
							return;
						} else if((stage.getActor(0).collisions[i] === stage.getActor(j) && stage.getActor(j).sprite.image === textures[PELLET_ROTTEN].image)) {
							stage.removeActor(stage.getActor(j));
							
							var data = [3];
							for(var k = snake.length - 1; k >= snake.length - ROTTEN_PENALTY; k--) {
								if(k < 0) break;
								data.push({index: stage.getActorIndex(snake[k])})
								stage.removeActor(snake[k]);
							}
							conn.send(data);
							
							var pos = snake.length - ROTTEN_PENALTY;
							if(pos < 0) pos = 0;
							snake.splice(pos, snake.length - pos);
							
							if(snake.length === 0) {
								snake2 = [];
								highestLength2 += 2;
								setHighScore();
								stage.clearObjects();
								conn.send([4, {orange: highestLength, yellow: highestLength2}]);
								displayVictor();
								return;
							}
						}
					}
				}
				
				for (var i = 0; i < stage.getActor(1).collisions.length; i++) {
					for (var j = 0; j < stage.actors.length; j++) {
						if(stage.getActor(1).collisions[i] === stage.getActor(j) && stage.getActor(j).sprite.image === textures[PELLET].image) {
							stage.removeActor(stage.getActor(j));
							var lastPart = snake2[snake2.length-1];
							var x = (lastPart.sprite.x + (lastPart.sprite.getWidth() * -lastPart.direction.x));
							var y = (lastPart.sprite.y + (lastPart.sprite.getHeight() * -lastPart.direction.y));
							var newPart = new GamePiece(new Sprite(textures[BODY2], x, y));
							newPart.speed = lastPart.speed;
							newPart.direction.x = lastPart.direction.x;
							newPart.direction.y = lastPart.direction.y;

							stage.addActor(newPart);
							snake2.push(newPart);
							
							conn.send([3, {index: j}]);
							conn.send([1, {texture: BODY2, x: x, y: y}]);
						} else if((stage.getActor(1).collisions[i] === stage.getActor(j) && (stage.getActor(j).sprite.image === textures[BODY].image || stage.getActor(j).sprite.image === textures[BODY2].image))) {
							if(stage.getActor(1).collisions[i] !== stage.getActor(0)) highestLength += 10;
							setHighScore();
							snake = new Array();
							snake2 = new Array();
							stage.clearObjects();
							conn.send([4, {orange: highestLength, yellow: highestLength2}]);
							displayVictor();
							return;
						} else if((stage.getActor(1).collisions[i] === stage.getActor(j) && stage.getActor(j).sprite.image === textures[PELLET_ROTTEN].image)) {
							stage.removeActor(stage.getActor(j));
							
							var data = [3];
							for(var k = snake2.length - 1; k >= snake2.length - ROTTEN_PENALTY; k--) {
								if(k < 0) break;
								data.push({index: stage.getActorIndex(snake2[k])})
								stage.removeActor(snake2[k]);
							}
							conn.send(data);
							
							var pos = snake2.length - ROTTEN_PENALTY;
							if(pos < 0) pos = 0;
							snake2.splice(pos, snake2.length - pos);
							
							if(snake2.length === 0) {
								snake = [];
								highestLength += 10;
								setHighScore();
								stage.clearObjects();
								conn.send([4, {orange: highestLength, yellow: highestLength2}]);
								displayVictor();
								return;
							}
						}
					}
				}
				
				//Timer Checks
				if(stage.getTimer(0).expired) { //Timer that spawns a new pellet
					createPellet();
					var p = stage.getActor(stage.actors.length-1);
					conn.send([1, {texture: PELLET, x: p.sprite.x, y: p.sprite.y}]);
					stage.getTimer(0).resetTimer();
				}
				
				for(var i = 0; i < stage.actors.length; i++) {
					var act = stage.getActor(i);
					for(var j = 0; j < act.timers.length; j++) {
						if(act.sprite.image === textures[PELLET].image && act.getTimer(j).expired) {
							act.changeTexture(textures[PELLET_ROTTEN]); //Change pellet to rotten pellet
							conn.send([2, {index: i, texture: PELLET_ROTTEN}]);
						}
					}
				}
				
				if(snake.length > highestLength) {
					highestLength = snake.length;
					p1Score.fillText = "Orange: " + highestLength;
				}
				
				if(snake2.length > highestLength2) {
					highestLength2 = snake2.length;
					p2Score.fillText = "Yellow: " + highestLength2;
				}
				posData = [];
				posData.push(0);
				for(var i = 0; i < stage.actors.length; i++) {
					var a = stage.getActor(i);
					posData.push({x: a.sprite.x, y: a.sprite.y});
				}
				conn.send(posData);
			} else {
				var keyCode = keyboard.removeKeyCode(PLAYER1_KEYBUFFER);
				if(snake.length === 0) {
					if(keyCode === KEY_SPACE) {						
						peer.destroy();
						displayMenu();
					}
					return;
				} else {
					if(keyCode != null) conn.send(keyCode);
				}
			}
			break;
		
		case AI:
			var keyCode = keyboard.removeKeyCode(PLAYER1_KEYBUFFER);
			
			if(snake.length === 0) {
				if(keyCode === KEY_SPACE) {
					displayMenu();
				}
				return;
			}

			if(keyCode === KEY_SPACE || keyCode2 == KEY_SPACE) {
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
				
				var d = getDirectionFromPoint(point, sGraph.width, sGraph.height); 
				
				switch (d) {
					case KEY_A:
						if (snake2[0].direction.x <= 0) {
							snake2[0].direction.x = -1;
							snake2[0].direction.y = 0;
							turningPart2.push({index: 1, x: -1, y: 0});
						}
						break;
					case KEY_W:
						if (snake2[0].direction.y <= 0) {
							snake2[0].direction.x = 0;
							snake2[0].direction.y = -1;
							turningPart2.push({index: 1, x: 0, y: -1});
						}
						break;
					case KEY_D:
						if (snake2[0].direction.x >= 0) {
							snake2[0].direction.x = 1;
							snake2[0].direction.y = 0;
							turningPart2.push({index: 1, x: 1, y: 0});
						}
						break;
					case KEY_S:
						if (snake2[0].direction.y >= 0) {
							snake2[0].direction.x = 0;
							snake2[0].direction.y = 1;
							turningPart2.push({index: 1, x: 0, y: 1});
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
			
			if(turningPart2.length > 0) {
				for(var i = 0; i < turningPart2.length; i++) {
					var command = turningPart2[i];
					if(command.index >= snake2.length) {
						turningPart2.splice(i, 1);
						i--;
					} else {
						snake2[command.index].direction.x = command.x;
						snake2[command.index].direction.y = command.y;
						command.index++;
					}
				}
			}

			if (!playField.checkSpriteWithin(stage.getActor(0).sprite)) {
				highestLength2 += 10;
				setHighScore();
				snake = [];
				snake2 = [];
				stage.clearObjects();
				displayVictor();
				return;
			}
			
			if (!playField.checkSpriteWithin(stage.getActor(1).sprite)) {
				highestLength += 10;
				setHighScore();
				snake = [];
				snake2 = [];
				stage.clearObjects();
				displayVictor();
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
					} else if((stage.getActor(0).collisions[i] === stage.getActor(j) && (stage.getActor(j).sprite.image === textures[BODY].image || stage.getActor(j).sprite.image === textures[BODY2].image))) {
						if(stage.getActor(0).collisions[i] !== stage.getActor(1)) highestLength2 += 10;
						setHighScore();
						snake = new Array();
						snake2 = new Array();
						stage.clearObjects();
						displayVictor();
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
							snake2 = [];
							highestLength2 += 10;
							setHighScore();
							stage.clearObjects();
							displayVictor();
							return;
						}
					}
				}
			}
			
			for (var i = 0; i < stage.getActor(1).collisions.length; i++) {
				for (var j = 0; j < stage.actors.length; j++) {
					if(stage.getActor(1).collisions[i] === stage.getActor(j) && stage.getActor(j).sprite.image === textures[PELLET].image) {
						stage.removeActor(stage.getActor(j));
						var lastPart = snake2[snake2.length-1];
						var x = (lastPart.sprite.x + (lastPart.sprite.getWidth() * -lastPart.direction.x));
						var y = (lastPart.sprite.y + (lastPart.sprite.getHeight() * -lastPart.direction.y));
						var newPart = new GamePiece(new Sprite(textures[BODY2], x, y));
						newPart.speed = lastPart.speed;
						newPart.direction.x = lastPart.direction.x;
						newPart.direction.y = lastPart.direction.y;

						stage.addActor(newPart);
						snake2.push(newPart);
					} else if((stage.getActor(1).collisions[i] === stage.getActor(j) && (stage.getActor(j).sprite.image === textures[BODY].image || stage.getActor(j).sprite.image === textures[BODY2].image))) {
						if(stage.getActor(1).collisions[i] !== stage.getActor(0)) highestLength += 10;
						setHighScore();
						snake = new Array();
						snake2 = new Array();
						stage.clearObjects();
						displayVictor();
						return;
					} else if((stage.getActor(1).collisions[i] === stage.getActor(j) && stage.getActor(j).sprite.image === textures[PELLET_ROTTEN].image)) {
						stage.removeActor(stage.getActor(j));
						
						for(var k = snake2.length - 1; k >= snake2.length - ROTTEN_PENALTY; k--) {
							if(k < 0) break;
							stage.removeActor(snake2[k]);
						}
						
						var pos = snake2.length - ROTTEN_PENALTY;
						if(pos < 0) pos = 0;
						snake2.splice(pos, snake2.length - pos);
						
						if(snake2.length === 0) {
							snake = [];
							highestLength += 10;
							setHighScore();
							stage.clearObjects();
							displayVictor();
							return;
						}
					}
				}
			}
			
			sGraph.clearObstacles();
			var pelletCount = 0;
			for(var i = 0; i < stage.actors.length; i++) {
				var act = stage.getActor(i);
				if(act !== part2 && act.sprite.image !== textures[PELLET].image) sGraph.addObstacle(act.sprite.x, act.sprite.y);
				else if(act.sprite.image == textures[PELLET].image) pelletCount++;
			}
			
			if(pelletCount == 0) {
				var r1, r2;
				while(true) {
					var collide = false;
					r1 = getRandomInt(0, sGraph.width - 10);
					r2 = getRandomInt(0, sGraph.height - 10);
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
				var temp = breadthFirstSearch(sGraph, part2.sprite.x, part2.sprite.y, r1, r2);
				path = temp;
				goal = {x: r1, y: r2};
				target.endPoint = new Point(goal.x, goal.y);
					
				point = goal;
				var previous = point;
				while(true) {
					if(point == null || point == undefined) break;
					if(path[point.x + " " + point.y] == null) break;
					previous = point;
					point = path[point.x + " " + point.y];
				}
				point = previous;
			} else {
			var length = Number.MAX_VALUE;
				for(var i = 0; i < stage.actors.length; i++) {
					var act = stage.getActor(i);
					var goal;
					if(act.sprite.image === textures[PELLET].image) {
						var temp = breadthFirstSearch(sGraph, part2.sprite.x, part2.sprite.y, act.sprite.x, act.sprite.y);
						if(temp["Length"] < length) {
							length = temp["Length"];
							path = temp;
							goal = {x: act.sprite.x, y: act.sprite.y};
						}
					}
					if(goal !== undefined) target.endPoint = new Point(goal.x, goal.y);
					
					point = goal;
					var previous = point;
					while(true) {
						if(point == null || point == undefined) break;
						if(path[point.x + " " + point.y] == null) break;
						previous = point;
						point = path[point.x + " " + point.y];
					}
					point = previous;
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
				p1Score.fillText = "Orange: " + highestLength;
			}
			
			if(snake2.length > highestLength2) {
				highestLength2 = snake2.length;
				p2Score.fillText = "Yellow: " + highestLength2;
			}
			
			target.startPoint = new Point(snake2[0].sprite.x, snake2[0].sprite.y);
			break;
	}
}

////////////////////////////////////////////////////////////////////////////////////////
// Initiate the game
////////////////////////////////////////////////////////////////////////////////////////

const MENU = 0, GAME = 1, GAME_ONLINE = 2, AI = 3, LOBBY = 4, KEY_LEFT = 37, KEY_RIGHT = 39, KEY_DOWN = 40, KEY_UP = 38, KEY_SPACE = 32, SPAWN_FREQUENCY = 15, ROT_SPEED = 90, ROTTEN_PENALTY = 3;
const KEY_W = 87, KEY_A = 65, KEY_S = 83, KEY_D = 68, KEY_CTRL = 17, KEY_ENTER = 13, KEY_ESCAPE = 27, PLAYER1_KEYBUFFER = 0, PLAYER2_KEYBUFFER = 1, CONNECTING_ID = generateRandomId();
console.log(CONNECTING_ID);

var stage = new Stage();
var keyboard = new Keyboard();

var textures = [
    new Texture("Body.png", 20, 20),
    new Texture("Body.png", 10, 10),
	new Texture("Body2.png", 10, 10),
    new Texture("Pellet.png", 10, 10),
	new Texture("Pellet_Rotten.png", 10, 10),
	new Texture("Snake_Cursor.png", 25, 25)
];
const BODY_MENU = 0, BODY = 1, BODY2 = 2, PELLET = 3, PELLET_ROTTEN = 4, CURSOR = 5;

var playField;
var snake;
var snake2;
var pause;
var menu;

var highestLength;
var highestLength2;
var score;
var bodyLength;
var highScoreText;

var part;
var turningPart;
var part2;
var turningPart2;

var host;
var hostId;
var connection;
var peer;

var sGraph = new SquareGrid(600, 510, 10);
var path;
var point;
var target;

keyboard.addSplitBuffer(KEY_UP, KEY_DOWN, KEY_LEFT, KEY_RIGHT, KEY_SPACE, KEY_CTRL, KEY_ENTER, KEY_ESCAPE);
keyboard.addSplitBuffer(KEY_W, KEY_S, KEY_A, KEY_D);

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
startGame(120);