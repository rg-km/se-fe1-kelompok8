const CELL_SIZE = 20;
const CANVAS_SIZE = 600;
//made faster
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
//this
const DIRECTION = {
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
}
const MOVE_INTERVAL = 200;

function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}

function initHeadAndBody() {
    let head = initPosition();
    let body = [{
        x: head.x,
        y: head.y,
    }];

    return {
        head: head,
        body: body,
    }
}

function initDirection() {
    return Math.floor(Math.random() * 4);
}

let snake1 = {
    color: "yellow",
    ...initHeadAndBody(),
    direction: initDirection(),
    boardId: "score1Board",
    score: 0,
    life: 3,
}

let apple1 = {
    position: initPosition(),
}

let apple2 = {
    position: initPosition(),
}


function drawCell(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawApple(ctx, apple) {
    base_image = new Image();
    base_image.src = 'assets/apple.png';
    ctx.drawImage(base_image, apple.position.x * CELL_SIZE, apple.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawLife(ctx, life) {
    ctx.fillStyle = life.color;

    ctx.fillRect(life.position.x * CELL_SIZE, life.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawSnake(ctx, snake) {
    ctx.fillStyle = snake.color;
    base_image = new Image();
    base_image.src = 'assets/snake_head.png';

    // draw head
    drawCell(ctx, snake.head.x, snake.head.y, snake.color);
    ctx.drawImage(base_image, snake.head.x * CELL_SIZE, snake.head.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

    // draw body
    for (let i = 1; i < snake.body.length; i++) {
        drawCell(ctx, snake.body[i].x, snake.body[i].y, snake.color);
    }
}

function drawScore(snake) {
    let scoreCanvas = document.getElementById(snake.boardId);

    let scoreCtx = scoreCanvas.getContext("2d");

    scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    scoreCtx.font = "30px Arial";
    scoreCtx.fillStyle = snake.color
    scoreCtx.fillText(snake.score, 10, scoreCanvas.scrollHeight / 2);
}

function draw() {
    setInterval(function () {
        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d");

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        var headImg = document.getElementById("head");
        ctx.drawImage(headImg, snake1.head.x * CELL_SIZE, snake1.head.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        
        for (let i = 1; i < snake1.body.length; i++) {
            //membuat body ular
        var bodyImg = document.getElementById("body");
        ctx.drawImage(bodyImg, snake1.body[i].x * CELL_SIZE, snake1.body[i].y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

        }

        drawSnake(ctx, snake1)
        drawApple(ctx, apple1)
        drawApple(ctx, apple2)

        drawScore(snake1);
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

function eat(snake, apple1, apple2) {
    if (snake.head.x == apple1.position.x && snake.head.y == apple1.position.y) {
        apple1.position = initPosition();
        snake.score++;
        snake.body.push({
            x: snake.head.x,
            y: snake.head.y,
        });
    }
    else if (snake.head.x == apple2.position.x && snake.head.y == apple2.position.y) {
        apple2.position = initPosition();
        snake.score++;
        snake.body.push({x: snake.head.x, y: snake.head.y});
    }

}

function moveLeft(snake) {
    snake.head.x--;
    teleport(snake);
    eat(snake, apple1, apple2);
}

function moveRight(snake) {
    snake.head.x++;
    teleport(snake);
    eat(snake, apple1, apple2);
}

function moveDown(snake) {
    snake.head.y++;
    teleport(snake);
    eat(snake, apple1, apple2);
}

function moveUp(snake) {
    snake.head.y--;
    teleport(snake);
    eat(snake, apple1, apple2);
}

function moveBody(snake) {
    snake.body.unshift({ x: snake.head.x, y: snake.head.y });
    snake.body.pop();
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
    teleport(snake);
    eat(snake, apple1,apple2);
    moveBody(snake);

    if (!checkCollision([snake1])) {
        setTimeout(function() {
            move(snake);
        }, MOVE_INTERVAL);
    } else {
        initGame();
    }
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


function checkCollision(snakes) {
    let isCollide = false;
    //this
    for (let i = 0; i < snakes.length; i++) {
        for (let j = 0; j < snakes.length; j++) {
            for (let k = 1; k < snakes[j].body.length; k++) {
                if (snakes[i].head.x == snakes[j].body[k].x && snakes[i].head.y == snakes[j].body[k].y) {
                    isCollide = true;
                }
            }
        }
    }
    if (isCollide) {
        let msk = document.getElementById("gameOver");
        msk.play();
        alert("Game over");
        snake1 = initSnake("purple");
    }
    return isCollide;
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

function initGame(){
    move(snake1);
}

initGame();