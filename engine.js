///////////////////////
// Created By:       //
//   Austin Quarles  //
//   John Hutcherson //
///////////////////////


var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mouseup", handleMouseUp);
canvas.addEventListener("mousemove", handleMouseMove);
document.addEventListener("keydown", handleKeyPress);
document.addEventListener("keyup", handleKeyRelease);

// ECMA6 javascript class syntax
// This is much easier to read than older javascript class/object syntax
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

// Game Time
/**
 * Allows the game to run independently of frame rate. Prevents the game from running to fast
 */
class GameTime {
    /**
     * @param {Integer} INTERVAL - the minimum time elapsed between frames
     */
    constructor(INTERVAL) {
        // Time elapsed in milliseconds of the previous update.
        // This should be close to the INTERVAL.
        this.delta = 0;
        // This elapsed scaled to expected interval time.
        // This value should be close 1.
        // This is useful to keep character movement speeds consistent even when lag is occurring.
        //   Simply scale the characters' movement speed by this value.
        this.deltaNorm = 1;

        this.INTERVAL = INTERVAL;
        this.prevUpdateTime = new Date().getTime();
    }

    /*
     * Updates when the last time the game updated
     */
    update() {
        let currentTime = new Date().getTime();
        this.delta = currentTime - this.prevUpdateTime;
        this.prevUpdateTime = currentTime;
        this.deltaNorm = this.delta / this.INTERVAL;
    }
}
var gameTime;

/**
 * Stores an image and the dimensions of the image
 */
class Texture {
    // load a texture (image) from the Texture folder
    /**
     * @param {String} src - the location of the image you want to use
     * @param {Integer} width - the width of the image you want to use, default 10
     * @param {Integer} height - the height of the image you want to use, default 10
     */
    constructor(src, width = 10, height = 10) {
        //this.pixels = [];

		// create texture
        this.image = new Image();
        this.image.width = width;
        this.image.height = height;

		//If trueCollision is true, image link must be CORS complient. Otherwise, image must be in Textures folder.
        this.image.src = /*(this.trueCollision) ? src : */"./Textures/" + src;

		//Can only use true collision if image link is CORS complient (like imgur)
		/*if(this.trueCollision) {
			this.image.crossOrigin = '';
			var tempCanvas = document.createElement('canvas');
			tempCanvas.width = this.image.width;
			tempCanvas.height = this.image.height;
			tempCanvas.getContext('2d').drawImage(this.image, 0, 0, this.image.width, this.image.height);

			for(var i = 0; i < this.image.width; i++) {
				var row = [];
				for(var j = 0; j < this.image.height; j++) {
					row.push(tempCanvas.getContext('2d').getImageData(i, j, 1, 1).data);
				}
				this.pixels.push(row);
			}
		}*/
    }

    // [0,0] is top-left of canvas
    /*
     * draws the image at a given location
     */
    draw(x = 0, y = 0) {
      /*
       * @param {Double} x - the x location of the image you wish to draw, default 0 (origin)
       * @param {Double} y - the y location of the image you wish to draw, default 0 (origin)
       */
        context.drawImage(this.image, x, y, this.image.width, this.image.height);
    }
}

/*
 * An animation sprite. Keeps a series of sprites in a single texture
 */
class SpriteSheet {
  /**
   * Constructor for a SpriteSheet
   * @param {String} url - the location of the image
   * @param {Integer} frameWidth - the width of a frame
   * @param {Integer} frameHeight - the height of a frame
   * @param {Integer} frameSpeed - the amount of iterations before frame changes
   * @param {Integer} endFrame - the iteration to end the SpriteSheet
   * @param {Double} x - the location of the sprite in x
   * @param {Double} y - the location of the sprite in y
   * @param {Double} imageWidth - use to determine the number of frames the SpriteSheet is
   */
	constructor(url, frameWidth, frameHeight, frameSpeed, endFrame, x, y, imageWidth) {
		this.image = new Image();
		this.numFrames;

		this.frameWidth = frameWidth;
		this.frameHeight = frameHeight;
		this.frameSpeed = frameSpeed;
		this.endFrame = endFrame;

		this.currentFrame = 0;
		this.counter = 0;
		this.image.src = "./Textures/" + url;
		this.imageWidth = imageWidth;

		this.texture = new Texture(url, this.image.width, this.image.height);

		this.numFrames = Math.floor(this.imageWidth / this.frameWidth);

		this.x = x;
		this.y = y;
		this.orientation = 0;

		this.currentSprite = null;
		this.updateSprite();
	}

    getWidth() {
        return this.currentSprite.getWidth();
    }

    getHeight() {
        return this.currentSprite.getHeight();
    }

    /**
     * Updates which sprite in the SpriteSheet is used
     */
	updateSprite() {
		var row = Math.floor(this.currentFrame / this.numFrames);
		var col = Math.floor(this.currentFrame % this.numFrames);

		this.currentSprite = new Sprite(this.texture, this.x, this.y, this.frameWidth, this.frameHeight, col*this.frameWidth, row*this.frameHeight, this.frameWidth, this.frameHeight);
		this.currentSprite.orientation = this.orientation;
		this.currentSprite.spriteSheet = true;
	}

  /**
   * Updates the data to determine which sprite is used
   */
	update() {
		if(this.counter == (this.frameSpeed - 1)){
			this.currentFrame = (this.currentFrame + 1) % this.endFrame;
		}

		this.counter = (this.counter + 1) % this.frameSpeed;

		this.updateSprite();
	}

