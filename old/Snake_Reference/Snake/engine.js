//////////////////
//Austin Quarles//
//////////////////

var resources = new Array();
var mouse = new Mouse(0, 0, false);

///////////////////////////////////////////////////////////////////////////////////
//This adds an image source along with a name identifier to the list of resources//
///////////////////////////////////////////////////////////////////////////////////
function addResource(name, src) {
  src = "./Textures/" + src;
	
  for(var i = 0; i < resources.length; i++) {
	  if(resources[i].name === name) {
		  console.log("Resource with the name, \"" + name + "\", already exists.");
		  return;
	  }
  }
  
  var resource = {name: name, src: src};
  resources.push(resource);
}



//////////////////////////////////////////////////////////////////
//This is a class that represents a sprite that can be displayed//
//////////////////////////////////////////////////////////////////
function Sprite(x, y, width, height, name, src) {
  this.X = x;
  this.Y = y;
  this.width = width;
  this.height = height;
  this.name = name;
  this.image = new Image();
  this.image.width = width;
  this.image.height = height;
  this.image.src = src;
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

////////////////////////////////////////////////////////////
//This is a class that represents the user's mouse actions//
////////////////////////////////////////////////////////////
function Mouse(x, y, pressed) {
	this.X = x;
	this.Y = y;
	this.pressed = pressed;
}

////////////////////////////////////////////////////////////
//This searches an input array for a sprite and removes it//
////////////////////////////////////////////////////////////
function removeSprite(sprite, array) {
	for(var i = 0; i < array.length; i++) {
  	if(array[i] === sprite) {
    	array.splice(i, 1);
    }
  }
}

/////////////////////////////////////////////////////////////////////
//This creates a new sprite an puts it at the end of an input array//
/////////////////////////////////////////////////////////////////////
function createSprite(x, y, w, h, name, array) {
  var ind = -1;
  
  for(var i = 0; i < resources.length; i++) {
  	if(resources[i].name === name) {
      ind = i;
      break;
    }
  }
  
  if(ind !== -1) {
    var sprite = new Sprite(x, y, w, h, name, resources[ind].src);
    array.push(sprite);
  }
	
}

///////////////////////////////////////////////////////////////////////////
//This creates a copy of a sprite an puts it at the end of an input array//
///////////////////////////////////////////////////////////////////////////
function copySprite(sprite, array) {
	var x = sprite.X;
  var y = sprite.Y;
  var w = sprite.width;
  var h = sprite.height;
  var name = sprite.name;
  
  createSprite(x, y, w, h, name, array);
}

///////////////////////////////////////////////////////////////
//When the user presses the mouse button down, the mouse     //
//location is stored and the mousePressed flag is set to true//
///////////////////////////////////////////////////////////////
function handleMouseDown(e) {
	mouse.X = e.clientX;
	mouse.Y = e.clientY;
	mouse.pressed = true;
}

///////////////////////////////////////////////////////////////
//When the user moves the mouse, the mouse location is stored//
///////////////////////////////////////////////////////////////
function handleMouseMove(e) {
	mouse.X = e.clientX;
	mouse.Y = e.clientY;
}

///////////////////////////////////////////////////////////////
//When the user releases the mouse button, the mouse location//
//is stored and the mouseDown flag is set to false           //
///////////////////////////////////////////////////////////////
function handleMouseUp(e) {
	mouse.X = e.clientX;
	mouse.Y = e.clientY;
	mouse.pressed = false;
}

////////////////////////////////////////////////////////////
//This checks for collision of a sprite with a given point//
////////////////////////////////////////////////////////////
function checkSprite(sprite, x, y) {
  var minX = sprite.X;
  var maxX = sprite.X + sprite.width;
  var minY = sprite.Y;
  var maxY = sprite.Y + sprite.height;
  var mx = x;
  var my = y;
  if (mx >= minX && mx <= maxX && my >= minY && my <= maxY) {
    return true;
  }
  return false;
}

//////////////////////////////////////////////////////////////////////
//Checks for the collision between two objects that have a position,//
//width, and height with the object origin located at the top left  //
//////////////////////////////////////////////////////////////////////
function checkCollision(object1, object2) {
	if(object1.X <= object2.X && (object1.X + object1.width) > object2.X) {
  	if(object1.Y <= object2.Y && (object1.Y + object1.height) > object2.Y) return true;
    else if(object1.Y >= object2.Y && (object2.Y + object2.height) > object1.Y) return true;
  } else if(object1.X >= object2.X && (object2.X + object2.width) > object1.X) {
  	if(object1.Y <= object2.Y && (object1.Y + object1.height) > object2.Y) return true;
    else if(object1.Y >= object2.Y && (object2.Y + object2.height) > object1.Y) return true;
  }
  
  return false;
}