var LifeBar = Class.extend({
	init: function(image){
		this.x = 0;
		this.y = 0;
		this.image = image;
		this.width = 141;
		this.height = 10;
		this.souceX = 93;
		this.souceY = 11;
		this.lifeInPercentage = 1;
	},
	draw: function(canvas, ctx) {
		ctx.drawImage(this.image,
				this.x, this.y, this.width * this.lifeInPercentage, this.height,
				this.souceX, this.souceY, this.width * this.lifeInPercentage, this.height)
	}
})


var ManaBar = Class.extend({
	init: function(image){
		this.x = 0;
		this.y = 0;
		this.image = image;
		this.width = 141;
		this.height = 10;
		this.souceX = 93;
		this.souceY = 27;
		this.manaInPercentage = 1;
	},
	draw: function(canvas, ctx) {
		ctx.drawImage(this.image,
				this.x, this.y, this.width * this.manaInPercentage, this.height,
				this.souceX, this.souceY, this.width * this.manaInPercentage, this.height)
	}
})