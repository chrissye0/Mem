"use strict";
window.onload = loadPage;

// array to store user inputs
let userInput = [];
// keep track of enemies defeated
let enemiesDefeated = 0;
// monsters that appear as you start the game
let monsters = [ud, du];
// current monster
let monster;
// for the timer
let timerCount;
// variable to be used for ES6 class
let mem;
// initialize variables for sound effects
let winAudio = undefined;
let hurtAudio = undefined;
let synthAudio = undefined;

// upon loading the page
function loadPage() {
  document.querySelector("#layout").style.display = "none";
  document.querySelector("#endScreen").style.display = "none";
  document.addEventListener('keypress', hitEnter);
  // grab sound effects
  winAudio = document.querySelector("#winAudio");
  winAudio.volume = 0.5;
  hurtAudio = document.querySelector("#hurtAudio");
  hurtAudio.volume = 0.5;
  synthAudio = document.querySelector("#synthAudio");
  synthAudio.volume = 0.5;
}

// event handler used to trigger the game
// added on instructions and end screen
function hitEnter(e) {
  if (e.key == "Enter") {
    // hide instructions and end screen
    document.querySelector("#instructions").style.display = "none";
    document.querySelector("#endScreen").style.display = "none";
    // show game
    document.querySelector("#layout").style.display = "grid";
    // play synth sound effect
    synthAudio.play();
    // start game
    startGame();
  }
}

// trigger the game
function startGame() {
  // remove hit enter event listener
  document.removeEventListener('keypress', hitEnter);
  // ES6 class
  mem = new Mem();
  // set and start timer
  timerCount = 60;
  depleteTimer();
  // generate a random monster
  monster = monsters[Math.floor(Math.random() * monsters.length)];
  // reset variables and states - used for when the player chooses to restart after losing
  enemiesDefeated = 0;
  monsters = [ud, du];
  userInput = [];
  mem.state = "default";
  for (let i = 0; i < monster.combo.length; i++) {
    document.querySelector(`.input${i + 1}`).innerHTML = "";
  }
  // trigger fight sequence as the game starts
  fight();
  // add user input characters to the userInput array
  document.addEventListener('keypress', generateInputArray)
}

// event handler function that uses keys pressed to add to user input array
function generateInputArray(e) {
  let keyPress;
  if (typeof e !== 'undefined') {
    keyPress = e.charCode;
  }
  else if (e) {
    keyPress = e.which;
  }
  // make sure the user only uses W, A, S, D
  if ((String.fromCharCode(keyPress).toUpperCase() !== "W") &&
    (String.fromCharCode(keyPress).toUpperCase() !== "A") &&
    (String.fromCharCode(keyPress).toUpperCase() !== "S") &&
    (String.fromCharCode(keyPress).toUpperCase() !== "D")) {
    document.querySelector(".status p").innerHTML = "Please only use W, A, S, and D!"
    return;
  }
  // add to userInput array
  userInput.push(String.fromCharCode(keyPress).toUpperCase());
  // trigger fight sequence
  fight();
  return false;
}

// fight sequence
async function fight() {
  // change html of enemiesDefeated, status, and enemy (img)
  document.querySelector(".enemiesDefeated p").innerHTML = "Enemies Defeated: " + enemiesDefeated;
  document.querySelector(".status p").innerHTML = monster.name + " approaches!";
  document.querySelector(".enemy").innerHTML = `<img src="images/characters/${monster.name}.png" alt="${monster.name}" />`;
  // display proper number of input html boxes according to monster combo length
  if (monster.combo.length == 2) {
    document.querySelector(".input3").style.display = "none";
    document.querySelector(".input4").style.display = "none";
  } else if (monster.combo.length == 3) {
    document.querySelector(".input3").style.display = "block";
    document.querySelector(".input4").style.display = "none";
  } else if (monster.combo.length == 4) {
    document.querySelector(".input3").style.display = "block";
    document.querySelector(".input4").style.display = "block";
  }
  // go through user inputs
  for (let i = 0; i < monster.combo.length; i++) {
    switch (userInput[i]) {
      case "W":
        // use class to make mem go up
        mem.state = "up";
        mem.display();
        // show up arrow in html
        document.querySelector(`.input${i + 1}`).innerHTML = '<img src="images/inputs/up.png" alt="up arrow" />';
        break;
      case "A":
        // use class to make mem go left
        mem.state = "left";
        mem.display();
        // show left arrow in html
        document.querySelector(`.input${i + 1}`).innerHTML = '<img src="images/inputs/left.png" alt="left arrow" />';
        break;
      case "S":
        // use class to make mem go down
        mem.state = "down";
        mem.display();
        // show down arrow in html
        document.querySelector(`.input${i + 1}`).innerHTML = '<img src="images/inputs/down.png" alt="down arrow" />';
        break;
      case "D":
        // use class to make mem go right
        mem.state = "right";
        mem.display();
        // show right arrow in html
        document.querySelector(`.input${i + 1}`).innerHTML = '<img src="images/inputs/right.png" alt="right arrow" />';
        break;
    }
  }
  // if # of user inputs is equal to the input length of the monster
  if (userInput.length == monster.combo.length) {
    // if the inputs match
    if (compareArrays(userInput, monster.combo)) {
      // play win sound effect
      winAudio.play();
      // increment enemiesDefeated variable
      enemiesDefeated += 1;
      // add to timer
      if (timerCount < 60) {
        if (enemiesDefeated < 10) {
          timerCount += 1;
        }
        else {
          timerCount += 3;
        }
      }
      // call add more monsters
      addMoreMonsters();
      // generate new monster
      monster = monsters[Math.floor(Math.random() * monsters.length)];
    } else {
      // if the inputs don't match
      document.querySelector(".status p").innerHTML = "Try again!";
      // play hurt sound effect
      hurtAudio.play();
      // provide feedback on incorrect inputs by making the boxes red
      for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] != monster.combo[i]) {
          document.querySelector(`.input${i + 1}`).style.border = "3px solid red";
        }
      }
    }
    // wait 800 ms
    await delay(800);
    // reset mem sprite
    let memSprite = document.querySelector(".mem img");
    memSprite.style.background = "black";
    memSprite.style.bottom = "30px";
    memSprite.style.left = "200px";
    // restore border colors
    document.querySelector(".input1").style.border = "3px solid white";
    document.querySelector(".input2").style.border = "3px solid white";
    document.querySelector(".input3").style.border = "3px solid white";
    document.querySelector(".input4").style.border = "3px solid white";
    // clear inputs
    for (let i = 0; i < monster.combo.length; i++) {
      document.querySelector(`.input${i + 1}`).innerHTML = "";
    }
    // reset userInput array
    userInput = [];
    // call fight function again
    fight();
  }
}

// add more enemy types as the user progresses
function addMoreMonsters() {
  if (enemiesDefeated == 3) {
    monsters.push(skrumblo);
    monsters.push(skrimblo);
  }
  if (enemiesDefeated == 6) {
    monsters.push(bonezo);
    monsters.push(bonelord);
  }
  if (enemiesDefeated == 9) {
    monsters.push(kon);
    monsters.push(ami);
  }
  if (enemiesDefeated == 12) {
    monsters.push(wizbirb);
  }
}