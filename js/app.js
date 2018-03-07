// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x; 
    this.y = y; 
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //Start enemies at left side after reaching far right 
    if (this.x >= 505) {
        this.x = 0;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x; 
    this.y = y; 
    this.speed = speed;

    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function() {
    // If the player makes it to the water, reset their position
    if (this.y < 0) {
        this.y = 300;        
        score += 1;
        gameLevel += 1;
        allEnemies.push(new Enemy(0, Math.random() * 184 + 50, Math.random() * 250));  // Add an extra enemy
    }
    allEnemies.forEach((enemy)=> {
        this.checkCollision(enemy)
    });
};

// Function to display player's score
var displayScoreLevel = function(Score, Level) {
    var canvas = document.getElementsByTagName('canvas');
    var firstCanvasTag = canvas[0];

    // add player score and level to div element created
    scoreLevelDiv.innerHTML = 'Score: ' + Score
        + ' / ' + 'Level: ' + Level;
    document.body.insertBefore(scoreLevelDiv, firstCanvasTag[0]);
};



Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    displayScoreLevel(score, gameLevel);
};

Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        player.x -= player.speed;
    }
    if (keyPress == 'up') {
        player.y -= player.speed - 20;
    }
    if (keyPress == 'right') {
        player.x += player.speed;
    }
    if (keyPress == 'down') {
        player.y += player.speed - 20;
    }
    // console.log('keyPress is: ' + keyPress);
    console.log('player position is: ' + 'x =' + this.x + ' y =' + this.y)
};

Player.prototype.checkCollision = function(anEnemy) {

    if (
        player.y + 131 >= anEnemy.y + 90
        && player.x + 25 <= anEnemy.x + 88
        && player.y + 73 <= anEnemy.y + 135
        && player.x + 76 >= anEnemy.x + 11) {
        openModal();
        player.x = 202.5;
        player.y = 383;
        score = 0;
        gameLevel = 1;
    }

if (player.y > 420) {
    player.y = 420;
}
if (player.x > 400) {
    player.x = 400;
}
if (player.x < 2.5) {
    player.x = 2.5;
}  

};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(250, 300, 50);
var score = 0;
var gameLevel = 1;
var scoreLevelDiv = document.createElement('div');
// var enemy = new Enemy(0, Math.random() * )
var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 250);
allEnemies.push(enemy);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Get modal element 
var modal = document.getElementById('simpleModal'); 

//Get close button
var closeBtn = document.getElementsByClassName('closeBtn')[0];



//Listen for close modal cross 
closeBtn.addEventListener('click', closeModal); 
//Listen for outside click
window.addEventListener('click', clickOutside);

//Function to open modal 
function openModal(){
    modal.style.display = 'block'; 
} 

//Function to close modal 
function closeModal(){
    modal.style.display = 'none'; 
} 

//Function to clickOutside modal and close modal
function clickOutside(e){
    if(e.target == modal){
        modal.style.display = 'none'; 
    }

} 
