var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var game = {score: 0, lives: 3, state: "play", level: 1};

var gameObjects = [];

gameObjects.push({type: "player", x:20, y:c.height/2, r:5, color:"images/spaceship.png", speed:5, image:null, width:40, height:20});

gameObjects.push({type: "harm", x:100, y:75, r:25, color:"images/asteroid.png", speed:1, image:null, width:0, height:0});

gameObjects.push({type: "benefit", x:20, y:25, r:50, color:"images/smile.png", speed:1, image:null, width:0, height:0});

var player = gameObjects[0];

var backgroundImg = new Image();
backgroundImg.src = "images/space.jpg";

ctx.font = "30px Comic Sans MS";
ctx.fillStyle = "red";
ctx.textAlign = "center";

function draw() {
  move();
  // clear canvas
  ctx.clearRect(0,0,c.width, c.height);
  ctx.drawImage(backgroundImg, 0, 0);
  // draw objects

  for (idx in gameObjects) {
    g = gameObjects[idx];
    if (g.type == "player") {
      g.image = new Image();
      g.image.src = g.color;
      ctx.drawImage(g.image, g.x, g.y, g.width, g.height);
    }
    else {
      ctx.beginPath();
      g.image = new Image();
      g.image.src = g.color;
      ctx.drawImage(g.image, g.x-(g.r), g.y-(g.r), g.r*2, g.r*2);
    }

    if (g.type != "player") {

      g.x -= g.speed * game.level;

      if (colliding(player,g)) {
        if (g.type == "harm") {
          game.lives --;
        } else if (g.type == "benefit"){
          game.score += 100;

          if (game.score % 100 == 0) {
            game.level ++;

            if (game.level % 2 == 0) {
                gameObjects.push({type: "harm", x:100, y:75, r:25, color:"images/asteroid.png", speed:1, image:null, width:0, height:0});
            }
          }
        }
        g.state = "collision"
      }
      else {

      }

      if ( (g.x + g.r < 0)  || g.state == "collision") {
          g.x = c.width + g.r;
          g.y = Math.random() * (c.height - 0) + 0;
          g.state = "";
        }
    }
  }

  // draw text
  ctx.fillText("Score: " + game.score + " - Lives: " + game.lives, c.width/2, 30);


  // next frame
  if (game.lives > 0) {
    window.requestAnimationFrame (draw);
  } else {
    gameOver();
  }
}


function gameOver() {
  ctx.clearRect(0,0,c.width, c.height);
  ctx.drawImage(backgroundImg, 0, 0);
  ctx.fillText("Game Over", c.width/2, c.height/2);
  ctx.fillText("Score: " + game.score, c.width/2, c.height/2+30);
}


window.requestAnimationFrame (draw);


function colliding (player, circle) {
  // Calculates the distance between the player and any object.
  // Since the player is a rectange while the objects are circles,
  // it had to be changed.
  var distX = Math.abs(circle.x - player.x - player.width/2);
  var distY = Math.abs(circle.y - player.y - player.height/2);

  if (distX > (player.width/2 + circle.r))   { return false;}
  if (distY > (player.height/2 + circle.r))  { return false;}

  if (distX <= (player.width/2))              {
    console.log("distX: " + distX);
    console.log("circle.x: " + circle.x);
    console.log("player.x: " + player.x);
    console.log("player.width/2: " + player.width/2);
    return true;}
  if (distY <= (player.height/2))             {
    console.log("distY: " + distY);
    console.log("circle.y: " + circle.y);
    console.log("player.y: " + player.y);
    console.log("player.height/2: " + player.height/2);
    return true;}


  return false;
}

// Fluid move functions that allows the player to move
var LEFT = false;
var RIGHT = false;
var UP = false;
var DOWN = false;

function move() {
  if (LEFT)  {
    player.x -= player.speed;
  }
  if (RIGHT)  {
    player.x += player.speed;
  }
  if (UP) {
    player.y -= player.speed;
  }
  if (DOWN) {
    player.y += player.speed;
  }
}

document.onkeydown = function(e)  {
  if (e.keyCode == 37)  LEFT = true;
  if (e.keyCode == 39)  RIGHT = true;
  if (e.keyCode == 38)  UP = true;
  if (e.keyCode == 40)  DOWN = true;
}

document.onkeyup = function(e)  {
  if (e.keyCode == 37)  LEFT = false;
  if (e.keyCode == 39)  RIGHT = false;
  if (e.keyCode == 38)  UP = false;
  if (e.keyCode == 40)  DOWN = false;
}
