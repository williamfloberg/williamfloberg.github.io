var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(false);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    function createSawBlade(x, y){ //creates sawBlade object and defines what it will do(got lazy and made this another obstacle w/o renaming it)
      var hitZoneSize = 20; //sets the spikes's hitbox size to
      var damageFromObstacle = 125; //sets the spikes's damage
      var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //creates a "sawblade" (spike, i was lazy) hit zone obstacle 
      sawBladeHitZone.x = x; //sets the hitbox's x coordinate
      sawBladeHitZone.y = y; //sets the hitbox's y coordinate
      game.addGameItem(sawBladeHitZone); //adds the hitbox into the game 
      var obstacleImage = draw.bitmap("img/sawblade.png"); //gives the obstacle an image 
      sawBladeHitZone.addChild(obstacleImage); //adds the image as a child of the hitzone
      obstacleImage.x = -25 //sets the x coordinate of the sawblade in relevance to the hitbox
      obstacleImage.y = -45 //sets the y coordinate of the sawblade in relevance to the hitbox
      obstacleImage.scaleX = 0.06 //scales down the image so it fits over the hitzone on the x coordinate
      obstacleImage.scaleY = 0.06 //scales down the image so it fits over the hitzone on the y coordinate
      sawBladeHitZone.velocityX = -5 //sets the velocity of the hitzone to move leftward 
    }
    function createLaser(x, y){ //creates a laser object at the specified x and y coord
      var hitZoneSize = 50; //defines the size of the invisible hit zone for the laser
      var damageFromObstacle = 125 //defines the damage dealt when the laser hits something
      var laserHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); //creates an invisible obstacle object with the defined size and damage
      laserHitZone.x = x; //sets the x position of the laser object
      laserHitZone.y = y; //sets the y position of the laser object
      game.addGameItem(laserHitZone); //adds the laser object to the game
      var obstacleImage = draw.bitmap("img/laser.png"); //loads img/laser.png
      laserHitZone.addChild(obstacleImage); //sets img/laser.png to the laserHitZone
      obstacleImage.x = -65 //repositions the image to the left of the hitzone to fit
      obstacleImage.y = 0 //positions the image ontop of the hitzone
      obstacleImage.scaleX = .07 //scales down the image so it fits over the hitzone on the x coordinate
      obstacleImage.scaleY = .07 //scales down the image so it fits over the hitzone on the y coordinate
      laserHitZone.velocityX = -5 //sets the velocity of the hitzone to move leftward
    }
    function createEnemy(x, y){ // creates an enemy object at the specified x and y coords
      var enemy = game.createGameItem("enemy", 30); // creates a variable enemy and assigns it parameters
      var redSquare = draw.bitmap('img/turret.png'); //loads img/turret.png
      redSquare.x = -60; //sets the x position of img/turret.png
      redSquare.y = -45; //sets the y position of img/turret.png
      enemy.addChild(redSquare); //assigns the turret image to enemy
      enemy.x = x; //sets the x position of the enemy
      enemy.y = y //sets the y position of the enemy
      game.addGameItem(enemy); //adds the enemy object to the game
      enemy.velocityX = -5; //sets the velocity of the enemy to move leftward
      enemy.scaleX = -0.7 //scales down the image so it fits over the hitzone on the x coordinate
      enemy.scaleY = 0.7 //scales down the image so it fits over the hitzone on the y coordinate
      enemy.onPlayerCollision = function () { //makes enemy.onPlayerCollision into a function
        enemy.fadeOut(); //makes enemy fade out when shot
        game.changeIntegrity(-51); //makes HalleBot loose 10 health on enemy collision
      };
    
      enemy.onProjectileCollision = function (){ //defines what happens when the enemy collides with the player
        game.increaseScore(500); // increases score by 100 when enemies shot
        enemy.fadeOut(); // makes enemy fade out when shot
      };
    
    }
    function createDummy(x, y){ // creates my other enemy object at the specified x and y coords
      var enemy = game.createGameItem("dummy", 80); //creates an enemy variable and gives it parameters
      var redSquare = draw.bitmap('img/wheatley.png'); //loads img/wheatley.png
      redSquare.x = -100; //sets the x coordinate of the enemy png in relevance to the hitbox
      redSquare.y = -100; //sets the y coordinate of the enemy png in relevance to the hitbox
      enemy.addChild(redSquare); //adds redSquare as a child of enemy
      enemy.x = x; //sets the x position of the enemy
      enemy.y = y //sets the y position of the enemy
      game.addGameItem(enemy); //adds the enemy into the game
      enemy.velocityX = -5; //sets the enemy's velocity to move leftward
      enemy.scaleX = -0.35 //scales down the image on its x coord so it fits over the hitbox
      enemy.scaleY = 0.35 //scales down the image on its y coord so it fits over the hitbox
      enemy.onPlayerCollision = function () { //defines what happens when the enemy collides with the player
        game.changeIntegrity(-101); // makes HalleBot loose 10 health on enemy collision
        enemy.fadeOut(); // makes enemy fade out when shot
      };
    
      enemy.onProjectileCollision = function (){ // makes enemy.onProjcetileCollision into a function
        game.increaseScore(500); // increases score by 100 when enemies shot
        enemy.fadeOut(); // makes enemy fade out when shot
      };
    }
    function createReward(x, y){ //creates a reward object at the specified x and y coords
      var reward = game.createGameItem("buddy", 50); ///creates an award variable and gives it parameters
      var blueSquare = draw.bitmap('img/companion.png'); //loads img/companion.png
      blueSquare.x = -25; //sets the x coordinate of the reward png in relevance to the hitbox
      blueSquare.y = -25; //sets the y coordinate of the reward png in relevance to the hitbox
      reward.addChild(blueSquare); //adds blueSquare as a child of reward
      reward.x = x; //sets the x position of the enemy
      reward.y = y //sets the y position of the enemy
      game.addGameItem(reward); //adds the reward in to the game
      reward.velocityX = -5; //makes the reward move to the left at a velocity of 5
      reward.scaleX = .3 //scales down the image on its x coord so it fits over the hitbox
      reward.scaleY = .3 //scales down the image on its y coord so it fits over the hitbox
      reward.onPlayerCollision = function () { //makes reward.onPlayerCollision into a function
        game.changeIntegrity(+10); // makes HalleBot gain 10 health on reward collision
        game.increaseScore(500) //increases the score by 500 on reward collision
        reward.shrink(); // makes the reward shrink after contacting the player
      };
    }
    function createMarker(x,y){ //creates a marker object at the specified x and y coords
      var marker = game.createGameItem("marker", 25); //creates a marker variable and assigns it parameters
      var greenSquare = draw.bitmap('img/storage.png'); //loads img/storage.png
      greenSquare.x = -25; //sets the reward's x position in relevance to it's hitbox
      greenSquare.y = -25; //sets the reward's y position in relevance to it's hitbox
      marker.addChild(greenSquare); // adds greenSquare to a child of marker
      marker.x = x; //sets the x coords of the marker
      marker.y = y; //sets the y coords of the marker
      game.addGameItem(marker); //adds the marker to the game
      marker.scaleX = .3 //scales the marker png to fit its x axis
      marker.scaleY = .3 //scales the marker png to fit its y axis
      marker.velocityX = -5; //makes the marker move to the left at a velocity of 5
      
      marker.onPlayerCollision = function () { //defines what happens when Hallebot collides with the marker
      game.increaseScore(1000) //increases the score by 1000 on marker collision
      marker.shrink(); //makes the marker shrink on collision
      startLevel(); //starts the next level on marker collision
      }
    }
    function startLevel() { //defines what happens when a level is started
      // TODO 13 goes below here
      var level = levelData[currentLevel]; //gets data for the current level from the level data array
      var levelObjects = level.gameItems //extracts the game items array from the current level data
      for(var i = 0; i < levelObjects.length; i++){ //loops through all game items in the current level
        var item = levelObjects[i]; //gets the current game item data
        if(item.type === "sawblade"){ //creates a spike at the item's position
          createSawBlade(item.x, item.y) 
        }
        if(item.type === "enemy"){ //creates a turret at the item's position
          createEnemy(item.x, item.y)
        }
        if(item.type === "buddy"){ //creates a reward at the item's position
          createReward(item.x, item.y)
        }
        if(item.type === "marker"){ //creates a marker at the item's position
          createMarker(item.x, item.y)
        }
        if(item.type === "laser"){//creates a laser at the item's position
          createLaser(item.x, item.y)
        }
        if(item.type === "dummy"){//creates a wheatley enemy at the item's position
          createDummy(item.x, item.y)
        }
      }

      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
