/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

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
    var obj = {
      id: id,
      x: parseFloat($(id).css("left")),
      y: parseFloat($(id).css("top")),
      speedX: speedX,
      speedY: speedY,
      w: $(id).width(),
      h: $(id).height()
    }
    return obj;
  }

  var leftPaddle = GameItem("#leftPaddle", 0, 0)
  var rightPaddle = GameItem("#rightPaddle", 0, 0)
  var ball = GameItem("#ball",  (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1), (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1))
  var leftScore = 0;
  var rightScore = 0;
  $("#leftScore").text(leftScore);
  $("#rightScore").text(rightScore);
  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                      // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  /*
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    drawGameItem(leftPaddle);
    drawGameItem(rightPaddle);
    drawGameItem(ball);
    updateGameItem(leftPaddle);
    updateGameItem(rightPaddle);
    updateGameItem(ball);
    wallCollision(leftPaddle);
    wallCollision(rightPaddle);
    ballBounce(ball);
    stupidSpeedLimiter(leftPaddle);
    stupidSpeedLimiter(rightPaddle);
    paddleBallCollision();
    scoring();
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
  function handleKeyUp(event) {
    if(event.which === KEY.W || event.which === KEY.S){
      leftPaddle.speedY = 0;
    }
    if(event.which === KEY.UP || event.which === KEY.DOWN){
      rightPaddle.speedY = 0;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////

  //movement helpers
  function drawGameItem(obj){
    $(obj.id).css("left", obj.x);
    $(obj.id).css("top", obj.y);
  }

  function updateGameItem(obj){
    obj.x += obj.speedX;
    obj.y += obj.speedY;
  }

  function doCollide(obj1, obj2) {
    if (obj1.x + obj1.w > obj2.x && obj1.x < obj2.x + obj2.w && obj1.y + obj1.h > obj2.y && obj1.y < obj2.y + obj2.h) {
      return true
    }
    return false
  }

  function wallCollision(obj){
    if(obj.y > BOARD_HEIGHT - obj.h){
      obj.y -= obj.speedY;
    }
    if(obj.y < 0 ){
      obj.y -= obj.speedY
    }
    if(obj.x > BOARD_WIDTH - obj.w){
      return 'right'
      }
    if(obj.x < 0 - obj.w){
      return 'left'
    }
    return null;
    }
  }

  function stupidSpeedLimiter(obj) {
    if (Math.abs(obj.speedY) > 5) {
        if (obj.speedY > 0) {
            obj.speedY = 5;
        } else {
          obj.speedY = -5;
        }
    }
  }

  function ballBounce(obj){
    if(obj.y <= 0){
      obj.speedY = -obj.speedY;
    }
    if(obj.y >= BOARD_HEIGHT - obj.h){
      obj.speedY = -obj.speedY
    }
  }
  function paddleBallCollision(){
    if(doCollide(ball, leftPaddle)){
      ball.speedX = -ball.speedX
    }
    if(doCollide(ball, rightPaddle)){
      ball.speedX = -ball.speedX
  }
}

  //scoring
  function scoring(){
    let collisionResult = wallCollision(ball);
    if (collisionResult === 'right') {
      leftScore++;
      $("#leftScore").text(leftScore);
      resetBall();
    } else if (collisionResult === 'left') {
      rightScore++;
      $("#rightScore").text(rightScore);
      resetBall();
    }
  }

  function resetBall() {
    ball.x = BOARD_WIDTH / 2 - ball.w / 2;
    ball.y = BOARD_HEIGHT / 2 - ball.h / 2;
    ball.speedX = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedY = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
  }

  function scoring(){
    
  }
  //check boundaries of paddles
  //determines if objects collide
  //handle what happens when the ball hits the walls
  //handle what happens when the ball hits the paddles
  //handle what happens when someone wins
  //handles the points
  //handle resetting the game


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

