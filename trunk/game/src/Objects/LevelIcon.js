var LevelIcon = Class.extend({
	init: function(x, y, level, img) {
		
		this.x = x;
		this.y = y;
		this.level = level;
		this.img = img;
		this.originalX = x;
		this.originalY = y;
		this.sizeX = 250;
		this.sizeY = 170;
		this.originalSizeX = 250;
		this.originalSizeY = 170;
		this.enlargement = 10;
	},
	

	drawImage: function(ctx) {
		ctx.drawImage(this.img, 0, 0, 250, 170, this.x, this.y, this.sizeX, this.sizeY)
	},

	enlarge: function () {
		this.x = this.originalX - this.enlargement;
		this.y = this.originalY - this.enlargement;
		this.sizeX = this.originalSizeX + this.enlargement * 2;
		this.sizeY = this.originalSizeY + this.enlargement * 2;
	},
	
	normal: function () {
		this.x = this.originalX;
		this.y = this.originalY ;
		this.sizeX = this.originalSizeX;
		this.sizeY = this.originalSizeY;
	},
	


})