//Function used within the asteroid particle
var destroyAsteroid = function(particle) {
	var nextSize;
	var asteroid = particle.actor;
	if(asteroid.sprite.getWidth() === LARGE_WIDTH) nextSize = 1;
	else if(asteroid.sprite.getWidth() === MEDIUM_WIDTH) nextSize = 2;
	else nextSize = 3;
	
	var width = asteroid.sprite.getWidth() - WIDTH_DIFFERENCE;
	var height = width;
	var x = asteroid.sprite.x + width/2;
	var y = asteroid.sprite.y + height/2;
	
	if(nextSize !== 3) {
		for(var i = 0; i < 2; i++) {
			var r1 = (Math.random() < RANDOM_HALF) ? Math.random() : -Math.random();
			var r2 = (Math.random() < RANDOM_HALF) ? Math.random() : -Math.random();
			var actor;
			var speed = (Math.random() < RANDOM_HALF) ? 2 + level * LEVEL_MULTIPLIER : 1 + level * LEVEL_MULTIPLIER;
			if(Math.random() < RANDOM_THIRD) {
				var texture = (nextSize === 1) ? textures[ASTEROID1M] : textures[ASTEROID1S];
				actor = new GamePiece(new Sprite(texture, x, y));
				actor.boundary = asteroid1Collision.clone();
				if(nextSize === 1) {
					actor.boundary.scale(MEDIUM_SCALE, MEDIUM_SCALE);
					actor.boundary.translate(x - MEDIUM_OFFSET, y - MEDIUM_OFFSET);
				} else {
					actor.boundary.scale(SMALL_SCALE, SMALL_SCALE);
					actor.boundary.translate(x - SMALL_OFFSET, y - SMALL_OFFSET);
				}
			} else if(Math.random() < RANDOM_HALF) {
				var texture = (nextSize === 1) ? textures[ASTEROID2M] : textures[ASTEROID2S];
				actor = new GamePiece(new Sprite(texture, x, y));
				actor.boundary = asteroid2Collision.clone();
				if(nextSize === 1) {
					actor.boundary.scale(MEDIUM_SCALE, MEDIUM_SCALE);
					actor.boundary.translate(x - MEDIUM_OFFSET, y - MEDIUM_OFFSET);
				} else {
					actor.boundary.scale(SMALL_SCALE, SMALL_SCALE);
					actor.boundary.translate(x - SMALL_OFFSET, y - SMALL_OFFSET);
				}
			} else {
				var texture = (nextSize === 1) ? textures[ASTEROID3M] : textures[ASTEROID3S];
				actor = new GamePiece(new Sprite(texture, x, y));
				actor.boundary = asteroid3Collision.clone();
				if(nextSize === 1) {
					actor.boundary.scale(MEDIUM_SCALE, MEDIUM_SCALE);
					actor.boundary.translate(x - MEDIUM_OFFSET, y - MEDIUM_OFFSET);
				} else {
					actor.boundary.scale(SMALL_SCALE, SMALL_SCALE);
					actor.boundary.translate(x - SMALL_OFFSET, y - SMALL_OFFSET);
				}
			}
			var rotation = (Math.random() < RANDOM_THIRD) ? 1 : ((Math.random() < RANDOM_HALF) ? 2 : 3);
			rotation *= (Math.random() < RANDOM_HALF) ? -1 : 1;
			particleSystem.spawnParticle(actor, destroyAsteroid, speed, r1, r2, rotation, actor.sprite.x, actor.sprite.y);
			asteroids.push(actor);
		}
	}
	score += SIZE_SCORE_MULTIPLIER * Math.pow(2, nextSize - 1) + LEVEL_SCORE_MULTIPLIER * level;
	scoreText.fillText = "Score: " + score;
}

