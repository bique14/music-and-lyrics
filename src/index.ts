import lyric from "../media/location-unknown/lyric.json";
// import { Elm } from "./Main.elm";

// const app = Elm.Main.init({ node: document.querySelector("main") });

console.log("hello world!");

// const body = document.querySelector("body");
const audioSound: HTMLVideoElement = <HTMLVideoElement>(
  document.getElementById("audio-sound")
);

const lyricText: HTMLElement = document.getElementById("lyrics");
// body.addEventListener(
//   "click",
//   function () {
//     audioSound.play();
//     start();
//   },
//   false
// );

(() => {
  setInterval(() => {
    audioSound.play();
  }, 1000);
  start();
})();

function start(): void {
  setInterval(function () {
    const currTime: string = audioSound.currentTime.toFixed(0);
    // console.log(currTime);
    for (let l in lyric) {
      // console.log(1);
      if (currTime == l) {
        console.log(lyric[l].text);
        lyricText.innerHTML = lyricText.innerHTML + lyric[l].text;
      }
    }
  }, 1000);
}
