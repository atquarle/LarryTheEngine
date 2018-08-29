var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mouseup", handleMouseUp);
canvas.addEventListener("mousemove", handleMouseMove);

// ECMA6 javascript class syntax
// This is much easier to read than older javascript class/object syntax
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes


class Texture {
    // load a texture (image) from the Texture folder
    constructor(src, width = 10, height = 10) {
        // find full path to image
        src = "./Textures/" + src;

        // create texture
        this.image = new Image();
        this.image.width = width;
        this.image.height = height;
        this.image.src = src;
    }

    // [0,0] is top-left of canvas
    draw(x = 0, y = 0) {
        context.drawImage(this.image, x, y, this.image.width, this.image.height);
    }
}

// contains a texture and a position
class Sprite {
    // Anchor point is the location the image would rotate around. Point [0,0] is .. (bottom left?)
    constructor(texture, x, y) {
        this.image = texture.image;
        this.x = x;
        this.y = y;
        //this.anchorPointX = anchorPointX;
        //this.anchorPointY = anchorPointY;
    }

    draw() {
        context.drawImage(this.image, this.x, this.y, this.image.width, this.image.height);
    }
}

// Is a object on the stage (in the game world)
class Actor {
    constructor(sprite) {
        this.sprite = sprite;
    }

    update() {

    }

    draw() {

    }
}

// simply two variables that is used for miscellaneous stuff
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// used to update and draw the screen
class Stage {
    addActor() {

    }

    // update the stage actors
    update() {

    }

    // draw the stage actors
    draw() {

    }

    // draw a texture
    drawTexture(x, y) {
        texture.draw(context, x, y);
    }
}


// only a single mouse object is ever used
class Mouse {
    constructor() {
        let p = new Point(0, 0);
        this.x = p.x;
        this.y = p.y;
        this.isPressed = false;
    }
}
var mouse = new Mouse();


// checks if the point is within the sprite
function spriteOverlapsPoint(sprite, x, y) {
    var minX = sprite.x;
    var maxX = sprite.x + sprite.image.width;
    var minY = sprite.y;
    var maxY = sprite.y + sprite.image.height;
    if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
        return true;
    }
    return false;
}

// simply checks the corners of the sprite
function spriteOverlapsSprite(sprite1, sprite2) {
    return (
        spriteOverlapsPoint(sprite1, sprite2.x - sprite2.image.width / 2, sprite2.y - sprite2.image.height/2) ||
        spriteOverlapsPoint(sprite1, sprite2.x + sprite2.image.width - sprite2.image.width / 2, sprite2.y - sprite2.image.height/2) ||
        spriteOverlapsPoint(sprite1, sprite2.x - sprite2.image.width / 2, sprite2.y + sprite2.image.height - sprite2.image.height/2) ||
        spriteOverlapsPoint(sprite1, sprite2.x + sprite2.image.width - sprite2.image.width / 2, sprite2.y + sprite2.image.height - sprite2.image.height/2)
    );
}

//////////////////////////////////////////////////////////////////////////////////////
//This is a class that you can use for areas you want to have collision but no image//
//////////////////////////////////////////////////////////////////////////////////////
function Box(x, y, width, height) {
    this.X = x;
    this.Y = y;
    this.width = width;
    this.height = height;
}

///////////////////////////////////////////////////////////////
//When the user presses the mouse button down, the mouse     //
//location is stored and the mousePressed flag is set to true//
///////////////////////////////////////////////////////////////
function handleMouseDown(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.isPressed = true;
}

///////////////////////////////////////////////////////////////
//When the user moves the mouse, the mouse location is stored//
///////////////////////////////////////////////////////////////
function handleMouseMove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}

///////////////////////////////////////////////////////////////
//When the user releases the mouse button, the mouse location//
//is stored and the mouseDown flag is set to false           //
///////////////////////////////////////////////////////////////
function handleMouseUp(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.isPressed = false;
}

function gameLoop() {
    // update
    engineUpdate();
    update();
    // draw
    engineDraw();
    draw();
}

function engineUpdate() {
}

function engineDraw() {
    // clear the screen
    canvas.width = canvas.width;
}

// start the main game loop
function startGame() {
    setInterval(gameLoop, 30);
}