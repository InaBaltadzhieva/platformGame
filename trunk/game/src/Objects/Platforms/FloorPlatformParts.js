var FloorPlatformPartOne = NormalPlatform.extend({
	init: function(x, y, image){
		this._super(x, y, image);
		
		this.sourceX = 0;
		this.sourceY = 0;
	}
});

var FloorPlatformPartTwo = NormalPlatform.extend({
	init: function(x, y, image){
		this._super(x, y, image);
		
		this.sourceX = 90;
		this.sourceY = 0;
	}
});

var FloorPlatformPartThree = NormalPlatform.extend({
	init: function(x, y, image){
		this._super(x, y, image);
		
		this.sourceX = 180;
		this.sourceY = 0;
	}
});

var FloorPlatformPartFour = NormalPlatform.extend({
	init: function(x, y, image){
		this._super(x, y, image);
		
		this.sourceX = 270;
		this.sourceY = 0;
	}
});

var FloorPlatformPartFive = NormalPlatform.extend({
	init: function(x, y, image){
		this._super(x, y, image);
		
		this.sourceX = 360;
		this.sourceY = 0;
	}
});

var SingleBlockPlatform = NormalPlatform.extend({
	init: function(x, y, image){
		this._super(x, y, image);
		
		this.sourceX = 0;
		this.sourceY = 90;
	}
});



var LeftWallPlatformOne = NormalPlatform.extend({
	init: function(x, y, image){
		this._super(x, y, image);
		
		this.sourceX = 270;
		this.sourceY = 180;
	}
});

var LeftWallPlatformTwo = NormalPlatform.extend({
	init: function(x, y, image){
		this._super(x, y, image);
		
		this.sourceX = 0;
		this.sourceY = 270;
	}
});

var LeftWallPlatformThree = LeftWallPlatformTwo.extend({
	init: function(x, y, image){
		this._super(x, y, image);
		
		this.sourceX = 90;

	}
});

var LeftWallPlatformFour = LeftWallPlatformTwo.extend({
	init: function(x, y, image){
		this._super(x, y, image);
		
		this.sourceX = 180;

	}
});



var RightWallPlatformOne = NormalPlatform.extend({
	init: function(x, y, image){
		this._super(x, y, image);
		
		this.sourceX = 180;
		this.sourceY = 180;
	}
});

var RightWallPlatformTwo = NormalPlatform.extend({
	init: function(x, y, image){
		this._super(x, y, image);
		
		this.sourceX = 0;
		this.sourceY = 360;
	}
});




var CeilingPlatformOne = NormalPlatform.extend({
	init: function(x, y, image){
		this._super(x, y, image);
		
		this.sourceX = 0;
		this.sourceY = 450;
	}
	
});

var CeilingPlatformTwo = NormalPlatform.extend({
	init: function(x, y, image){
		this._super(x, y, image);
		
		this.sourceX = 90;
		this.sourceY = 450;
	}
	
});

var FillPlatform = NormalPlatform.extend({
	init: function(x, y, image){
		this._super(x, y, image);
		
		this.sourceX = 270;
		this.sourceY = 270;
	}
});