	draw() {
		this.currentSprite.draw();
	}
}

// contains a texture and a position
/*
 * Keeps the information of the image and handles collisions
 */
class Sprite {
  /**
   * @param {Texture} texture - a texture the sprite will use
   * @param {Double} sx - the location on the context in x of the sub-rectangle
   * @param {Double} sy - the location on the context in y of the sub-rectangle
   * @param {Double} sWidth - the width of the sub-rectangle to draw in the destination context
   * @param {Double} sHeight - the height of the sub-rectangle to draw in the destination context
   */
    constructor(texture, x, y, width = texture.image.width, height = texture.image.height, sx = 0, sy = 0, sWidth = texture.image.width, sHeight = texture.image.height) {
        this.image = texture.image;
        this.x = x;
        this.y = y;
		this.width = width;
		this.height = height;
		this.sx = sx;
		this.sy = sy;
		this.sWidth = sWidth;
		this.sHeight = sHeight;
		this.orientation = 0;
        this.pixels = texture.pixels;
        this.trueCollision = texture.trueCollision;
		this.spriteSheet = false;
    }

    getWidth() {
        return this.image.width;
    }

    getHeight() {
        return this.image.height;
    }

    // checks if the point is within the sprite
    /**
     * Checks if the sprite is overlapping a point
     */
    overlapsPoint(x, y) {
        let minX = this.x;
        let maxX = this.x + this.getWidth();
        let minY = this.y;
        let maxY = this.y + this.getHeight();
        return (x >= minX && x <= maxX && y >= minY && y <= maxY);
    }

    // checks the collision between two sprites
    // it does this by simply checking its image corners position
    overlapsSprite(sprite) {
        var collision = (
				this.overlapsPoint(sprite.x, sprite.y) ||
				this.overlapsPoint(sprite.x + sprite.getWidth(), sprite.y) ||
				this.overlapsPoint(sprite.x, sprite.y + sprite.getHeight()) ||
				this.overlapsPoint(sprite.x + sprite.getWidth(), sprite.y + sprite.getHeight())
			);

		if(!collision) return false;

		//Includes transparency checking if trueCollision is enabled
		if(trueCollision && sprite.trueCollision) {
			var intMinX, intMaxX, intMinY, intMaxY;

			if(this.x < sprite.x) intMinX = sprite.x;
			else intMinX = this.x;

			if((this.x + this.getWidth()) > (sprite.x + sprite.getWidth())) intMaxX = (sprite.x + sprite.getWidth());
			else intMaxX = (this.x + this.getWidth());

			if(this.y < sprite.y) intMinY = sprite.y;
			else intMinY = this.y;

			if((this.y + this.getHeight()) > (sprite.y + sprite.getHeight())) intMaxY = (sprite.y + sprite.getHeight());
			else intMaxY = (this.y + this.getHeight());

			for(var i = intMinX; i < intMaxX; i++) {
				for(var j = intMinY; j < intMaxY; j++) {
					if(!this.pointIsTransparent(i, j) && !sprite.pointIsTransparent(i, j)) return true;
				}
			}

			return false;
		}

		return true;
    }

	// only use-able if trueCollision is turned on
  /**
   * Conducts a pixel-by-pixel collision check
   */
	pointIsTransparent(x, y) {
		if(!this.trueCollision) return false;

		var pX = Math.abs(this.x - x);
		var pY = Math.abs(this.y - y);

		return (this.pixels[pX][pY][3] === 0);
	}

    draw() {
		if(this.spriteSheet) {
			context.save();
			context.translate(this.x + this.width/2, this.y + this.height/2);
			context.rotate(this.orientation * Math.PI / 180);
			context.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, -this.width/2, -this.height/2, this.width, this.height);
			context.restore();
		} else {
			context.save();
			context.translate(this.x + this.width/2, this.y + this.height/2);
			context.rotate(this.orientation * Math.PI / 180);
			context.drawImage(this.image, -this.width/2, -this.height/2, this.width, this.height);
			context.restore();
		}
    }
}

// Actor is a character on the stage
class Actor {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    update() {
    }

    draw() {
    }

    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }

    setPosition(x, y) {
        this.setX(x);
        this.setY(y);
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }
}

// An actor that has a Sprite
class ActorSprite extends Actor {
    constructor(sprite) {
        super();
        this.sprite = sprite;
    }

    update() {
        super.update();
    }

    draw() {
        super.draw();
        this.sprite.draw();
    }

    setX(x) {
        super.setX(x);
        this.sprite.x = x;
    }

    setY(y) {
        super.setY(y);
        this.sprite.y = y;
    }

    setPosition(x, y) {
        this.setX(x);
        this.setY(y);
    }

    getX() {
        return this.sprite.x;
    }

    getY() {
        return this.sprite.y;
    }

    changeTexture(texture) {
        this.sprite.image = texture.image;
    }
}

// Stage is the area in which actors are on
/**
 * keeps track of the objects to be displayed
 */
class Stage {
    constructor() {
        this.actors = [];
        this.camera = null;
        this.frameTimers = [];
        this.drawables = [];
		this.particleSystems = [];
    }

    addActor(actor) {
        this.actors.push(actor);
    }

    removeActor(actor) {
        for(var i = 0; i < this.actors.length; i++) {
            if(actor === this.actors[i]) this.actors.splice(i, 1);
        }
    }

    removeActorByIndex(i) {
        this.actors.splice(i, 1);
    }

