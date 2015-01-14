var Player = Class.extend({
	init: function(x, y, image) {
		
		this.x = x;
		this.y = y;
		this.vx = 0;
		this.vy = 0;
		this.image = image;
		this.height = 86;
		this.width = 72;
		this.currentPosition = 0; 
		this.maxPosition = 7; 
		this.leftOrRight = 1; // if players is facing left leftOrRight is "1" if is facing right leftOrRight is "0"
		this.frameTimer = Date.now();
		this.frameDuration = 100;
		this.speed = 7;
		this.jumpPower = -10;
		this.onGround = false;
		this.spriteCordinates = [0, 72, 144, 216, 288, 360, 432]
		this.spriteWidth = [72, 72, 72, 72, 72, 72, 72]
		
		this.currentHealth = 1000;
		this.maXHealth = 1000;
		this.currentMana = 170;
		this.maXMana = 170;
		
		
		this.canAttack = false;
		this.isAttacking = false;
		this.spriteAttackCordinates = [0, 83, 166]
		this.spriteAttackWidth = [83, 83, 83]
		
		//this.canBeAttacked = true
		this.canBeAttackedTimer = Date.now();
		this.canBeAttackedDuration = 1500;
		
		this.score = 0;
		
		this.collisionSideX = undefined;
		
		this.canBeHit = true
		var _this = this
		setInterval(function() {
			if(_this.currentMana < _this.maXMana) {
				_this.currentMana += 20
			}
		},2000)
	},
	
	draw: function(canvas, ctx) {
		if(this.canAttack && !this.isAttacking && this.currentMana >= 20) {
			this.spriteCordinates = [0, 83, 166, 249]
			this.spriteWidth = [83, 83, 83, 83]
			this.maxPosition = 4
			this.currentPosition = 0; 
			this.leftOrRight += 2;
			this.isAttacking = true
			
		} 
		
		if(this.isAttacking) {
			this.changeSprite()
		}
		ctx.drawImage(this.image,
				this.spriteCordinates[this.currentPosition], this.leftOrRight * this.height, this.spriteWidth[this.currentPosition], 
				this.height, this.x, this.y, this.width, this.height);
	},
	
	changeSprite: function() {
		if(Date.now() - this.frameTimer  > this.frameDuration) {
			if(this.currentPosition > this.maxPosition - 2) {
				if(this.isAttacking) {
					this.currentMana -= 20;
					this.isAttacking = false;
					this.canAttack = false;
					this.spriteCordinates = [0, 72, 144, 216, 288, 360, 432]
					this.spriteWidth = [72, 72, 72, 72, 72, 72, 72]
					this.maxPosition = 7
					this.currentPosition = 0; 
					this.leftOrRight -= 2;
				} else {
					this.currentPosition = 1;
				}
			} else {
				this.currentPosition++;
			}
			this.frameTimer = Date.now();
		}		
	},

	centerX: function () {
		return this.x + this.width / 2;
	},
	centerY: function () {
		return this.y + this.height / 2;
	},
	takeDamage: function(damage) {
		
		//BOUNCE ON HIT
		if(this.canBeHit) {
			this.currentHealth -= damage
			//this.canBeAttackedTimer = Date.now()
			this.vy = 0;// fix for hit when the player is jumping
			this.vy -= 5;
			this.vx -= 10;
			this.canBeHit = false;
			this.onGround = false;
		}
		//BOUNCE ON HIT
	},
	canBeAttacked: function () {
		return this.canBeAttackedDuration < Date.now() - this.canBeAttackedTimer
	},
	isAlive: function () {
		if(this.currentHealth <= 0){
			return false
		} else {
			return true
		}
	}


})
