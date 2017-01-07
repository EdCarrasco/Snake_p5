// Global variables
var snake;
var gameScale = 40;
var food;
3
// setup() and draw() are required in p5.js
function setup() {
	frameRate(8);
	var grid = 20;
	createCanvas(grid*gameScale, grid*gameScale);

	snake = new Snake();
	PickLocation();
}

function draw() {
	background(40); // dark color

	snake.death();
	snake.update();
	snake.show();

	if (snake.eat(food)) {
		PickLocation();
	}

	fill(255, 0, 100);
	rect(food.x, food.y, gameScale, gameScale);
}

// Functions
function mousePressed() {
	snake.total++;
}

function keyPressed() {
	if (keyCode === UP_ARROW) {
		snake.goUp();
	} else if (keyCode === DOWN_ARROW) {
		snake.goDown();
	} else if (keyCode === RIGHT_ARROW) {
		snake.goRight();
	} else if (keyCode === LEFT_ARROW) {
		snake.goLeft();
	}
}

function PickLocation() {
	// Determine amount of rows and columns in the game space
	var cols = floor(width/gameScale);
	var rows = floor(height/gameScale);

	// Create a vector in a random location
	food = createVector(floor(random(cols)), floor(random(rows)));
	food.mult(gameScale);
}

