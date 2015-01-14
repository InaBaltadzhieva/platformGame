var Game = Class.extend({
	init: function(images,heroId){
		this.heroId = heroId
		this.canvas = document.getElementById('canvas');
		this.ctx = canvas.getContext('2d');
		this.gameStates = {
					loading: 'loading',
					createObjects: 'createObjects',
					gameMenu: 'gameMenu',
					levelChoice: 'levelChoice',
					setupLevel: 'setupLevel',
					play: 'play',
					levelComplete: 'levelComplete',
					gameOver: 'gameOver',
					gameComplete: 'gameComplete',
				}
		this.currentState = this.gameStates.gameMenu;
		console.log(this.heroId)
		this.currentLevelSprite = undefined;
		this.currentLevelMap = undefined;
		this.currentLevel = undefined;
		
		this.loadedImages = images
		this.allLevelIcons = [];
		this.settings = settings()
		this.levelObjects = [];
		this.backgroundDynamicObjects = [];
		this.platforms = [];
		this.monsters = [];
		this.deadMonsterIndex = -1;
		this.projectiles = [];
		this.toBeRemovedProjectiles = -1;
		this.boxes = []
		this.consumables = []
		this.takenConsumable = -1;
		this.shootingTraps = []
		this.arrows = []
		this.arrowToRemove = -1;
		//Displays the score of the takun consumable on the canvas
		this.scoreText = []
		this.scoreTextToRemove = -1;

		
		///// LEVEL ICONS (state: "levelChoice");
		this.levelOneIcon = new LevelIcon(this.canvas.width / 2 - 300, this.canvas.height / 2 - 210, 1, this.loadedImages.levelMenuIcon);
		this.levelTwoIcon = new LevelIcon(this.canvas.width / 2 + 50, this.canvas.height / 2 - 210, 2, this.loadedImages.levelMenuIcon);
		this.levelThreeIcon = new LevelIcon(this.canvas.width / 2 - 300, this.canvas.height / 2 + 30, 3, this.loadedImages.levelMenuIcon);
		this.levelFourIcon = new LevelIcon(this.canvas.width / 2 + 50, this.canvas.height / 2 + 30, 4, this.loadedImages.levelMenuIcon);
		this.allLevelIcons.push(this.levelOneIcon) 
		this.allLevelIcons.push(this.levelTwoIcon) 
		this.allLevelIcons.push(this.levelThreeIcon)
		this.allLevelIcons.push(this.levelFourIcon)
		///// LEVEL ICONS (state: "levelChoice"); ///
		
		this.levelOne = new Level('red');
		this.levelTwo = new Level('green');
		this.levelThree = new Level('yellow');
		this.levelFour = new Level('white');
		
		//STATE: "game menu" OBJECTS
		this.gameMenuImages = [];
		this.gameMenuBackGround = new Drawable(0, 0, this.loadedImages.gameMenuBG)
		this.playButton = new Drawable(100, 100, this.loadedImages.playButton)
		this.gameMenuImages.push(this.gameMenuBackGround)
		this.gameMenuImages.push(this.playButton)
		console.log(this.gameMenuImages)
		//STATE: "game menu" OBJECTS
		
		//STATE: Level complete OBJECTS
		this.levelCompleteImages = [];
		this.nextButton = new Drawable(540, this.canvas.height - 150, this.loadedImages.nextLevelButton)
		this.restartButton = new Drawable(620, this.canvas.height - 150, this.loadedImages.resetLevelButton)
		this.levelCompleteBoard = new Drawable(this.canvas.width / 2 - 260, this.canvas.height / 2 -280, this.loadedImages.levelComplete)
		this.levelCompleteImages.push(this.nextButton)
		//this.levelCompleteImages.push(this.restartButton);
		this.levelCompleteImages.push(this.levelCompleteBoard)
		console.log(this.levelCompleteImages)
		//STATE: Level complete OBJECTS
		
		//STATE: "game over" OBJECTS
		this.gameOverImages = [];
		this.gameOverImage = new Drawable(this.canvas.width / 2 - 260, this.canvas.height / 2 -280, this.loadedImages.levelComplete)
		this.gameOverRestartButton = new Drawable(540, this.canvas.height - 150, this.loadedImages.resetLevelButton)
		this.gameOverImages.push(this.gameOverImage)
		this.gameOverImages.push(this.gameOverRestartButton)
		console.log(this.gameOverImages)
		//STATE: "game over" OBJECTS
		
		//STATE: "game complete" OBJECTS
		this.gameCompleteImages = [];
		this.gameCompleteImage = new Drawable(this.canvas.width / 2 - 260, this.canvas.height / 2 -280, this.loadedImages.levelComplete)
		this.gameCompleteRestartButton = new Drawable(540, this.canvas.height - 150, this.loadedImages.resetLevelButton)
		this.gameCompleteImages.push(this.gameCompleteImage)
		this.gameCompleteImages.push(this.gameCompleteRestartButton)
		console.log(this.gameOverImages)
		//STATE: "game complete" OBJECTS
		
		var _this = this;
		canvas.addEventListener('click', function(e) {
			
			if(_this.currentState == 'gameMenu'){

				if( e.pageX > _this.playButton.x &&
					e.pageX < (_this.playButton.x + 270) &&
					e.pageY > _this.playButton.y &&
					e.pageY < (_this.playButton.y + 70)) 
				{
					
					_this.currentState = _this.gameStates.levelChoice;
				}
			} else if(_this.currentState == 'levelChoice') {
				for(var i = 0; i < _this.allLevelIcons.length; i++) {
					if( e.clientX > _this.allLevelIcons[i].x &&
						e.clientX < _this.allLevelIcons[i].x + _this.allLevelIcons[i].sizeX &&
						e.clientY > _this.allLevelIcons[i].y &&
						e.clientY < _this.allLevelIcons[i].y + _this.allLevelIcons[i].sizeY) 
					{
						console.log(_this.allLevelIcons[i].level);
						_this.currentLevel = _this.allLevelIcons[i].level;
						_this.currentState = _this.gameStates.setupLevel;
					}
				}
			} else if(_this.currentState == 'levelComplete') {
				console.log(e.clientX)
				console.log(e.pageX)
				console.log(e.clientY)
				if( e.pageX > (_this.nextButton.x) &&
						e.pageX < (_this.nextButton.x + 100) &&
						e.pageY > (_this.nextButton.y) &&
						e.pageY < (_this.nextButton.y + 100))
					{
						console.log('change')
						_this.currentLevel++	
						_this.currentState = _this.gameStates.setupLevel
					}
				else if (e.clientX > (_this.restartButton.x) &&
						e.clientX < (_this.restartButton.x + 100) &&
						e.clientY > (_this.restartButton.y) &&
						e.clientY < (_this.restartButton.y + 100))
					{
						_this.currentState = _this.gameStates.setupLevel
					}
			} else if(_this.currentState == 'gameOver') {
				if (e.clientX > (_this.gameOverRestartButton.x) &&
						e.clientX < (_this.gameOverRestartButton.x + 100) &&
						e.clientY > (_this.gameOverRestartButton.y) &&
						e.clientY < (_this.gameOverRestartButton.y + 100))
					{
					  	_this.hero.score = 0;
						_this.currentLevel = 1;
						_this.resetSettings()
						_this.currentState = _this.gameStates.setupLevel
					}
			}
			
			else if(_this.currentState == 'gameComplete') {
				if (e.clientX > (_this.gameCompleteRestartButton.x) &&
						e.clientX < (_this.gameCompleteRestartButton.x + 100) &&
						e.clientY > (_this.gameCompleteRestartButton.y) &&
						e.clientY < (_this.gameCompleteRestartButton.y + 100))
					{
					    _this.hero.score = 0;
						_this.currentLevel = 1;
						_this.resetSettings()
						_this.currentState = _this.gameStates.setupLevel
					}
			}
				
		}, false)
		
		canvas.addEventListener('mousemove', function(e) {
			if(_this.currentState == 'levelChoice') {
				for(var i = 0; i < _this.allLevelIcons.length; i++) {
					if( e.clientX > _this.allLevelIcons[i].x &&
						e.clientX < _this.allLevelIcons[i].x + _this.allLevelIcons[i].sizeX &&
						e.clientY > _this.allLevelIcons[i].y &&
						e.clientY < _this.allLevelIcons[i].y + _this.allLevelIcons[i].sizeY) 
					{
						_this.allLevelIcons[i].enlarge();
						
					} else {
						_this.allLevelIcons[i].normal();
					}				
				}
			}
		}, false)
		
		
		//INGAME SETTINGS STATE: 'play'
		this.heroMoveLeft = false;
		this.heroMoveRight = false;
		this.heroJump = false;

		this.hero = new Player(0, 180, this.loadedImages.hero)
		this.score = new Text(1000, 100, this.hero.score);
		this.arrowTimer = Date.now();
		this.shootingTrapTimer = 5000;
		this.levelObjects.push(this.hero);
		
		window.addEventListener('keydown', function(e) {
			switch(e.keyCode) {
				case 37:
					_this.heroMoveLeft = true;
					break;
				case 39:
					_this.heroMoveRight = true;
					break;
				case 32:
					_this.heroJump = true;
					break;
				case 65:
					_this.hero.canAttack = true;
					if(!_this.hero.isAttacking && _this.hero.currentMana >= 20) {
						var projectile = new Projectile(_this.hero.x, _this.hero.y, _this.loadedImages.projectile)
						if(_this.hero.leftOrRight / 2 == 0) {
							projectile.speed *= -1
						}
						_this.projectiles.push(projectile)
					}
					//_this.hero.score += 2;
					console.log()
					break;
			}
		}, false)
		
		window.addEventListener('keyup', function(e) {
			switch(e.keyCode) {
				case 37:
					_this.heroMoveLeft = false;
					break;
				case 39:
					_this.heroMoveRight = false;
					break;
				case 32:
					_this.heroJump = false;
					break;
			}
		}, false)
		//INGAME SETTINGS STATE: 'play' //		
		//this.loader();
		//this.update(this.canvas, this.ctx);		
	},
  
	update: function(){
			
		switch (this.currentState) {		
				
			case 'gameMenu':
				this.gameMenu(this.canvas, this.ctx)
				break;				
				
			case 'levelChoice':				
				this.levelChoice(this.canvas, this.ctx)
				break;		
				
			case 'setupLevel':
				this.setupLevel(this.canvas, this.ctx);
				break;
				
			case 'play':
				this.drawLevel(this.canvas, this.ctx)
				this.play(this.canvas, this.ctx)
				break;				
			case 'levelComplete':
				this.levelComplete(this.canvas, this.ctx)
				break;
			case 'gameOver':
				this.gameOver(this.canvas, this.ctx)
				break;		
			case 'gameComplete':
				this.gameComplete(this.canvas, this.ctx)
				break;	
		}
	
		var _this = this;
		requestAnimationFrame(function() {
			_this.update(_this.canvas, _this.ctx)
			
		})
		
	},
	
	drawLevel: function(canvas, ctx) {
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		/// tyka trqbva da sa neshtata koito she se pokrivat ot geroq
		ctx.drawImage(this.loadedImages.labenCave, 0, 0,1500,600,0,0,1500,700)
		
		if(this.levelObjects.length > 0) {
			ctx.save();
			ctx.translate(-this.playScreen.x, -this.playScreen.y)
			//ctx.drawImage(this.loadedImages.jewelRockB, 450, 380)

			for(var i = 0; i < this.backgroundDynamicObjects.length; i++) {
				this.backgroundDynamicObjects[i].draw(canvas, ctx)
			}
		/// tyka trqbva da sa neshtata koito she se pokrivat ot geroq
			for(var i = 0; i < this.levelObjects.length; i++) {
				this.levelObjects[i].draw(canvas, ctx)
			}
			
			for(var i = 0; i < this.monsters.length; i++) {
				this.monsters[i].draw(canvas, ctx)
			}
			
			for(var i = 0; i < this.projectiles.length; i++) {
				this.projectiles[i].draw(canvas, ctx)
			}
			for(var i = 0; i < this.boxes.length; i++) {
				this.boxes[i].draw(canvas, ctx)
			}
			for(var i = 0; i < this.consumables.length; i++) {
				this.consumables[i].draw(canvas,ctx)
			}
			
			for(var i = 0; i < this.shootingTraps.length; i++) {
				this.shootingTraps[i].draw(canvas,ctx)
			}
			for(var i = 0; i < this.arrows.length; i++) {
				this.arrows[i].draw(canvas,ctx)
			}
			
			for(var i = 0; i < this.scoreText.length; i++) {
				this.scoreText[i].draw(canvas,ctx)
			}
			//ctx.drawImage(this.loadedImages.jewelRock, 1700, 430);
			ctx.restore();	
			ctx.drawImage(this.loadedImages.part1,0,0,258,92,0,0,258,92)
			this.lifeBar.draw(canvas, ctx)
			this.manaBar.draw(canvas, ctx)
			//Score!
			ctx.font = "35px Georgia"
			ctx.fillStyle = "white"
			//Score!
			ctx.fillText(this.hero.score, 1100, 50)
			
		}
	},
	
	gameMenu: function (canvas, ctx) {
		//ctx.drawImage(this.loadedImages.mainMenuBG, 0, 0)
		for(var i = 0; i < this.gameMenuImages.length; i++) {
			this.gameMenuImages[i].draw(canvas, ctx)
		}
	
	},
	
	levelChoice: function (canvas, ctx) {
		ctx.drawImage(this.loadedImages.levelMenuBG, 0, 0);
		for(var i = 0; i < this.allLevelIcons.length; i++) {
			this.allLevelIcons[i].drawImage(ctx)	
		}
	},
	
	gameOver: function(canvas, ctx) {
		for(var i = 0; i < this.gameOverImages.length; i++) {
			this.gameOverImages[i].draw(canvas, ctx);	
		}
		console.log(this.hero.score)
		
		ctx.font=" 42px Georgia"
		ctx.fillText('Score', 540, 320)
		ctx.fillText('Game over', 500, 210)
		ctx.font=" 35px Georgia"
		ctx.fillText(this.hero.score, 550, 370)
		console.log(this.hero.score)
		var url = 'http://ittalentsapi.bashibozuk.eu/game/game-end?id='+this.heroId+'&X-GameID=104&score='+this.hero.score;
		
		$.ajax(url, {
			method: 'GET',
			crossDomain : true,
			success: function(data) {
				console.log(data);
			}
		});
	},	
	gameComplete: function (canvas, ctx) {
		ctx.fillStyle = "white"
		for(var i = 0; i < this.gameCompleteImages.length; i++) {
			this.gameCompleteImages[i].draw(canvas, ctx);	
		}
		
		ctx.font=" 42px Georgia"
		ctx.fillText('Score', 540, 320)
		ctx.fillText('Completed', 500, 210)
		ctx.font=" 35px Georgia"
		ctx.fillText(this.hero.score, 550, 370)
		ctx.fillText('The game is', 500, 170)
		console.log(this.hero.score)
		var url = 'http://ittalentsapi.bashibozuk.eu/game/game-end?id='+this.heroId+'&X-GameID=104&score='+this.hero.score;
		
		$.ajax(url, {
			method: 'GET',
			crossDomain : true,
			success: function(data) {
				//console.log(data);
			}
		});
	},
	play: function(canvas, ctx) {
		/// TOVA E TIMER ZA PREZ KOLKO VREME OT Shooting traps da izliza Strela

		
		if(this.shootingTrapTimer < Date.now() - this.arrowTimer)
		{
			for(var i = 0; i < this.shootingTraps.length; i++) {
				var arrowX = this.shootingTraps[i].x
				var arrowY = this.shootingTraps[i].y
				if(this.shootingTraps[i] instanceof ShootingRightTrap) {
					var arrow = new ArrowRight(arrowX, arrowY,this.loadedImages.shootingTrap)
					this.arrows.push(arrow);
				} else if(this.shootingTraps[i] instanceof ShootingLeftTrap) {
					var arrow = new ArrowLeft(arrowX, arrowY,this.loadedImages.shootingTrap)
					this.arrows.push(arrow);
				}
			}
			this.arrowTimer = Date.now();
		}
		/// TOVA E TIMER ZA PREZ KOLKO VREME OT Shooting traps da izliza Strela
		
		if(this.heroMoveRight && !this.hero.canAttack) {
			this.hero.x += this.hero.speed;
			this.hero.leftOrRight = 1;
			this.hero.changeSprite()
		}
		
		if(this.heroMoveLeft && !this.hero.canAttack) {
			this.hero.x -= this.hero.speed;
			this.hero.leftOrRight = 0;
			this.hero.changeSprite()
	
		} 
		
		if(!this.heroMoveLeft && !this.heroMoveRight && !this.hero.canAttack) {
			this.hero.currentPosition = 0
		}
		
		
		if(this.heroJump && this.hero.onGround) {
			this.hero.vy += this.hero.jumpPower;
			this.hero.vy -= this.settings.gravity;
			this.hero.onGround = false;
			//console.log(this.hero.vy)
		}
		
		if(this.hero.vy > Math.abs(this.hero.jumpPower)) {
			this.hero.vy = Math.abs(this.hero.jumpPower)
		}
		
		if(this.hero.x < 0) {
			this.hero.x = 0;
		}
		//BOUNCE ON HIT
		if(!this.hero.canBeHit) {
			this.hero.vx += this.settings.gravity
			if(this.hero.vx >= 0) {
				this.hero.vx = 0
				this.hero.canBeHit = true;
			}
		}
		this.hero.x += this.hero.vx;
		//BOUNCE ON HIT
		
		this.hero.vy += this.settings.gravity;
		this.hero.y += this.hero.vy
		
		this.playScreen.x = this.hero.centerX() -  (this.playScreen.width / 2)
		this.playScreen.y = this.hero.centerY() -  (this.playScreen.height / 2) - 50
		
		// PlayScreen in bounds check
		if(this.playScreen.x < this.levelScreen.x) {
			this.playScreen.x = this.levelScreen.x
		}
		
		if((this.playScreen.x + this.playScreen.width) > this.levelScreen.width) {
			this.playScreen.x = this.levelScreen.width - this.playScreen.width
		}
		
		if(this.playScreen.y < this.levelScreen.y) {
			this.playScreen.y = this.levelScreen.y
		}
		
		if((this.playScreen.y + this.playScreen.height) > this.levelScreen.height) {
			this.playScreen.y = this.levelScreen.height - this.playScreen.height
		}
		
		if(!this.hero.isAlive()) {
			this.currentState = this.gameStates.gameOver
		}
		///// COLLISION DETECTIONS /////
		for(var i = 0; i < this.platforms.length; i++){
			var plat = this.platforms[i]
			collisionDetection(this.hero, plat)
		}
		//HERO-MONSTER COLLISION DECTION
		for(var i = 0; i < this.monsters.length; i++){
			monsterCollisionDetection(this.hero, this.monsters[i]);
			
			if (!this.monsters[i].isAlive()) {
				this.deadMonsterIndex = i;
			}
		}
		//HERO-MONSTER COLLISION DECTION
		
		//PROJECTILE-MONSTER COLLISION DECTION
		for (var i = 0; i < this.projectiles.length; i++) {
			for (var j = 0; j < this.monsters.length; j++) {
				monsterVsProjectileCollisionDetection(this.projectiles[i], this.monsters[j]);				
				if (!this.monsters[j].isAlive()) {
					this.deadMonsterIndex = j;
				}				
				if (this.projectiles[i].hasHit) {
					this.toBeRemovedProjectiles = i;
				}
			}
		}		
		if (this.toBeRemovedProjectiles >= 0) {
			this.projectiles.splice(this.toBeRemovedProjectiles, 1);
			this.toBeRemovedProjectiles = -1;		
		}		
		if (this.deadMonsterIndex >= 0) {
			this.monsters.splice(this.deadMonsterIndex, 1);
			this.deadMonsterIndex = -1;		
		}
		//PROJECTILE-MONSTER COLLISION DECTION
		
		//PROJECTILE-BOX COLLISION DECTION
		for (var i = 0; i < this.projectiles.length; i++) {
			for(var j = 0; j < this.boxes.length; j++) {
				boxVsProjectileCollisionDetection(this.projectiles[i], this.boxes[j])
			}
		}
		//PROJECTILE-BOX COLLISION DECTION

		//HERO-CONSUMABLES COLLISION DECTION
		for (var i = 0; i < this.consumables.length; i++) {
			consumableCollisionDetection(this.hero, this.consumables[i])
			if (this.consumables[i].taken) {
					this.takenConsumable = i;
					if(this.consumables[i] instanceof Final) {
						
						ctx.fillStyle = 'rgba(0,0,0,0.5)'
						ctx.fillRect(0,0,canvas.width,canvas.height)
						if(this.currentLevel == 3) {
							this.currentState = this.gameStates.gameComplete
						} else {
							this.currentState = this.gameStates.levelComplete
						}
					}
				//Display the score of the consumable on the canvas
				this.scoreText.push(new Text(this.consumables[i].x,
						this.consumables[i].y,
						this.consumables[i].score))
			}
		}

		if (this.takenConsumable >= 0) {
			this.consumables.splice(this.takenConsumable, 1);
			this.takenConsumable = -1;		
		}
		
		console.log(this.scoreText.length + "texts")
		for (var i = 0; i < this.scoreText.length; i++) {
			if(this.scoreText[i].toBeRemoved){
				this.scoreTextToRemove = i;
			}
		}
		if (this.scoreTextToRemove >= 0) {
			this.scoreText.splice(this.scoreTextToRemove, 1);
			this.scoreTextToRemove = -1;		
		}
		//HERO-CONSUMABLES COLLISION DECTION
		
	//remove arrow if it is out of the canvas
		for (var i = 0; i < this.arrows.length; i++) {
			arrowPlayerCollisionDetection(this.hero, this.arrows[i])
			if (this.arrows[i].hasHit) {
					this.arrowToRemove = i
			}
		}
		for (var i = 0; i < this.arrows.length; i++) {
			if (this.arrows[i].maxDistance < Math.abs(this.arrows[i].originalX - this.arrows[i].x)) {
				this.arrowToRemove = i
			}

		}
		if (this.arrowToRemove >= 0) {
			this.arrows.splice(this.arrowToRemove, 1);
			this.arrowToRemove = -1;
		}

		//LIFE BAR UPDATE
		this.lifeBar.lifeInPercentage = this.hero.currentHealth / this.hero.maXHealth
		if(this.lifeBar.lifeInPercentage <= 0) { // Mozilla fix for hero health below 0
			this.lifeBar.lifeInPercentage = 0.01
		}
		this.manaBar.manaInPercentage = this.hero.currentMana / this.hero.maXMana
		if(this.manaBar.manaInPercentage <= 0) { // Mozilla fix for hero health below 0
			this.manaBar.manaInPercentage = 0.01
		}	
		
	},
	
	setupLevel: function (canvas, ctx) {
		switch (this.currentLevel) {
			case 1:
				this.currentLevelMap = this.settings.levelMaps.levelOne;
				this.currentLevelSprite = this.loadedImages.levelTwoSprite;
				break;
			case 2:
				this.currentLevelMap = this.settings.levelMaps.levelTwo;
				this.currentLevelSprite = this.loadedImages.levelOneSprite;
				break;
			case 3:
				this.currentLevelMap = this.settings.levelMaps.levelThree;
				this.currentLevelSprite = this.loadedImages.levelTwoSprite;
				break;
			case 4:
				this.levelFour.draw(canvas, ctx);
				break;				
		}
		
		for(var i = 0; i < this.currentLevelMap.length; i++) {
			for(var j = 0; j < this.currentLevelMap[i].length; j++) {
				var currentPosition = this.currentLevelMap[i][j];
				var x = j * this.settings.levelCellSize;
				var y = i * this.settings.levelCellSize;
				
				switch(currentPosition) {
					case 1:
						var platform = new FloorPlatformPartOne(x, y, this.currentLevelSprite);
						this.levelObjects.push(platform);
						this.platforms.push(platform);
						break;
					case 2:
						var platform = new FloorPlatformPartTwo(x, y, this.currentLevelSprite);
						this.levelObjects.push(platform);
						this.platforms.push(platform);
						break;
					case 3:
						var platform = new FloorPlatformPartThree(x, y, this.currentLevelSprite);
						this.levelObjects.push(platform);
						this.platforms.push(platform);
						break;
					case 4:			
						var platform = new FloorPlatformPartFour(x, y, this.currentLevelSprite);
						this.levelObjects.push(platform);
						this.platforms.push(platform);
						break;
					case 5:	
						var platform = new FloorPlatformPartFive(x, y, this.currentLevelSprite);
						this.levelObjects.push(platform);
						this.platforms.push(platform);
						break;		
					case 6:	
						var platform = new SingleBlockPlatform(x, y, this.currentLevelSprite)
						this.levelObjects.push(platform);
						this.platforms.push(platform);
						break;
					case 7:					
						var platform = new SmallFloatingPlatform(x + 12 , y +7 , this.currentLevelSprite);
						this.levelObjects.push(platform);
						this.platforms.push(platform);
						break;
					case 8:
						var platform = new CornerPlatformRight(x, y, this.currentLevelSprite)
						this.levelObjects.push(platform);
						this.platforms.push(platform);
						break;
					case 9:
						var platform = new CornerPlatformLeft(x, y, this.currentLevelSprite)
						this.levelObjects.push(platform);
						this.platforms.push(platform);
						break;
					case 11:
						var platform = new MovingPlatform(x, y, this.currentLevelSprite);
						this.levelObjects.push(platform);
						this.platforms.push(platform);
						break;					
					case 12:
						var platform = new MovingPlatformPartOne(x, y, this.currentLevelSprite);
						this.levelObjects.push(platform);
						this.platforms.push(platform);
						break															
					case 14:
						var platform = new DiagonalMovingPlatform(x, y, this.currentLevelSprite);
						this.levelObjects.push(platform);
						this.platforms.push(platform);
						break;	
					case 15:
						var platform = new DiagonalMovingPlatformTR(x, y, this.currentLevelSprite);
						this.levelObjects.push(platform);
						this.platforms.push(platform);
						break;	
					case 16:
						var platform = new LeftWallPlatformOne(x, y, this.currentLevelSprite);
						this.levelObjects.push(platform);
						this.platforms.push(platform);
						break;	
					case 17:
						var platform = new LeftWallPlatformTwo(x, y, this.currentLevelSprite);
						this.levelObjects.push(platform);
						this.platforms.push(platform);
						break;	
					case 18:
						var platform = new LeftWallPlatformThree(x, y, this.currentLevelSprite);
						this.levelObjects.push(platform);
						this.platforms.push(platform);
						break;	
					case 19:
						var platform = new FillPlatform(x, y, this.currentLevelSprite);
						this.levelObjects.push(platform);
						this.platforms.push(platform);
						break;	
					case 35:
						var platform = new RightWallPlatformOne(x, y, this.currentLevelSprite);
						this.levelObjects.push(platform);
						this.platforms.push(platform);
						break;	
					case 36:
						var platform = new RightWallPlatformTwo(x, y, this.currentLevelSprite);
						this.levelObjects.push(platform);
						this.platforms.push(platform);
						break;
					case 37:
						var platform = new CeilingPlatformOne(x, y, this.currentLevelSprite);
						this.levelObjects.push(platform);
						this.platforms.push(platform);
						break;	
					case 38:
						var platform = new CeilingPlatformTwo(x, y, this.currentLevelSprite);
						this.levelObjects.push(platform);
						this.platforms.push(platform);
						break;	
					case 30:
						var monster = new Monster(x, y, this.loadedImages.babyDragon);						
						this.monsters.push(monster);
						break;
					case 20:
						var spikes = new Spikes(x, y, this.loadedImages.spikes);
						this.levelObjects.push(spikes);
						this.platforms.push(spikes);
						break;
					case 21:
						var movingTrap = new MovingTrapSmallH(x, y, this.loadedImages.movingTrap,this.loadedImages.trapAddition1);
						this.backgroundDynamicObjects.push(movingTrap);
						this.platforms.push(movingTrap);
						break;
					case 24:
						var movingTrap = new MovingTrapMediumVD(x, y, this.loadedImages.movingTrap,this.loadedImages.trapAditionMedium);
						this.backgroundDynamicObjects.push(movingTrap);
						this.platforms.push(movingTrap);
						break;
					case 25:
						var movingTrap = new MovingTrapMediumVU(x, y, this.loadedImages.movingTrap,this.loadedImages.trapAditionMedium);
						this.backgroundDynamicObjects.push(movingTrap);
						this.platforms.push(movingTrap);
						break;
					case 22:
						var shootingTrap = new ShootingLeftTrap(x, y, this.loadedImages.shootingTrap);
						this.shootingTraps.push(shootingTrap);
						this.platforms.push(shootingTrap);
						break;
					case 23:
						var shootingTrap = new ShootingRightTrap(x, y, this.loadedImages.shootingTrap);
						this.shootingTraps.push(shootingTrap);
						this.platforms.push(shootingTrap);
						break;
					case 90:
						var box = new Box(x, y, this.loadedImages.box);
						this.boxes.push(box);
						break;
					case 80:
						var consumable = new Consumable(x, y, this.loadedImages.consumables);
						this.consumables.push(consumable);
						break;
					case 81:
						var consumable = new Perl(x, y, this.loadedImages.consumables);
						this.consumables.push(consumable);
						break;
					case 82:
						var consumable = new PerlBlue(x, y, this.loadedImages.consumables);
						this.consumables.push(consumable);
						break;
					case 83:
						var consumable = new PerlBlueGreen(x, y, this.loadedImages.consumables);
						this.consumables.push(consumable);
						break;
					case 84:
						var consumable = new PerlBluePurple(x, y, this.loadedImages.consumables);
						this.consumables.push(consumable);
						break;
					case 85:
						var consumable = new AnimatedConsumable(x, y, this.loadedImages.consumables);
						this.consumables.push(consumable);
						break;
					case 86:
						var consumable = new GoldenCoin(x, y, this.loadedImages.consumables);
						this.consumables.push(consumable);
						break;
					case 87:
						var consumable = new Money(x, y, this.loadedImages.consumables);
						this.consumables.push(consumable);
						break;
					case 99:
						var consumable = new Final(x, y, this.loadedImages.consumables);
						this.consumables.push(consumable);
						break;
					
				}
			}
		}
		this.lifeBar = new LifeBar(this.loadedImages.part2)
		this.manaBar = new ManaBar(this.loadedImages.mana)
		this.levelScreen = {
				x: 0,
				y: 0,
				width: this.currentLevelMap[0].length * this.settings.levelCellSize,
				height: this.currentLevelMap.length * this.settings.levelCellSize,
		}
		
		this.playScreen = {
				x: 0,
				y: 0,
				width: this.canvas.width,
				height: this.canvas.height,
		}
		console.log(this.levelObjects)
		this.currentState = this.gameStates.play	
	},
	
	levelComplete: function(canvas, ctx) {
		ctx.fillStyle = "white"
	
		for(var i = 0; i < this.levelCompleteImages.length; i++) {
			this.levelCompleteImages[i].draw(canvas, ctx)
		}
		
		ctx.font=" 42px Georgia"
		ctx.fillText('Score', 540, 320)
		ctx.fillText('Completed', 500, 210)
		ctx.font=" 35px Georgia"
		ctx.fillText(this.hero.score, 550, 370)
		ctx.fillText('Level ' + this.currentLevel, 540, 170)
		this.resetSettings();

	},
	
	resetSettings: function(){
		this.hero.x = 0
		this.hero.y = 180
		this.hero.vx = 0
		this.hero.vy = 0
		this.hero.currentHealth = this.hero.maXHealth;
		this.levelObjects = [];
		this.backgroundDynamicObjects = [];
		this.platforms = [];
		this.monsters = [];
		this.projectiles = [];
		this.boxes = []
		this.consumables = []
		this.shootingTraps = []
		this.arrows = []
		this.scoreText = []
		this.levelObjects.push(this.hero)
	}
});
