var MovingTrapSmallH = Class.extend({

	init: function (x, y, image, image2){
		this.x = x;
		this.y = y;
		this.image = image;
		this.height = 90;
		this.width = 90;
		this.currentPosition = 0; 
		this.maxPosition = 2; 
		this.frameTimer = Date.now();
		this.frameDuration = 125;
		this.speed = 2;
		
		this.patrolArea = 90;		
		this.originalCenterX = x + this.width / 2;
		this.originalCenterY = y + this.height / 2;
		this.image2 = image2
		this.x2 = x - 45
		this.y2 = y + 39.5
	},
	draw: function(canvas, ctx) {		
		this.patrol()
		this.changeSprite();
		ctx.drawImage(this.image2,this.x2, this.y2)
		ctx.drawImage(this.image,
				this.currentPosition * this.width,0, this.width, this.height, 
				this.x, this.y, this.width, this.height);
		
		
				
	},
	
	changeSprite: function() {
		if(Date.now() - this.frameTimer  > this.frameDuration) {
			if(this.currentPosition >= this.maxPosition - 1) {
				this.currentPosition = 0;
			} else {
				this.currentPosition++;
			}
			this.frameTimer = Date.now();
		}		
	},
	
	patrol: function () { 
		this.x += this.speed
		if(Math.abs(this.originalCenterX - (this.x + this.patrolArea / 2 ) ) > this.patrolArea ) {
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

var MovingTrapSmallV = MovingTrapSmallH.extend({
	init: function (x, y, image, image2){
		this._super(x, y, image, image2)
		this.x2 = x + 39.5
		this.y2 = y - 45
	},
	patrol: function () { 
		this.y += this.speed
		if(Math.abs(this.originalCenterY - (this.y + this.patrolArea / 2 ) ) > this.patrolArea ) {
			this.speed *= -1;
		}
	
	},
})

//VD - vertical down-up
var MovingTrapMediumVD = MovingTrapSmallV.extend({
	init: function (x, y, image, image2){
		this._super(x, y, image, image2)
		this.patrolArea = 180;
		this.x2 = x + 39.5
		this.y2 = y - 180
	},
	patrol: function () { 
		this.y += this.speed
		if(Math.abs(this.originalCenterY - (this.y + this.patrolArea / 2 ) ) > this.patrolArea ) {
			this.speed *= -1;
		}
	
	},
})
//VD - vertical up-down
var MovingTrapMediumVU = MovingTrapMediumVD.extend({
	init: function (x, y, image, image2){
		this._super(x, y, image, image2)
	},
	patrol: function () { 
		this.y -= this.speed
		if(Math.abs(this.originalCenterY - (this.y + this.patrolArea / 2 ) ) > this.patrolArea ) {
			this.speed *= -1;
		}
	
	},
})





var Spikes = Class.extend({

	init: function (x, y, image){
		this.height = 90;
		this.width = 90;
		this.sourceX = 0;
		this.sourceY = 0;
		this.sourceWidth = 90;
		this.sourceHeight = 45;
		this.x = x;
		this.y = y + this.sourceHeight
		this.image = image;


	},
	draw: function(canvas, ctx) {		

		ctx.drawImage(this.image,
				this.sourceX, this.sourceY,this.height, this.width,
				this.x, this.y, this.sourceWidth, this.sourceHeight);
	},
	centerX: function () {
		return this.x + this.width / 2;
	},
	centerY: function () {
		return this.y + this.height / 2;
	}
})




var ShootingLeftTrap = Class.extend({

	init: function (x, y, image){
		this.height = 40;
		this.width = 40;
		this.sourceX = 80;
		this.sourceY = 0;
		this.sourceWidth = 40;
		this.sourceHeight = 40;
		this.x = x + 50;
		this.y = y + 50;
		this.image = image;


	},
	draw: function(canvas, ctx) {		

		ctx.drawImage(this.image,
				this.sourceX, this.sourceY,this.height, this.width,
				this.x, this.y, this.sourceWidth, this.sourceHeight);
	},
	centerX: function () {
		return this.x + this.width / 2;
	},
	centerY: function () {
		return this.y + this.height / 2;
	}
})



var ShootingRightTrap = ShootingLeftTrap.extend({

	init: function (x, y, image){
		this._super(x, y, image)
		this.sourceX = 120;
	}

})



var ArrowLeft = Class.extend({
	init: function (x, y, image){
		this.height = 12;
		this.width = 43;
		this.sourceX = 0;
		this.sourceY = 83;
		this.sourceWidth = 43;
		this.sourceHeight = 9;
		this.x = x;
		this.y = y;
		this.image = image;
		this.speed = -15;
		this.damage = 100;
		this.hasHit = false;
		this.originalX = x;
		this.maxDistance = 1000;


	},
	draw: function(canvas, ctx) {	
		this.move()
		ctx.drawImage(this.image,
				this.sourceX, this.sourceY,this.sourceWidth, this.sourceHeight,
				this.x, this.y, this.width, this.height);
	},
	move: function(canvas, ctx) {		
		this.x += this.speed
	},
	centerX: function () {
		return this.x + this.width / 2;
	},
	centerY: function () {
		return this.y + this.height / 2;
	}
});

var ArrowRight = ArrowLeft.extend ({
	init: function (x, y, image){
		this._super(x, y, image)
		this.sourceY = 92;
		this.speed = 15;
	}
})
