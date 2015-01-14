var Level = Class.extend({
	init: function(color) {
		this.color = color;
		this.x = 10;
	},
	
	draw: function(canvas, ctx) {
		ctx.fillStyle = this.color;
		ctx.fillRect(0, 0, canvas.width, canvas.width);
		ctx.fillStyle = 'black';
		ctx.fillRect(this.x, 0, 10, 10);
		this.x++;
	},

	


})
