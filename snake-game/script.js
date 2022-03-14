const CELL_SIZE = 20;
const CANVAS_SIZE = 500;
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
const DIRECTION = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
}

var MOVE_INTERVAL = 200;

//array wall
var wallX = [];
var wallY = [];

//array wall for level
var wall2 = [
    {
        x1: 5,
        x2: 20,
        y: 5,
    }
];
var wall3 = [
    {
        x1: 5,
        x2: 20,
        y: 10,
    }
];
var wall4 = [
    {
        x1: 5,
        x2: 20,
        y: 15,
    }
];
var wall5 = [
    {
        x: 5,
        y1: 5,
        y2: 20,
    },
    {
        x: 19,
        y1: 7,
        y2: 20,
    }
];

function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}

function initHeadAndBody() {
    let head = initPosition();
    let body = [{ x: head.x, y: head.y }];
    return {
        head: head,
        body: body,
    }
}

function initDirection() {
    return Math.floor(Math.random() * 4);
}

function initSnake(color) {
    return {
        color: color,
        ...initHeadAndBody(),
        direction: initDirection(),
        score: 0,
        scoreReset: 0,
        level: 0,
        lifes: 0,
    }
}

var sum = 0;

var life = [
    {
        x: sum,
        y: 0
    },
    {
        x: sum + 20,
        y: 0
    },
    {
        x: sum + 40,
        y: 0
    },
];

let lifes = {
    color: "green",
    position: initPosition(),
    visible: true,
    visibleCount: 0,
}

let snake1 = initSnake("");

let apple = {
    color: "red",
    position: initPosition(),
}

let apple1 = {
    color: "green",
    position: initPosition(),
}

