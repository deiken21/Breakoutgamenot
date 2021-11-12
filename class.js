"use strict";
class Paddle {
    constructor(x, y, w, h) {
        this.x = x;
        this.score = 0;
        this.element = document.createElement("img");
        this.element.classList.add("paddle");
        this.element.setAttribute("src", "0.png");
        this.scoreElement = document.createElement("h1");
        this.scoreElement.textContent = this.score.toString();
        this.scoreElement.classList.add("score");
        this.width = w;
        this.height = h;
        this.y = y;
        this.element.style.top = this.y + "%";
        this.element.style.width = this.width + "%";
        this.element.style.height = this.height + "%";
        document.getElementById("game").appendChild(this.element);
        document.addEventListener("mousemove", e => this.move(e));
        document.getElementById("game").appendChild(this.scoreElement);
    }
    // setPosition(x:number){
    //     this.x=x
    //     this.updatePosition()
    // }
    updatePosition(x) {
        this.x = x;
        this.element.style.left = this.x + "%";
    }
    move(e) {
        this.x = e.clientX;
        if (this.x < 0)
            this.x = 0;
        if (this.x > innerWidth - (window.innerWidth * this.width / 100))
            this.x = innerWidth - (window.innerWidth * this.width / 100);
        this.updatePosition(this.x / window.innerWidth * 100);
    }
    updateScore() {
        this.score++;
        this.scoreElement.textContent = this.score.toString();
    }
    clear() {
        document.removeEventListener('mousemove', e => this.move(e));
        document.getElementById("game").removeChild(this.element);
        document.getElementById("game").removeChild(this.scoreElement);
    }
}
class Ball {
    constructor(xVelocity, yVelocity, xPosition, yPosition, size) {
        this.xVel = xVelocity;
        this.yVel = yVelocity;
        this.xPos = xPosition;
        this.yPos = yPosition;
        this.size = size;
        this.element = document.createElement("img");
        this.element.classList.add("ball");
        this.element.setAttribute("src", "1.png");
        this.element.style.height = size * 2 + "%";
        this.element.style.width = size + "%";
        document.getElementById("game").appendChild(this.element);
        this.element.style.left = this.xPos + "%";
        this.element.style.top = this.yPos + "%";
    }
    update() {
        this.xPos += this.xVel;
        this.yPos += this.yVel;
        if (this.xPos < 0 || this.xPos > 100 - this.size) {
            this.xVel = -this.xVel;
            this.xVel += this.xVel * .1;
        }
        //check the ball against the top of wall
        if (this.yPos < 0) {
            this.yVel = -this.yVel;
            this.yVel += this.yVel * .05;
        }
        // check the ball against paddle
        if (this.yPos > paddle.y) {
            if (this.xPos > paddle.x && this.xPos < paddle.x + paddle.width) {
                this.yVel = -this.yVel;
                this.yVel += this.yVel * .05;
            }
        }
        if (this.yPos > 100 - this.size) {
            // alert("Game Over!")
            gameover();
        }
        this.element.style.left = this.xPos + "%";
        this.element.style.top = this.yPos + "%";
    }
    clear() {
        document.getElementById("game").removeChild(this.element);
    }
}
class GameOverMenu {
    constructor(h, w, xPos, yPos, padding1, padding2, xbutton, ybutton) {
        this.height = h;
        this.width = w;
        this.xPos = xPos;
        this.yPos = yPos;
        this.padding1 = padding1;
        this.padding2 = padding2;
        this.xbutton = xbutton;
        this.ybutton = ybutton;
        this.element = document.createElement("div");
        this.element.classList.add("gameover");
        this.element.style.height = h + "%";
        this.element.style.width = w + "%";
        this.element.style.top = yPos + "%";
        this.element.style.left = xPos + "%";
        document.body.appendChild(this.element);
        this.button = document.createElement("button");
        this.button.classList.add("retry");
        this.button.style.top = ybutton + "%";
        this.button.style.left = xbutton + "%";
        this.button.style.padding = padding1 + "%" + padding2 + "%";
        this.element.appendChild(this.button);
    }
}
