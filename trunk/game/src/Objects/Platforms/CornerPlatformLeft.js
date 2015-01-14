var CornerPlatformLeft = NormalPlatform.extend({
	init: function(x, y, image){
		this._super(x, y, image);
		
		this.sourceX = 180	;
		this.sourceY = 90;
	}
});
