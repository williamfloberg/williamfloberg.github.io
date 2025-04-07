function runProgram() {
  //constants for framerate and board dimensions
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();

  //score display elements from the DOM
  const leftScoreElement = document.getElementById("leftScore");
  const rightScoreElement = document.getElementById("rightScore");

  // key mappings for input
  const KEY = {
    'W': 87,
    'S': 83,
    'UP': 38,
    'DOWN': 40,
  };

  //factory function to create a game object with position, size, and speed
  function GameItem(id, speedX, speedY) {
    return {
      id: id,
      x: parseFloat($(id).css("left")),
      y: parseFloat($(id).css("top")),
      speedX: speedX,
      speedY: speedY,
      w: $(id).width(),
      h: $(id).height()
    };
  }

  //game state variables
  let leftScore = 0;
  let rightScore = 0;
  let justScored = false; // prevents double scoring
  let gameStarted = false; // tracks if the game has started yet

  //game items (paddles and ball)
  let leftPaddle = GameItem("#leftPaddle", 0, 0);
  let rightPaddle = GameItem("#rightPaddle", 0, 0);
  let topPaddle = GameItem("#topPaddle", 0, 0);
  let bottomPaddle = GameItem("#bottomPaddle", 0, 0);
  let ball = GameItem("#ball", 0, 0);

  //center paddles and ball to start
  centerAll();

  //start the game loop and register keyboard input
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);

  //called every frame while the game runs
  function newFrame() {
    drawGameItem(leftPaddle);
    drawGameItem(rightPaddle);
    drawGameItem(topPaddle);
    drawGameItem(bottomPaddle);
    drawGameItem(ball);

    //only run game logic if game has started
    if (gameStarted) {
      updateGameItem(leftPaddle);
      updateGameItem(rightPaddle);
      updateGameItem(ball);

      syncPaddles();
      wallCollision(leftPaddle, true); //constrain vertical paddles vertically
      wallCollision(rightPaddle, true);
      wallCollision(topPaddle, false); //constrain horizontal paddles horizontally
      wallCollision(bottomPaddle, false);

      paddleBallCollision();
      ballBounce();
      scoring();
    }
  }

  //handle key down events (start game or move paddles)
  function handleKeyDown(e) {
    if (!gameStarted) startGame();

    if (e.which === KEY.W) leftPaddle.speedY = -10;
    if (e.which === KEY.S) leftPaddle.speedY = 10;
    if (e.which === KEY.UP) rightPaddle.speedY = -10;
    if (e.which === KEY.DOWN) rightPaddle.speedY = 10;
  }

  //handle key release events to stop paddle movement
  function handleKeyUp(e) {
    if (e.which === KEY.W || e.which === KEY.S) leftPaddle.speedY = 0;
    if (e.which === KEY.UP || e.which === KEY.DOWN) rightPaddle.speedY = 0;
  }

  //draw an object on screen based on its x/y values
  function drawGameItem(obj) {
    $(obj.id).css("left", obj.x);
    $(obj.id).css("top", obj.y);
  }

  //update object position based on its speed
  function updateGameItem(obj) {
    obj.x += obj.speedX;
    obj.y += obj.speedY;
  }

  //sync horizontal paddles to follow their vertical counterparts
  function syncPaddles() {
    topPaddle.x = leftPaddle.y;
    bottomPaddle.x = rightPaddle.y;
  }

  //prevent paddles from going off the board
  function wallCollision(obj, vertical) {
    if (vertical) {
      if (obj.y < 0) obj.y = 0;
      if (obj.y > BOARD_HEIGHT - obj.h) obj.y = BOARD_HEIGHT - obj.h;
    } else {
      if (obj.x < 0) obj.x = 0;
      if (obj.x > BOARD_WIDTH - obj.w) obj.x = BOARD_WIDTH - obj.w;
    }
  }

  //checks whether two game objects collide
  function doCollide(obj1, obj2) {
    return obj1.x + obj1.w > obj2.x &&
           obj1.x < obj2.x + obj2.w &&
           obj1.y + obj1.h > obj2.y &&
           obj1.y < obj2.y + obj2.h;
  }

  //handles ball bouncing off paddles and increase speed
  function paddleBallCollision() {
    const paddles = [leftPaddle, rightPaddle, topPaddle, bottomPaddle];
    paddles.forEach(p => {
      if (doCollide(ball, p)) {
        if (p === topPaddle || p === bottomPaddle) {
          ball.speedY = -ball.speedY; //bounce vertically
        } else {
          ball.speedX = -ball.speedX; //bounce horizontally
        }
        //speed up the ball slightly after paddle hit
        ball.speedX *= 1.1;
        ball.speedY *= 1.1;
      }
    });
  }

  //allow ball to bounce off walls (if not scoring)
  function ballBounce() {
    if (ball.y <= 0 || ball.y >= BOARD_HEIGHT - ball.h) ball.speedY = -ball.speedY;
    if (ball.x <= 0 || ball.x >= BOARD_WIDTH - ball.w) ball.speedX = -ball.speedX;
  }

  //handle scoring when the ball passes paddle boundaries
  function scoring() {
    if (!justScored) {
      //if ball hits top or left edge, right side scores
      if (ball.x <= 0 || ball.y <= 0) {
        rightScore++;
        rightScoreElement.textContent = rightScore;
        justScored = true;
        checkWin("Right");
      }
      //if ball hits bottom or right edge, left side scores
      else if (ball.x + ball.w >= BOARD_WIDTH || ball.y + ball.h >= BOARD_HEIGHT) {
        leftScore++;
        leftScoreElement.textContent = leftScore;
        justScored = true;
        checkWin("Left");
      }
    }

    //resets justScored flag when ball is fully back in play
    if (ball.x > 0 && ball.x + ball.w < BOARD_WIDTH &&
        ball.y > 0 && ball.y + ball.h < BOARD_HEIGHT) {
      justScored = false;
    }
  }

  //checks if someone won and either resets or ends the game
  function checkWin(winner) {
    if (leftScore === 7 || rightScore === 7) {
      flashBorder(); // visual win effect
      setTimeout(() => {
        alert(`${winner} Player Wins!`);
        leftScore = 0;
        rightScore = 0;
        leftScoreElement.textContent = 0;
        rightScoreElement.textContent = 0;
        centerAll();
        stopFlashingBorder();
        gameStarted = false;
        $("#startOverlay").show();
      }, 500);
    } else {
      resetBall(); //just resets ball if game isn't over
    }
  }

  //centers ball and give it a new random direction
  function resetBall() {
    ball.x = BOARD_WIDTH / 2 - ball.w / 2;
    ball.y = BOARD_HEIGHT / 2 - ball.h / 2;
    ball.speedX = randomSpeed();
    ball.speedY = randomSpeed();
    drawGameItem(ball);
  }

  //centers all paddles and ball to their start positions
  function centerAll() {
    leftPaddle.y = BOARD_HEIGHT / 2 - leftPaddle.h / 2;
    rightPaddle.y = BOARD_HEIGHT / 2 - rightPaddle.h / 2;
    topPaddle.x = BOARD_WIDTH / 2 - topPaddle.w / 2;
    bottomPaddle.x = BOARD_WIDTH / 2 - bottomPaddle.w / 2;
    leftPaddle.speedY = rightPaddle.speedY = 0;
    centerBall();
    drawGameItem(leftPaddle);
    drawGameItem(rightPaddle);
    drawGameItem(topPaddle);
    drawGameItem(bottomPaddle);
  }

  //centers the ball and stop its motion
  function centerBall() {
    ball.x = BOARD_WIDTH / 2 - ball.w / 2;
    ball.y = BOARD_HEIGHT / 2 - ball.h / 2;
    ball.speedX = 0;
    ball.speedY = 0;
    drawGameItem(ball);
  }

  //starts the game on first key press
  function startGame() {
    gameStarted = true;
    $("#startOverlay").hide();
    resetBall();
  }

  //returns a randomized speed between 2–5 in a random direction
  function randomSpeed() {
    return (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
  }

  //adds a border flashing animation for a win effect
  function flashBorder() {
    $("#board").addClass("flash");
  }

  //removes the flashing animation from the border
  function stopFlashingBorder() {
    $("#board").removeClass("flash");
  }
}