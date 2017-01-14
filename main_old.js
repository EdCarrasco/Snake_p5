var game;
var grid;
var player;
var scale;

var testObj;

function setup() {
	scale = 40;
	createCanvas(scale*28,scale*20);
	
	game = new Game();

	grid = new Grid();
	grid.setup();

	player = new Player();
	//player.start(grid.findCenter());

	testObj = new TestObject(grid.getFirstCell());
}

function draw() {
	background(40);

	grid.display();
	player.display();

	if (!game.isPaused()) {
		//if (frameCount%1 === 0) {
			//player.moveForward();
		//}
	}

	testObj.paint();
}

// Constructors

function Game() {
	this.paused = false;
	this.score = 0;

	this.togglePause = function() {
		if (this.paused)
			this.paused = false;
		else
			this.paused = true;
	}

	this.isPaused = function() {
		return this.paused;
	}
}

function Grid() {
	this.cells = [];

	this.setup = function() {
		var rows = height/scale;
		var columns = width/scale;

		for (var row = 0; row < rows; row++) {
			var gridRow = [];
			for (var col = 0; col < columns; col++) {
				var x = col*scale + scale/2;
				var y = row*scale + scale/2;
				//gridRow.push( new p5.Vector(x, y) );
				gridRow.push( new Cell(x,y,row,col) );
			}
			this.cells.push(gridRow);
		}
	}
	
	this.display = function() {
		for (var row = 0; row < this.cells.length; row++) {
			for (var col = 0; col < this.cells[row].length; col++) {
				/*fill(255);
				var x = this.cells[row][col].x;
				var y = this.cells[row][col].y;
				ellipse(x,y, 15);*/
				this.cells[row][col].display();
			}
		}
	}

	this.findCenter = function() {
		var row = floor(this.cells.length/2);
		var col = floor(this.cells[row].length/2);
		return this.cells[row][col]; // Cell object
	}

	this.addObj = function(obj, row, col) {
		this.cells[row][col].add(obj);
	}

	this.removeObj = function() {

	}

	this.test = function() {
		for (var row = 0 ; row < this.cells.length; row++) {
			for (var col = 0; col < this.cells[row].length; col++) {
				this.cells[row][col].test();
			}
		}
	}

	this.getFirstCell = function() {
		return this.cells[0][0];
	}
}

function Cell(x,y,row,col) {
	this.x = x;
	this.y = y;
	this.row = row;
	this.col = col;
	this.objects = [];
	this.color = color(255);

	this.getPosition = function() {
		return new p5.Vector(this.x,this.y);
	}

	this.getCoords = function() {
		return new p5.Vector(this.row, this.col);
	}

	this.hasObjects = function() {
		return (this.objects.length > 0);
	}

	this.add = function(obj) {
		this.objects.push(obj);
	}

	this.remove = function() {
		// how to choose which one to remove?
	}

	this.test = function() {
		//for (var i = 0; i < this.objects.length; i++) {
		//	this.objects[i].color = color(random(255),random(255),random(255));
		//}
	}

	this.display = function() {
		//fill(this.color);
		//ellipse(this.x,this.y,20,20);
	}
}

