const player = document.querySelector(".player");
const audio = player.querySelector("audio");
const playButton = player.querySelector(".play");
const pauseButton = player.querySelector(".pause");
const currentTime = player.querySelector(".current");
const totalTime = player.querySelector(".total");
const progressInner = player.querySelector(".player-progress-inner");

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};

const setProgress = (current, duration) => {
  const safeDuration = duration || 0;
  const percentage =
    safeDuration === 0 ? 0 : Math.min((current / safeDuration) * 100, 100);
  progressInner.style.width = `${percentage}%`;
};

const setPlaybackState = (isPlaying) => {
  playButton.style.display = isPlaying ? "none" : "flex";
  pauseButton.style.display = isPlaying ? "flex" : "none";
};

audio.addEventListener("loadedmetadata", () => {
  totalTime.textContent = formatTime(audio.duration);
  setProgress(0, audio.duration);
});

playButton.addEventListener("click", () => {
  audio.play();
  setPlaybackState(true);
});

pauseButton.addEventListener("click", () => {
  audio.pause();
  setPlaybackState(false);
});

audio.addEventListener("timeupdate", () => {
  currentTime.textContent = formatTime(audio.currentTime);
  setProgress(audio.currentTime, audio.duration);
});
