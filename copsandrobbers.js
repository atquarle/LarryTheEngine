////////////////////////////////////////////////////////////////////////////////////////
// specialized game functionality
////////////////////////////////////////////////////////////////////////////////////////

class Tile {
	constructor(direction, x, y) {
		this.north = null;
		this.east = null;
		this.south = null;
		this.west = null;
		this.direction = direction;
		if(direction == 0) this.sprite = new Sprite(textures[PATH], x, y);
		else {
			this.sprite = this.sprite = new Sprite(textures[PATH_DIRECTION], x, y); 
			if(direction == 2) this.sprite.orientation = 90;
			if(direction == 3) this.sprite.orientation = 180;
			if(direction == 4) this.sprite.orientation = 270;
		}
	}
	
	draw() {
		this.sprite.draw();
	}
}



class Map {
	constructor(array, tileSize) { //give a 2d square array with tile locations
		this.tiles = [];
		this.obstacles = [];
		this.walkablePath = [];
		this.wallSprite = new Sprite(textures[WALL], 0, 0);
		this.tileSize = tileSize;
		this.offsetX = (canvas.width - array[0].length * this.tileSize) / 2;
		this.offsetY = (canvas.height - array.length * this.tileSize) / 2;
		
		for(var i = 0; i < array.length; i++) {
			this.tiles.push([]);
			for(var j = 0; j < array[i].length; j++) {
				if(array[i][j] == 'x') {
					this.tiles[i].push(null);
					this.addObstacle(this.offsetX + j * this.tileSize, this.offsetY + i * this.tileSize);
				}
				else {
					if(array[i][j] == 0) this.walkablePath.push({x: this.offsetX + j * this.tileSize, y: this.offsetY + i * this.tileSize});
					this.tiles[i].push(new Tile(array[i][j], this.offsetX + j * this.tileSize, this.offsetY + i * this.tileSize));
				}
			}
		}
		
		var getNeighbor = function(tiles, tempi, tempj) {
			var done = false;
			while(!done) {
				if(tempi < 0 || tempi >= tiles.length) return null;
				if(tempj < 0 || tempj >= tiles[tempi].length) return null;
				if(tiles[tempi][tempj] == null) return null;
				else {
					if(tiles[tempi][tempj].direction == 0) {
						return tiles[tempi][tempj];
					}
					else if(tiles[tempi][tempj].direction == 1) tempj++;
					else if(tiles[tempi][tempj].direction == 2) tempi++;
					else if(tiles[tempi][tempj].direction == 3) tempj--;
					else tempi--;
				}
			}
		};
		
		for(var i = 0; i < this.tiles.length; i++) {
			for(var j = 0; j < this.tiles[i].length; j++) {
				if(this.tiles[i][j] != null) {
					//North Check
					this.tiles[i][j].north = getNeighbor(this.tiles, i-1, j);
					
					//West Check
					this.tiles[i][j].west = getNeighbor(this.tiles, i, j-1);
					
					//South Check
					this.tiles[i][j].south = getNeighbor(this.tiles, i+1, j);
					
					//East Check
					this.tiles[i][j].east = getNeighbor(this.tiles, i, j+1);
				}
			}
		}
	}
	
	moveActor(actor, direction) {
		var i = (actor.sprite.y - this.offsetY) / this.tileSize;
		var j = (actor.sprite.x - this.offsetX) / this.tileSize;
		var tile;
		
		switch(direction) {
			case KEY_UP:
				tile = this.tiles[i][j].north;
				break;
				
			case KEY_LEFT:
				tile = this.tiles[i][j].west;
				break;
				
			case KEY_DOWN:
				tile = this.tiles[i][j].south;
				break;
				
			case KEY_RIGHT:
				tile = this.tiles[i][j].east;
				break;
		}
		
		if(tile == null || this.obstacleAt(tile.sprite.x, tile.sprite.y)) return false;
		this.addWalkablePath(actor.sprite.x, actor.sprite.y);
		this.removeObstacle(actor.sprite.x, actor.sprite.y);
		this.removeWalkablePath(tile.sprite.x, tile.sprite.y);
		this.addObstacle(tile.sprite.x, tile.sprite.y);
		actor.sprite.x = tile.sprite.x;
		actor.sprite.y = tile.sprite.y;
		
		return true;
	}
	