function spawn(asteroid, collision) {
    var directionX = (Math.random() < RANDOM_HALF) ? Math.random() : -Math.random();
    var directionY = (Math.random() < RANDOM_HALF) ? Math.random() : -Math.random();
    var speed = (Math.random() < RANDOM_HALF) ? 2 + level * LEVEL_MULTIPLIER: 1 + level * LEVEL_MULTIPLIER;
    var rotation = (Math.random() < RANDOM_THIRD) ? 1 : ((Math.random() < RANDOM_HALF) ? 2 : 3);
    rotation *= (Math.random() < RANDOM_HALF) ? -1 : 1;
    asteroid.boundary = collision.clone();
    asteroid.boundary.translate(asteroid.sprite.x, asteroid.sprite.y);
    asteroids.push(asteroid);
    particleSystem.spawnParticle(asteroid, destroyAsteroid, speed, directionX, directionY, rotation, asteroid.sprite.x, asteroid.sprite.Y);
}

function spawnAsteroids() {
	a1 = new GamePiece(new Sprite(textures[ASTEROID1], 100, 100));
	spawn(a1, asteroid1Collision);

	a2 = new GamePiece(new Sprite(textures[ASTEROID2], 440, 100));
    spawn(a2, asteroid2Collision);

	a3 = new GamePiece(new Sprite(textures[ASTEROID3], 100, 340));
    spawn(a3, asteroid3Collision);

	a4 = new GamePiece(new Sprite(textures[ASTEROID1], 440, 340));
    spawn(a4, asteroid1Collision);
}

function menuScreen() {
	particleSystem = new ParticleSystem(0, 0);
	spawnAsteroids();
	stage.addParticleSystem(particleSystem);
	
	stage.addDrawable(titleText);
	stage.addDrawable(instructions);
}

function beginLevel() {
	asteroids = [];
	bullets = [];
	
	particleSystem = new ParticleSystem(0, 0);
	spawnAsteroids();
	stage.addParticleSystem(particleSystem);
	
	shipSprite = new Sprite(textures[SHIP], 300, 200);
	ship = new GamePiece(shipSprite);
	ship.boundary = shipCollision.clone();
    ship.speed = 1;
	stage.addActor(ship);
	
	scoreText = new Text("Score: " + score, 10, 30, "white", "20px Courier New, Courier, monospace");
	highscoreText = new Text("Highscore: " + highScore, 10, 60, "white", "20px Courier New, Courier, monospace");
	livesText = new Text("Lives: " + lives, 10, 90, "white", "20px Courier New, Courier, monospace");
	
	stage.addDrawable(scoreText);
	stage.addDrawable(highscoreText);
	stage.addDrawable(livesText);
}

// update draw
function draw() {
    // draw Background
	var img = new Image();
	img.src = textures[BACKGROUND].image.src;
    context.drawImage(img, 0, 0);

    stage.draw();
}

