var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        //////////////////////////////////////////////////////////////////
        // ANIMATION VARIABLES HERE //////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        // TODO (several):
        var tree;
        var buildings = [];
      
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO 1:
            // this currently fills the background with an obnoxious yellow;
            // you should modify both the height and color to suit your game
            var backgroundFill = draw.bitmap('img/background.png'); //creates a variable named background fill
            background.addChild(backgroundFill); //adds backgroundFill as a child to the background
            
            // TODO 2: - Add a moon and starfield
            for(var stars = 0;stars < 150; stars++){ //
            var circle = draw.circle(4, "white", "yellow", 1); //draws a circle, stores it to a variable
            circle.x = canvasWidth * Math.random(); // adds an x value to the circle and places it at a random point
            circle.y = groundY * Math.random(); // adds a y value to the circle and placse it at a random point

            background.addChild(circle);
            }
            var moon = draw.bitmap("img/moon.png");
            moon.x = canvasWidth - 250; // changse the x position of the mon
            moon.y = groundY - 350; // changes the y position of the moon
            moon.scaleX = 0.5; // changes the x scale of the moon
            moon.scaleY = 0.5; // changes the y scale of the moon
            background.addChild(moon); // adds moon as a child of the background
            // TODO 4: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            
            for (var i = 0; i < 5; i++) { // creates a for loop starting at 0 and ending at 5
                var buildingHeight = 200 * Math.random(); //declared a building height variable and set it to 300
                var building = draw.rect(75, buildingHeight, "LightGray", "Black", 1); //creates a rectangle
                building.x = 200 * i; // sets the x value of the buildings by taking the current iteration and multiplying it by 200, making the each building 200 pixels from the last
                building.y = groundY - buildingHeight; //sets the buildings y value to the ground minus the buildings height so it doesn't clip through the ground
                background.addChild(building); //adds a building as a child to the background
                buildings.push(building); // pushes the buildings to each index of the array
              }
            
            // TODO 3: Part 1 - Add a tree
            tree = draw.bitmap("img/tree.png"); // assigns tree variable to an image
            tree.x = canvasWidth; // changes the x position of image
            tree.y = groundY -200; // cahnges the y position of image
            background.addChild(tree); // adds tree as a child of the background
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 3: Part 2 - Move the tree!
            tree.x = tree.x - 10; // the current x value of the tree is reassigned
            if(tree.x < -300){ // checks if the tree has gone off the left side of the canvas
                tree.x = canvasWidth // if it has, it gets set back to the right side of the canvas
            }
            // TODO 4: Part 2 - Parallax
            for (var i = 0; i < buildings.length; i++) { // creates a for loop that iterates through buildings length
                var building = buildings[i]; //
             building.x = building.x - 3 // makes the building move at 3 pixels to the left
            if(building.x < -300){ // if statement for when the building's x position moves past -300
                building.x = canvasWidth // moves the building's x position to canvas width
            }
            } 

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
