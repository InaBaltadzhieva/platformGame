var SmallFloatingPlatform = SmallPlatform.extend({
	init: function(x, y, image){
		this._super(x, y, image);
	
		this.height = 75;
		this.sourceX = 65;
		this.sourceY = 180;
	}
});