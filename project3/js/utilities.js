// compare the values in arrays
function compareArrays(a, b) {
  if (a.length != b.length) {
    return false;
  } else {
    let result = false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] != b[i]) {
        return false;
      } else {
        result = true;
      }
    }
    return result;
  }
}

// wait n milliseconds
function delay(milliseconds) {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds)
  });
}

// deduct from timer
function depleteTimer() {
  let progressBar = document.querySelector(".timer-inner");
  let countDown = setInterval(function () {
    if (enemiesDefeated < 10) {
      timerCount--;
    } else {
      timerCount -= 2;
    }
    // change progress bar width
    progressBar.style.width = `${timerCount / 60 * 90}%`;
    // when the timer is up
    if (timerCount === 0) {
      console.log("time's up")
      document.removeEventListener('keypress', generateInputArray);
      document.addEventListener('keypress', hitEnter);
      clearInterval(countDown);
      document.querySelector("#layout").style.display = "none";
      document.querySelector("#endScreen").style.display = "block";

      if(enemiesDefeated > 1) {
        document.querySelector("#endScreen p").innerHTML = `You defeated ${enemiesDefeated} foes! Press ENTER to try again!`;
      }
    }
  }, 1000);
}