var Projectile = Class.extend({
	init: function(x, y, image) {
		this.x = x;
		this.y = y + 20;
		this.image = image;
		this.width = 27;
		this.height = 27;
		this.sourceX = 0;
		this.sourceY = 0;
		this.currentPosition = 0; 
        this.maxPosition = 2
        this.frameTimer = Date.now();
        this.frameDuration = 125;
        this.speed = 10;
        //this controls how much time after the 
        //projectime is created the projectile will be displayed and will start moving
        this.stopFromDrawingTimer = Date.now();
        this.stopFromDrawingDuration = 400; // 500
        this.hasHit = false;
	},
	
	draw: function(canvas, ctx) {
		if(this.stopFromDrawingDuration < Date.now() - this.stopFromDrawingTimer) {
			this.x += this.speed;
			this.changeSprite();
			ctx.drawImage(this.image, 
					this.currentPosition * this.width, this.sourceY, this.width, this.height,
					this.x, this.y, this.width, this.height)
		}
	},
	
	changeSprite: function() {
		if(Date.now() - this.frameTimer  > this.frameDuration) {
			if(this.currentPosition > this.maxPosition - 2) {
				this.currentPosition = 0;
			} else {
				this.currentPosition++;
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