function drawCell(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawScore(snake) {
    let scoreCanvas;
    if (snake.color == snake1.color) {
        scoreCanvas = document.getElementById("score1Board");
    }
    let scoreCtx = scoreCanvas.getContext("2d");

    scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    scoreCtx.font = "30px Arial";
    scoreCtx.fillStyle = snake.color
    scoreCtx.fillText(snake.score, 10, scoreCanvas.scrollHeight / 2);
}

function isPrime(number) {
    let divider = 0;

    for (let i = 1; i <= number; i++) {
        if (number % i == 0) {
            divider++
        }
    }

    return (divider == 2) ? true : false
}

function drawLife(ctx) {
    if(lifes.visible){
        let img = document.getElementById("nyawa");
            ctx.drawImage(
                img,
                lifes.position.x * CELL_SIZE,
                lifes.position.y * CELL_SIZE,
                CELL_SIZE,
                CELL_SIZE
            );
            lifes.visibleCount++;
            if(lifes.visibleCount==10){
                lifes.visible=false;
            }

    }else {
        drawCell(ctx, lifes.position.x, lifes.position.y, "rgb(255,255,255,0)")
        lifes.visibleCount--;
        if (lifes.visibleCount == 0) {
            lifes.visible = true;
        }
    }
}

//function initWall display on level 2
function initWall2() {
    for (let i = 0; i < wall2.length; i++){
        for (let j = wall2[i].x1; j <= wall2[i].x2; j++) {
            wallX.push(j);
            wallY.push(wall2[i].y);
        }
    }
}

//function initWall display on level 3
function initWall3() {
    for (let i = 0; i < wall3.length; i++){
        for (let j = wall3[i].x1; j <= wall3[i].x2; j++) {
            wallX.push(j);
            wallY.push(wall3[i].y);
        }
    }
}

//function initWall display on level 4
function initWall4() {
    for (let i = 0; i < wall4.length; i++){
        for (let j = wall4[i].x1; j <= wall4[i].x2; j++) {
            wallX.push(j);
            wallY.push(wall4[i].y);
        }
    }
}

//function initWall display on level 5
function initWall5() {
    for (let i = 0; i < wall5.length; i++){
        for (let j = wall5[i].y1; j <= wall5[i].y2; j++) {
            wallY.push(j);
            wallX.push(wall5[i].x);
        }
    }
}

//draw the Wall
function createWall() {
    let wallCanvas = document.getElementById("snakeBoard");
    let ctx = wallCanvas.getContext("2d");
    imgTrap = new Image();
    var i = 0;
    while(i < wallX.length){
        imgTrap.src = 'assets/bush2.png';
        ctx.drawImage(imgTrap, wallX[i] * CELL_SIZE, wallY[i] * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        i++;
    }
}

function drawSnake(ctx, snake) {
    ctx.fillStyle = "yellow";
    let img = document.getElementById("head");
    let img1 = document.getElementById("body");
    
    // draw head
    drawCell(ctx, snake.head.x, snake.head.y);
    ctx.drawImage(img, snake.head.x * CELL_SIZE, snake.head.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

    // draw body
    for (let i = 1; i < snake.body.length; i++) {
        drawCell(ctx, snake.body[i].x, snake.body[i].y );
        ctx.drawImage(img1, snake.body[i].x * CELL_SIZE, snake.body[i].y*CELL_SIZE,CELL_SIZE, CELL_SIZE );
    }
}

function draw() {
    setInterval(function () {
        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d");

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        drawSnake(ctx, snake1)

        let img = document.getElementById("apple");
        ctx.drawImage(
            img,
            apple.position.x * CELL_SIZE,
            apple.position.y * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE
        );
        ctx.drawImage(
            img,
            apple1.position.x * CELL_SIZE,
            apple1.position.y * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE
        );

        if (isPrime(snake1.score)) {
            drawLife(ctx);
        }

        createWall();

        document.getElementById("level").innerHTML = "Level: " + snake1.level;

        document.getElementById("score").innerHTML = "Score";

        drawScore(snake1);

        document.getElementById("speed").innerHTML = "Speed " + MOVE_INTERVAL + " ms";

        for(var i = 0; i <= life.length; i++){
            let img1 = document.getElementById("nyawa");
            ctx.drawImage(
                img1,
                life[i].x,
                life[i].y,
                CELL_SIZE,
                CELL_SIZE
            );   
        }

    }, REDRAW_INTERVAL);
}

function teleport(snake) {
    if (snake.head.x < 0) {
        snake.head.x = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.x >= WIDTH) {
        snake.head.x = 0;
    }
    if (snake.head.y < 0) {
        snake.head.y = CANVAS_SIZE / CELL_SIZE - 1;
    }
    if (snake.head.y >= HEIGHT) {
        snake.head.y = 0;
    }
}

function eat(snake, apple, apple1) {
    if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
        apple.position = initPosition();
        snake.score++;
        snake.scoreReset++;
        snake.body.push({ x: snake.head.x, y: snake.head.y });
    }
    if (snake.head.x == apple1.position.x && snake.head.y == apple1.position.y) {
        apple1.position = initPosition();
        snake.score++;
        snake.scoreReset++;
        snake.body.push({ x: snake.head.x, y: snake.head.y });
    }
    if (snake.head.x == lifes.position.x && snake.head.y == lifes.position.y && isPrime(snake.score)) {
        lifes.position = initPosition();
        snake.lifes++;
        for(var j = 0; j < snake.lifes; j++){
            if(snake.lifes === 1){
                life.push({x: sum + 60, y: 0});
                sum += 20;
            }
        } 
        snake.lifes = 0;
    }

    //snake level
    while (snake.scoreReset === 5) {
        if (snake.level <= 4) {
            if (snake.level == 0) {
                initWall2();
            } else if (snake.level == 1) {
                initWall3();
            } else if (snake.level == 2) {
                initWall4();
            } else if (snake.level == 3) {
                wallX = [];
                wallY = [];
                initWall5();
            }
            snake.level++;
            MOVE_INTERVAL -= 20;
            alert("Level Up" + snake.level);
            var msk = document.getElementById("levelUp");
            msk.play();
        }
        snake.scoreReset = 0;
    }
}

function moveLeft(snake) {
    snake.head.x--;
    teleport(snake);
    eat(snake, apple, apple1);
}

function moveRight(snake) {
    snake.head.x++;
    teleport(snake);
    eat(snake, apple, apple1);
}

function moveDown(snake) {
    snake.head.y++;
    teleport(snake);
    eat(snake, apple, apple1);
}

function moveUp(snake) {
    snake.head.y--;
    teleport(snake);
    eat(snake, apple, apple1);
}

function checkCollision(snakes) {
    let isCollide = false;
    for (let i = 0; i < snakes.length; i++) {
        for (let j = 0; j < snakes.length; j++) {
            for (let k = 1; k < snakes[j].body.length; k++) {
                if (snakes[i].head.x == snakes[j].body[k].x && snakes[i].head.y == snakes[j].body[k].y) {
                    isCollide = true;
                    life.length--;
                    //life.pop();
                    sum -= 20;
                }
            }
        }
    }

    //check collision wall and snake
    for (let i = 0; i < wallX.length; i++) {
        if (snake1.head.x === wallX[i] && (snake1.direction == 2 || snake1.direction == 3)) {
            if (snake1.head.y === wallY[i] || snake1.head.y === wallY[i]) {
                life.length--;
                sum -= 20;
                if(life.length == 0){
                    isCollide = true;
                }
            }
        }
        if (snake1.head.y === wallY[i] && (snake1.direction == 0 || snake1.direction == 1)) {
            if (snake1.head.x === wallX[i] || snake1.head.x === wallX[i]) {
                life.length--;
                sum -= 20;
                if(life.length == 0){
                    isCollide = true;
                }
            }
        }
    } 

    //code for check apple and health so it doesn't appear in the obstacle
    for (let i = 0; i < wallX.length; i++) {
        if (apple.position.x === wallX[i]) {
            if (apple.position.y === wallY[i] || apple.position.y === wallY[i]) {
                apple.position = initPosition();
            }
        }
        if (apple1.position.y === wallY[i]) {
            if (apple1.position.x === wallX[i] || apple1.position.x === wallX[i]) {
                apple1.position = initPosition();
            }
        }
        if (lifes.position.y === wallY[i]) {
            if (lifes.position.x === wallX[i] || lifes.position.x === wallX[i]) {
                lifes.position = initPosition();
            }
        }
    }

    if (isCollide) {
        if(life.length === 0){
            let msk1 = document.getElementById("gameOver");
            msk1.play();
            setTimeout(() => {
                alert("Game Over")
                location.reload()
              }, 150)
            MOVE_INTERVAL = 150;
            snake1 = initSnake("purple");
        }
    }
    return isCollide;
}

function move(snake) {
    switch (snake.direction) {
        case DIRECTION.LEFT:
            moveLeft(snake);
            break;
        case DIRECTION.RIGHT:
            moveRight(snake);
            break;
        case DIRECTION.DOWN:
            moveDown(snake);
            break;
        case DIRECTION.UP:
            moveUp(snake);
            break;
    }
    moveBody(snake);
    if (!checkCollision([snake1])) {
        setTimeout(function () {
            move(snake);
        }, MOVE_INTERVAL);
    } else {
        initGame();
    }
}

function moveBody(snake) {
    snake.body.unshift({ x: snake.head.x, y: snake.head.y });
    snake.body.pop();
}

function turn(snake, direction) {
    const oppositeDirections = {
        [DIRECTION.LEFT]: DIRECTION.RIGHT,
        [DIRECTION.RIGHT]: DIRECTION.LEFT,
        [DIRECTION.DOWN]: DIRECTION.UP,
        [DIRECTION.UP]: DIRECTION.DOWN,
    }

    if (direction !== oppositeDirections[snake.direction]) {
        snake.direction = direction;
    }
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        turn(snake1, DIRECTION.LEFT);
    } else if (event.key === "ArrowRight") {
        turn(snake1, DIRECTION.RIGHT);
    } else if (event.key === "ArrowUp") {
        turn(snake1, DIRECTION.UP);
    } else if (event.key === "ArrowDown") {
        turn(snake1, DIRECTION.DOWN);
    }
})

function initGame() {
    move(snake1);
}

initGame();