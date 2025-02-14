/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();
  const WALKER_WIDTH = $("#walker").width();
  const WALKER_HEIGHT = $("#walker").height();
  const KEY = {
    LEFT:37,
    RIGHT:39,
    UP:38,
    DOWN:40,

    A:65,
    D:68,
    W:87,
    S:83,
  }
  
  // Game Item Objects
  var walker = Walker("#walker", 0, 0, 0, 0, WALKER_WIDTH, WALKER_HEIGHT);
  var walker2 = Walker("#walker2", BOARD_WIDTH - WALKER_WIDTH, BOARD_HEIGHT - WALKER_HEIGHT, 0, 0, WALKER_WIDTH, WALKER_HEIGHT);
    

  var collisionDetected = false; // flag for collision detection

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    redrawGameItem(walker);
    redrawGameItem(walker2);
    repositionGameItem(walker);
    repositionGameItem(walker2);
    wallCollision(walker);
    wallCollision(walker2);
    // collision checker
    if (doCollide(walker, walker2) && !collisionDetected) {
      showResult(true);
      tagYoureIt();
      collisionDetected = true; // set flag to true to prevent repeated alerts
    } else if (!doCollide(walker, walker2)) {
      showResult(false);
      collisionDetected = false; // reset flag when no collision
    }
  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT){
      walker.speedX = -5;
    }
    if (event.which === KEY.RIGHT){
      walker.speedX = 5;
    }
    if (event.which === KEY.UP){
      walker.speedY = -5;
    }
    if (event.which === KEY.DOWN){
      walker.speedY = 5;
    }
    //walker 2
    if (event.which === KEY.A){
      walker2.speedX = -5;
    }
    if (event.which === KEY.D){
      walker2.speedX = 5;
    }
    if (event.which === KEY.W){
      walker2.speedY = -5;
    }
    if (event.which === KEY.S){
      walker2.speedY = 5;
    }
  }

  function handleKeyUp(event) {
    if (event.which === KEY.LEFT || event.which === KEY.RIGHT){
      walker.speedX = 0;
    }
    if (event.which === KEY.UP || event.which === KEY.DOWN){
      walker.speedY = 0;
    }

    if (event.which === KEY.A || event.which === KEY.D){
      walker2.speedX = 0;
    }
    if (event.which === KEY.W || event.which === KEY.S){
      walker2.speedY = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function redrawGameItem(obj){
    $(obj.id).css("left", obj.xPos);
    $(obj.id).css("top", obj.yPos);
  }

  function repositionGameItem(obj){
    obj.xPos += obj.speedX;
    obj.yPos += obj.speedY;
  }

  function wallCollision(){
    if (obj.xPos > BOARD_WIDTH - WALKER_WIDTH || obj.xPos < 0){
      obj.xPos -= obj.speedX;
    }
    if (obj.yPos > BOARD_HEIGHT - WALKER_HEIGHT || obj.yPos < 0){
      obj.yPos -= obj.speedY;
    }
  }
  function handleMouseMove(event) {
    // get the mouse location from the event object
    moveBlueSquare(event.pageX, event.pageY);  
  }

  function doCollide(walker1, walker2) {
    if (
      walker2.xPos < walker1.xPos + walker1.width &&
      walker2.xPos + walker2.width > walker1.xPos &&
      walker2.yPos < walker1.yPos + walker1.height &&
      walker2.yPos + walker2.height > walker1.yPos
    ) {
      return true;
    } else {
      return false;
    }
  }

  function showResult(result) {
    $("#result").text('doCollide: ' + result);
  }

  function tagYoureIt() {
    alert("Tag, you're it!");
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}
function Walker(id, xPos, yPos, speedX, speedY, width, height){
  let obj = {
    id: id,
    xPos: xPos,
    yPos: yPos,
    speedX: speedX,
    speedY: speedY,
    width: width,
    height: height
  }
  return obj;
}
