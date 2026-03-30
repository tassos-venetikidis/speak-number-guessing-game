const msgEl = document.getElementById("msg");

function getRandomNumber(start, end) {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}

// Check message and respond
function checkAndRespond(msg) {
  let num;
  let gameResponseText;
  const numbers = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  if (numbers.indexOf(msg) !== -1) {
    num = numbers.indexOf(msg) + 1;
  } else {
    num = +msg;
  }

  msgEl.innerHTML = `
<div>You said:</div>
<span class="box">${Number.isNaN(num) ? msg : num}</span>
`;

  if (num === randomNumber1to100) {
    document.body.innerHTML = `<h2>Congrats! You have guessed the number! <br><br> It was ${randomNumber1to100}</h2><button class="play-again" id="play-again">Play Again!</button>`;
    return;
  }

  if (Number.isNaN(num)) {
    gameResponseText = "That is not a valid number!";
  } else if (num > 100 || num < 1) {
    gameResponseText = "Number must be between 1 and 100";
  } else if (num > randomNumber1to100) {
    gameResponseText = "Too high! Go lower";
  } else if (num < randomNumber1to100) {
    gameResponseText = "Too low! Go higher";
  }
  const div = document.createElement("div");
  div.textContent = gameResponseText;
  msgEl.append(div);
}

// Capture user speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  checkAndRespond(msg);
}

const randomNumber1to100 = getRandomNumber(1, 100);

console.log("Number:", randomNumber1to100);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();
recognition.lang = "en-US";

// Start recognition and game
recognition.start();

// Speak result
recognition.addEventListener("result", onSpeak);

// End Speech Recognition service
recognition.addEventListener("end", () => recognition.start());

// Play Again Click
document.body.addEventListener("click", (e) => {
  if (e.target.id === "play-again") location.reload();
});
