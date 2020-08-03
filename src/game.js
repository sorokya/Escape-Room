import Config from './config';

const container = document.getElementById('escape');
const canvas = document.createElement('canvas');
canvas.width = Config.GAME_WIDTH;
canvas.height = Config.GAME_HEIGHT;

container.appendChild(canvas);
const ctx = canvas.getContext('2d');

const fps = Config.GAME_FPS;
let start = Date.now();
let frameDuration = 1000 / fps;
let lag = 0;

function gameLoop() {
    window.requestAnimationFrame(gameLoop);

    let current = Date.now();
    let elapsed = current - start;
    start = current;

    lag += elapsed;

    while (lag >= frameDuration) {
        update();
        lag -= frameDuration;
    }

    let lagOffset = lag / frameDuration;
    render(lagOffset);
}

function update() {
}

function render(lagOffset) {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.restore();
}

gameLoop();