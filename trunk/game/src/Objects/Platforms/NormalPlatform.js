var NormalPlatform = GameObject.extend({
	init: function(x, y, image) {
		this._super(x, y, image);
		
		this.width = 90;
		this.height = 90;
		this.sourceX = undefined;
		this.sourceY = undefined;
		this.sourceWidth = 90;
		this.sourceHeight = 90;
	}
});