	getActorTile(actor) {
		var i = (actor.sprite.y - this.offsetY) / this.tileSize;
		var j = (actor.sprite.x - this.offsetX) / this.tileSize;
		
		return this.tiles[i][j];
	}
	
	getRandomWalkablePath() {
		var pos = this.walkablePath[getRandomInt(0, this.walkablePath.length)];
		this.removeWalkablePath(pos.x, pos.y);
		return pos;
	}
	
	removeWalkablePath(x, y) {
		for(var i = 0; i < this.walkablePath.length; i++) {
			if(this.walkablePath[i].x == x && this.walkablePath[i].y == y) {
				this.walkablePath.splice(i, 1);
				return;
			}
		}
	}
	
	addWalkablePath(x, y) {
		this.walkablePath.push({x: x, y: y});
	}
	
	addObstacle(x, y) {
		this.obstacles.push({x: x, y: y});
	}
	
	clearObstacles() {
		this.obstacles = [];
	}
	
	removeObstacle(x, y) {
		for(var i = 0; i < this.obstacles.length; i++) {
			if(this.obstacles[i].x == x && this.obstacles[i].y == y) {
				this.obstacles.splice(i, 1);
				return;
			}
		}
	}
	
	removeObstacleByIndex(i) {
		if(i < this.obstacles.length) this.obstacles.splice(i, 1);
	}
	
	getObstacleByIndex(i) {
		if(i < this.obstacles.length) return this.obstacles[i];
	}
	
	obstacleAt(x, y) {
		for(var i = 0; i < this.obstacles.length; i++) {
			if(this.obstacles[i].x == x && this.obstacles[i].y == y) {
				return true;
			}
		}
		return false;
	}
	
	tileAt(x, y) {
		var i = (y - this.offsetY) / this.tileSize;
		var j = (x - this.offsetX) / this.tileSize;
		
		return this.tiles[i][j];
	}
	
	isBlocked(actor) {
		var i = (actor.sprite.y - this.offsetY) / this.tileSize;
		var j = (actor.sprite.x - this.offsetX) / this.tileSize;
		var tile;
		if(this.tiles[i][j].north != null && !this.obstacleAt(this.tiles[i][j].north.sprite.x, this.tiles[i][j].north.sprite.y)) {
			return false;
		}
		if(this.tiles[i][j].east != null && !this.obstacleAt(this.tiles[i][j].east.sprite.x, this.tiles[i][j].east.sprite.y)) {
			return false;
		}
		if(this.tiles[i][j].south != null && !this.obstacleAt(this.tiles[i][j].south.sprite.x, this.tiles[i][j].south.sprite.y)) {
			return false;
		}
		if(this.tiles[i][j].west != null && !this.obstacleAt(this.tiles[i][j].west.sprite.x, this.tiles[i][j].west.sprite.y)) {
			return false;
		}
		
		return true;
	}
	
	neighbors(x, y) {
		var tile = this.tileAt(x, y);
		var results = [tile.east, tile.north, tile.west, tile.south];
		for(var i = 0; i < results.length; i++) {
			if(results[i] == null || this.obstacleAt(results[i].sprite.x, results[i].sprite.y)) {
				results.splice(i, 1);
				i--;
			}
		}
		var nResults = [];
		for(var i = 0; i < results.length; i++) {
			nResults.push({x: results[i].sprite.x, y: results[i].sprite.y});
		}
		return nResults;
	}
	
