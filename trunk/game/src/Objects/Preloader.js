function preloader (ID){
	var imagesToLoad = {
			'mainMenuBG': 'menuBG.jpg',
			'levelMenuBG': 'img/img3.png',
			'levelMenuIcon': 'img/icon11.png',
			'hero': 'img/hero.png',
			'levelOneSprite': 'img/levelOneSprite.png',
			'levelTwoSprite': 'img/levelTwoSprite.png',
			'levelThreeSprite': 'img/levelThreeSprite.png',			
			'werewolfOne': 'img/werewolfOne.png',
			'werewolfTwo': 'img/werewolfTwo.png',
			'dragonTwo': 'img/dragonTwo.png',
			'babyDragon': 'img/babyDragon.png',
			'yetiOne.png': 'img/yetiOne.png',
			'yetiTwo.png': 'img/yetiTwo.png',
			'labenCave': 'img/labenCave.png',
			'jewelRock': 'img/back.35.png',
			'jewelRockB': 'img/back.36.png',
			'spikes': 'img/spikes.png',
			'movingTrap': 'img/movingTrap.png',
			'part1': 'img/part1.png',
			'part2': 'img/part2.png',
			'mana': 'img/mana.png',
			'trapAddition': 'img/trapAddition.png',
			'trapAddition1': 'img/trapAddition1.png',
			'trapAditionMedium': 'img/trapAditionMedium.png',
			'trapAdition1Medium': 'img/trapAdition1Medium.png',
			'trapAditionBig': 'img/trapAditionBig.png',
			'trapAdition1Big': 'img/trapAdition1Big.png',
			'projectile': 'img/projectile.png',
			'box': 'img/boxes.png',
			'consumables': 'img/consumables.png',
			'teleport': 'img/teleport.png',
			'shootingTrap': 'img/shootingArrow.png',
			'nextLevelButton': 'img/nextLevelButton.png',
			'resetLevelButton': 'img/resetLevelButton.png',
			'playButton': 'img/playButton.png',
			'gameMenuBG': 'img/back.24.png',
			'gameover': 'img/gameover.png',
			'levelComplete': 'img/levelComplete.png'
	}
	var totalCount = Object.keys(imagesToLoad).length;
	var currentCount = 0;
	var loadedImages = {};
	
	for(var key in imagesToLoad) {
		var image = new Image()
		image.key = key;
		image.addEventListener('load', function() {
			currentCount++;
			loadedImages[this.key] = this;
			
			if(currentCount == totalCount) {
				var game = new Game(loadedImages, ID)
				game.update()
			}
		}, false)
		image.src = imagesToLoad[key];
		
	}
}