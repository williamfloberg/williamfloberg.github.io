/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();
  // Game Item Objects
  const KEY = {
  'W': 87,
  'S': 83,
  'UP': 38,
  'DOWN': 40,
}


  function GameItem(id, speedX, speedY){
  var objInstance = {
    id: id,
    x: parseFloat($(id).css("left")),
    y: parseFloat($(id).css("top")),
    speedX: speedX,
    speedY: speedY,
    w: $(id).width(),
    h: $(id).width()
  }
  return objInstance;
}

var leftPaddle = GameItem("#leftPaddle", 0, 0)
var rightPaddle = GameItem("#rightPaddle", 0, 0)

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    drawGameItem(leftPaddle);
    updateGameItem(leftPaddle);
    drawGameItem(rightPaddle);
    updateGameItem(rightPaddle);
  }

  function updateGameItem(obj){
    obj.x += obj.speedX;
    obj.y += obj.speedY;
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if(event.which === KEY.W){
      leftPaddle.speedY -= 5;
    }
    if(event.which === KEY.S){
        leftPaddle.speedY += 5;
      }
      if(event.which === KEY.UP){
        rightPaddle.speedY -= 5;
      }
      if(event.which === KEY.DOWN){
          rightPaddle.speedY += 5;
        }
    }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  //movement helpers
  function drawGameItem(obj){
    $(obj.id).css("left", obj.x);
    $(obj.id).css("top", obj.y);
  }




  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
