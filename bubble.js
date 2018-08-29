////////////////////////
//// by Teddy Reger ////
////////////////////////

var keyboard = new Keyboard();
var keyboard2 = new Keyboard();

var resources = new Array();

function addResource(name, src) {
    src = src;

    for(var i = 0; i < resources.length; i++) {
        if(resources[i].name === name) {
            console.log("Resource with the name, \"" + name + "\", already exists.");
            return;
        }
    }
    var resource = {name: name, src: src};
    resources.push(resource);
}

function getSource(name) {
    for(var i = 0; i < resources.length; i++) {
        if(resources[i].name === name) return resources[i].src;
    }
    return null;
}

function LoadResources() {
    addResource("ship", "https://opengameart.org/sites/default/files/spaceship.pod_.1.green_.png");
    addResource("bubble", "http://www.xnadevelopment.com/sprites/thumbs/thumb_Bubble.png");
    addResource("basketball", "http://vignette2.wikia.nocookie.net/clubpenguin/images/3/32/Basketball_clothing_icon_ID_719.png/revision/latest?cb=20150118221419");
    addResource("soccerball", "https://image.flaticon.com/icons/png/512/33/33736.png");
    addResource("tennisball", "http://www.freepngimg.com/download/tennis_ball/2-2-tennis-ball-png-image.png")
    addResource("x", "https://cdn.pixabay.com/photo/2012/04/12/20/12/x-30465_960_720.png");
}

LoadResources();

// space key
const SPACE = 32;
// left arrow key
const LEFT_ARROW = 37;
// up arrow key
const UP_ARROW = 38;
// right arrow key
const RIGHT_ARROW = 39;
// L key
const LEVEL = 76;
// Multiply to convert from degrees to radians
const DEGREES_TO_RADIANS = Math.PI / 180;
// Degrees in a full rotation
const FULL_ROTATION = 360;
// Angle for arrow facing right.
const HORIZ_RIGHT = Math.PI / 2;
// Angle for arrow facing left.
const HORIZ_LEFT = Math.PI / -2;
// Width of bubble
const BUBBLE_WIDTH = canvas.width/28;
// Height of bubble
const BUBBLE_HEIGHT = canvas.height/28;
// Number of rows and number of tiles per row
const TILE_COUNT = 20;
// Width of tile (bubble container)
const TILE_WIDTH = canvas.width/TILE_COUNT;
// Height of tile (bubble container)
const TILE_HEIGHT = canvas.height/TILE_COUNT;
// Width of x marker
const X_WIDTH = TILE_WIDTH * 2;
// Height of x marker
const X_HEIGHT = TILE_WIDTH * 2;
// Maximum number of rows
const MAX_ROWS = 15;
// Number of pixels to update position by
const PIXEL_UPDATE = 6;
// Score is 20 pixels tall
const SCORE_HEIGHT = 20;

canvas = document.getElementById("canvas");
context = canvas.getContext('2d');

//////////////////////////////////////////////////////////////////
//This is a class that represents a sprite that can be displayed//
//////////////////////////////////////////////////////////////////
class BubbleSprite {
    constructor(x, y, width, height, name, src) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.name = name;
        this.image = new Image();
        this.image.width = width;
        this.image.height = height;
        this.image.src = src;
    }

    getWidth() {
        return this.image.width;
    }

    getHeight() {
        return this.image.height;
    }
}

// Sprite of player
var shipSprite =  new BubbleSprite(canvas.width/2,canvas.height - canvas.height/10 ,canvas.width/10, canvas.height/10, "ship", getSource("ship"));
// Sprite of bubble player shoots.
var movingBubble = undefined;
// Last x position of moving bubble
var prevPositionX;
// last y position of moving bubble
var prevPositionY;
// boolean keeping track of whether player can shoot or not
var ableToShoot = true;
// keeps track of x motion for movingBubble
var shipAngle = 0;
// array for storing collided bubbles
var graph = new Array();
// array for keeping track of how many times player failed
var xArray = new Array();
// array for storing types of bubbles
var bubbleName = ["basketball", "soccerball", "tennisball"];
// Creates four rows of bubbles to start out.
setUpGraph();
// Establishes what type of ball will spawn next
var rand = Math.floor(Math.random() * (bubbleName.length));
// Keeps track of what bubble will be shot next.
var stillBubble = new BubbleSprite(shipSprite.x - BUBBLE_WIDTH / 2, shipSprite.y - BUBBLE_HEIGHT / 2, BUBBLE_WIDTH, BUBBLE_HEIGHT, bubbleName[rand], getSource(bubbleName[rand]));
// Number of bubbles popped
var score = 0;
// Is level 2 turned on or off?
var level = false;

