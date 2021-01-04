import lyric from "../media/location-unknown/lyric.json";

console.log("hello world!");

const body = document.querySelector("body");
const audioSound = document.getElementById("audio-sound");

body.addEventListener(
  "click",
  function () {
    audioSound.play();
    start();
  },
  false
);

(() => {})();

function start() {
  setInterval(function () {
    const currTime = audioSound.currentTime.toFixed(0);
    // console.log(currTime);
    for (let l in lyric) {
      // console.log(1);
      if (currTime == l) {
        console.log(lyric[l].text);
      }
    }
  }, 1000);
}
