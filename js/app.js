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
  };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
  this.speed = Math.round(Math.random() * 3) + 1;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function() {
  this.sprite = 'images/char-cat-girl.png';
  this.x = 202;
  this.y = 375;
}

Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
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

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let enemy1 = new Enemy(-100, 58);
let enemy2 = new Enemy(-100, 142);
let enemy3 = new Enemy(-100, 224);
let allEnemies = [enemy1, enemy2, enemy3];

let player = new Player(202, 375);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