document.addEventListener("keydown", handleKey);



// Contains a sprite and the values for updating sprite position.
function BubbleActor(sprite, xUpdate, yUpdate) {
    this.sprite = sprite;
    this.xUpdate = xUpdate;
    this.yUpdate = yUpdate;
}

// Catch player pushing a key
function handleKey(e) {
    var key = e.keyCode ? e.keyCode : e.which;

    // Ship will rotate with left or right.
    // Ship will move forward if up.
    if (key === LEFT_ARROW) { // left arrow
        changeAngle(-2);
    } else if (key === UP_ARROW) { // up arrow
    } else if (key === RIGHT_ARROW) { // right arrow
        changeAngle(2);
    } else if (key === SPACE && ableToShoot ) { // space button
        // actor contains bubble sprite and bubble position updaters, random image
        movingBubble = new BubbleActor(new BubbleSprite(shipSprite.x - BUBBLE_WIDTH / 2, shipSprite.y - BUBBLE_HEIGHT / 2, BUBBLE_WIDTH, BUBBLE_HEIGHT, bubbleName[rand], getSource(bubbleName[rand])), calcBubbleXUpdate(), calcBubbleYUpdate());
        ableToShoot = false; // Wait until bubble stops to shoot again.
        rand = Math.floor(Math.random() * (bubbleName.length)); // determine next ball.
        stillBubble = new BubbleSprite(shipSprite.x - BUBBLE_WIDTH / 2, shipSprite.y - BUBBLE_HEIGHT / 2, BUBBLE_WIDTH, BUBBLE_HEIGHT, bubbleName[rand], getSource(bubbleName[rand]));
    } else if (key === LEVEL) {
        if (!level) {
            bubbleName.push("bubble");
            restart();
            level = true;
        } else {
            bubbleName.splice(bubbleName.length - 1, 1);
            restart();
            level = false;
        }

    } else {
        // do nothing.
    }
}

// Creates row arrays, fills first four rows with bubbles.
function setUpGraph() {
    for (var i = 0; i < TILE_COUNT; i++) {
        graph[i] = new Array();
        // Fill the first four rows with bubbles.
        if (i < 4) {
            for (var j = 0; j < TILE_COUNT; j++) {
                rand = Math.floor(Math.random() * (bubbleName.length));
                graph[i].push(new BubbleActor(new BubbleSprite(j * TILE_WIDTH, i * TILE_HEIGHT, BUBBLE_WIDTH, BUBBLE_HEIGHT, bubbleName[rand], getSource(bubbleName[rand])), 0, 0));
            }
        }
    }
}

function restart() {
    graph = new Array();
    xArray = new Array();
    setUpGraph();
    rand = Math.floor(Math.random() * (bubbleName.length));
    stillBubble = new BubbleSprite(shipSprite.x - BUBBLE_WIDTH / 2, shipSprite.y - 	BUBBLE_HEIGHT / 2, BUBBLE_WIDTH, BUBBLE_HEIGHT, bubbleName[rand], getSource(bubbleName[rand]));
    score = 0;
}

// Adds the given number of rows to the bottom of the graph.
function addRowsToGraph(rowsToAdd) {
    // Determine number of rows already in graph
    var rowCount = 0;
    var temp = graph;
    graph = new Array();
    // Initialize each row.
    for (var i = 0; i < TILE_COUNT; i++) {
        graph.push(new Array());
        if (i < rowsToAdd) {
            // Put in new rows
            for (var j = 0; j < TILE_COUNT; j++) {
                rand = Math.floor(Math.random() * (bubbleName.length));
                graph[i][j] = new BubbleActor(new BubbleSprite(j * TILE_WIDTH, i * TILE_HEIGHT, BUBBLE_WIDTH, BUBBLE_HEIGHT, bubbleName[rand], getSource(bubbleName[rand])), 0, 0);
            }
        } else {
            // Copy old rows over
            graph[i] = temp[i - rowsToAdd];
            // update x and y position
            for (var j = 0; j < graph[i].length; j++) {
                if (graph[i][j] !== undefined) {
                    graph[i][j].sprite.x = j * TILE_WIDTH;
                    graph[i][j].sprite.y = i * TILE_HEIGHT;
                }
            }
        }
        stillBubble = new BubbleSprite(shipSprite.x - BUBBLE_WIDTH / 2, shipSprite.y - 	BUBBLE_HEIGHT / 2, BUBBLE_WIDTH, BUBBLE_HEIGHT, bubbleName[rand], getSource(bubbleName[rand])); // sets still bubble equal to rand
        if(i > MAX_ROWS && graph[i].length > 0) {
            restart();
            break;
        }
    }
}

