/*var DropItem = Class.extend({
	init: function() {
		this.points = 10;
	}
});

var HealthPotion = DropItem.extend({
	init: function() {
		this.loadImage.src = '../img/HealthPotion.png'
	}
	draw: function(canvas, ctx) {
		ctx.drawImage(health, 500, 500);
	}
})*/

var imgHealth = new Image();
imgHealth.src = '../img/HealthPotion.png';

canvas.drawImage(imgHealth, 200, 200);