	draw() {
		this.wallSprite.x = this.offsetX - this.tileSize;
		this.wallSprite.y = this.offsetY - this.tileSize;
		this.wallSprite.draw();
		this.wallSprite.y = this.offsetY + (this.tiles.length) * this.tileSize;
		this.wallSprite.draw();
		
		this.wallSprite.x = this.offsetX + (this.tiles[0].length) * this.tileSize;
		this.wallSprite.draw();
		this.wallSprite.y = this.offsetY - this.tileSize;
		this.wallSprite.draw();
		
		for(var i = 0; i < this.tiles.length; i++) {
			this.wallSprite.x = this.offsetX - this.tileSize;
			this.wallSprite.y = this.offsetY + i * this.tileSize;
			this.wallSprite.draw();
			this.wallSprite.x = this.offsetX + (this.tiles[0].length) * this.tileSize;
			this.wallSprite.draw();
		}
		
		for(var i = 0; i < this.tiles[0].length; i++) {
			this.wallSprite.x = this.offsetX + i * this.tileSize;
			this.wallSprite.y = this.offsetY - this.tileSize;
			this.wallSprite.draw();
			this.wallSprite.y = this.offsetY + (this.tiles.length) * this.tileSize;
			this.wallSprite.draw();
		}
		
		for(var i = 0; i < this.tiles.length; i++) {
			for(var j = 0; j < this.tiles[i].length; j++) {
				if(this.tiles[i][j] != null) this.tiles[i][j].draw();
				else {
					this.wallSprite.x = this.offsetX + j * this.tileSize;
					this.wallSprite.y = this.offsetY + i * this.tileSize;
					this.wallSprite.draw();
				}
			}
		}
 	}
	
	update() {
		//Nothing for now
	}
}