function gameKeyCheck() {
    //Actions for when the left key is pressed.
    //Ship is rotated counter-clockwise
    if(keyboard2.getKeyCode(KEY_LEFT)) {
        ship.rotate(-ROTATE_SPEED);
    }

    //Actions for when the right key is pressed.
    //Ship is rotated clockwise
    if(keyboard2.getKeyCode(KEY_RIGHT)) {
        ship.rotate(ROTATE_SPEED);
    }

    //Actions for when the ctrl key is pressed.
    //Bullets are fired with a delay between, but only 4 can be on the screen at once.
    if(keyboard2.getKeyCode(KEY_CTRL)) {
        if(bulletFirable && alive && bullets.length < 4) {
            var x = Math.cos(ship.sprite.orientation * Math.PI / DEGREES_TO_RADIANS);
            var y = Math.sin(ship.sprite.orientation * Math.PI / DEGREES_TO_RADIANS);
            var bullet = new GamePiece(new Sprite(textures[BULLET], (ship.sprite.x + ship.sprite.getWidth()/2 - 3) + BULLET_X_OFFSET * x, (ship.sprite.y + ship.sprite.getHeight()/2 - 2) + BULLET_Y_OFFSET * y));
            bullet.sprite.orientation = ship.sprite.orientation;
            bullet.speed = BULLET_SPEED;
            bullet.direction.x = x + ship.direction.x/bullet.speed;
            bullet.direction.y = y + ship.direction.y/bullet.speed;
            stage.addActor(bullet);
            bullets.push(bullet);
            bulletFirable = false;

            var bulletCollision = new Boundary(bullet.sprite.x, bullet.sprite.y + 2, bullet.sprite.x + 5, bullet.sprite.y + 2);
            bulletCollision.addPoint(bullet.sprite.x + 5, bullet.sprite.y + 3);
            bulletCollision.addPoint(bullet.sprite.x, bullet.sprite.y + 3);
            bulletCollision.addPoint(bullet.sprite.x, bullet.sprite.y + 2);
            bulletCollision.midPoint = new Point(bullet.sprite.x + bullet.sprite.image.width/2, bullet.sprite.y + bullet.sprite.image.height/2);
            bulletCollision.rotate(bullet.sprite.orientation);
            bullet.boundary = bulletCollision;

            var bulletTimer = new GameTimer(BULLET_FIRE_DELAY * MSEC_TO_SEC);
            bulletTimer.action = function() {
                bulletFirable = true;
            }
            addTimer(bulletTimer);
        }
    }

    //Actions for when the up key is pressed.
    //Ship moves forward and ship sprite changes to Ship_Thrust sprite sheet
    if(keyboard2.getKeyCode(KEY_UP)) {
        ship.isSpriteSheet = true;
        shipThrustSprite.x = ship.sprite.x;
        shipThrustSprite.y = ship.sprite.y;
        shipThrustSprite.orientation = ship.sprite.orientation;
        ship.sprite = shipThrustSprite;

        ship.direction.x += SHIP_ACCELERATION * Math.cos(ship.sprite.orientation * Math.PI / DEGREES_TO_RADIANS);
        ship.direction.y += SHIP_ACCELERATION * Math.sin(ship.sprite.orientation * Math.PI / DEGREES_TO_RADIANS);
        var normalized = limitVector(ship.direction.x, ship.direction.y, MAX_SHIP_SPEED);
        shipMag = Math.sqrt(ship.direction.x * ship.direction.x + ship.direction.y * ship.direction.y);
        normMag = Math.sqrt(normalized.x * normalized.x + normalized.y * normalized.y);

        if(shipMag > normMag) ship.direction = normalized;
    } else {
        if(ship.isSpriteSheet) {
            ship.isSpriteSheet = false;
            shipSprite.x = ship.sprite.x;
            shipSprite.y = ship.sprite.y;
            shipSprite.orientation = ship.sprite.orientation;
            ship.sprite = shipSprite;
        }
    }
}