    getActor(index) {
        if(isInteger(index) && index >= 0 && index < this.actors.length) return this.actors[index];
    }

	getActorIndex(actor) {
		for(var i = 0; i < this.actors.length; i++) {
			if(actor === this.actors[i]) return i;
		}
		return -1;
	}

    addFrameTimer(timer) {
        if(typeof timer === 'number') this.frameTimers.push(new FrameTimer(timer));
        else if(typeof timer === 'object') this.frameTimers.push(timer);
    }

    removeFrameTimer(timer) {
        for(var i = 0; i < this.frameTimers.length; i++) {
            if(timer === this.frameTimers[i]) this.frameTimers.splice(i, 1);
        }
    }

    removeFrameTimerByIndex(i) {
        this.frameTimers.splice(i, 1);
    }

    getTimer(index) {
        if(isInteger(index) && index >= 0 && index < this.frameTimers.length) return this.frameTimers[index];
    }

    addDrawable(drawable) {
        this.drawables.push(drawable);
    }

    removeDrawable(drawable) {
        for(var i = 0; i < this.drawables.length; i++) {
            if(drawable === this.drawables[i]) this.drawables.splice(i, 1);
        }
    }

    removeDrawableByIndex(i) {
        this.drawables.splice(i, 1);
    }

    getDrawable(index) {
        if(isInteger(index) && index >= 0 && index < this.drawables.length) return this.drawables[index];
    }

	addParticleSystem(particleSystem) {
		this.particleSystems.push(particleSystem);
	}

    clearObjects() {
        this.actors = [];
        this.frameTimers = [];
        this.drawables = [];
		this.particleSystems = [];
    }

    update() {
        for(var i = 0; i < this.actors.length; i++) {
            this.actors[i].update();
        }

        for(var i = 0; i < this.frameTimers.length; i++) {
            this.frameTimers[i].update();
        }

		for(var i = 0; i < this.particleSystems.length; i++) {
            this.particleSystems[i].update();
        }
    }

    draw() {
        for(var i = 0; i < this.actors.length; i++) {
            this.actors[i].draw();
        }

        for(var i = 0; i < this.drawables.length; i++) {
            this.drawables[i].draw();
        }

		for(var i = 0; i < this.particleSystems.length; i++) {
            this.particleSystems[i].draw();
        }
    }
}

/**
 * Keeps track of the data of an object in the game
 */
class GamePiece extends ActorSprite {
    constructor(sprite, isSpriteSheet = false) {
    	super(sprite);
        this.speed = 0;
        this.direction = {x: 0, y: 0};
		this.orientation = 0;
		this.rotation = 0;
		this.isSpriteSheet = isSpriteSheet;
        this.collisions = [];
        this.inView = true;
		this.boundary = null;
		this.timers = [];
    }

	addFrameTimer(timer) {
		if(typeof timer === 'number') this.timers.push(new FrameTimer(timer));
        else if(typeof timer === 'object') this.timers.push(timer);
    }

    removeFrameTimer(timer) {
        for(var i = 0; i < this.timers.length; i++) {
            if(timer === this.timers[i]) this.timers.splice(i, 1);
        }
    }

    removeFrameTimerByIndex(i) {
        this.timers.splice(i, 1);
    }

    getTimer(index) {
        if(isInteger(index) && index >= 0 && index < this.timers.length) return this.timers[index];
    }

	rotate(degrees) {
		this.sprite.orientation += degrees;

		if(this.sprite.orientation >= 360) this.sprite.orientation -= 360;
		if(this.sprite.orientation < 0) this.sprite.orientation += 360;

		if(this.boundary !== null) this.boundary.rotate(degrees);
	}

    update() {
    	super.setX(super.getX() + this.speed * this.direction.x);
        super.setY(super.getY() + this.speed * this.direction.y);

		this.rotate(this.rotation);

		if(this.isSpriteSheet) {
			this.collisions = [];
			for(var i = 0; i < stage.actors.length; i++) {
				if(stage.getActor(i).isSpriteSheet) {
					if(stage.getActor(i) !== this && checkCollision(this.sprite.currentSprite, stage.getActor(i).sprite.currentSprite)) {
						this.collisions.push(stage.getActor(i));
					}
				} else {
					if(stage.getActor(i) !== this && checkCollision(this.sprite.currentSprite, stage.getActor(i).sprite)) {
						this.collisions.push(stage.getActor(i));
					}
				}
			}
			if (checkLeaveView(this.sprite.currentSprite)) {
				this.inView = false;
			} else {
				this.inView = true;
			}
		} else {
			this.collisions = [];
			for(var i = 0; i < stage.actors.length; i++) {
				if(stage.getActor(i).isSpriteSheet) {
					if(stage.getActor(i) !== this && checkCollision(this.sprite, stage.getActor(i).sprite.currentSprite)) {
						this.collisions.push(stage.getActor(i));
					}
				} else {
					if(stage.getActor(i) !== this && checkCollision(this.sprite, stage.getActor(i).sprite)) {
						this.collisions.push(stage.getActor(i));
					}
				}
			}
			if (checkLeaveView(this.sprite)) {
				this.inView = false;
			} else {
				this.inView = true;
			}
		}

		for(var i = 0; i < this.timers.length; i++) {
			this.timers[i].update();
		}

		if(this.boundary !== null) this.boundary.translate(this.direction.x * this.speed, this.direction.y * this.speed);

		if(this.isSpriteSheet) this.sprite.update();
    }

