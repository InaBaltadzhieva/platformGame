var Monster = Class.extend({
	init: function(x, y, image) {           
		this.x = x;
		this.y = y;
		this.image = image;
		this.walkingCoordinates = [0, 170, 340, 510];
		this.walkingWidth = 170;
		this.fightingCoordinates = [0, 170, 370, 570];
		this.fightingWidth = 200;
		this.width = this.walkingWidth;
		this.height = 180;
		this.state = this.walkingCoordinates;
		
		this.sourceX = this.state[this.currentPosition];
		this.sourceY = 0;
		
		this.currentPosition = 0;
		this.maxPosition = 4;
		
		this.frameTimer = Date.now();
		this.frameDuration = 125;               
		
		this.speed  = 2;
		this.leftOrRight = 1;
		this.patrolArea = 180;
		
		this.originalCenterX = this.x + this.width / 4
		
		this.canAttack = false;
		this.isAttacking = false;
		
		this.currentHealth = 200;
		this.maxHealth = 200;
    },
        
        draw: function(canvas, ctx) {
                if(!this.isAttacking && !this.canAttack) {
                        this.patrol();
                } else if(!this.isAttacking && this.canAttack){
                        this.state = this.fightingCoordinates;
                        this.currentPosition = 0; 
                        //this.leftOrRight += 2;
                        this.width = this.fightingWidth;
                        this.isAttacking = true;
                }
                
                this.changeSprite();
                ctx.drawImage(this.image,
                        this.state[this.currentPosition], this.height * this.leftOrRight, this.width,  this.height, 
                        this.x, this.y, this.width / 2, this.height / 2);
                
                // Monster Life bar
                ctx.fillStyle = 'red'
                ctx.fillRect(this.x, this.y, 100, 10)
                ctx.fillStyle = 'green'
                ctx.fillRect(this.x, this.y, this.currentHealth / this.maxHealth * 100, 10)
        },
        
        changeSprite: function() {
        if(Date.now() - this.frameTimer  > this.frameDuration) {
          if(this.currentPosition > this.maxPosition - 2) {
                  if(this.isAttacking) {
                                this.state = this.walkingCoordinates;
                                this.currentPosition = 0; 
                                this.leftOrRight -= 2;
                                this.width = this.walkingWidth;
                                this.isAttacking = false;
                                this.canAttack = false;
                  } else {
                  this.currentPosition = 0;
                  }
          } else {
                this.currentPosition++;
             
          }
          
          this.frameTimer = Date.now();
                }
        },
        
        patrol: function () { 
                this.x += this.speed      
                if(Math.abs(this.originalCenterX - (this.x + this.patrolArea / 2 ) ) > this.patrolArea ) {
                        this.speed *= -1;
                        
                        if(this.leftOrRight == 1) {
                                this.leftOrRight = 0;
                        } else if (this.leftOrRight == 0) {
                                this.leftOrRight = 1;
                        }
                }
        },
        
        centerX: function () {
                return this.x + this.width / 4;
        },
        centerY: function () {
                return this.y + this.height / 2;
        },
        
        takeDamage: function(damage) {
                this.currentHealth -= damage;
        },
        
        isAlive: function() {
                if(this.currentHealth <= 0) {
                        if (this.leftOrRight % 2 == 0) {
                                this.leftOrRight = 4;
                                this.currentPosition = 0;
                        } else {                                
                                this.leftOrRight = 5;
                                this.currentPosition = 0;
                        }               
                } else {
                        return true;
                }
        }
});