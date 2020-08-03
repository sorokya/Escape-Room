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

let textures = {};

function loadAssets() {
    createImage('img/room_north.png', (img) => {
        textures.room_north = img;
    });
    createImage('img/room_east.png', (img) => {
        textures.room_east = img;
    });
    createImage('img/room_south.png', (img) => {
        textures.room_south = img;
    });
    createImage('img/room_west.png', (img) => {
        textures.room_west = img;
    });
    createImage('img/inside_drawer.png', (img) => {
        textures.inside_drawer = img;
    });
}

function createImage(src, callback) {
    let img = document.createElement('img');
    img.src = src;
    img.onload = function() {
        callback(img);
    }
}

let click = {
    x: 0,
    y: 0,
    time: -1
};

canvas.onclick = function(e) {
    click.x = e.clientX - canvas.offsetLeft;
    click.y = e.clientY - canvas.offsetTop;
    click.time = Date.now();
}

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

    ctx.drawImage(textures.room_north, 0, 0);

    ctx.restore();
}

loadAssets();
gameLoop();