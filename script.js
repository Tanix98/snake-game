const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");
const playerScore = document.querySelector("#score-number");
const playerHighscore = document.querySelector("#highscore-number");
const resetScoreBtn = document.querySelector("#reset-score-btn");
/*let score = 0;*/

if (localStorage.getItem("Highscore")) {
    playerHighscore.innerHTML = localStorage.getItem("Highscore");
}

let snake = {
    unit: 25,
    x: 0,
    y: 0,
    directionX: 0,
    directionY: 0,
    color: "green",
    bodyX: [],
    bodyY: []
}

let apple = {
    unit: 25,
    x: 0,
    y: 0,
    color: "red"
}
apple.x = parseInt(Math.random() * 24) * apple.unit,
apple.y = parseInt(Math.random() * 24) * apple.unit

let wall = {
    unit: 25,
    x: 0,
    y: 0,
    color: "grey",
    bodyX: [375,350,320],
    bodyY: [525,525,525]
}
wall.x = parseInt(Math.random() * 24) * wall.unit,
wall.y = parseInt(Math.random() * 24) * wall.unit

document.addEventListener("keydown", move);

function move(e) {
    // Moves snake with arrowkeys
    switch (e.key) {
        case "ArrowLeft":
        case "a":
            if (!snake.directionX) {
                snake.directionX = -1;
                snake.directionY = 0;
            }
            e.preventDefault();
        break;
        case "ArrowUp":
        case "w":
            if (!snake.directionY) {
                snake.directionX = 0;
                snake.directionY = -1;
            }
            e.preventDefault();
        break;
        case "ArrowRight":
        case "d":
            if (!snake.directionX) {
                snake.directionX = 1;
                snake.directionY = 0;
            }
            e.preventDefault();
        break;
        case "ArrowDown":
        case "s":
            if (!snake.directionY) {
                snake.directionX = 0;
                snake.directionY = 1;
            }
            e.preventDefault();
        break;
        default: 
        break;
    }
}

let frameSkips = 10;
let count = 0;

setInterval(gameLoop, 25);

function gameLoop() {
    if (count >= frameSkips) {
        game();
        count = 0;
    } else {
        count++;
    }
}

function game() {
    // Check if snake hits apple
    eat();
    if (snake.y < 0 || snake.y > 575 || snake.x < 0 || snake.x > 575 || snake.x === wall.x && snake.y === wall.y) {
        gameOver();
    }
    else {
        snake.x += snake.directionX * snake.unit;
        snake.y += snake.directionY * snake.unit;
    }
    if (collisionCheck()) {
        gameOver();
    }
    draw();
}

function draw() {
    ctx.clearRect(0, 0, 600, 600);
    // Draw walls
    ctx.fillStyle = wall.color;
    ctx.fillRect(wall.x, wall.y, wall.unit, wall.unit);
    // Draw apple
    ctx.fillStyle = apple.color;
    ctx.fillRect(apple.x, apple.y, apple.unit, apple.unit);
    // Draw snake head
    ctx.fillStyle = snake.color;
    ctx.fillRect(snake.x, snake.y, snake.unit, snake.unit);
    // Draw snake body
    for (let i = 0; i < snake.bodyX.length; i++) {
        ctx.fillRect(snake.bodyX[i], snake.bodyY[i], snake.unit, snake.unit)
    }
}

function eat() {
    // Eat apple
    if (snake.x === apple.x && snake.y === apple.y) {
        /*score++;*/
        playerScore.innerHTML++;
        grow();
        if (frameSkips > 2.5) {
            frameSkips--;
            console.log("speed");
        }
        do {
            apple.y = parseInt(Math.random() * 24) * apple.unit;
            apple.x = parseInt(Math.random() * 24) * apple.unit;
        } while (spawnCheck());
    } else {
        moveBody();
    }
}

function grow() {
    // Grow snake body
    snake.bodyX = [snake.x].concat(snake.bodyX);
    snake.bodyY = [snake.y].concat(snake.bodyY);
    console.log("x: " + snake.bodyX + " " + "y: " + snake.bodyY);
}

function moveBody() {
    // Move snake body
    if (snake.bodyX.length > 1) {
        for (let i = snake.bodyX.length - 1; i > 0; i--) {
            snake.bodyX[i] = snake.bodyX[i-1];
            snake.bodyY[i] = snake.bodyY[i-1];
        }
    }
    if (snake.bodyX.length > 0) {
        snake.bodyX[0] = snake.x;
        snake.bodyY[0] = snake.y;
    }
}

function collisionCheck() {
    // Checks if snake hits itself
    for (let i = 0; i < snake.bodyX.length; i++) {
        if (snake.bodyX[i] === snake.x && snake.bodyY[i] === snake.y) {
            return true;
        }
    }
    return false;
}

function spawnCheck() {
    // Check if the apple spawns in snake body or a wall
    for (let i = 0; i < snake.bodyX.length; i++) {
        if (snake.bodyX[i] === apple.x && snake.bodyY[i] === apple.y || apple.x === wall.x && apple.y === wall.y) {
            return true;
        }
    }
    return false;
}

resetScoreBtn.addEventListener('click', () => {
    if (localStorage.getItem("Highscore")) {
        localStorage.removeItem("Highscore");
        location.reload();
    }
});

function loseCheck() {
    if (collisionCheck()) {
        gameOver();
    }
}

function gameOver() {
    frameSkips = 10
    snake.x = 0;
    snake.y = 0;
    snake.directionX = 0;
    snake.directionY = 0;
    snake.bodyX = parseInt(Math.random() * 24) * snake.unit;
    snake.bodyY = parseInt(Math.random() * 24) * snake.unit;
    apple.x = parseInt(Math.random() * 24) * snake.unit;
    apple.y = parseInt(Math.random() * 24) * snake.unit;
    wall.x = parseInt(Math.random() * 24) * snake.unit;
    wall.y = parseInt(Math.random() * 24) * snake.unit;
    wall.bodyX = [];
    wall.bodyY = [];
    if (Number(playerScore.innerHTML) > Number(playerHighscore.innerHTML)) {
        alert("New High Score! ツ");
    } else {
        alert("Game Over! o︵o");
    }
    if (Number(playerScore.innerHTML) > Number(playerHighscore.innerHTML)) {
        localStorage.setItem("Highscore", playerScore.innerHTML);
    }
    if (localStorage.getItem("Highscore")) {
        playerHighscore.innerHTML = localStorage.getItem("Highscore");
    }
    playerScore.innerHTML = 0;
}
