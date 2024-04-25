var makeLevelData = function (window) {
  window.opspark = window.opspark || {};

  window.opspark.makeDataInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game

    // TODO 12: change the below data
    var levelData = [
      {
        name: "Stage 1", //sets level name
        number: 1, //sets level number
        speed: -20, //sets level speed
        gameItems: [ //lists items in this stage
          { type: "sawblade", x: 400, y: groundY }, //adds a spike at the set x and y coords
          { type: "sawblade", x: 600, y: groundY }, //adds a spike at the set x and y coords
          { type: "sawblade", x: 800, y: groundY }, //adds a spike at the set x and y coords
          { type: "laser", x: 1200, y: groundY - 130 }, //adds a laser at the set x and y coords
          { type: "enemy", x: 1500, y: groundY - 50}, //adds a turret at the set x and y coords
          {type: "buddy", x: 1700, y: groundY - 100}, //adds a reward at the set x and y coords
          { type: "sawblade", x: 2000, y: groundY}, //adds a spike at the set x and y coords
          {type: "buddy", x: 2150, y: groundY - 100}, //adds a reward at the set x and y coords
          { type: "sawblade", x: 2300, y: groundY}, //adds a spike at the set x and y coords
          { type: "laser", x: 2735, y: groundY - 130 }, //adds a laser at the set x and y coords
          { type: "laser", x: 2845, y: groundY - 130 }, //adds a laser at the set x and y coords
          { type: "laser", x: 2955, y: groundY - 130 }, //adds a laser at the set x and y coords
          {type: "buddy", x: 3100, y: groundY - 100}, //adds a reward at the set x and y coords
          { type: "enemy", x: 3400, y: groundY - 50}, //adds a turret at the set x and y coords
          { type: "enemy", x: 3600, y: groundY - 50}, //adds a turret at the set x and y coords
          { type: "enemy", x: 3800, y: groundY - 50}, //adds a turret at the set x and y coords
          {type: "buddy", x: 4000, y: groundY - 100}, //adds a reward at the set x and y coords
          { type: "sawblade", x: 4200, y: groundY}, //adds a spike at the set x and y coords
          { type: "sawblade", x: 4400, y: groundY}, //adds a spike at the set x and y coords
          { type: "sawblade", x: 4600, y: groundY}, //adds a spike at the set x and y coords
          { type: "marker", x: 5000, y: groundY - 100 }, //adds a marker at the set x and y coords
        ],
      },
      {
        name: "Stage 2", //sets level number
        number: 2, //sets level number
        speed: -20, //sets level speed
        gameItems: [ //lists items in this stage
          { type: "sawblade", x: 500, y: groundY}, //adds a spike at the set x and y coords
          { type: "laser", x: 700, y: groundY - 130 }, //adds a laser at the set x and y coords
          { type: "sawblade", x: 900, y: groundY}, //adds a spike at the set x and y coords
          {type: "buddy", x: 875, y: groundY - 130}, //adds a reward at the set x and y coords
          { type: "laser", x: 1100, y: groundY - 130 }, //adds a laser at the set x and y coords
          { type: "sawblade", x: 1300, y: groundY}, //adds a spike at the set x and y coords
          { type: "dummy", x: 1700, y: groundY - 50}, //adds wheatley at the set x and y coords
          { type: "enemy", x: 1900, y: groundY - 50}, //adds a turret at the set x and y coords
          { type: "dummy", x: 2100, y: groundY - 50}, //adds wheatley at the set x and y coords
          { type: "enemy", x: 2300, y: groundY - 50}, //adds a turret at the set x and y coords
          { type: "enemy", x: 2500, y: groundY - 50}, //adds a turret at the set x and y coords
          {type: "buddy", x: 3000, y: groundY - 100}, //adds a reward at the set x and y coords
          {type: "buddy", x: 3200, y: groundY - 100}, //adds a reward at the set x and y coords
          {type: "buddy", x: 3400, y: groundY - 100}, //adds a reward at the set x and y coords
          { type: "dummy", x: 2100, y: groundY - 50}, //adds wheatley at the set x and y coords
          { type: "sawblade", x: 4000, y: groundY}, //adds a spike at the set x and y coords
          { type: "sawblade", x: 4150, y: groundY}, //adds a spike at the set x and y coords
          { type: "sawblade", x: 4300, y: groundY}, //adds a spike at the set x and y coords
          { type: "sawblade", x: 4450, y: groundY}, //adds a spike at the set x and y coords
          {type: "buddy", x: 4800, y: groundY - 100}, //adds a reward at the set x and y coords

        ],
      },
    ];
    window.opspark.levelData = levelData;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = makeLevelData;
}
