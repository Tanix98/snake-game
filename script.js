const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");
const playerScore = document.querySelector("#score-number");
const playerHighscore = document.querySelector("#highscore-number");

let snake = {
    unit: 25,
    y: 0,
    x: 0,
    directionX: 0,
    directionY: 0,
    color: "white",
    bodyX: [],
    bodyY: []
}

let apple = {
    unit: 25,
    y: 0,
    x: 0
}
apple.y = parseInt(Math.random() * 12) * apple.unit,
apple.x = parseInt(Math.random() * 12) * apple.unit

ctx.fillRect(snake.x, snake.y, snake.unit, snake.unit);

document.addEventListener("keydown", move);

function move(e) {
    switch (e.key) {
        case "ArrowLeft":
            snake.directionX = -1;
            snake.directionY = 0;
            break;
        case "ArrowUp":
            snake.directionX = 0;
            snake.directionY = -1;
            e.preventDefault();
            break;
        case "ArrowRight":
            snake.directionX = 1;
            snake.directionY = 0;
            break;
        case "ArrowDown":
            snake.directionX = 0;
            snake.directionY = 1;
            e.preventDefault();
            break;
        default: 
            break;
    }
}

setInterval(draw, 150);

function draw() {
    if (snake.y < 0 || snake.y > 575 || snake.x < 0 || snake.x > 575) {
        alert("Game over x_x");
        snake.x = 0;
        snake.y = 0;
        snake.directionX = 0;
        snake.directionY = 0;
        apple.y = parseInt(Math.random() * 12) * snake.unit;
        apple.x = parseInt(Math.random() * 12) * snake.unit;
        snake.bodyX = [];
        snake.bodyY = [];
        if (playerScore.innerHTML > playerHighscore.innerHTML) {
            localStorage.setItem("highscore", playerScore.innerHTML);
        }
        playerHighscore.innerHTML = localStorage.getItem("Highscore");
        console.log(localStorage.getItem("Highscore"));
        playerScore.innerHTML = 0;
    } else {
        snake.x += snake.directionX * snake.unit;
        snake.y += snake.directionY * snake.unit;
    }
    ctx.clearRect(0, 0, 600, 600);
    // Check if snake hits apple
    eat();
    // Snake head
    ctx.fillStyle = "green";
    ctx.fillRect(snake.x, snake.y, snake.unit, snake.unit);
    // Draw snake body
    for (let i = 0; i < snake.bodyX.length; i++) {
        ctx.fillRect(snake.bodyX[i], snake.bodyY[i], snake.unit, snake.unit)
    }
    // Apple
    ctx.fillStyle = "red";
    ctx.fillRect(apple.x, apple.y, apple.unit, apple.unit);
}

function eat() {
    if (snake.x === apple.x && snake.y === apple.y) {
        apple.y = parseInt(Math.random() * 12) * apple.unit;
        apple.x = parseInt(Math.random() * 12) * apple.unit;
        playerScore.innerHTML++;
        grow();
    } else {
        moveBody();
    }
}

function grow() {
    snake.bodyX = [snake.x].concat(snake.bodyX);
    snake.bodyY = [snake.y].concat(snake.bodyY);
    console.log("x: " + snake.bodyX);
    console.log("y: " + snake.bodyY);
    console.log(" ");
}

function moveBody() {
    for (let i = snake.bodyX.length; i > snake.bodyX.length; i--) {
        snake.bodyX[i] = snake.bodyX[i-1];
        snake.bodyY[i] = snake.bodyY[i-1];
    }
    if (snake.bodyX > 0) {
        snake.bodyX[0] = snake.x;
        snake.bodyY[0] = snake.y;
    }
}




/*const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

let posY = 0;
let posX = 0;
ctx.fillRect(posX, posY, 50, 50);

document.addEventListener("keydown", move);

function move(e) {
    switch (e.key) {
        case "ArrowLeft":
            posX -= 50;
            draw();
            break;
        case "ArrowUp":
            posY -= 50;
            draw();
            break;
        case "ArrowRight":
            posX += 50;
            draw();
            break;
        case "ArrowDown":
            posY += 50;
            draw();
            break;
        default: 
            break;
    }
}

function draw() {
    if (posY < 0 || posY > 550 || posX < 0 || posY > 550) {
        alert("Out of bounds");
        posX = 0;
        posY = 0;
    }
    ctx.clearRect(0, 0, 600, 600);
    ctx.fillRect(posX, posY, 50, 50);
}*/