function changeAngle(change) {
    // Add change to angle.
    shipAngle += change * DEGREES_TO_RADIANS;
    // Angle cannot go past horizontal right and left.
    if (shipAngle > HORIZ_RIGHT) {
        shipAngle = HORIZ_RIGHT;
    } else if (shipAngle < HORIZ_LEFT) {
        shipAngle = HORIZ_LEFT;
    }
}

function calcBubbleXUpdate() {
    return PIXEL_UPDATE * Math.sin(shipAngle);
}

function calcBubbleYUpdate() {
    return -PIXEL_UPDATE * Math.cos(shipAngle);
}

// Stops movement of bubble.
// Adds bubble to graph.
function addBubbleToGraph(bubble) {
    bubble.xUpdate = 0;
    bubble.yUpdate = 0;
    ableToShoot = true; // Bubble stopped moving, can shoot again
    var yVal = bubble.sprite.y / TILE_HEIGHT;
    var xVal = bubble.sprite.x / TILE_WIDTH;
    // if no equivalent balls nearby, do nothing.
    var del = deleteLikeSprites(xVal,yVal,bubble.sprite.name,0);
    if (del <= 1) {
        graph[yVal][xVal] = bubble;
        xArray.push(new BubbleSprite(TILE_WIDTH * (xArray.length + 1) + X_WIDTH * xArray.length, canvas.height - X_HEIGHT, X_WIDTH, X_HEIGHT, "x", getSource("x")));
    } else {
        score += del;
    }
}

// Look for the sprites around the given position with equivalent images.
// Call this recursive method for sprites with equivalent images.
function deleteLikeSprites(x, y, name) {
    // Delete the sprite at the given position to avoid revisited recursion.
    graph[y][x] = undefined;
    var rtn = 1;
    // Need to check all sprites that surround the given position
    // if y - 1 out of bounds, start with y.
    // stop checking after y + 1 or stop checking if i is out of bounds.
    for (var i = (y - 1 >= 0) ? y - 1: y; (i <= y + 1) && (i < graph.length); i++) {
        // see description of y for loop
        for (var j = (x - 1 >= 0) ? x - 1: x; (j <= x + 1) && (j < graph[i].length); j++) {
            // Is name of adjacent sprite equivalent to given name? If so, recursion.
            if (graph[i][j] instanceof BubbleActor && name === graph[i][j].sprite.name) {
                rtn += deleteLikeSprites(j, i, name);
            }
        }
    }
    return rtn;

}

// Find position in graph based on physical position
function findGraphIndex(position, width) {
    return (position - (position % width)) / width;
}

