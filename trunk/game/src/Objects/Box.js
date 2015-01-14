var Box = Class.extend({
	init: function(x, y, image) {
		
		this.x = x;
		this.y = y;
		this.image = image;
		this.height = 186;
		this.width = 72;
		this.currentPositionX = 0; 
		this.currentPositionY = 0; 
		this.maxPosition = 3; 
		this.leftOrRight = 1; // if players is facing left leftOrRight is "1" if is facing right leftOrRight is "0"
		this.frameTimer = Date.now();
		this.frameDuration = 100;
		this.spriteCordinates = [0, 72, 144, 216, 288, 360, 432]
		this.spriteWidth = [72, 72, 72, 72, 72, 72, 72]
		
		this.currentHealth = 1000;
		this.maXHealth = 1000;		
	},
	
	draw: function(canvas, ctx) {
		this.changeSprite()
		ctx.drawImage(this.image,
				this.currentPositionX * 186,this.currentPositionY * 116, 186, 114, 
				this.x, this.y + 17, 110, 73);
	},
	
	changeSprite: function() {
			if(this.currentPositionX >= this.maxPosition)
			{
				this.currentPositionX = 0 
				this.currentPositionY++;
			}
	},

	centerX: function () {
		return this.x + this.width / 2;
	},
	centerY: function () {
		return this.y + this.height / 2;
	},
	takeDamage: function(damage) {
			this.currentHealth -= damage
			this.canBeAttackedTimer = Date.now()
		
	},
	canBeAttacked: function () {
		return this.canBeAttackedDuration < Date.now() - this.canBeAttackedTimer
	},
	isAlive: function () {
		if(this.currentHealth <= 0){
			return false
		} else {
			return true
		}
	}


})
