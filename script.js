const CELL_SIZE=20,CANVAS_SIZE=500,REDRAW_INTERVAL=50,WIDTH=25,HEIGHT=25,DIRECTION={LEFT:0,RIGHT:1,UP:2,DOWN:3};var MOVE_INTERVAL=200;function initPosition(){return{x:Math.floor(25*Math.random()),y:Math.floor(25*Math.random())}}function initHeadAndBody(){let e=initPosition();return{head:e,body:[{x:e.x,y:e.y}]}}function initDirection(){return Math.floor(4*Math.random())}function initSnake(e){return{color:e,...initHeadAndBody(),direction:initDirection(),score:0,scoreReset:0,level:0,lifes:0}}var sum=0,life=[{x:sum,y:0},{x:sum+20,y:0},{x:sum+40,y:0}];let lifes={color:"green",position:initPosition(),visible:!0,visibleCount:0},snake1=initSnake(""),apple={color:"red",position:initPosition()},apple1={color:"green",position:initPosition()};function drawCell(e,o,t,i){e.fillStyle=i,e.fillRect(20*o,20*t,20,20)}function drawScore(e){let o;e.color==snake1.color&&(o=document.getElementById("score1Board"));let t=o.getContext("2d");t.clearRect(0,0,500,500),t.font="30px Arial",t.fillStyle=e.color,t.fillText(e.score,10,o.scrollHeight/2)}function isPrime(e){let o=0;for(let t=1;t<=e;t++)e%t==0&&o++;return 2==o}function drawLife(e){if(lifes.visible){let o=document.getElementById("nyawa");e.drawImage(o,20*lifes.position.x,20*lifes.position.y,20,20),lifes.visibleCount++,10==lifes.visibleCount&&(lifes.visible=!1)}else drawCell(e,lifes.position.x,lifes.position.y,"rgb(255,255,255,0)"),lifes.visibleCount--,0==lifes.visibleCount&&(lifes.visible=!0)}function drawSnake(e,o){e.fillStyle="yellow";let t=document.getElementById("head"),i=document.getElementById("body");drawCell(e,o.head.x,o.head.y),e.drawImage(t,20*o.head.x,20*o.head.y,20,20);for(let t=1;t<o.body.length;t++)drawCell(e,o.body[t].x,o.body[t].y),e.drawImage(i,20*o.body[t].x,20*o.body[t].y,20,20)}function draw(){setInterval((function(){let e=document.getElementById("snakeBoard").getContext("2d");e.clearRect(0,0,500,500),drawSnake(e,snake1);let o=document.getElementById("apple");e.drawImage(o,20*apple.position.x,20*apple.position.y,20,20),e.drawImage(o,20*apple1.position.x,20*apple1.position.y,20,20),isPrime(snake1.score)&&drawLife(e),document.getElementById("level").innerHTML="Level: "+snake1.level,document.getElementById("score").innerHTML="Score",drawScore(snake1),document.getElementById("speed").innerHTML="Speed "+MOVE_INTERVAL+" ms";for(var t=0;t<=life.length;t++){let o=document.getElementById("nyawa");e.drawImage(o,life[t].x,life[t].y,20,20)}}),50)}function teleport(e){e.head.x<0&&(e.head.x=24),e.head.x>=25&&(e.head.x=0),e.head.y<0&&(e.head.y=24),e.head.y>=25&&(e.head.y=0)}function eat(e,o,t){if(e.head.x==o.position.x&&e.head.y==o.position.y&&(o.position=initPosition(),e.score++,e.scoreReset++,e.body.push({x:e.head.x,y:e.head.y})),e.head.x==t.position.x&&e.head.y==t.position.y&&(t.position=initPosition(),e.score++,e.scoreReset++,e.body.push({x:e.head.x,y:e.head.y})),e.head.x==lifes.position.x&&e.head.y==lifes.position.y&&isPrime(e.score)){lifes.position=initPosition(),e.lifes++;for(var i=0;i<e.lifes;i++)1===e.lifes&&(life.push({x:sum+60,y:0}),sum+=20);e.lifes=0}for(;5===e.scoreReset;){if(e.level<=4){e.level++,MOVE_INTERVAL-=20,alert("Level Up"+e.level),document.getElementById("levelUp").play()}e.scoreReset=0}}function moveLeft(e){e.head.x--,teleport(e),eat(e,apple,apple1)}function moveRight(e){e.head.x++,teleport(e),eat(e,apple,apple1)}function moveDown(e){e.head.y++,teleport(e),eat(e,apple,apple1)}function moveUp(e){e.head.y--,teleport(e),eat(e,apple,apple1)}function checkCollision(e){let o=!1;for(let t=0;t<e.length;t++)for(let i=0;i<e.length;i++)for(let n=1;n<e[i].body.length;n++)e[t].head.x==e[i].body[n].x&&e[t].head.y==e[i].body[n].y&&(o=!0,life.length--,sum-=20);if(o&&0===life.length){document.getElementById("gameOver").play(),setTimeout((()=>{alert("Game Over"),location.reload()}),150),MOVE_INTERVAL=150,snake1=initSnake("purple")}return o}function move(e){switch(e.direction){case DIRECTION.LEFT:moveLeft(e);break;case DIRECTION.RIGHT:moveRight(e);break;case DIRECTION.DOWN:moveDown(e);break;case DIRECTION.UP:moveUp(e)}moveBody(e),checkCollision([snake1])?initGame():setTimeout((function(){move(e)}),MOVE_INTERVAL)}function moveBody(e){e.body.unshift({x:e.head.x,y:e.head.y}),e.body.pop()}function turn(e,o){o!=={[DIRECTION.LEFT]:DIRECTION.RIGHT,[DIRECTION.RIGHT]:DIRECTION.LEFT,[DIRECTION.DOWN]:DIRECTION.UP,[DIRECTION.UP]:DIRECTION.DOWN}[e.direction]&&(e.direction=o)}function initGame(){move(snake1)}document.addEventListener("keydown",(function(e){"ArrowLeft"===e.key?turn(snake1,DIRECTION.LEFT):"ArrowRight"===e.key?turn(snake1,DIRECTION.RIGHT):"ArrowUp"===e.key?turn(snake1,DIRECTION.UP):"ArrowDown"===e.key&&turn(snake1,DIRECTION.DOWN)})),initGame();