function Player() {
	this.body = [];
	this.direction = 0;
	this.startBody = 3;

	this.start = function(cell) {
		// Starts with 3 pieces
		for (var i = 0; i < this.startBody; i++) {
			this.body.push( new Segment(cell) );
		}

		/*for (var i = 0; i < this.body.length; i++) {
			grid.addObj(this, this.body[i].row, this.body[i].col);
		}*/
	}

	this.display = function() {
		for (var i = this.body.length-1; i > 0; i--) {
			var x = this.body[i].x;
			var y = this.body[i].y;
			var size = this.body[i].size;
			var color = this.body[i].color;

			rectMode(CENTER);
			fill(color);
			rect(x,y,size,size);
		}
	}

	this.setTargetCell = function(cell) {
		// From second-to-last element to second one
		for (var i = this.body.length-2; i > 1; i--) {
			this.body[i] = this.body[i-1];
		}

		// First element
		this.body[0].setTargetCell(cell);

		for (var i = 0; i < this.body.length; i++) {
			console.log(this.body[i].cell);
		}
	}

	this.moveForward = function() {

		var head = this.body[0]; // Cell object
		
		head.color = color(255,0,0)
		switch (this.direction) {
			case RIGHT_ARROW:
				if (head.row)
				console.log("Direction: RIGHT. Next move: ");
				break;
			case LEFT_ARROW:
				console.log("Direction: LEFT.  Next move: ");
				break;
			case UP_ARROW:
				console.log("Direction: UP.    Next move: ");
				break;
			case DOWN_ARROW:
				console.log("Direction: DOWN.  Next move: ");
				break;
			default:
				break;
		}

		for (var i = 0 ; i < this.body.length; i++) {

			this.body[i].moveTowardsCell();
		}
	}

	this.move = function(row,col) {
		this.moveForward();
		var x;
		var y;
		/*
		if (this.direction === RIGHT_ARROW) {
			x = this.body[0].x + scale;
			y = this.body[0].y;
		} 
		else if (this.direction === LEFT_ARROW) {
			x = this.body[0].x - scale;
			y = this.body[0].y;
		} 
		else if (this.direction === UP_ARROW) {
			x = this.body[0].x;
			y = this.body[0].y - scale;
		} 
		else if (this.direction === DOWN_ARROW) {
			x = this.body[0].x;
			y = this.body[0].y + scale;
		} 
		else {
			x = this.body[0].x;
			y = this.body[0].y;
		}
		*/
			
		// Change the positions of the body to that of the one next to it
		//for (var i = this.body.length-1; i > 0; i--) {
		//	this.body[i] = this.body[i-1];
		//}

		// Set the position of the head to the new position
		//this.body[0] = new p5.Vector(x,y);
	}

	this.setDirection = function(direction) {
		this.direction = direction;
	}
}

function Segment(cell) {
	this.x = cell.x;
	this.y = cell.y;
	this.cell = cell;
	this.size = 50;

	this.color = color(random(255),random(255),random(255));

	this.display = function() {
		//rectMode(CENTER);
		//fill(this.color);
		//rect(this.x,this.y,this.size,this.size);
	}

	this.moveTowardsCell = function() {
		console.log("this.x = " + this.x + "   cell.x = " + this.cell.x);
		if (this.x > this.cell.x) this.x--;
		else if (this.x < this.cell.x) this.x++;

		if (this.y > this.cell.y) this.y--;
		else if (this.y < this.cell.y) this.y++;
	}

	this.move = function(x) {
		this.x = x;
	}

	this.setTargetCell = function(cell) {
		this.cell = cell;
	}
}

function keyPressed() {
	if (keyCode === UP_ARROW || keyCode === 87) {
		player.setDirection(UP_ARROW);
	} 
	else if (keyCode === DOWN_ARROW || keyCode === 83) {
		player.setDirection(DOWN_ARROW);
	} 
	else if (keyCode === LEFT_ARROW || keyCode === 65) {
		player.setDirection(LEFT_ARROW);
	} 
	else if (keyCode === RIGHT_ARROW || keyCode === 68) {
		player.setDirection(RIGHT_ARROW);
	} 
	

	// SPACEBAR : Pause/resume the game
	if (keyCode === 32) {
		game.togglePause();
	}
}

function mousePressed() {
	grid.test();

	for (var row = 0; row < grid.cells.length; row++) {
		for (var col = 0; col < grid.cells[row].length; col++) {
			var x = grid.cells[row][col].x;
			var y = grid.cells[row][col].y;
			if (mouseX >= x - scale/2 && 
				mouseX <= x + scale/2 && 
				mouseY >= y - scale/2 && 
				mouseY <= y + scale/2) 
			{
				grid.cells[row][col].color = color(255,0,0);
				console.log(grid.cells[row][col].objects);
				player.setTargetCell(grid.cells[row][col]);

				for (var i = 0; i < grid.cells[row][col].objects.length; i++) {
					//grid.cells[row][col].objects[i%3].color = color(random(255),0,0);
					//grid.cells[row][col].objects[i%3].color = color(0,random(255),0);
					//grid.cells[row][col].objects[i%3].color = color(0,0,random(255));
				}
			}
		}
	}
}

function TestObject(cell) {
	this.x = cell.x;
	this.y = cell.y;

	this.paint = function() {
		fill(0,100,255);
		rect(this.x,this.y,40,40);

		console.log(cell);
	}
}