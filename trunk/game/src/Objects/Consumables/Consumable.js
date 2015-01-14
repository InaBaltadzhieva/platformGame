var Consumable = Class.extend({
	init: function (x, y, image) {
		this.x = x + 27
		this.y = y +  35
		this.image = image;
		this.width = 42;
		this.height = 42;
		this.sourceX = 0
		this.sourceY = 0
		this.speed = 0.5;
		this.originalCenterY = this.y + this.height / 2;
		this.distance = 10
		
		this.score = 100;
		this.taken = false;
	},
	
	draw: function(canvas, ctx) {
		this.move();
		ctx.drawImage(this.image,
				this.sourceX, this.sourceY, this.width, this.height,
				this.x, this.y, this.width, this.height)
	},
	
	move: function () { 
		this.y += this.speed;
		if(Math.abs(this.originalCenterY - (this.y + this.height /2) ) > this.distance ) {
			this.speed *= -1;
		}
	
	},
	centerX: function () {
		return this.x + this.width / 2;
	},
	centerY: function () {
		return this.y + this.height / 2;
	}
	
	
	
})

var Perl = Consumable.extend({
	init: function (x, y, image) {
		this._super(x, y, image);
		this.sourceX = 42
		this.sourceY = 0
		this.score = 150;
	}
})


var PerlBlue = Consumable.extend({
	init: function (x, y, image) {
		this._super(x, y, image);
		this.sourceX = 84
		this.sourceY = 0
		this.score = 200;
	}
})


var PerlBlueGreen = Consumable.extend({
	init: function (x, y, image) {
		this._super(x, y, image);
		this.sourceX = 126
		this.sourceY = 0
		this.score = 250;
	}
})

var PerlBluePurple = Consumable.extend({
	init: function (x, y, image) {
		this._super(x, y, image);
		this.sourceX = 168
		this.sourceY = 0
		this.score = 300;
	}
})


var AnimatedConsumable = Consumable.extend({
	init: function (x, y, image) {
		this._super(x, y, image);
		this.sourceX = 0
		this.sourceY = 84
		this.score = 700;
		this.currentPosition = 0;
		this.maxPosition = 4;
		this.frameTimer = Date.now();
		this.frameDuration = 100;
	},
	draw: function(canvas, ctx) {
		this.animate();
		ctx.drawImage(this.image,
				this.currentPosition * 42, this.sourceY, this.width, this.height,
				this.x, this.y, this.width, this.height)
	},
	animate: function() {
		if(Date.now() - this.frameTimer  > this.frameDuration) {
			if(this.currentPosition > this.maxPosition - 2) {
				this.currentPosition = 0;	
			} else {
				this.currentPosition++;
			}
			this.frameTimer = Date.now();
		}		
		
	}
})


var GoldenCoin = AnimatedConsumable.extend({
	init: function (x, y, image) {
		this._super(x, y, image);
		this.sourceY = 126
		this.score = 1500;
	
	}
})

var Money = AnimatedConsumable.extend({
	init: function (x, y, image) {
		this._super(x, y, image);
		this.sourceY = 168
		this.score = 2000;
	
	}
})


var Final = Consumable.extend({
	init: function (x, y, image) {
		this._super(x, y, image);
		this.sourceX = 0;
		this.sourceY = 210
		this.score = 2000;
	
	}
})



var Teleport = Class.extend({
	init: function (x, y, image) {
		this.x = x
		this.y = y 
		this.image = image;
		this.width = 256;
		this.height = 256;
		this.sourceX = 0
		this.sourceY = 256
	
		this.currentPositionX = 0;
		this.currentPositionY = 2;
		this.maxPosition = 4;
		this.frameTimer = Date.now();
		this.frameDuration = 100;
	},
	draw: function(canvas, ctx) {
		this.animate();
		ctx.drawImage(this.image,
				this.currentPositionX * 256, this.currentPositionY * 256, this.width, this.height,
				this.x, this.y, this.width, this.height)
	},
	animate: function() {
		if(Date.now() - this.frameTimer  > this.frameDuration) {
			
			if(this.currentPositionX <= this.maxPosition - 2)
			{
				
				this.currentPositionX++;
			} else {
				this.currentPositionX = 0;
			}
			this.frameTimer = Date.now();
		}		
		
	},	
	centerX: function () {
		return this.x + this.width / 2;
	},
	centerY: function () {
		return this.y + this.height / 2;
	}
})