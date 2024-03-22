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
    function createSawBlade(x, y){ // 
      var hitZoneSize = 25; // 
      var damageFromObstacle = 125; // 
      var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); // 
      sawBladeHitZone.x = x; // 
      sawBladeHitZone.y = y; // 
      game.addGameItem(sawBladeHitZone); // 
      var obstacleImage = draw.bitmap("img/sawblade.png"); // 
      sawBladeHitZone.addChild(obstacleImage); //     
      obstacleImage.x = -25; // 
      obstacleImage.y = -25; // 
      sawBladeHitZone.rotationalVelocity = -5;
    }
    function createEnemy(x, y){ // 
      var enemy = game.createGameItem("enemy", 25); // 
      var redSquare = draw.rect(50, 50, "red"); // 
      redSquare.x = -25; // 
      redSquare.y = -25; // 
      enemy.addChild(redSquare); // 
      enemy.addChild(redSquare); // 
      enemy.x = x; // 
      enemy.y = y // 
      game.addGameItem(enemy); // 
      enemy.velocityX = -5; // 
      
      enemy.onPlayerCollision = function () { // makes enemy.onPlayerCollision into a function
        game.changeIntegrity(-10); // makes HalleBot loose 10 health on enemy collision
      };
    
      enemy.onProjectileCollision = function (){ // makes enemy.onProjcetileCollision into a function
        game.increaseScore(100); // increases score by 100 when enemies shot
        enemy.fadeOut(); // makes enemy fade out when shot
      };
    }
    function createReward(x, y){ // 
      var reward = game.createGameItem("enemy", 25); // creates a variable named award and assigned it to game.CreateGameItem
      var blueSquare = draw.rect(50, 50, "blue"); // creats a variable and draws it in the game
      blueSquare.x = -25; // sets the squares x coordinate
      blueSquare.y = -25; // sets the squares y coordinate
      reward.addChild(blueSquare); // adds the blueSquare as a chilf of rewards
      reward.x = x; // sets the blueSquares x coordinate
      reward.y = y // sets the blueSquares y coordinate
      game.addGameItem(reward); // adds the reward to the game
      reward.velocityX = -5; // makes the reward move to the left at a velocity of 5
      
      reward.onPlayerCollision = function () { // makes reward.onPlayerCollision into a function
        game.changeIntegrity(-10); // makes HalleBot loose 10 health on reward collision
      reward.shrink(); //
      };  
    }
    function createMarker(){
      var marker = game.createGameItem("enemy", 25); // 
      var blueSquare = draw.rect(50, 50, "blue"); // 
      blueSquare.x = -25; // 
      blueSquare.y = -25; // 
      marker.addChild(blueSquare); //
      marker.x = x; // 
      marker.y = y // 
      game.addGameItem(marker); // 
      marker.velocityX = -5; // 
      
      marker.onPlayerCollision = function () { // makes marker.onPlayerCollision into a function
        game.changeIntegrity(-10); // makes HalleBot loose 10 health on marker collision
      marker.shrink(); //
    }
    //function calls
    createSawBlade(1000, groundY- 120) // calls sawblade function
    createSawBlade(800, groundY- 120) // calls sawblade function
    createSawBlade(600, groundY- 120) // calls sawblade function
    createEnemy(1500, groundY - 50) // calls enemy function
    createReward(1000, groundY - 75)
    function startLevel() {
      // TODO 13 goes below here



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