function generateMap(size) {
	var grid = [];
	var recentlyVisited = [];
	var totalSquares = 0;
	var totalLoopCounter = 0;
	var targetSquares = Math.floor(SQUARES_LEVEL_RATIO * size * size);
	for(var i = 0; i < size; i++) {
		grid.push([]);
		for(var j = 0; j < size; j++) {
			grid[i].push(null);
		}
	}
	
	var addRecentlyVisited = function(recentlyVisited, i, j) {
		//Check if it had been visited already.
		for(var i = 0; i < recentlyVisited.length; i++) {
			if(recentlyVisited[i].i == i && recentlyVisited[i].j == j) {
				recentlyVisited.splice(i, 1);
				recentlyVisited.push({i: i, j: j});
				return;
			}
		}
		
		if(recentlyVisited.length == VISITED_MAX) recentlyVisited.splice(0, 1);
		recentlyVisited.push({i: i, j: j});
	};
	
	var checkRecentlyVisited = function(recentlyVisited, i, j) {
		if(i === undefined || j === undefined) return {q: false, index: -1};
		
		for(var i = 0; i < recentlyVisited.length; i++) {
			if(recentlyVisited[i].i == i && recentlyVisited[i].j == j) return {q: true, index: i};
		}
		return {q: false, index: -1};
	};
	
	var checkCrowded = function(grid, i, j, neighborCheck = true) {
		if(i === undefined || j === undefined) return false;
		
		if(grid[i] != null && grid[i][j] != null) return false;
		
		if(neighborCheck) {
			var crowded = false;
			crowded = (crowded || checkCrowded(grid, i-1, j, false)); //North
			crowded = (crowded || checkCrowded(grid, i, j+1, false)); //East
			crowded = (crowded || checkCrowded(grid, i+1, j, false)); //South
			crowded = (crowded || checkCrowded(grid, i, j-1, false)); //West
			
			var cCount = 1;
			if(grid[i-1] != null && grid[i-1][j] != null) cCount++; //North
			if(grid[i] != null && grid[i][j+1] != null) cCount++; //East
			if(grid[i+1] != null && grid[i+1][j] != null) cCount++; //South
			if(grid[i] != null && grid[i][j-1] != null) cCount++; //West
			
			return (cCount > 3 || crowded);
		} else {
			var cCount = 0;
			if(grid[i-1] != null && grid[i-1][j] != null) cCount++; //North
			if(grid[i] != null && grid[i][j+1] != null) cCount++; //East
			if(grid[i+1] != null && grid[i+1][j] != null) cCount++; //South
			if(grid[i] != null && grid[i][j-1] != null) cCount++; //West
			
			return (cCount >= 3);
		}
	}
	
	var getNextPos = function(grid, recentlyVisited, pos) {
		//Store the neighboring square information
		n = [];
		n.push({s: ((grid[pos.i-1] == null) ? undefined : grid[pos.i-1][pos.j]), rv: checkRecentlyVisited(recentlyVisited, pos.i-1, pos.j), c: checkCrowded(grid, pos.i-1, pos.j), i: pos.i-1, j: pos.j}); //North
		n.push({s: grid[pos.i][pos.j+1], rv: checkRecentlyVisited(recentlyVisited, pos.i, pos.j+1), c: checkCrowded(grid, pos.i, pos.j+1), i: pos.i, j: pos.j+1}); //East
		n.push({s: ((grid[pos.i+1] == null) ? undefined : grid[pos.i+1][pos.j]), rv: checkRecentlyVisited(recentlyVisited, pos.i+1, pos.j), c: checkCrowded(grid, pos.i+1, pos.j), i: pos.i+1, j: pos.j}); //South
		n.push({s: grid[pos.i][pos.j-1], rv: checkRecentlyVisited(recentlyVisited, pos.i, pos.j-1), c: checkCrowded(grid, pos.i, pos.j-1), i: pos.i, j: pos.j-1}); //West
		
		//Check n for outofbounds places.
		for(var i = 0; i < n.length; i++) {
			if(n[i].s === undefined) {
				n.splice(i, 1);
				i--;
			}
		}
		
		//Every neighboring square is outofbounds. Should never happen.
		if(n.length == 0) console.log("THIS SHOULD NEVER HAPPEN. EVER.");
		
		//Remove neighboring places that are crowded
		for(var i = 0; i < n.length; i++) {
			if(n[i].c) {
				n.splice(i, 1);
				i--;
			}
		}
		
		//Every neighboring square is crowded. Should never happen.
		if(n.length == 0) console.log("THIS SHOULD NEVER HAPPEN. EVER.");
		
		//Check for non-recently-visited places to move to.
		var newN = [];
		for(var i = 0; i < n.length; i++) {
			if(!n[i].rv.q) newN.push(n[i]);
		}
		
		//If there were noncrowded places to move to, set that as the active neighbor array.
		if(newN.length > 0) {
			n = newN;
			
			//If there is only one square left, return that position.
			if(n.length == 1) return {i: n[0].i, j: n[0].j};
			
			//Pick a random spot from the remaining squares and return that postion.
			var r = getRandomInt(0, n.length);
			return {i: n[r].i, j: n[r].j};
		}
		
		//Otherwise, find the least recently visited place and return that position.
		var temp = {index: recentlyVisited.length, i: 0, j: 0};
		for(var i = 0; i < n.length; i++) {
			if(n[i].rv.index < temp.index) temp = {index: n[i].rv.index, i: n[i].i, j: n[i].j};
		}
		return {i: temp.i, j: temp.j};
	};
	
	var getNewDirection = function(grid, i, j) {
		d = [];
		if(grid[i][j+1] !== undefined && grid[i][j+1] != 3) d.push(1); //East
		if(grid[i+1] !== undefined && grid[i+1][j] !== undefined && grid[i+1][j] != 4) d.push(2); //South
		if(grid[i][j-1] !== undefined && grid[i][j-1] != 1) d.push(3); //West
		if(grid[i-1] !== undefined && grid[i-1][j] !== undefined && grid[i-1][j] != 2) d.push(4); //North
		
		var direction;
		if(d.length == 0) direction = 0;
		else direction = d[getRandomInt(0, d.length)];
		
		grid[i][j] = direction;
	};
	
	var pos = {i: getRandomInt(1, size-1), j: getRandomInt(1, size-1)};
	grid[pos.i][pos.j] = 0;
	totalSquares++;
	while(totalSquares < targetSquares && totalLoopCounter < MAX_LOOPS) {
		pos = getNextPos(grid, recentlyVisited, pos);
		if(grid[pos.i][pos.j] == null) {
			totalSquares++;
			if(getRandomInt(0, 100) < 90) grid[pos.i][pos.j] = 0;
			else grid[pos.i][pos.j] = getRandomInt(1, 5) //Implement Directions Later
		}
		addRecentlyVisited(recentlyVisited, pos.i, pos.j);
		totalLoopCounter++;
	}
	
	//Check for infinite direction loops
	for(var i = 0; i < grid.length; i++) {
		for(var j = 0; j < grid[i].length; j++) {
			if(grid[i][j] == 1) {
				if(grid[i][j+1] == null || grid[i][j+1] == 3) {
					getNewDirection(grid, i, j);
					j--;
				}
			} else if(grid[i][j] == 2) {
				if(grid[i+1] == null || grid[i+1][j] == null || grid[i+1][j] == 4) {
					getNewDirection(grid, i, j);
					j--;
				}
			} else if(grid[i][j] == 3) {
				if(grid[i][j-1] == null || grid[i][j-1] == 1) {
					getNewDirection(grid, i, j);
					j--;
				}
			} else if(grid[i][j] == 4) {
				if(grid[i-1] == null || grid[i-1][j] == null || grid[i-1][j] == 2) {
					getNewDirection(grid, i, j);
					j--;
				}
			}
		}
	}
	
	//Turn grid into proper Map
	for(var i = 0; i < grid.length; i++) {
		for(var j = 0; j < grid[i].length; j++) {
			if(grid[i][j] == null) grid[i][j] = 'x';
		}
	}
	return grid;
}

