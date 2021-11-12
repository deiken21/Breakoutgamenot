"use strict";
let paddle = new Paddle(20, 95, 5, 10);
let ball = new Ball(.1, -.1, 50, 70, 2);
paddle.updatePosition(50);
let gameTime = requestAnimationFrame(update);
function update() {
    ball.update();
    paddle.updateScore();
    requestAnimationFrame(update);
}
// let gameTime = setInterval(update, 50)
function gameover() {
    // clearInterval(gameTime)
    cancelAnimationFrame(gameTime);
    document.getElementById("game").style.display = "none";
    document.getElementById("gameOver").style.display = "block";
}
function restart() {
    paddle.clear();
    ball.clear();
    paddle = new Paddle(20, 95, 10, 20);
    ball = new Ball(.1, -.1, 50, 70, 2);
    paddle.updatePosition(50);
    gameTime = requestAnimationFrame(update);
    document.getElementById("game").style.display = "block";
    document.getElementById("gameOver").style.display = "none";
}
