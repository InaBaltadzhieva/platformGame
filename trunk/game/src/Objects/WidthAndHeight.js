var WidthAndHeight = MainObject.extend({
	init: function(x, y, width, height){
		this._super(x, y) 
		this.width = width;
		this.height = height;
	}
});