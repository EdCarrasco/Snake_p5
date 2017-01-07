function Snake() {
	this.x = 0;
	this.y = 0;
	this.xspeed = 0;
	this.yspeed = 0;
	this.total = 0;
	this.tail = []; // array of vectors
	this.corpse = [];
	this.decayRate = 0;

	this.update = function() {
		// Update the position of each of the snake's tail positions
		// If no food has been eaten
		if (this.total === this.tail.length) {
			for (var i = 0; i < this.tail.length; i++) {
					this.tail[i] = this.tail[i+1];
				}
		}
		this.tail[this.total-1] = createVector(this.x, this.y);

	

		// Move the snake
		this.x += this.xspeed * gameScale;
		this.y += this.yspeed * gameScale;

		// Prevent it from moving outside the canvas
		this.x = constrain(this.x, 0, width - gameScale);
		this.y = constrain(this.y, 0, height - gameScale);


	}

	this.show = function() {
		// Draw the tail
		for (var i = 0; i < this.tail.length; i++) {
			var red = i*(100/this.tail.length);
			fill(red, 150, 100);
			rect(this.tail[i].x, this.tail[i].y, gameScale, gameScale);
		}

		// Draw the head
		fill(100, 150, 100);
		rect(this.x, this.y, gameScale, gameScale);

		fill(0);
		text(this.total, this.x+(gameScale/2)-3, this.y+(gameScale/2)+5);

		// Draw corpse
		if (this.decayRate > 0) {
			fill(255,0,0);
			for (var i = 0; i < this.corpse.length; i++) {
				var size = gameScale*this.decayRate/100;
				var centerFormula = gameScale/2*(1-this.decayRate/100);
				rect(this.corpse[i].x+centerFormula, this.corpse[i].y+centerFormula, size, size);
			}
			this.decayRate -= 3;
		}
	}

	this.goLeft = function() {
		if (this.xspeed <= 0 ) {
			this.xspeed = -1;
			this.yspeed = 0;
		}
	}

	this.goRight = function() {
		if (this.xspeed >= 0 ) {
			this.xspeed = 1;
			this.yspeed = 0;
		}
	}

	this.goUp = function() {
		if (this.yspeed <= 0 ) {
			this.xspeed = 0;
			this.yspeed = -1;
		}
	}

	this.goDown = function() {
		if (this.yspeed >= 0 ) {
			this.xspeed = 0;
			this.yspeed = 1;
		}
	}

	this.dir = function(x, y) {
		this.xspeed = x;
		this.yspeed = y;
	}

	this.eat = function(pos) {
		var distance = dist(this.x, this.y, pos.x, pos.y);
		if (distance < 1) {
			this.total++;
			return true;
		} else {
			return false;
		}
	}

	this.death = function() {
		for (var i = 0; i < this.tail.length; i++) {
			var pos = this.tail[i];
			var distance = dist(this.x, this.y, pos.x, pos.y);
			if (distance < 1) {
				this.decayRate = 20;
				this.total = 0;
				this.corpse = this.tail;
				this.tail = [];
			}
		}
	}

	this.hasPositionInTail = function(pos) {
		// Search tail array for this position
		for (var i = 0; i < this.tail.length; i++) {
			if (this.tail[i].x === pos.x && this.tail[i].y === pos.y) {
				return true;
			}
		}
		return false;
	}
}