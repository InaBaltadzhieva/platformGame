var Text = MainObject.extend({
	init: function(x, y, text) {
		this._super(x, y)
		this.text = text;
		this.originalY = this.y;
		this.trasperancy = 1;
		this.toBeRemoved = false;
	},
	
	draw: function(canvas, ctx) {
		this.move()
		ctx.font="20px Verdana";
		// Create gradient
		var gradient=ctx.createLinearGradient(0,0,canvas.width,0);
		gradient.addColorStop("0","magenta");
		gradient.addColorStop("0.5","blue");
		gradient.addColorStop("1.0","red");
		// Fill with gradient
		//ctx.fillStyle=gradient;
		ctx.fillStyle='rgba(255, 255, 255,' + this.trasperancy +')';
		ctx.fillText(this.text, this.x, this.y);
	},
	move: function() {
		this.y--;
		this.trasperancy -= 0.01;
		
		if(this.trasperancy <= 0) {
			this.toBeRemoved = true;
		}
	}
})