// The starting code of a game.js file

// Initial code here
var textures = [
    new Texture("red.png", 64, 64),
    new Texture("blue.png", 64, 64),
    new Texture("yellow.png", 64, 64),
    new Texture("green.png", 64, 64),
    new Texture("orange.png", 64, 64),
    new Texture("purple.png", 64, 64)
];

const ELEMENT_COUNT = 6;
var elementUnlocked = [true, true, true, false, false, false];
var spriteDragging = null;
var spritesOnField = [];

const SIDE_BAR_X = 128;
const SIDE_BAR_COLOR = "black";
const SPACING = 80;
const RED = 0, BLUE = 1, YELLOW = 2, GREEN = 3, ORANGE = 4, PURPLE = 5;

class ColoredSprite extends Sprite {
    constructor(texture, x, y, color) {
        super(texture, x, y);
        this.color = color;
    }

    changeColor(color) {
        this.color = color;
        this.image = textures[color].image;

        if (!elementUnlocked[color]) {
            elementUnlocked[color] = true;
            spriteElements[color] = new ColoredSprite(textures[color], 20, 20 + color * SPACING, color);
        }
    }

    // return true if one is a certain color and the other one is another color
    coloredMix(coloredSprite, color1, color2) {
        return (this.color == color1 && coloredSprite.color == color2) ||
            (this.color == color2 && coloredSprite.color == color1);
    }
}

// create side-bar element sprites
var spriteElements = elementUnlocked.filter(function (state) {
    return state === true;
}).map(function (state, i) {
    return new ColoredSprite(textures[i], 20, 20 + i * SPACING);
});

// update loop
function update() {
    // handle clicks & sprite dragging
    if (mouse.isPressed) {
        if (!spriteDragging) {
            // select new element from the sidebar
            if (mouse.x < SIDE_BAR_X) {
                for (var i = 0; i < ELEMENT_COUNT; i++) {
                    if (elementUnlocked[i] && spriteOverlapsPoint(spriteElements[i], mouse.x, mouse.y)) {
                        spriteDragging = new ColoredSprite(textures[i], 20, 20 + i * SPACING, i);
                    }
                }
            }

            // pick up element from the field
            else {
                // pickup element from the field
                var fieldElementIndex = spritesOnField.findIndex(function (spriteOnField) {
                    return spriteOverlapsPoint(spriteOnField, mouse.x, mouse.y);
                });
                if (fieldElementIndex >= 0) {
                    spriteDragging = spritesOnField[fieldElementIndex];
                    spritesOnField.splice(fieldElementIndex, 1);
                }
            }
        }
    }

    else {
        // release item
        if (spriteDragging) {
            if (mouse.x > SIDE_BAR_X) {
                // merge elements if possible
                merged = false;
                for (var i = 0; i < spritesOnField.length; i++) {
                    if (spriteOverlapsSprite(spriteDragging, spritesOnField[i])) {
                        // color combinations
                        if (spriteDragging.coloredMix(spritesOnField[i], RED, BLUE)) {
                            spritesOnField[i].changeColor(PURPLE);
                        } else if (spriteDragging.coloredMix(spritesOnField[i], RED, YELLOW)) {
                            spritesOnField[i].changeColor(ORANGE);
                        } else if (spriteDragging.coloredMix(spritesOnField[i], BLUE, YELLOW)) {
                            spritesOnField[i].changeColor(GREEN);
                        }
                        merged = true;
                        break;
                    }
                }

                // drop onto field
                if (!merged) {
                    spritesOnField.push(spriteDragging);
                }
            }
            spriteDragging = null;
        }
    }

    // drag selected element
    if (spriteDragging) {
        spriteDragging.x = mouse.x - spriteDragging.image.width / 2;
        spriteDragging.y = mouse.y - spriteDragging.image.height / 2;
    }
};

// draw loop
function draw() {
	context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, canvas.width, canvas.height);
	
    // draw sidebar unlocked elements
    for (var i = 0; i < ELEMENT_COUNT; i++) {
        if (elementUnlocked[i]) {
            spriteElements[i].draw();
        }
    }

    // draw sidebar line
    context.fillStyle = SIDE_BAR_COLOR;
    context.fillRect(SIDE_BAR_X, 0, 5, canvas.height);
    context.fill();

    // draw element being dragged
    if (spriteDragging) {
        spriteDragging.draw();
    }

    // draw elements on the field
    spritesOnField.forEach(function(spriteElement) {
        spriteElement.draw(context);
    });
}

// start the game update and draw loop
// calls the update and draw loop
startGame();