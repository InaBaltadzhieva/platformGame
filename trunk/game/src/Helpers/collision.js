function collisionDetection (player, platform) {
	var distanceX = player.centerX() - platform.centerX()
	var distanceY = player.centerY() - platform.centerY()	
	var combinedHalfWidth = player.width / 2 + platform.width / 2
	var combinedHalfHeight = player.height / 2 + platform.height / 2

	if (combinedHalfWidth > Math.abs(distanceX) && combinedHalfHeight > Math.abs(distanceY)) {
		var overlapX = combinedHalfWidth - Math.abs(distanceX)
		var overlapY = combinedHalfHeight - Math.abs(distanceY)
		if (overlapY <= overlapX) {
			if (distanceY > 0) {
				player.y += overlapY
				player.vy = 0
			} else {
				player.y -= overlapY
				player.onGround = true;
				player.vy = 0
				if(platform instanceof DiagonalMovingPlatformTR) {
					player.x -= platform.speed
					player.y += platform.speed
				
				} else if(platform instanceof DiagonalMovingPlatform) {
					player.x += platform.speed
					player.y += platform.speed
				
				} else if(  platform instanceof MovingPlatformPartOne || 
						platform instanceof MovingPlatform) 
				{
					player.x += platform.speed
					
				} else if(platform instanceof Spikes) {
					player.takeDamage(player.maXHealth);
				}
			} 
		} else {
			if (distanceX > 0) {
				player.x += overlapX
			} else {

				player.x -= overlapX
				
			} 
		}
		if (platform instanceof MovingTrapSmallH) {	
			player.takeDamage(player.maXHealth);			
		}
	} 
}


function monsterCollisionDetection (player, monster) {
	var distanceX = player.centerX() - monster.centerX()
	var distanceY = player.centerY() - monster.centerY()	
	var combinedHalfWidth = player.width / 2 + monster.width / 4
	var combinedHalfHeight = player.height / 2 + monster.height / 2
	
	if (combinedHalfWidth > Math.abs(distanceX) && combinedHalfHeight > Math.abs(distanceY)) {             		 
		monster.canAttack = true;
		
		var overlapX = combinedHalfWidth - Math.abs(distanceX)
        var overlapY = combinedHalfHeight - Math.abs(distanceY)
        
        if (distanceX > 0) {
            player.x += overlapX;
            monster.leftOrRight = 3
            console.log(monster.leftOrRight)
			monster.speed = Math.abs(monster.speed)

				player.takeDamage(50)
		
        } else {            	
            player.x -= overlapX;
			monster.leftOrRight = 2;
			monster.speed = -Math.abs(monster.speed);
           
			player.takeDamage(50)
			
        }               
	} 	
}

function monsterVsProjectileCollisionDetection (projecttile, monster) {
	var distanceX = projecttile.centerX() - monster.centerX()
	var distanceY = projecttile.centerY() - monster.centerY()	
	var combinedHalfWidth = monster.width / 4
	var combinedHalfHeight = projecttile.height / 2 + monster.height / 2
	

	if (combinedHalfWidth > Math.abs(distanceX) && combinedHalfHeight > Math.abs(distanceY)) {
		projecttile.hasHit = true;
		monster.takeDamage(40);
	}	
}


function boxVsProjectileCollisionDetection (projecttile, box) {
	var distanceX = projecttile.centerX() - box.centerX()
	var distanceY = projecttile.centerY() - box.centerY()	
	var combinedHalfWidth = box.width / 4
	var combinedHalfHeight = projecttile.height / 2 + box.height / 2
	

	if (combinedHalfWidth > Math.abs(distanceX) && combinedHalfHeight > Math.abs(distanceY)) {
		projecttile.hasHit = true;
		box.currentPositionX++
	}	
}


function consumableCollisionDetection (player, consumable) {
	var distanceX = player.centerX() - consumable.centerX()
	var distanceY = player.centerY() - consumable.centerY()	
	var combinedHalfWidth = player.width / 2 + consumable.width / 2	
	var combinedHalfHeight = player.height / 2 + consumable.height / 2
	

	if (combinedHalfWidth > Math.abs(distanceX) && combinedHalfHeight > Math.abs(distanceY)) {
		consumable.taken = true;
		player.score += consumable.score

	} 	
}


function arrowPlayerCollisionDetection (player, arrow) {
	var distanceX = player.centerX() - arrow.centerX()
	var distanceY = player.centerY() - arrow.centerY()	
	var combinedHalfWidth = player.width / 2 + arrow.width / 2
	var combinedHalfHeight = player.height / 2 + arrow.height / 2
	

	if (combinedHalfWidth > Math.abs(distanceX) && combinedHalfHeight > Math.abs(distanceY)) {
		arrow.hasHit = true;
		player.takeDamage(arrow.damage)
	}	
}