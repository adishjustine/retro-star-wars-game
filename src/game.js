const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const player = { x: 400, y: 500, width: 50, height: 50 };
let enemies = [];

// Background music
const backgroundMusic = document.getElementById('backgroundMusic');
backgroundMusic.play();

// Create an enemy every second
function createEnemy() {
    enemies.push({ x: Math.random() * 750, y: 0, width: 50, height: 50 });
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
    ctx.fillStyle = 'white';
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    enemies.forEach((enemy) => {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
}

// Player Movement
document.addEventListener('keydown', (e) => {
    const speed = 5;
    if (e.code === 'ArrowLeft') {
        player.x -= speed;
    }
    if (e.code === 'ArrowRight') {
        player.x += speed;
    }
});

// Start the game loop
gameLoop();