    draw() {
        super.draw();
		if(this.boundary !== null) this.boundary.draw();
    }
}

/**
 * Stores the particles at a point
 */
class ParticleSystem {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.particles = [];
	}

  /**
   * creates a particle at the location of the ParticleSystem
   * The particles do nothing by default
   * @param {Function} onDestroy - what happens when the particle is destroyed
   */
	spawnParticle(actor, onDestroy = null, speed = 0, directionX = 0, directionY = 0, rotation = 0, x = this.x, y = this.y, orientation = 0) {
		var particle = new Particle(actor);
		particle.attributes.speed = speed;
		particle.attributes.direction = {x: directionX, y: directionY};
		particle.attributes.rotation = rotation;
		particle.setX(x);
		particle.setY(y);
		particle.setOrientation(orientation);
		if(onDestroy !== null) particle.onDestroy = onDestroy;
		this.particles.push(particle);
	}

	getParticle(index) {
		return this.particles[index];
	}

  /**
   *  Checks if valid particle; calls it's onDestroy function
   */
	destroyParticle(object) {
		var particle;
		if(typeof object === 'number') particle = (this.particles.splice(object, 1))[0];
		else if(typeof object === 'object') {
			for(var i = 0; i < this.particles.length; i++) {
				if(this.particles[i] === object) particle = (this.particles.splice(i, 1))[0];
				else if(this.particles[i].actor === object) particle = (this.particles.splice(i, 1))[0];
			}
		} else return;

		particle.onDestroy(particle);
	}

	update() {
		for(var i = 0; i < this.particles.length; i++) {
			this.particles[i].update();
		}
	}

	draw() {
		for(var i = 0; i < this.particles.length; i++) {
			this.particles[i].draw();
		}
	}
}

class Particle {
	constructor(actor) {
		this.actor = actor;
		this.attributes = {speed: 0, direction: {x: 0, y: 0}, rotation: 0};
	}

	setX(x) {
		this.actor.x = x;
	}

	setY(y) {
		this.actor.y = y;
	}

	setOrientation(orientation) {
		this.actor.orientation = orientation;
	}

	update() {
		this.actor.speed = this.attributes.speed;
		this.actor.direction = this.attributes.direction;
		this.actor.rotation = this.attributes.rotation;
		this.actor.update();
	}

	draw() {
		this.actor.draw();
	}

	onDestroy() {
		//action that is done when particle is destroyed
	}
}

/**
 * Checks if a sprite is within the viewing coordinates
 * @param {Sprite} sprite - sprite to be checked
 */
function checkLeaveView(sprite) {
    if((sprite.x + sprite.getWidth()) < 0 || sprite.x > canvas.width) return true;
    if((sprite.y + sprite.getHeight()) < 0 || sprite.y > canvas.height) return true;
    return false;
}

/**
 @deprecated
 NOTE: I am considering removing this class and importing a more complete version of this class
 This class would typically be called a Vector2 in other game engines.
*/
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

  copy() {
	return new Point(this.x, this.y);
  }
}

/**
 * More dynamic keyboard implementation. Allows for multiple keypresses
 * Does not check order of keypress
 */
class Keyboard2 {
    constructor() {
        this.keyCodes = [];
    }

	setKeyCode(keyCode, value) {
		this.keyCodes[keyCode] = value;
	}

	getKeyCode(keyCode) {
		return this.keyCodes[keyCode];
	}
}

class Line {
	constructor(startPoint, endPoint) {
  	this.startPoint = startPoint;
    this.endPoint = endPoint;
  }

  magnitude() {
	  var x = this.endPoint.x - this.startPoint.x;
	  var y = this.endPoint.y - this.startPoint.y;

	  return Math.sqrt(x*x + y*y);
  }

  slope() {
	  return (this.endPoint.y - this.startPoint.y) / (this.endPoint.x - this.startPoint.x);
  }

  clone() {
	  var p1 = this.startPoint.copy();
	  var p2 = this.endPoint.copy();
	  return new Line(p1, p2);
  }

  draw() {
  	context.beginPath();
    context.moveTo(this.startPoint.x, this.startPoint.y);
    context.lineTo(this.endPoint.x, this.endPoint.y);
    context.stroke();
  }
}

/**
 * Faster, but more generic, boundary checking
 */
class Boundary {
	constructor(x1, y1, x2, y2) {
		this.baseBoundingLines = [];
		this.boundingLines = [];
		this.baseBoundingLines.push(new Line(new Point(x1,y1), new Point(x2, y2)));
		this.boundingLines.push(new Line(new Point(x1,y1), new Point(x2, y2)));
		this.display = false;
		this.lineColor = "#FF0000";
		this.orientation = 0;
		this.translateX = 0;
		this.translateY = 0;
		this.scaleX = 1;
		this.scaleY = 1;
		this.midPoint = new Point(0, 0);
	}

  addPoint(x, y) {
  	var endPoint = this.baseBoundingLines[this.baseBoundingLines.length-1].endPoint;
  	this.baseBoundingLines.push(new Line(endPoint, new Point(x, y)));
	this.updateBoundingLines();
  }

  //takes as many xy pairs as you want
  addPoints() {
	for(var i = 0; i < arguments.length; i+=2) {
		this.addPoint(arguments[i], arguments[i+1]);
	}
  }

