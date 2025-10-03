let score = 0;

const scoreDisplay = document.getElementById("score");
const clickImage = document.getElementById("clickImage");
const clickSound = document.getElementById('clickSound');

clickImage.addEventListener("click", () => {
  score++;
  scoreDisplay.textContent = score;
  clickSound.currentTime = 0;
  clickSound.play();
});
