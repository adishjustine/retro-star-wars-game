const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const playerImage = new Image();
const enemyImage = new Image();
playerImage.src = 'assets/images/player.png';
enemyImage.src = 'assets/images/enemy.png';

const player = { x: 400, y: 500, width: 50, height: 50 };
let enemies = [];

// Background music
const backgroundMusic = document.getElementById('backgroundMusic');

// Start the music only after a user interaction to avoid autoplay restrictions
document.body.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
    }
});

// Create an enemy every second
function createEnemy() {
    const enemyWidth = 30 + Math.random() * 20; // Random width between 30 and 50
    const enemyHeight = 30 + Math.random() * 20; // Random height between 30 and 50
    enemies.push({
        x: Math.random() * (canvas.width - enemyWidth),
        y: 0,
        width: enemyWidth,
        height: enemyHeight
    });
}
setInterval(createEnemy, 1000);

// Game Loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Update game state
function update() {
    enemies.forEach((enemy) => {
        enemy.y += 3; // Move enemies down
    });
}

// Draw game elements
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the player image
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
    
    // Draw enemy images
    enemies.forEach((enemy) => {
        ctx.drawImage(enemyImage, enemy.x, enemy.y, enemy.width, enemy.height);
    });
}

// Player Movement
document.addEventListener('keydown', (e) => {
    const speed = 5;
    if (e.code === 'ArrowLeft' && player.x > 0) { // Prevent moving off the left side
        player.x -= speed;
    }
    if (e.code === 'ArrowRight' && player.x + player.width < canvas.width) { // Prevent moving off the right side
        player.x += speed;
    }
});

// Start the game loop
gameLoop();