  updateBoundingLines() {
	this.boundingLines = [];
	for(var i = 0; i < this.baseBoundingLines.length; i++) {
		var p1 = this.baseBoundingLines[i].startPoint.copy();
		var p2 = this.baseBoundingLines[i].endPoint.copy();
		var midPoint = this.midPoint.copy();
		var x1, x2, y1, y2;
		var rad = this.orientation * Math.PI / 180

		p1.x += this.translateX;
		p2.x += this.translateX;
		midPoint.x += this.translateX;
		p1.y += this.translateY;
		p2.y += this.translateY;
		midPoint.y += this.translateY;

		p1.x *= this.scaleX;
		p2.x *= this.scaleX;
		p1.y *= this.scaleY;
		p2.y *= this.scaleY;

		if(this.scaleX !== 1) {
			p1.x += -(this.scaleX - 1) * midPoint.x;
			p2.x += -(this.scaleX - 1) * midPoint.x;
			p1.y += -(this.scaleY - 1) * midPoint.y;
			p2.y += -(this.scaleY - 1) * midPoint.y;
		}

		x1 = Math.cos(rad) * (p1.x - midPoint.x) + -Math.sin(rad) * (p1.y - midPoint.y) + midPoint.x;
		y1 = Math.sin(rad) * (p1.x - midPoint.x) + Math.cos(rad) * (p1.y - midPoint.y) + midPoint.y;
		x2 = Math.cos(rad) * (p2.x - midPoint.x) + -Math.sin(rad) * (p2.y - midPoint.y) + midPoint.x;
		y2 = Math.sin(rad) * (p2.x - midPoint.x) + Math.cos(rad) * (p2.y - midPoint.y) + midPoint.y;

		this.boundingLines.push(new Line(new Point(x1, y1), new Point(x2, y2)));
	}
  }

  rotate(angle) {
		this.orientation += angle;

		if(this.orientation >= 360) this.orientation -= 360;
		if(this.orientation < 0) this.orientation += 360;
		this.updateBoundingLines();
	}

  translate(x, y) {
	  this.translateX += x;
	  this.translateY += y;
	  this.updateBoundingLines();
  }

  scale(x, y) {
	  this.scaleX *= x;
	  this.scaleY *= y;
	  this.updateBoundingLines();
  }

  draw() {
	if(this.display) {
		context.strokeStyle = this.lineColor;
		for(var i = 0; i < this.boundingLines.length; i++) {
			this.boundingLines[i].draw();
		}
	}
  }

  checkCollision(line) {
  	for(var i = 0; i < this.boundingLines.length; i++) {
      var bLine = this.boundingLines[i];
      var a1, a2, b1, b2, x, y;
      var err = false;

      a1 = (bLine.endPoint.y - bLine.startPoint.y) / (bLine.endPoint.x - bLine.startPoint.x);
      a2 = (line.endPoint.y - line.startPoint.y) / (line.endPoint.x - line.startPoint.x);
      b1 = bLine.startPoint.y - a1 * bLine.startPoint.x;
      b2 = line.startPoint.y - a2 * line.startPoint.x;

      if(a1 === -Infinity) a1 = 1/0;
      if(a2 === -Infinity) a2 = 1/0;

      if((a1 === Infinity || a1 === NaN) && (a2 === Infinity || a2 === NaN)) {
        err = true;
        var minY1, minY2, maxY1, maxY2;
        if(bLine.startPoint.y > bLine.endPoint.y) {
          maxY1 = bLine.startPoint.y;
          minY1 = bLine.endPoint.y;
        } else {
          minY1 = bLine.startPoint.y;
          maxY1 = bLine.endPoint.y;
        }

        if(line.startPoint.y > line.endPoint.y) {
          maxY2 = line.startPoint.y;
          minY2 = line.endPoint.y;
        } else {
          minY2 = line.startPoint.y;
          maxY2 = line.endPoint.y;
        }

        if(line.startPoint.x == bLine.startPoint.x && !(maxY1 <= minY2) && !(maxY2 <= minY1) && !(minY1 >= maxY2) && !(minY2 >= maxY1)) {
        return {x: x, y: y};
        }
      } else if((a2 === Infinity) || (a2 === NaN)) {
        x = line.startPoint.x;
        y = a1 * x + b1;
      } else if((a1 === Infinity) || (a1 === NaN)) {
        x = bLine.startPoint.x;
        y = a2 * x + b2;
      } else if(a1 == a2) {
        err = true;
        if(b1 == b2) {

          var minY1, minY2, maxY1, maxY2;
          if(bLine.startPoint.y > bLine.endPoint.y) {
            maxY1 = bLine.startPoint.y;
            minY1 = bLine.endPoint.y;
          } else {
            minY1 = bLine.startPoint.y;
            maxY1 = bLine.endPoint.y;
          }

          if(line.startPoint.y > line.endPoint.y) {
            maxY2 = line.startPoint.y;
            minY2 = line.endPoint.y;
          } else {
            minY2 = line.startPoint.y;
            maxY2 = line.endPoint.y;
          }

          if(line.startPoint.x == bLine.startPoint.x && !(maxY1 <= minY2) && !(maxY2 <= minY1) && !(minY1 >= maxY2) && !(minY2 >= maxY1)) return {x: x, y: y};
        }
      } else {
        var a = a2 - a1;
        var b = b1 - b2;
        x = b / a;
        y = a1 * x + b1
      }

      if(!err) {
        var minY1, minY2, maxY1, maxY2;
        if(bLine.startPoint.y > bLine.endPoint.y) {
          maxY1 = bLine.startPoint.y;
          minY1 = bLine.endPoint.y;
        } else {
          minY1 = bLine.startPoint.y;
          maxY1 = bLine.endPoint.y;
        }

        if(line.startPoint.y > line.endPoint.y) {
          maxY2 = line.startPoint.y;
          minY2 = line.endPoint.y;
        } else {
          minY2 = line.startPoint.y;
          maxY2 = line.endPoint.y;
        }

		var minX1, minX2, maxX1, maxX2;
        if(bLine.startPoint.x > bLine.endPoint.x) {
          maxX1 = bLine.startPoint.x;
          minX1 = bLine.endPoint.x;
        } else {
          minX1 = bLine.startPoint.x;
          maxX1 = bLine.endPoint.x;
        }

        if(line.startPoint.x > line.endPoint.x) {
          maxX2 = line.startPoint.x;
          minX2 = line.endPoint.x;
        } else {
          minX2 = line.startPoint.x;
          maxX2 = line.endPoint.x;
        }

        if(!(x <= minX1) && !(x >= maxX1) && !(x <= minX2) && !(x >= maxX2)) return {x: x, y: y};
        if(!(y <= minY1) && !(y >= maxY1) && !(y <= minY2) && !(y >= maxY2)) return {x: x, y: y};
	  }
    }
    return null;
  }

