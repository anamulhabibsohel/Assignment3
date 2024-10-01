const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let bugImg = new Image();
bugImg.src = 'Bug.png';
let bugX = 200;
let bugY = 200;
let score = 0;
let hoppingInterval = 1000;

function drawBug() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bugImg, bugX - 20, bugY - 20, 40, 40);
}

function moveBug() {
  setInterval(() => {
    bugX = Math.random() * (canvas.width - 40) + 20;
    bugY = Math.random() * (canvas.height - 40) + 20;
    drawBug();
  }, hoppingInterval);
}

function handleClick(event) {
  const mouseX = event.clientX - canvas.offsetLeft;
  const mouseY = event.clientY - canvas.offsetTop;
  const distance = Math.sqrt((mouseX - bugX) ** 2 + (mouseY - bugY) ** 2);
  if (distance < 20) {
    score++;
    hoppingInterval -= 50;
    playSound('squish.mp3');
    drawBug();
    updateScore();
  }
}

function resetSpeed(speed) {
  switch (speed) {
    case 'Slow':
      hoppingInterval = 4000;
      break;
    case 'Medium':
      hoppingInterval = 2000;
      break;
    case 'Fast':
      hoppingInterval = 300;
      break;
  }
}

function resetScore() {
  score = 0;
  updateScore();
}

function updateScore() {
  document.getElementById('score').textContent = 'Score: ' + score;
}

function playSound(soundFile) {
  const audio = new Audio(soundFile);
  audio.play();
}

canvas.addEventListener('click', handleClick);
document.getElementById('resetSpeedBtn').addEventListener('click', () => {
  const speed = prompt('Enter speed (Slow, Medium, or Fast):');
  resetSpeed(speed);
});
document.getElementById('resetScoreBtn').addEventListener('click', resetScore);

drawBug();
moveBug();