function checkRobberCaught(robber, copArray, map) {
	var copCount = 0;
	
	var tile = map.getActorTile(robber);
	var n = [tile.north, tile.east, tile.south, tile.west];
	for(var i = 0; i < n.length; i++) {
		if(n[i] == null) {
			n.splice(i, 1);
			i--;
			continue;
		}
		if(map.obstacleAt(n[i].sprite.x, n[i].sprite.y)) {
			var copThere = false;
			for(var j = 0; j < copArray.length; j++) {
				if((n[i].sprite.x == copArray[j].sprite.x && n[i].sprite.y == copArray[j].sprite.y)) {
					copCount++;
					copThere = true;
					break;
				}
			}
			if(!copThere) {
				n.splice(i, 1);
				i--;
				continue;
			}
		}
	}
	
	if(n.length == 0) return false;
	
	return (copCount >= 2 || (copCount >= 1 && n.length == 1));
}

function randomDirection(actor, map) {
	var tileAt = map.tileAt(actor.sprite.x, actor.sprite.y);
	var n = [{side: tileAt.north, direction: KEY_UP}, {side: tileAt.east, direction: KEY_RIGHT}, {side: tileAt.south, direction: KEY_DOWN}, {side: tileAt.west, direction: KEY_LEFT}];
	for(var i = 0; i < n.length; i++) {
		if(n[i].side == null) {
			n.splice(i, 1);
			i--;
		}
	}
		
	if(n.length == 0) return KEY_SPACE;
	
	var r = getRandomInt(0, n.length);
	return n[r].direction;
}