  /**
   * Checks if the boundary is colliding with another
   */
  checkBoundaryCollision(boundary) {
	  for(var i = 0; i < boundary.boundingLines.length; i++) {
		  if(this.checkCollision(boundary.boundingLines[i]) !== null) return i;
	  }
	 return null;
  }

  clone() {
	  var boundary = new Boundary(0, 0, 0, 0);
	  boundary.baseBoundingLines = [];
	  for(var i = 0; i < this.baseBoundingLines.length; i++) {
		  boundary.baseBoundingLines.push(this.baseBoundingLines[i].clone());
	  }
	  boundary.display = this.display;
	  boundary.lineColor = this.lineColor;
	  boundary.orientation = this.orientation;
	  boundary.translateX = this.translateX;
	  boundary.translateY = this.translateY;
	  boundary.scaleX = this.scaleX;
	  boundary.scaleY = this.scaleY;
	  boundary.midPoint = this.midPoint.copy();
	  boundary.updateBoundingLines();
	  return boundary;
  }
}

/**
 * Tile implementation of the game world
 */
class SquareGrid {
  /**
   * @param {Integer} width - width of the game world
   * @param {Integer} height - height of the game world
   * @param {Integer} interval - size of a tile, will be a square tile
   */
	constructor(width, height, interval = 1) {
		this.width = width;
		this.height = height;
		this.interval = interval;
		this.obstacles = [];

		if(width % interval != 0) console.log("SquareGrid width is not divisible by the interval. This SquareGrid may not function properly.");
		if(height % interval != 0) console.log("SquareGrid height is not divisible by the interval. This SquareGrid may not function properly.");
	}

  /**
   * Adds obstacles within the grid.
   */
	addObstacle(x, y) {
		this.obstacles.push({x: x, y: y});
	}

  /**
   * Deletes all obstacles
   */
	clearObstacles() {
		this.obstacles = [];
	}

  /**
   * Removes an obstacle
   */
	removeObstacle(x, y) {
		for(var i = 0; i < this.obstacles.length; i++) {
			if(this.obstacles[i].x == x && this.obstacles[i].y == y) {
				this.obstacles.splice(i, 1);
				return;
			}
		}
	}

  /**
   * removes an obstacle from the array
   */
	removeObstacleByIndex(i) {
		if(i < this.obstacles.length) this.obstacles.splice(i, 1);
	}

  /**
   * returns an obstacle from the array
   */
	getObstacleByIndex(i) {
		if(i < this.obstacles.length) return this.obstacles[i];
	}

  /**
   * Determins if an obstacle exists at location
   */
	obstacleAt(x, y) {
		for(var i = 0; i < this.obstacles.length; i++) {
			if(this.obstacles[i].x == x && this.obstacles[i].y == y) {
				return true;
			}
		}
		return false;
	}

	inBounds(x, y) {
		return (0 <= x && x < this.width) && (0 <= y && y < this.height) && (x % this.interval == 0) && (y % this.interval == 0);
	}

  /**
   * Returns obstacles next to the tile at location
   */
	neighbors(x, y) {
		var results = [{x: x+this.interval, y: y}, {x: x, y: y-this.interval}, {x: x-this.interval, y: y}, {x: x, y: y+this.interval}];
		for(var i = 0; i < results.length; i++) {
			if(this.obstacleAt(results[i].x, results[i].y) || !this.inBounds(results[i].x, results[i].y)) {
				results.splice(i, 1);
				i--;
			}
		}
		return results;
	}
}

/**
 * Dijkstra's Algorithm
 */
function breadthFirstSearch(graph, xStart, yStart, xGoal, yGoal) {
	var frontier = new Queue();
	frontier.add({x: xStart, y: yStart});
	var cameFrom = [];
	cameFrom[xStart + " " + yStart] = null;
	var length = 0;

	while(!frontier.empty()) {
		var current = frontier.remove();
		length++;

		if(current.x == xGoal && current.y == yGoal) break;

		var neighbors = graph.neighbors(current.x, current.y);
		for(var i = 0; i < neighbors.length; i++) {
			var next = neighbors[i];
			if(cameFrom[next.x + " " + next.y] === undefined) {
				frontier.add({x: next.x, y: next.y});
				cameFrom[next.x + " " + next.y] = {x: current.x, y: current.y};
			}
		}
	}

	cameFrom["Length"] = length;
	return cameFrom;
}

