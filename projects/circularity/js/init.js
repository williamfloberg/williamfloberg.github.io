var init = function (window) {
    'use strict';
    var 
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,
        
        app = window.opspark.makeApp(),
        canvas = app.canvas, 
        view = app.view,
        fps = draw.fps('#000');
        
    
    window.opspark.makeGame = function() {
        
        window.opspark.game = {};
        var game = window.opspark.game;
        
        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM SETUP ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        // TODO 1 : Declare and initialize our variables
        var circle; //variable to hold a single circle when creting circles / iterating
        var circles = []; //variable to store all circles in one array
        // TODO 2 : Create a function that draws a circle 
        function drawCircle(){
            circle = draw.randomCircleInArea(canvas, true, true, "#999", 2); //uses a previously existing function to draw a circle of random size, color, and location. It stores the output of that function.
            physikz.addRandomVelocity(circle, canvas, 20, 20); //uses the physikz library to give the circle a random velocity/direction
            view.addChild(circle); //this adds the circle as a child of view so it can be visible on the canvas
            circles.push(circle); //saves the circle to an array by pushing it to the end of the array
        }

        // TODO 3 / 7 : Call the drawCircle() function 
        for (var i = 0; i < 100; i++){ //draws 100 circles
            drawCircle();
        }

        ////////////////////////////////////////////////////////////
        ///////////////// PROGRAM LOGIC ////////////////////////////
        ////////////////////////////////////////////////////////////
        
        /* 
        This Function is called 60 times/second producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
        function update() {
            // TODO 4 : Update the circle's position //
            // deleted repeating code
            // TODO 5 / 10 : Call game.checkCirclePosition() on your circles.
         
            // TODO 8/9 : Iterate over the array
            for (var i = 0; i < circles.length;i++){ //checks the postion of the circles to make sure they're in the screen
                game.checkCirclePosition(circles[i]);
                physikz.updatePosition(circles[i]); //updates the circles positon 60 times a second so it moves  
            }    
        }
    
        /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
        game.checkCirclePosition = function(circle) {

            // if the circle has gone past the RIGHT side of the screen then place it on the LEFT
            if ( circle.x > canvas.width ) { //if circle's x value is higher than canvas.width, it gets put at x=0.
                circle.x = 0;
            }
            
            // TODO 6 : YOUR CODE STARTS HERE //////////////////////
            if ( circle.x < 0) {
                circle.x = canvas.width; //if the circle's x value is under  0, it gets placed at the end of the canvas (canvas.width)
            }
            if (circle.y > canvas.height) { //if the circles y value is higher than canvas.height, it gets placed at y=0.
                circle.y = 0;
            }
            if (circle.y < 0){
                circle.y = canvas.height //if the circle's y value is lower than 0, the circle gets put at the top of the screen (canvas.height)
            }

            // YOUR TODO 6 CODE ENDS HERE //////////////////////////
        }
        
        /////////////////////////////////////////////////////////////
        // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
        /////////////////////////////////////////////////////////////
        
        view.addChild(fps);
        app.addUpdateable(fps);
        
        game.circle = circle;
        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;
        
        app.addUpdateable(window.opspark.game);
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
}