function gameCollisionCheck() {
    //ship + wall collision
    var index;
    if((index = ship.boundary.checkBoundaryCollision(wallBoundary)) !== null) {
        var line = wallBoundary.boundingLines[index];
        var slope = line.slope();
        if(Object.is(slope, 0)) slope = 1;
        if(Object.is(slope, 0/-1)) slope = -1;

        if(slope === Infinity || slope === -Infinity) {
            while(slope === Infinity && ship.boundary.checkCollision(line)) {
                ship.sprite.x++;
                ship.boundary.translate(1, 0);
            }

            while(slope === -Infinity && ship.boundary.checkCollision(line)) {
                ship.sprite.x--;
                ship.boundary.translate(-1, 0);
            }

            ship.direction.x = -COLLISION_DAMPENING * ship.direction.x;
            ship.direction.y *= COLLISION_DAMPENING;
        } else if(slope === 1 || slope === -1) {
            while(slope === -1 && ship.boundary.checkCollision(line)) {
                ship.sprite.y++;
                ship.boundary.translate(0, 1);
            }

            while(slope === 1 && ship.boundary.checkCollision(line)) {
                ship.sprite.y--;
                ship.boundary.translate(0, -1);
            }

            ship.direction.y = -COLLISION_DAMPENING * ship.direction.y;
            ship.direction.x *= COLLISION_DAMPENING;
        }

    }

    //Asteroid + Wall collision
    for(var i = 0; i < asteroids.length; i++) {
        if((index = asteroids[i].boundary.checkBoundaryCollision(wallBoundary)) !== null) {
            var line = wallBoundary.boundingLines[index];
            var slope = line.slope();
            if(Object.is(slope, 0)) slope = 1;
            if(Object.is(slope, 0/-1)) slope = -1;

            if(slope === Infinity || slope === -Infinity) {
                while(slope === Infinity && asteroids[i].boundary.checkCollision(line)) {
                    asteroids[i].sprite.x++;
                    asteroids[i].boundary.translate(1, 0);
                }

                while(slope === -Infinity && asteroids[i].boundary.checkCollision(line)) {
                    asteroids[i].sprite.x--;
                    asteroids[i].boundary.translate(-1, 0);
                }

                asteroids[i].direction.x = -asteroids[i].direction.x;
            } else if(slope === 1 || slope === -1) {
                while(slope === -1 && asteroids[i].boundary.checkCollision(line)) {
                    asteroids[i].sprite.y++;
                    asteroids[i].boundary.translate(0, 1);
                }

                while(slope === 1 && asteroids[i].boundary.checkCollision(line)) {
                    asteroids[i].sprite.y--;
                    asteroids[i].boundary.translate(0, -1);
                }

                asteroids[i].direction.y = -asteroids[i].direction.y;
            }

        }
    }

    //Bullet + Asteroid Collision
    for(var i = 0; i < bullets.length; i++) {
        var collide = false;
        for(var j = 0; j < 40; j++) {
            bullets[i].boundary.translate(-0.25 * bullets[i].direction.x, -0.25 * bullets[i].direction.y);
            for(var k = 0; k < asteroids.length; k++) {
                if(bullets[i].boundary.checkBoundaryCollision(asteroids[k].boundary) !== null) {
                    collide = true;
                    particleSystem.destroyParticle(asteroids[k]);
                    asteroids.splice(k, 1);
                    break;
                }
            }
            if(collide) break;
        }
        if(collide) {
            stage.removeActor(bullets[i]);
            bullets.splice(i, 1);
        } else {
            bullets[i].boundary.translate(BULLET_SPEED * bullets[i].direction.x, BULLET_SPEED * bullets[i].direction.y);
        }
    }

    //Ship + Asteroid Collision
    for(var i = 0; i < asteroids.length; i++) {
        if(alive && ship.boundary.checkBoundaryCollision(asteroids[i].boundary) !== null) {
            stage.removeActor(ship);
            alive = false;
            lives--;
            var spawnTimer = new GameTimer(SPAWN_DELAY * MSEC_TO_SEC);
            spawnTimer.action = function() {
                if(lives > 0) {
                    alive = true;
                    shipSprite = new Sprite(textures[SHIP], 300, 200);
                    ship = new GamePiece(shipSprite);
                    ship.boundary = shipCollision.clone();
                    ship.speed = 1;
                    stage.addActor(ship);
                    livesText.fillText = "Lives: " + lives;
                } else {
                    stage.removeDrawable(livesText);
                    stage.addDrawable(new Text("GAME OVER", 210, 220, "white", "30px Verdana"));
                    stage.addDrawable(new Text("Press Space to continue", 212, 270, "white", "15px Verdana"));
                }
            }
            addTimer(spawnTimer);
            break;
        }
    }
}