///////////////////////////////////////////////////////////////////////
/////////////////////////THIS WAS GAME SPECIFIC////////////////////////
///////////////////////////////////////////////////////////////////////
function getDirectionFromPoint(p, width, height) {
	if(p == undefined) return KEY_D;
	if(snake2[0].direction.x >= 0 && p.x > snake2[0].sprite.x) return KEY_D;
	if(snake2[0].direction.x < 0 && p.x > snake2[0].sprite.x) {
		if(snake2[0].sprite.y < height / 2) return KEY_S;
		else return KEY_W;
	}
	if(snake2[0].direction.x <= 0 && p.x < snake2[0].sprite.x) return KEY_A;
	if(snake2[0].direction.x > 0 && p.x < snake2[0].sprite.x) {
		if(snake2[0].sprite.y < height / 2) return KEY_S;
		else return KEY_W;
	}
	if(snake2[0].direction.y >= 0 && p.y > snake2[0].sprite.y) return KEY_S;
	if(snake2[0].direction.y < 0 && p.y > snake2[0].sprite.y) {
		if(snake2[0].sprite.x < width / 2) return KEY_D;
		else return KEY_A;
	}
	if(snake2[0].direction.y <= 0 && p.y < snake2[0].sprite.y) return KEY_W;
	if(snake2[0].direction.y > 0 && p.y < snake2[0].sprite.y) {
		if(snake2[0].sprite.x < width / 2) return KEY_D;
		else return KEY_A;
	}
	return null;
}
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

/**
 * Menu system for games
 */
class Menu {
  /**
   * @param {Integer} selections - the option selected in the menu
   */
	constructor(sprite, x, y, selections, xChange, yChange) {
		this.sprite = sprite;
		this.x = x;
		this.y = y;
		this.selections = selections;
		this.xChange = xChange;
		this.yChange = yChange;
		this.index = 0;

		this.sprite.x = x;
		this.sprite.y = y;
	}

	nextSelection() {
		this.index = (this.index + 1) % this.selections;
	}

	previousSelection() {
		this.index = (this.index - 1) % this.selections;
		console.log(this.index);
		if(this.index < 0) this.index = this.selections + this.index;
	}

	getSelection() {
		return this.index;
	}

	draw() {
		this.sprite.x = this.x + (this.xChange * this.index);
		this.sprite.y = this.y + (this.yChange * this.index);
		this.sprite.draw();
	}
}

/**
 * Length of a frame
 */
class FrameTimer {
    constructor(frameCount) {
        this.startingCount = frameCount;
        this.frameCount = frameCount;
        this.expired = false;
    }

    resetTimer() {
        this.frameCount = this.startingCount;
        this.expired = false;
    }

    update() {
        if(this.expired) return;
        else this.frameCount--;

        if(this.frameCount <= 0) this.expired = true;
    }
}



this.gameTimers = [];
// Using GameTimer.
function addTimer(gameTimer) {
    gameTimers.push(gameTimer);
}

// Using GameTimer. Called by the engine, should not be called by the game developer.
function removeTimer(gameTimer) {
    for(var i = 0; i < gameTimers.length; i++) {
        if(gameTimer === gameTimers[i]) {
            gameTimers.splice(i, 1);
            break;
        }
    }
}

class GameTimer {
    constructor(milliseconds) {
        this.millisecondsLeft = milliseconds;
    }

    // should be called after the GameTime updates
    update() {
        this.millisecondsLeft -= gameTime.delta;
        // time up
        if (this.millisecondsLeft <= 0) {
            this.action();
            removeTimer(this);
        }
    }

    action() {
        // called when this time is up
    }
}

class Queue {
    constructor() {
        this.queue = [];
    }
    add(value) {
        this.queue.push(value);
    }
    peek() {
        if(this.empty()) return null;
		if(typeof this.queue[0] === 'Object') return Object.create(this.queue[0]);
        else return this.queue[0];
    }
    remove() {
        if(this.empty()) return null;
        var head = this.queue[0];
        this.queue.splice(0, 1);
        return head;
    }
	empty() {
		return this.queue.length === 0;
	}
}


