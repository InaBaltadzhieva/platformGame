var SmallPlatform = GameObject.extend({
	init: function(x, y, image) {
		this._super(x, y, image);
		
		this.width = 75;
		this.height = undefined;
		this.sourceX = undefined;
		this.sourceY = undefined;
		this.sourceWidth = 90;
		this.sourceHeight = undefined;
	}
});