const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");
const playerScore = document.querySelector("#player-score");
const playerHighscore = document.querySelector("#player-highscore");

// Snake
let unit = 25;
let posY = 0;
let posX = 0;
let directionX = 0;
let directionY = 0;
let bodyX = [];
let bodyY = [];

// Apple
let appleUnit = 25;
let posYapple = parseInt(Math.random() * 12) * unit;
let posXapple = parseInt(Math.random() * 12) * unit;

/*let snake = (
    posY = 0,
    posX = 0,
    directionX = 0,
    directionY = 0,
    color = "white"
    bodyX [

    ],
    bodyY [

    ]
)*/

ctx.fillRect(posX, posY, unit, unit);

document.addEventListener("keydown", move);

function move(e) {
    switch (e.key) {
        case "ArrowLeft":
            directionX = -1;
            directionY = 0;
            break;
        case "ArrowUp":
            directionX = 0;
            directionY = -1;
            e.preventDefault();
            break;
        case "ArrowRight":
            directionX = 1;
            directionY = 0;
            break;
        case "ArrowDown":
            directionX = 0;
            directionY = 1;
            e.preventDefault();
            break;
        default: 
            break;
    }
}

setInterval(draw, 150);

function draw() {
    if (posY < 0 || posY > 575 || posX < 0 || posX > 575) {
        alert("Game over x_x");
        posX = 0;
        posY = 0;
        directionX = 0;
        directionY = 0;
        posYapple = parseInt(Math.random() * 12) * unit;
        posXapple = parseInt(Math.random() * 12) * unit;
        bodyX = [];
        bodyY = [];
        playerScore.innerHTML = 0;
    } else {
        posX += directionX * unit;
        posY += directionY * unit;
    }
    ctx.clearRect(0, 0, 600, 600);
    // Check if snake hits apple
    eat();
    // Snake
    ctx.fillStyle = "green";
    ctx.fillRect(posX, posY, unit, unit);
    // Draw body
    for (let i = 0; i < bodyX.length; i++) {
        ctx.fillRect(bodyX[i], bodyY[i], unit, unit)
    }
    // Apple
    ctx.fillStyle = "red";
    ctx.fillRect(posXapple, posYapple, appleUnit, appleUnit);
}

function eat() {
    if (posX === posXapple && posY === posYapple) {
        posYapple = parseInt(Math.random() * 12) * unit;
        posXapple = parseInt(Math.random() * 12) * unit;
        playerScore.innerHTML++;
        grow();
    } else {
        moveBody();
    }
}

function grow() {
    bodyX = [posX].concat(bodyX);
    bodyY = [posY].concat(bodyY);
    console.log(bodyX);
}

function moveBody() {
    for (let i = bodyX.length; i > bodyX.length; i--) {
        bodyX[i] = snake.bodyX[i-1];
        bodyY[i] = snake.bodyY[i-1];
    }
    if (bodyX > 0) {
        bodyX[0] = posX;
        bodyY[0] = posY;
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