function isInteger(x) {
    return (typeof x === 'number') && (x % 1 === 0);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

class Text {
    constructor(text, x, y, color, font) {
        this.fillText = text;
        this.x = x;
        this.y = y;
        this.fillStyle = color;
        this.font = font;
    }

    draw() {
        context.fillStyle = this.fillStyle;
        context.font = this.font;
        context.fillText(this.fillText, this.x, this.y);
    }
}

function getLocalStorage(itemName) {
    return localStorage.getItem(itemName);
}

function setLocalStorage(itemName, item) {
    localStorage.setItem(itemName, item);
    localStorage.setItem(itemName, item);
}

/**
 * Keyboard for single key press
 * Add keys to a queue and resolves them in order
 */
class Keyboard {
    constructor() {
        this.keyCodeBuffer = new Queue();
        this.prevKeyCode = null;
		this.keyPressed = false;
		this.splitBuffers = false;
		this.splitBufferKeys = [];
		this.splitKeyCodeBuffers = [];
    }

    addKeyCode(key) {
        if(!isInteger(key)) console.log("Input value, \"" + key + "\", is not a valid integer.");
		if(!this.splitBuffers) {
			this.keyCodeBuffer.add(key);
			this.prevKeyCode = key;
		} else {
			var index = -1;
			for(var i = 0; i < this.splitBufferKeys.length; i++) {
				for(var j = 0; j < this.splitBufferKeys[i].length; j++) {
					if(this.splitBufferKeys[i][j] == key) {
						index = i;
						break;
					}
				}
				if(index != -1) break;
			}

			if(index == -1) {
				this.keyCodeBuffer.add(key);
				this.prevKeyCode = key;
			} else {
				this.splitKeyCodeBuffers[index].add(key);
				this.prevKeyCode = key;
			}
		}
    }

    peekKeyCode(i) {
		if(!this.splitBuffers || i === undefined) {
			return this.keyCodeBuffer.peek();
		} else {
			return this.splitKeyCodeBuffers[i].peek();
		}
    }

    removeKeyCode(i) {
        if(!this.splitBuffers || i === undefined) {
			return this.keyCodeBuffer.remove();
		} else {
			return this.splitKeyCodeBuffers[i].remove();
		}
    }

	addSplitBuffer() { //Add and number of keycodes that will be added to this buffer when pressed
		var keys = [];
		for (var i = 0; i < arguments.length; i++) {
			keys.push(arguments[i]);
		}
		this.splitBufferKeys.push(keys);
		this.splitKeyCodeBuffers.push(new Queue());
		this.splitBuffers = true;
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

//////////////////////////////////////////////////////////////////////////////////////
//This is a class that you can use for areas you want to have collision but no image//
//////////////////////////////////////////////////////////////////////////////////////
function Box(x, y, width, height, color = "black", lineWidth = "4") {
    this.X = x;
    this.Y = y;
    this.width = width;
    this.height = height;
	this.color = color;
	this.lineWidth = lineWidth;

	this.checkSpriteWithin = function(sprite) {
		if(sprite.x < this.X) return false;
		if((sprite.x + sprite.image.width) > (this.X + this.width)) return false;
		if(sprite.y < this.Y) return false;
		if((sprite.y + sprite.image.height) > (this.Y + this.height)) return false;

		return true;
	}

	this.draw = function() {
		context.beginPath();
		context.lineWidth= this.lineWidth;
		context.strokeStyle= this.color;
		context.rect(this.X, this.Y, this.width, this.height);
		context.stroke();
	}
}

///////////////////////////////////////////////////////////////
//When the user presses the mouse button down, the mouse     //
//location is stored and the mousePressed flag is set to true//
///////////////////////////////////////////////////////////////
function handleMouseDown(e) {
	var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.isPressed = true;
}

///////////////////////////////////////////////////////////////
//When the user moves the mouse, the mouse location is stored//
///////////////////////////////////////////////////////////////
function handleMouseMove(e) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
}

function handleKeyPress(e) {
	if(keyboard.keyPressed == false || keyboard.prevKeyCode !== e.keyCode) {
		keyboard.addKeyCode(e.keyCode);
		keyboard.keyPressed = true;
	}

	keyboard2.setKeyCode(e.keyCode, true);
}

function handleKeyRelease(e) {
	keyboard.keyPressed = false;

	keyboard2.setKeyCode(e.keyCode, false);
}

///////////////////////////////////////////////////////////////
//When the user releases the mouse button, the mouse location//
//is stored and the mouseDown flag is set to false           //
///////////////////////////////////////////////////////////////
function handleMouseUp(e) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.isPressed = false;
}

// update and draw the game
function gameLoop() {
    // update
    engineUpdate();
    update();
    // draw
    engineDraw();
    draw();
}

// update the engine
function engineUpdate() {
    // update the game time
    gameTime.update();
    // update the game timers
    for(var i = 0; i < gameTimers.length; i++) {
        gameTimers[i].update();
    }
}

// draw
function engineDraw() {
    // clear the screen
    canvas.width = canvas.width;
}

// start the main game loop
// interval is the interval between update()/draw() function calls
function startGame(interval = 30) {
    gameTime = new GameTime(interval);
    setInterval(gameLoop, interval);
}

////////////////////////////////////////////////////////////////////////////////////////
// Below are deprecated functions and should be avoided.
// These functions are only left in so that the engine will work with older game version.
////////////////////////////////////////////////////////////////////////////////////////
/**
 * @deprecated Use the sprite's overlapsPoint() function instead
 */
function spriteOverlapsPoint(sprite, x, y) {
    let minX = sprite.x;
    let minY = sprite.y;
    let maxY = sprite.y + sprite.image.height;
    let maxX = sprite.x + sprite.image.width;
    return (x >= minX && x <= maxX && y >= minY && y <= maxY);
}

/**
 * @deprecated Use the sprite's overlapsSprite() function instead
 */
function spriteOverlapsSprite(sprite1, sprite2) {
    return (
        spriteOverlapsPoint(sprite1, sprite2.x, sprite2.y) ||
        spriteOverlapsPoint(sprite1, sprite2.x + sprite2.image.width, sprite2.y) ||
        spriteOverlapsPoint(sprite1, sprite2.x, sprite2.y + sprite2.image.height) ||
        spriteOverlapsPoint(sprite1, sprite2.x + sprite2.image.width, sprite2.y + sprite2.image.height)
    );
}

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

//Initialize Engine Variables
var stage = new Stage();
var keyboard = new Keyboard();
var keyboard2 = new Keyboard2();