// update loop
function update() {
	
	switch(screen) {
		
	case MENU:
		//Actions for when the right key is pressed.
		//Starts game from main menu.
		if(keyboard2.getKeyCode(KEY_SPACE)) {
			if(!loading) {
				screen = GAME;
				stage.clearObjects();
				level = 0;
				alive = true;
				lives = 3;
				score = 0;
				win = false;
				beginLevel();
				break;
			}
		}
		
		stage.update();
	
		//Asteroid + Wall collision
		for(var i = 0; i < asteroids.length; i++) {
			if((index = asteroids[i].boundary.checkBoundaryCollision(wallBoundary)) !== null) {
				var line = wallBoundary.boundingLines[index];
				var slope = line.slope();
				if(Object.is(slope, 0)) slope = 1;
				if(Object.is(slope, 0/-1)) slope = -1;
				
				if(slope === Infinity || slope === -Infinity) {
					while(slope === Infinity && asteroids[i].boundary.checkCollision(line)) {
						asteroids[i].sprite.x++;
						asteroids[i].boundary.translate(1, 0);
					}
					
					while(slope === -Infinity && asteroids[i].boundary.checkCollision(line)) {
						asteroids[i].sprite.x--;
						asteroids[i].boundary.translate(-1, 0);
					}
					
					asteroids[i].direction.x = -asteroids[i].direction.x;
				} else if(slope === 1 || slope === -1) {
					while(slope === -1 && asteroids[i].boundary.checkCollision(line)) {
						asteroids[i].sprite.y++;
						asteroids[i].boundary.translate(0, 1);
					}
					
					while(slope === 1 && asteroids[i].boundary.checkCollision(line)) {
						asteroids[i].sprite.y--;
						asteroids[i].boundary.translate(0, -1);
					}
					
					asteroids[i].direction.y = -asteroids[i].direction.y;
				}
				
			}
		}
		break;
		
	case GAME:
		//Actions for when the right key is pressed.
        //If you've won, it continues to the next level.
        //If you've lost, it returns to the main menu.
        if(keyboard2.getKeyCode(KEY_SPACE)) {
            if(win) {
                level++;
                win = false;
                stage.removeActor(ship);
                stage.removeDrawable(scoreText);
                stage.removeDrawable(highscoreText);
                stage.removeDrawable(livesText);
                beginLevel();
                stage.removeDrawable(victoryText);
                stage.removeDrawable(continueText);
            } else if(lives <= 0) {
                screen = MENU;
                stage.clearObjects();
                if(score > highScore) {
                    highScore = score;
                    setLocalStorage("asteroids_highscore", highScore);
                }
                menuScreen();
                loading = true;
                var loadTimer = new GameTimer(LOAD_DELAY * MSEC_TO_SEC);
                loadTimer.action = function() {
                    loading = false;
                }
                addTimer(loadTimer);
                break;
            }
        }

        gameKeyCheck();
		
		stage.update();

        gameCollisionCheck();
		
		//Check for Bullets Leaving View
		for(var i = 0; i < bullets.length; i++) {
			if(!bullets[i].inView) {
				stage.removeActor(bullets[i]);
				bullets.splice(i, 1);
			}
		}
		
		//Victory Conditions
		if(!win && asteroids.length <= 0) {
			win = true;
			victoryText = new Text("Victory!", 237, 220, "white", "30px Verdana");
			continueText = new Text("Press Space to continue", 212, 270, "white", "15px Verdana");
			stage.addDrawable(victoryText);
			stage.addDrawable(continueText);
		}
		break;
	}
}

function limitVector(x, y, l) {
	var mag = Math.sqrt(x*x + y*y);
	var div = mag / l;
	x /= div;
	y /= div;
	return {x: x, y: y};
}

///////////////////////////
/////INITIATE THE GAME/////
///////////////////////////

const MENU = 0, GAME = 1, KEY_LEFT = 37, KEY_RIGHT = 39, KEY_DOWN = 40, KEY_UP = 38, KEY_SPACE = 32, KEY_CTRL = 17;
const SHIP_ACCELERATION = 0.20, MAX_SHIP_SPEED = 6, ROTATE_SPEED = 9, COLLISION_DAMPENING = 0.3, BULLET_FIRE_DELAY = 0.125, SPAWN_DELAY = 1, LOAD_DELAY = 0.5, MSEC_TO_SEC = 1000;
const LARGE_WIDTH = 60, MEDIUM_WIDTH = 40, WIDTH_DIFFERENCE = 20, RANDOM_HALF = 0.5, RANDOM_THIRD = 1/3, LEVEL_MULTIPLIER = 0.5, MEDIUM_SCALE = 2/3, MEDIUM_OFFSET = 10;
const SMALL_SCALE = 1/3, SMALL_OFFSET = 20, LEVEL_SCORE_MULTIPLIER = 50, SIZE_SCORE_MULTIPLIER = 25, DEGREES_TO_RADIANS = 180, BULLET_X_OFFSET = 7, BULLET_Y_OFFSET = 8, BULLET_SPEED = 10;