// update player and bubbles
function update() {
    if (movingBubble !== undefined) {
        // If bubble hits sides of canvas, bounce
        if (movingBubble.sprite.x <= 0 || movingBubble.sprite.x + BUBBLE_WIDTH >= canvas.width) {
            movingBubble.xUpdate *= -1;
        }
        // If bubble hits top of canvas, stop. Add to graph.
        if (movingBubble.sprite.y < 0) {
            movingBubble.sprite.x = roundPosition(movingBubble.sprite.x, TILE_WIDTH);
            movingBubble.sprite.y = 0;
            addBubbleToGraph(movingBubble);
            movingBubble = undefined;
        } else { // If bubble is moving, check to see if it collides with other bubbbles.
            // position of top left corner of bubble
            var xVal = findGraphIndex(movingBubble.sprite.X, TILE_WIDTH);
            var yVal = findGraphIndex(movingBubble.sprite.y, TILE_HEIGHT);
            // position of top right corner of bubble
            var rightXVal = findGraphIndex(movingBubble.sprite.x + BUBBLE_WIDTH, TILE_WIDTH);
            var rightYVal = findGraphIndex(movingBubble.sprite.y + BUBBLE_HEIGHT, TILE_HEIGHT);
            //if (graph[yVal][xVal] instanceof Actor || graph[rightYVal][rightXVal] instanceof BubbleActor) { // if in other bubble's tile,
            var left;
            var right;
            // Check if bubble is colliding with another bubble
            if ( (graph[yVal][xVal] instanceof BubbleActor && (left = checkCollision(graph[yVal][xVal].sprite, movingBubble.sprite))) || (graph[rightYVal][rightXVal] instanceof BubbleActor && (right = checkCollision(graph[rightYVal][rightXVal].sprite, movingBubble.sprite))) ) {
                // If bubble is colliding on the left side
                if (left) {
                    while (left) {
                        // move backward until in an empty tile
                        movingBubble.sprite.x -= movingBubble.xUpdate / PIXEL_UPDATE;
                        movingBubble.sprite.y -= movingBubble.yUpdate / PIXEL_UPDATE;
                        xVal = findGraphIndex(movingBubble.sprite.x, TILE_WIDTH);
                        yVal = findGraphIndex(movingBubble.sprite.y, TILE_HEIGHT);
                        if (graph[yVal][xVal] instanceof BubbleActor) {
                            left = true;
                        } else {
                            left = false;
                        }
                    }
                    movingBubble.sprite.x = xVal * TILE_WIDTH;
                    movingBubble.sprite.y = yVal * TILE_HEIGHT;
                } else { // if bubble is colliding on the right side
                    while (right) {
                        // move backward until in an empty tile
                        movingBubble.sprite.x -= movingBubble.xUpdate / PIXEL_UPDATE;
                        movingBubble.sprite.y -= movingBubble.yUpdate / PIXEL_UPDATE;
                        rightXVal = findGraphIndex(movingBubble.sprite.x + BUBBLE_WIDTH, TILE_WIDTH);
                        rightYVal = findGraphIndex(movingBubble.sprite.y + BUBBLE_HEIGHT, TILE_HEIGHT);
                        if (graph[rightYVal][rightXVal] instanceof BubbleActor) {
                            right = true;
                        } else {
                            right = false;
                        }
                    }
                    movingBubble.sprite.x = rightXVal * TILE_WIDTH;
                    movingBubble.sprite.y = rightYVal * TILE_HEIGHT;
                }
                // Add bubble to graph.
                addBubbleToGraph(movingBubble);
                // delete moving bubble
                movingBubble = undefined;
            }
        }
        // Update position of bubble.
        if (movingBubble !== undefined) {
            //store current position
            prevPositionX = movingBubble.sprite.x;
            prevPositionY = movingBubble.sprite.y;
            // update position
            movingBubble.sprite.x += movingBubble.xUpdate;
            movingBubble.sprite.y += movingBubble.yUpdate;
        }
        // Check if x count is greater than 2.
        if (xArray.length > 2) {
            xArray = new Array(); // Clear x's
            addRowsToGraph(2);
        }
    }
}

// Find the object's rounded position to fit given width / height
function roundPosition(position, objectWidth) {
    var remainder = position % objectWidth;
    var rtn;
    if (remainder >= objectWidth / 2) {
        rtn = position + objectWidth - remainder; // round up
    } else {
        rtn = position - remainder; // round down
    }
    return rtn;
}

function draw() {
    canvas.width = canvas.width;
    // Start rotate ship
    context.save();
    context.translate(shipSprite.x, shipSprite.y);
    context.rotate(shipAngle);
    context.drawImage(shipSprite.image, shipSprite.width / -2, shipSprite.height / -2, shipSprite.image.width, shipSprite.image.height);
    context.restore();
    // Draw bubbles in graph
    for (var i = 0; i < graph.length; i++) {
        for (var j = 0; j < graph[i].length; j++) {
            if (graph[i][j] instanceof BubbleActor) {
                context.drawImage(graph[i][j].sprite.image, graph[i][j].sprite.x, graph[i][j].sprite.y, graph[i][j].sprite.width, graph[i][j].sprite.height);
            }
        }
    }
    // End rotate ship
    if (movingBubble !== undefined) {
        context.drawImage(movingBubble.sprite.image, movingBubble.sprite.x, movingBubble.sprite.y, movingBubble.sprite.width, movingBubble.sprite.height);
    }
    // While not shooting, draw stillBubble.
    if (ableToShoot) {
        context.drawImage(stillBubble.image, stillBubble.x, stillBubble.y, stillBubble.width, stillBubble.height);
    }
    // Draw all x's
    for (var i = 0; i < xArray.length; i++) {
        context.drawImage(xArray[i].image, xArray[i].x, xArray[i].y, xArray[i].width, xArray[i].height);
    }
    var scoreText = new Text("Score: " + score, shipSprite.x + shipSprite.width, canvas.height - SCORE_HEIGHT, "#FF7700", "20px Verdana");
    scoreText.draw();
}

function game_loop() {
    update();
    draw();
}

setInterval(game_loop, 30); // normal is 30