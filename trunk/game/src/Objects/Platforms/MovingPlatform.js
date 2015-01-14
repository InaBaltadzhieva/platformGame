var MovingPlatform = GameObject.extend({
	init: function(x, y, image) {
		this._super(x, y, image);
		
		this.width = 90;
		this.height = 90;
		this.sourceX = 90;
		this.sourceY = 90;
		this.sourceWidth = 90;
		this.sourceHeight = 90;
		this.speed = 2;
		this.originalCenterX = x + this.width / 2;
		this.distance = 100
	},
	
	draw: function(canvas, ctx) {
		this.move();
		ctx.drawImage(this.image,
				this.sourceX, this.sourceY, this.width, 
				this.height, this.x, this.y, this.width, this.height);
	}, 
	
	move: function () { 
		this.x += this.speed;
		if(Math.abs(this.originalCenterX - (this.x + this.width /2) ) > this.width ) {
			this.speed *= -1;
		}
	
	}
})

var MovingPlatformPartOne = MovingPlatform.extend({
	init: function(x, y, image) {
		this._super(x, y, image);
		this.speed = -2;
	}
})


var DiagonalMovingPlatform = MovingPlatform.extend({
	init: function(x, y, image, height, width, sourceX, sourceY) {
		this._super(x, y, image, height, width, sourceX, sourceY);
	},	
	move: function () { 
		this.x += this.speed
		this.y += this.speed
		if(Math.abs(this.originalCenterX - (this.x + this.width /2)) > this.width * 2) {
			this.speed *= -1;
		}
	
	}
})


var DiagonalMovingPlatformTR = MovingPlatform.extend({
	init: function(x, y, image, height, width, sourceX, sourceY) {
		this._super(x, y, image, height, width, sourceX, sourceY);
	},	
	move: function () { 
		this.x -= this.speed
		this.y += this.speed
		if(Math.abs(this.originalCenterX - (this.x + this.width /2)) > this.width * 1.5) {
			this.speed *= -1;
		}
	
	}
})