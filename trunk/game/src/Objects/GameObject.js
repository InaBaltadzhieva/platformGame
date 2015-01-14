var GameObject = Drawable.extend({
	init: function(x, y, image) {
		this._super(x, y, image);
		this.width = undefined;
		this.height = undefined;
		this.sourceX = undefined;
		this.sourceY = undefined;
		this.sourceWidth = undefined;
		this.sourceHeight = undefined;
	},
	
	draw: function(canvas, ctx) {
		ctx.drawImage(this.image,
				this.sourceX, this.sourceY, this.width, 
				this.height, this.x, this.y, this.width, this.height);
	
	},
	
	centerX: function () {
		return this.x + this.width / 2;
	},
	centerY: function () {
		return this.y + this.height / 2;
	}
});