var textures = [
    new Texture("Ship.png", 21, 20),
	new Texture("Bullet.png", 5, 5),
	new Texture("Asteroid_1.png", 60, 60),
	new Texture("Asteroid_2.png", 60, 60),
	new Texture("Asteroid_3.png", 60, 60),
	new Texture("Asteroid_1.png", 40, 40),
	new Texture("Asteroid_2.png", 40, 40),
	new Texture("Asteroid_3.png", 40, 40),
	new Texture("Asteroid_1.png", 20, 20),
	new Texture("Asteroid_2.png", 20, 20),
	new Texture("Asteroid_3.png", 20, 20),
	new Texture("Space_Background.jpeg", 600, 500)
];
const SHIP = 0, BULLET = 1, ASTEROID1 = 2, ASTEROID2 = 3, ASTEROID3 = 4, ASTEROID1M = 5, ASTEROID2M = 6, ASTEROID3M = 7, ASTEROID1S = 8, ASTEROID2S = 9, ASTEROID3S = 10, BACKGROUND = 11;

var bullets = [];
var asteroids = [];
var level = 0;
var alive = true;
var lives = 3;
var score = 0;
var highScore = localStorage.getItem("asteroids_highscore");
if(highScore === null) highScore = 0;
var win = false;
var screen = MENU;
var loading = false;

var ship;
var a1, a2, a3, a4;

//////////////////////
/////HUD ELEMENTS/////
//////////////////////
var scoreText = new Text("Score: " + score, 10, 30, "white", "20px Courier New, Courier, monospace");
var highscoreText = new Text("Score: " + highScore, 10, 60, "white", "20px Courier New, Courier, monospace");
var livesText = new Text("Lives: " + lives, 10, 90, "white", "20px Courier New, Courier, monospace");
var highscoreText = new Text("Score: " + score, 10, 30, "white", "20px Courier New, Courier, monospace");
var titleText = new Text("Asteroids", 140, 160, "white", "70px Verdana");
var instructions = new Text("Press Space to begin", 195, 370, "white", "20px Verdana");

///////////////////////////////////////////
/////ESTABLISHING BASE BOUNDING SHAPES/////
///////////////////////////////////////////
var wallBoundary = new Boundary(0, 0, 0, 500);
wallBoundary.addPoints(600, 500, 600, 0, 0, 0);

var shipSprite = new Sprite(textures[SHIP], 300, 200);
ship = new GamePiece(shipSprite);
var shipThrustSprite = new SpriteSheet("Ship_Thrust.png", 21, 20, 1, 2, 300, 200, 106);

var shipCollision = new Boundary(300, 200, 321, 211);
shipCollision.addPoints(299, 221, 304, 210, 300, 200);
shipCollision.midPoint = new Point(ship.sprite.x + ship.sprite.image.width/2, ship.sprite.y + ship.sprite.image.height/2);

var asteroid1Collision = new Boundary(19, 4, 4, 18);
asteroid1Collision.addPoints(2, 32, 8, 49, 28, 59,
							 37, 55, 45, 58, 56, 51,
							 53, 37, 58, 27, 46, 20,
							 55, 4, 35, 1, 19, 4);
asteroid1Collision.midPoint = new Point(30, 30);

var asteroid2Collision = new Boundary(15, 11, 11, 24);
asteroid2Collision.addPoints(3, 27, 2, 45, 7, 46,
							 18, 58, 31, 56, 38, 49,
							 48, 53, 55, 39, 55, 15,
							 59, 11, 52, 4, 43, 6,
							 37, 2, 28, 8, 25, 8,
							 15, 11);
asteroid2Collision.midPoint = new Point(30, 30);

var asteroid3Collision = new Boundary(16, 3, 5, 18);
asteroid3Collision.addPoints(1, 40, 6, 53, 13, 57,
							 45, 58, 48, 55, 54, 58,
							 59, 42, 49, 19, 49, 12,
							 41, 4, 27, 1, 16, 3);
asteroid3Collision.midPoint = new Point(30, 30);

var bulletFirable = true;

///////////////////////////////////////////////
/////INITIALIZING ASTEROID STARTING POINTS/////
///////////////////////////////////////////////

var particleSystem = new ParticleSystem(0, 0);

menuScreen();

//beginLevel();

// start the game
// calls the update and draw loop
startGame(30);