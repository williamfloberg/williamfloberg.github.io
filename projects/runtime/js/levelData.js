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
        name: "Stage 1",
        number: 1,
        speed: -20,
        gameItems: [
          { type: "sawblade", x: 400, y: groundY },
          { type: "sawblade", x: 600, y: groundY },
          { type: "sawblade", x: 800, y: groundY },
          { type: "laser", x: 1200, y: groundY - 130 },
          { type: "enemy", x: 1500, y: groundY - 50},
          {type: "buddy", x: 1700, y: groundY - 100},
          { type: "sawblade", x: 2000, y: groundY},
          {type: "buddy", x: 2150, y: groundY - 100},
          { type: "sawblade", x: 2300, y: groundY},
          { type: "laser", x: 2735, y: groundY - 130 },
          { type: "laser", x: 2845, y: groundY - 130 },
          { type: "laser", x: 2955, y: groundY - 130 },
          {type: "buddy", x: 3100, y: groundY - 100},
          { type: "enemy", x: 3400, y: groundY - 50},
          { type: "enemy", x: 3600, y: groundY - 50},
          { type: "enemy", x: 3800, y: groundY - 50},
          {type: "buddy", x: 4000, y: groundY - 100},
          { type: "sawblade", x: 4200, y: groundY},
          { type: "sawblade", x: 4400, y: groundY},
          { type: "sawblade", x: 4600, y: groundY},
          { type: "marker", x: 5000, y: groundY - 100 },
        ],
      },
      {
        name: "Stage 2",
        number: 2,
        speed: -20,
        gameItems: [
          { type: "sawblade", x: 500, y: groundY},
          { type: "laser", x: 700, y: groundY - 130 },
          { type: "sawblade", x: 900, y: groundY},
          {type: "buddy", x: 875, y: groundY - 130},
          { type: "laser", x: 1100, y: groundY - 130 },
          { type: "sawblade", x: 1300, y: groundY},
          { type: "dummy", x: 1700, y: groundY - 50},
          { type: "enemy", x: 1900, y: groundY - 50},
          { type: "dummy", x: 2100, y: groundY - 50},
          { type: "enemy", x: 2300, y: groundY - 50},
          { type: "enemy", x: 2500, y: groundY - 50},
          {type: "buddy", x: 3000, y: groundY - 100},
          {type: "buddy", x: 3200, y: groundY - 100},
          {type: "buddy", x: 3400, y: groundY - 100},
          {type: "buddy", x: 3600, y: groundY - 100},
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
