var Drawable = MainObject.extend({
	init: function (x, y, image) {
		this._super(x, y);
		this.image = image;
	},
	
	draw: function(canvas, ctx) {
		ctx.drawImage(this.image, this.x, this.y);
	}
});