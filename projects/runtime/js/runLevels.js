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
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    function createSawBlade(x, y){ // creates sawBlade function (got lazy and made this another obstacle w/o renaming it)
      var hitZoneSize = 20; // sets the saw's hitbox size
      var damageFromObstacle = 125; // sets the saw's damage
      var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); // 
      sawBladeHitZone.x = x; // sets the hitbox's x coordinate
      sawBladeHitZone.y = y; // sets the hitbox's y coordinate
      game.addGameItem(sawBladeHitZone); // adds the hitbox into the game 
      var obstacleImage = draw.bitmap("img/sawblade.png"); // gives the obstacle an image 
      sawBladeHitZone.addChild(obstacleImage); //     adds the image as a child of the hitzone
      obstacleImage.x = -25 // sets the x coordinate of the sawblade in relevance to the hitbox
      obstacleImage.y = -45 // sets the y coordinate of the sawblade in relevance to the hitbox
      obstacleImage.scaleX = 0.06
      obstacleImage.scaleY = 0.06
      sawBladeHitZone.velocityX = -5
    }
    function createLaser(x, y){
      var hitZoneSize = 50;
      var damageFromObstacle = 125
      var laserHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
      laserHitZone.x = x;
      laserHitZone.y = y;
      game.addGameItem(laserHitZone);
      var obstacleImage = draw.bitmap("img/laser.png");
      laserHitZone.addChild(obstacleImage);
      obstacleImage.x = -65
      obstacleImage.y = 0
      obstacleImage.scaleX = .07
      obstacleImage.scaleY = .07
      laserHitZone.velocityX = -5
    }
    function createEnemy(x, y){ // creates createEnemy function
      var enemy = game.createGameItem("enemy", 30); // creates a variable enemy and assigns it parameters
      var redSquare = draw.bitmap('img/turret.png'); // creates a variable and draws it
      redSquare.x = -60; // sets the x coordinate of the enemy png in relevance to the hitbox
      redSquare.y = -45; // sets the y coordinate of the enemy png in relevance to the hitbox
      enemy.addChild(redSquare); // adds redSquare as a child of enemy
      enemy.x = x; // assigns the enemy to the functions x parameter
      enemy.y = y // assigns the enemy to the functions y parameter
      game.addGameItem(enemy); // adds the enemy into the game
      enemy.velocityX = -5; // sets the enemy's velocity to -5 so it moves left
      enemy.scaleX = -0.7
      enemy.scaleY = 0.7
      enemy.onPlayerCollision = function () { // makes enemy.onPlayerCollision into a function
        enemy.fadeOut(); // makes enemy fade out when shot
        game.changeIntegrity(-51); // makes HalleBot loose 10 health on enemy collision
      };
    
      enemy.onProjectileCollision = function (){ // makes enemy.onProjcetileCollision into a function
        game.increaseScore(500); // increases score by 100 when enemies shot
        enemy.fadeOut(); // makes enemy fade out when shot
      };
    
    }
    function createDummy(x, y){ // creates createEnemy function
      var enemy = game.createGameItem("dummy", 80); // creates a variable enemy and assigns it parameters
      var redSquare = draw.bitmap('img/wheatley.png'); // creates a variable and draws it
      redSquare.x = -100; // sets the x coordinate of the enemy png in relevance to the hitbox
      redSquare.y = -100; // sets the y coordinate of the enemy png in relevance to the hitbox
      enemy.addChild(redSquare); // adds redSquare as a child of enemy
      enemy.x = x; // assigns the enemy to the functions x parameter
      enemy.y = y // assigns the enemy to the functions y parameter
      game.addGameItem(enemy); // adds the enemy into the game
      enemy.velocityX = -5; // sets the enemy's velocity to -5 so it moves left
      enemy.scaleX = -0.35
      enemy.scaleY = 0.35
      enemy.onPlayerCollision = function () { // makes enemy.onPlayerCollision into a function
        game.changeIntegrity(-101); // makes HalleBot loose 10 health on enemy collision
        enemy.fadeOut(); // makes enemy fade out when shot
      };
    
      enemy.onProjectileCollision = function (){ // makes enemy.onProjcetileCollision into a function
        game.increaseScore(500); // increases score by 100 when enemies shot
        enemy.fadeOut(); // makes enemy fade out when shot
      };
    }
    function createReward(x, y){ // creates a reward fuction
      var reward = game.createGameItem("buddy", 50); // creates a variable named award and assigned it to game.CreateGameItem
      var blueSquare = draw.bitmap('img/companion.png'); // creats a variable and draws it in the game
      blueSquare.x = -25; // sets the squares x coordinate
      blueSquare.y = -25; // sets the squares y coordinate
      reward.addChild(blueSquare); // adds the blueSquare as a child of rewards
      reward.x = x; // sets the blueSquares x coordinate
      reward.y = y // sets the blueSquares y coordinate
      game.addGameItem(reward); // adds the reward to the game
      reward.velocityX = -5; // makes the reward move to the left at a velocity of 5
      reward.scaleX = .3
      reward.scaleY = .3
      reward.onPlayerCollision = function () { // makes reward.onPlayerCollision into a function
        game.changeIntegrity(+10); // makes HalleBot gain 10 health on reward collision
        game.increaseScore(500)
        reward.shrink(); // makes the reward shrink after contacting the player
      };
    }
    function createMarker(x,y){
      var marker = game.createGameItem("marker", 25); // creates a variable named marker and assigns it parameters
      var greenSquare = draw.bitmap('img/storage.png'); // draws the square representing the marker
      greenSquare.x = -25; // sets the reward's x position in relevance to it's hitbox
      greenSquare.y = -25; // sets the reward's y position in relevance to it's hitbox
      marker.addChild(greenSquare); // adds greenSquare to a child of marker
      marker.x = x; // sets the x coordinate of the marker
      marker.y = y; // sets the y coordinate of the marker
      game.addGameItem(marker); // adds the marker to the game
      marker.scaleX = .3 // scales the marker png to fit its x axis
      marker.scaleY = .3 // scales the marker png to fit its y axis
      marker.velocityX = -5; // makes the marker move to the left at a velocity of 5
      
      marker.onPlayerCollision = function () { // makes marker.onPlayerCollision into a function
      game.increaseScore(1000)
      marker.shrink(); // makes the marker shrink when 
      startLevel();
      }
    }
    function startLevel() {
      // TODO 13 goes below here
      var level = levelData[currentLevel];
      var levelObjects = level.gameItems
      for(var i = 0; i < levelObjects.length; i++){
        var item = levelObjects[i];
        if(item.type === "sawblade"){
          createSawBlade(item.x, item.y)
        }
        if(item.type === "enemy"){
          createEnemy(item.x, item.y)
        }
        if(item.type === "buddy"){
          createReward(item.x, item.y)
        }
        if(item.type === "marker"){
          createMarker(item.x, item.y)
        }
        if(item.type === "laser"){
          createLaser(item.x, item.y)
        }
        if(item.type === "dummy"){
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