function getCopNextMove(actor, cops, robbers, map) {
	var pathToRobber;
	var otherCopIsChasing = false;
	var targetRobber;
	var targetTile;
	var point;
	for(var i = 0; i < cops.length; i++) {
		if(cops[i] !== actor && cops[i].target !== undefined) {
			otherCopIsChasing = true;
			targetRobber = cops[i].targetRobber;
			targetTile = cops[i].targetTile;
			break;
		}
	}
	
	if(!otherCopIsChasing) {
		var length = Number.MAX_VALUE;
		for(var i = 0; i < robbers.length; i++) {
			var tile = map.tileAt(robbers[i].sprite.x, robbers[i].sprite.y);
			var n = [tile.north, tile.east, tile.south, tile.west];
			for(var j = 0; j < n.length; j++) {
				var side = n[j];
				var goal;
				if(side != null && !map.obstacleAt(side.sprite.x, side.sprite.y)) {
					var temp = breadthFirstSearch(map, actor.sprite.x, actor.sprite.y, side.sprite.x, side.sprite.y);
					if(temp["Length"] < length) {
						targetRobber = robbers[i];
						targetTile = side;
						length = temp["Length"];
						path = temp;
						goal = {x: side.sprite.x, y: side.sprite.y};
					}
				}
				
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
	} else {
		var tile = map.tileAt(targetRobber.sprite.x, targetRobber.sprite.y);
		var n = [tile.north, tile.east, tile.south, tile.west];
		for(var j = 0; j < n.length; j++) {
			var side = n[j];
			var goal;
			if(side != null && side !== targetTile && !map.obstacleAt(side.sprite.x, side.sprite.y)) {
				var temp = breadthFirstSearch(map, actor.sprite.x, actor.sprite.y, side.sprite.x, side.sprite.y);
				if(temp["Length"] < length) {
					targetTile = side;
					length = temp["Length"];
					path = temp;
					goal = {x: act.sprite.x, y: act.sprite.y};
				}
			}
			
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
	
	if(point == null) return randomDirection(actor, map);
	
	var tile = map.tileAt(actor.sprite.x, actor.sprite.y);
	actor.targetRobber = targetRobber;
	actor.targetTile = targetTile;
	
	var pointTile = map.tileAt(point.x, point.y);
	if(tile.north === pointTile) return KEY_UP;
	if(tile.east === pointTile) return KEY_RIGHT;
	if(tile.south === pointTile) return KEY_DOWN;
	if(tile.west === pointTile) return KEY_LEFT;
	return randomDirection(actor, map);
}

function getRobberNextMove(actor, cops, robbers, map) {
	var side
	var length = 0;
	for(var i = 0; i < map.walkablePath.length; i++) {
		var pos = map.walkablePath[i];
		var nL = 0;
		for(var j = 0; j < cops.length; j++) {
			nL += Math.sqrt(Math.pow(pos.x - cops[j].sprite.x, 2) + Math.pow(pos.y - cops[j].sprite.y, 2));
		}
		nL /= cops.length;
		if(nL >= length) {
			length = nL;
			side = map.tileAt(pos.x, pos.y);
		}
	}
	var point;
	var goal;
	if(side != null && !map.obstacleAt(side.sprite.x, side.sprite.y)) {
		var temp = breadthFirstSearch(map, actor.sprite.x, actor.sprite.y, side.sprite.x, side.sprite.y);
		if(temp["Length"] < length) {
			targetRobber = robbers[i];
			targetTile = side;
			length = temp["Length"];
			path = temp;
			goal = {x: side.sprite.x, y: side.sprite.y};
		}
	}
	
	point = goal;
	var previous = point;
	while(true) {
		if(point == null || point == undefined) break;
		if(path[point.x + " " + point.y] == null) break;
		previous = point;
		point = path[point.x + " " + point.y];
	}
	point = previous;
	
	if(point == null) return randomDirection(actor, map);
	
	var tile = map.tileAt(actor.sprite.x, actor.sprite.y);
	
	var pointTile = map.tileAt(point.x, point.y);
	if(tile.north === pointTile) return KEY_UP;
	if(tile.east === pointTile) return KEY_RIGHT;
	if(tile.south === pointTile) return KEY_DOWN;
	if(tile.west === pointTile) return KEY_LEFT;
	return randomDirection(actor, map);
}

function displayMenu() {
	screen = MENU;
	stage.clearObjects();
	
	stage.addDrawable(new Text("COPS", 210, 110, "#0000FF", "70px Verdana Bold"));
	stage.addDrawable(new Text("AND", 220, 220, "#FFFFFF", "70px Verdana Bold"));
	stage.addDrawable(new Text("ROBBERS", 150, 330, "#FF0000", "70px Verdana Bold"));
	stage.addDrawable(new Text("Press Space to Begin", 185, 440, "#FFFFFF", "30px Verdana Bold"));
}

function beginGame() {
	screen = GAME;
	stage.clearObjects();
	players = [], robbers = [], cops = [];
	sameKey = null;
	sameKeyCount = 0;
	turn = 0;
	turnsLeft = TURNS_FOR_VICTORY;
	
	mapBase = generateMap(gridSize);
    map = new Map(mapBase, TILESIZE);
	
	stage.addActor(map);
	
	var pos = map.getRandomWalkablePath();
	robbers.push(new GamePiece(new Sprite(textures[ROBBER], pos.x, pos.y)));
	stage.addActor(robbers[0]);
	player = robbers[0];
	map.addObstacle(pos.x, pos.y);
	
	pos = map.getRandomWalkablePath();
	robbers.push(new GamePiece(new Sprite(textures[ROBBER], pos.x, pos.y)));
	stage.addActor(robbers[1]);
	map.addObstacle(pos.x, pos.y);
	
	pos = map.getRandomWalkablePath();
	cops.push(new GamePiece(new Sprite(textures[COP], pos.x, pos.y)));
	stage.addActor(cops[0]);
	map.addObstacle(pos.x, pos.y);
	
	pos = map.getRandomWalkablePath();
	cops.push(new GamePiece(new Sprite(textures[COP], pos.x, pos.y)));
	stage.addActor(cops[1]);
	map.addObstacle(pos.x, pos.y);	
	
	players.push(robbers[0], robbers[1], cops[0], cops[1]);
	
	turnDisplay = new Box(robbers[0].sprite.x, robbers[0].sprite.y, TILESIZE, TILESIZE, "limegreen");
	stage.addDrawable(turnDisplay);
	stage.addDrawable(turnsLeftDisplay);
}

function displayEndScreen(victor) {
	stage.clearObjects();
	if(victor == "c") {
		stage.addDrawable(new Text("COPS WIN", 135, 200, "#0000FF", "70px Verdana Bold"));
		stage.addDrawable(new Text("Press Space to continue", 185, 370, "#0000FF", "20px Verdana"));
	} else {
		stage.addDrawable(new Text("ROBBERS WIN", 60, 200, "#FF0000", "70px Verdana Bold"));
		stage.addDrawable(new Text("Press Space to continue", 185, 370, "#FF0000", "20px Verdana"));
	}
}

// update draw
function draw() {
    // draw Background
    context.fillStyle = "#BBBBBB";
    context.fillRect(0, 0, canvas.width, canvas.height);

    stage.draw();
}

// update loop
function update() {
	
	switch (screen) {
		case MENU:
			//Main MENU
			var keyCode = keyboard.removeKeyCode();
			if(keyCode == KEY_SPACE) beginGame();
			break;
			
		case GAME:
			var keyCode = keyboard.removeKeyCode();
			
			if(robbers.length === 0 || turnsLeft <= 0) {
				if(keyCode === KEY_SPACE) {
					displayMenu();
				}
				return;
			}
			
			var actor = players[turn];
			var isCop = false;
			for(var i = 0; i < cops.length; i++) {
				if(cops[i] === actor) {
					isCop = true;
					break;
				}
			}
			if(isCop) {
				keyCode = getCopNextMove(actor, cops, robbers, map);
				if(keyCode == sameKey) sameKeyCount++;
				else {
					sameKey = keyCode;
					sameKeyCount = 0;
				}
				if(sameKeyCount > SAME_KEY_MAX) keyCode = KEY_SPACE;
			} else if(player !== actor) {
				keyCode = getRobberNextMove(actor, cops, robbers, map);
				if(keyCode == sameKey) sameKeyCount++;
				else {
					sameKey = keyCode;
					sameKeyCount = 0;
				}
				if(sameKeyCount > SAME_KEY_MAX) keyCode = KEY_SPACE;
			}
			
			switch(keyCode) {
				case KEY_LEFT:
					if(!map.moveActor(actor, KEY_LEFT)) return;	
					sameKeyCount = 0;	
					turn = (turn + 1) % players.length;
					if(actor === player) turnsLeft--;
					break;
					
				case KEY_DOWN:
					if(!map.moveActor(actor, KEY_DOWN)) return;
					sameKeyCount = 0;
					turn = (turn + 1) % players.length;
					if(actor === player) turnsLeft--;
					break;
					
				case KEY_UP:
					if(!map.moveActor(actor, KEY_UP)) return;
					sameKeyCount = 0;
					turn = (turn + 1) % players.length;
					if(actor === player) turnsLeft--;
					break;
					
				case KEY_RIGHT:
					if(!map.moveActor(actor, KEY_RIGHT)) return;
					sameKeyCount = 0;
					turn = (turn + 1) % players.length;
					if(actor === player) turnsLeft--;
					break;
					
				case KEY_SPACE:
					if(!map.isBlocked(actor)) return;
					sameKeyCount = 0;
					turn = (turn + 1) % players.length;
					if(actor === player) turnsLeft--;
					break;
			}
			var actor = players[turn];
			turnDisplay.X = actor.sprite.x;
			turnDisplay.Y = actor.sprite.y;
			
			for(var i = 0; i < robbers.length; i++) {
				if(checkRobberCaught(robbers[i], cops, map)) {
					stage.removeActor(robbers[i]);
					map.removeObstacle(robbers[i].sprite.x, robbers[i].sprite.y);
					map.addWalkablePath(robbers[i].sprite.x, robbers[i].sprite.y);
					players.splice(i, 1);
					robbers.splice(i, 1);
					i--;
					turn--;
					if(turn < 0) turn = 0;
				}
			}
			
			turnsLeftDisplay.fillText = "Turns Left: " + turnsLeft;
			
			if(robbers.length == 0) displayEndScreen("c");
			else if(turnsLeft <= 0) displayEndScreen("r");
			break;
	}
}

////////////////////////////////////////////////////////////////////////////////////////
// Initiate the game
////////////////////////////////////////////////////////////////////////////////////////

const MENU = 0, GAME = 1, KEY_LEFT = 37, KEY_RIGHT = 39, KEY_DOWN = 40, KEY_UP = 38, KEY_SPACE = 32, TILESIZE = 60, SQUARES_LEVEL_RATIO = 0.85, VISITED_MAX = 15, MAX_LOOPS = 200, SAME_KEY_MAX = 4, TURNS_FOR_VICTORY = 30;

var textures = [
    new Texture("Wall.png", 60, 60),
	new Texture("Path.png", 60, 60),
	new Texture("Path_Direction.png", 60, 60),
	new Texture("Cop.png", 60, 60),
	new Texture("Robber.png", 60, 60)
];
const WALL = 0, PATH = 1, PATH_DIRECTION = 2, COP = 3, ROBBER = 4;

var players = [];
var cops = [];
var robbers = [];
var player;
var turn = 0;
var turnsLeft = TURNS_FOR_VICTORY;
var turnsLeftDisplay = new Text("Turns Left: ", 220, 590, "#FFFFFF", "30px Verdana Bold");
var turnDisplay;
var sameKey;
var sameKey = null;
var sameKeyCount = 0;

var gridSize = 8;
var mapBase;
var map;

displayMenu();

// start the game
// calls the update and draw loop
startGame(60);