let collision = 0;
let gamePaused = false;
let heartOne = document.getElementById('heart1');
let heartTwo = document.getElementById('heart2');
let heartThree = document.getElementById('heart3');
let win = 0;

// Enemies our player must avoid
const Enemy = function(x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.speed = Math.round(Math.random() * 3) + 1;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
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

Enemy.prototype.reset = function() {
  this.speed = Math.round(Math.random() * 3) + 1;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function() {
  this.sprite = 'images/char-cat-girl.png';
  this.x = 202;
  this.y = 375;
  this.hasTouchedStar = false;
}

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

Player.prototype.collidedWith = function(object) {
  return (this.x < object.x + 60 &&
    this.x + 60 > object.x &&
    this.y < 1);
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function youWin() {
  if (win === 5) {
    let winModal = document.getElementById('winModal');
    winModal.style.display = "block";
    gamePaused = true;
  }
};

//Lose the game when being hit by bugs 3 times
function youLose() {
  let loseModal = document.getElementById('loseModal');
  loseModal.style.display = "block";
  gamePaused = true;
}

// Start Game
function startGame() {
  let startModal = document.getElementById('startModal');
  startModal.style.display = "none";
}

//Restart Game
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

Star.prototype.randomX = function() {
  return [-2, 99, 200, 301, 403][Math.floor(Math.random() * 5)];
}

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
const player = new Player(202, 375);

let star = new Star();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  const allowedKeys = {
    32: '(space)',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  if (allowedKeys[e.keyCode] === '(space)') {
    gamePaused = !gamePaused;
  } else {
    player.handleInput(allowedKeys[e.keyCode]);
  }
});
