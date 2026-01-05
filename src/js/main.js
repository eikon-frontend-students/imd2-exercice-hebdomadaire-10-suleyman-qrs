var player = document.querySelector(".player");
var audio = player.querySelector("audio");
var playButton = player.querySelector(".play");
var pauseButton = player.querySelector(".pause");
var currentTime = player.querySelector(".current");
var totalTime = player.querySelector(".total");
var progressInner = player.querySelector(".player-progress-inner");

var timeToMinSec = (time) => {
  var minutes = Math.floor(time / 60);
  var seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return minutes + ":" + seconds;
};

var setProgress = (current, duration) => {
  var safeDuration = duration || 0;
  var percentage =
    safeDuration === 0 ? 0 : Math.min((current / safeDuration) * 100, 100);
  progressInner.style.width = percentage + "%";
};

pauseButton.style.display = "none";

audio.addEventListener("loadedmetadata", () => {
  totalTime.textContent = timeToMinSec(audio.duration);
  setProgress(0, audio.duration);
});

playButton.addEventListener("click", () => {
  audio.play();
  playButton.style.display = "none";
  pauseButton.style.display = "flex";
});

pauseButton.addEventListener("click", () => {
  audio.pause();
  playButton.style.display = "flex";
  pauseButton.style.display = "none";
});

audio.addEventListener("timeupdate", () => {
  currentTime.textContent = timeToMinSec(audio.currentTime);
  totalTime.textContent = timeToMinSec(audio.duration);
  setProgress(audio.currentTime, audio.duration);
});
