let collision = 0;
let gamePaused = false;
let heartOne = document.getElementById('heart1');
let heartTwo = document.getElementById('heart2');
let heartThree = document.getElementById('heart3');
let win = 0;

// Enemies the player must avoid
const Enemy = function(x, y) {
// Variables applied to each of our instances go here
  this.speed = Math.round(Math.random() * 3) + 1;

  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
};

// Update the enemy's position, required method for game
Enemy.prototype.update = function(dt) {
  if (gamePaused) {
    return;
  }

  this.x = (this.x + this.speed + dt * 10) % 500;
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  // Checks for collision between player and enemies
  if (player.x < this.x + 60 &&
    player.x + 60 > this.x &&
    player.y < this.y + 40 &&
    40 + player.y > this.y) {
    player.x = 202;
    player.y = 375;
    collision++;
    lives();
  }
  // Heart disappears when enemy/player collision happens
  function lives() {
    if (collision === 1) {
      heartOne.style.visibility = "hidden";
    }
    if (collision === 2) {
      heartTwo.style.visibility = "hidden";
    }
    if (collision === 3) {
      heartThree.style.visibility = "hidden";
      youLose();
    }
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Player class
const Player = function() {
  this.sprite = 'images/char-cat-girl.png';
  this.x = 202;
  this.y = 375;
  this.hasTouchedStar = false;
}

//  Update and check whether player has attained a star
Player.prototype.update = function(dt) {
  if (this.y < 1 && !this.hasTouchedStar) {
    if (this.collidedWith(star)) {
      this.hasTouchedStar = true;
      star.collidedWithPlayer = true;
      win++;
      youWin();
      setTimeout(() => {
        this.x = 202;
        this.y = 375;
        this.hasTouchedStar = false;
      }, 100);
    } else {
      this.y += 86;
    }
  }
};

// Player/Star collision and border to not go in water except for star
Player.prototype.collidedWith = function(star) {
  return (this.x < star.x + 60 &&
    this.x + 60 > star.x &&
    this.y < 1);
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Displays Winner Modal by collecting 5 stars
function youWin() {
  if (win === 5) {
    let winModal = document.getElementById('winModal');
    winModal.style.display = "block";
    gamePaused = true;
  }
};

// Displays Loser Modal by colliding with the enemy 3 times
function youLose() {
  let loseModal = document.getElementById('loseModal');
  loseModal.style.display = "block";
  gamePaused = true;
}

// Start Game by hiding Start Modal
function startGame() {
  let startModal = document.getElementById('startModal');
  startModal.style.display = "none";
}

// Restart Game by reloading page
function restartGame() {
  window.location.reload(true);
}

Player.prototype.handleInput = function(key) {
  if (gamePaused) {
    return;
  }

  if (key) {
    if (key == 'left' && this.x > 0) {
      this.x -= 101;
    } else if (key == 'right' && this.x < 375) {
      this.x += 101;
    } else if (key == 'up' && this.y > 0) {
      this.y -= 86;
    } else if (key == 'down' && this.y < 375) {
      this.y += 86;
    }
  }
};

// Stars tha must be collected to win
const Star = function(previousX) {
  this.sprite = 'images/Star.png';
  let newX = this.randomX();

  if (previousX) {
    while (newX == previousX) {
      newX = this.randomX();
    }
  }
  this.x = newX;
  this.y = -50;
  this.collidedWithPlayer = false;
};

// Randomize the star position
Star.prototype.randomX = function() {
  return [-2, 99, 200, 301, 403][Math.floor(Math.random() * 5)];
}

// Randomizes star position after previous collection by player
Star.prototype.update = function() {
  if (this.collidedWithPlayer) {
    star = new Star(this.x);
  }
};

Star.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let enemy1 = new Enemy(-100, 58);
let enemy2 = new Enemy(-100, 142);
let enemy3 = new Enemy(-100, 224);
let allEnemies = [enemy1, enemy2, enemy3];

// Place the player object in a variable called player
let player = new Player(202, 375);

let star = new Star();

// This listens for key presses and sends the keys to your
// Player.handleInput() method or pauses the game.
document.addEventListener('keyup', function(e) {
  const allowedKeys = {
    32: '(space)',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

// Pause/Play game allowed using space bar
  if (allowedKeys[e.keyCode] === '(space)') {
    gamePaused = !gamePaused;
  } else {
    player.handleInput(allowedKeys[e.keyCode]);
  }
});
