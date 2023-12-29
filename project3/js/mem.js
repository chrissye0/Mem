// ES6 class
// Used to animate Mem sprite
// Finite state machine

class Mem {
    constructor() {
        // set default state
        this.state = "down";
    }

    display() {
        // grab sprite with querySelector
        let memSprite = document.querySelector(".mem img");
        // depending on the value of the instance's state
        // change style such that Mem sprite moves accordingly
        switch(this.state) {
            case "up":
                // move up
                memSprite.style.bottom = "50px";
                break;
            case "down":
                // move down
                memSprite.style.bottom = "10px";
                break;
            case "left":
                // move left
                memSprite.style.left = "180px";
                break;
            case "right":
                // move right
                memSprite.style.left = "220px";
                break;
        }
    }
}