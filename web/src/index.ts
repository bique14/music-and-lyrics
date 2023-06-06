// import lyric from "../public/assets/music/location-unknown/lyric.json";
import lyric from "../public/assets/music/lifes-too-short/lyric.json";
import { drink } from "./caffeine";

const version: string = "1.2.0";
console.log(`version : ${version}`);

// type
type LyricObject = {
  time: string;
  lyric: Lyric;
};

type Lyric = {
  time: string;
  text: string;
};

const lyricsObject: { [key: string]: { time: string; text: string } } = lyric;

const audioSound: HTMLAudioElement = <HTMLAudioElement>(
  document.getElementById("audio-sound")
);
const currentTimeSpan: HTMLElement = document.getElementById("current-time")!;
const durationTimeSpan: HTMLElement = document.getElementById("duration-time")!;
const lyricContainer: HTMLElement = document.getElementById("lyric-container")!;
const showLyric: HTMLElement = document.getElementById("show-lyric")!;
const togglePlayPause: HTMLElement = document.getElementById(
  "toggle-play-pause-button"
)!;

const playSvg = `<svg role="img" height="16" width="16" viewBox="0 0 16 16"><path fill="#b3b3b3" d="M4.018 14L14.41 8 4.018 2z"></path></svg>`;
const pauseSvg = `<svg class="self-center" role="img" height="16" width="16" viewBox="0 0 16 16"><path fill="none" d="M0 0h16v16H0z"></path><path fill="#b3b3b3" d="M3 2h3v12H3zM10 2h3v12h-3z"></path></svg>`;

const checkAudioLoaded = setInterval(function () {
  if (audioSound.readyState === 4) {
    clearInterval(checkAudioLoaded);
    const { duration } = audioSound;
    const durationTime = toMinSec(duration);
    durationTimeSpan.innerHTML = durationTime;
    init();
  }
}, 100);

function toMinSec(duration: number): string {
  const minutes: number = Math.floor(duration / 60);
  const seconds: number = Math.floor(duration % 60);
  const formattedSeconds: string = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${minutes}:${formattedSeconds}`;
}

function toArray(): Array<LyricObject> {
  const result = [];
  for (let i in lyric) result.push({ time: i, lyric: lyricsObject[i] });
  return result;
}

function init(): void {
  const lyricArr: Array<LyricObject> = toArray();

  const initialLyric = lyricArr.slice(0, 3);

  initialLyric.map((value, index) => {
    const lyricText = document.createElement("span");

    lyricText.setAttribute("id", `lyric-${value.time}-${index}`);
    lyricText.setAttribute("class", `lyric-text`);
    lyricText.innerHTML = value.lyric.text;
    showLyric.appendChild(lyricText);
    lyricContainer.appendChild(showLyric);
  });
}

function start(): void {
  audioSound.play();
  const lyricArr: Array<LyricObject> = toArray();

  setInterval(function () {
    if (audioSound.currentTime >= audioSound.duration)
      togglePlayPause.innerHTML = playSvg;

    const currTime: string = audioSound.currentTime.toFixed(0);
    currentTimeSpan.innerHTML = toMinSec(audioSound.currentTime);

    const arr3 = lyricArr.slice(0, 3);
    if (lyricArr.length) {
      if (+currTime >= +arr3[0].time) {
        showLyric.innerHTML = "";
        lyricArr.shift();
      } else return;
    }

    arr3.map((value, index) => {
      const lyricText = document.createElement("span");

      if (currTime == value.time) {
        lyricText.setAttribute("id", `lyric-${value.time}-${index}`);
        lyricText.setAttribute("class", `lyric-text-current`);
        lyricText.innerHTML = value.lyric.text;
        showLyric.appendChild(lyricText);
        lyricContainer.appendChild(showLyric);
      } else {
        lyricText.setAttribute("id", `lyric-${value.time}-${index}`);
        lyricText.setAttribute("class", `lyric-text`);
        lyricText.innerHTML = value.lyric.text;
        showLyric.appendChild(lyricText);
        lyricContainer.appendChild(showLyric);
      }
    });

    if (!arr3.length) {
      setTimeout(() => {
        showLyric.innerHTML = "";
        const endedText = document.createElement("span");
        endedText.setAttribute("class", `lyric-text-current`);
        endedText.innerHTML = "♪";
        showLyric.appendChild(endedText);
        lyricContainer.appendChild(showLyric);
      }, 4000);
    }
    // old version
    // lyricArr.map((value, index) => {
    //   console.log(value);
    //   if (currTime == value.time) {
    //     const lyricText = document.createElement("span");
    //     lyricText.setAttribute("id", `lyric-${index}`);
    //     lyricText.setAttribute("class", `lyric-text-current`);
    //     lyricText.innerHTML = value.lyric.text;
    //     showLyric.appendChild(lyricText);
    //     lyricContainer.appendChild(showLyric);
    //     const getOldText = document.getElementById(`lyric-${index - 1}`);
    //     if (getOldText) getOldText.setAttribute("class", `lyric-text`);
    //     lyricContainer.scrollTop = lyricContainer.scrollHeight;
    //   }
    // });
  }, 1000);
}

// update progress bar

audioSound.addEventListener("playing", function (event): void {
  const { duration } = <HTMLAudioElement>event.target;
  advance(duration, audioSound);
});

audioSound.addEventListener("pause", function (_): void {
  clearTimeout(0);
});

const advance = function (duration: number, element: HTMLAudioElement): void {
  const progress: HTMLElement = document.getElementById("progress")!;
  const increment: number = 10 / duration;
  const percent: number = Math.min(increment * element.currentTime * 10, 100);

  progress.style.width = percent + "%";
  startTimer(duration, element, percent);
};

const startTimer = function (
  duration: number,
  element: HTMLAudioElement,
  percent: number
): void {
  if (percent < 100) {
    setTimeout(function (): void {
      advance(duration, element);
    }, 100);
  }
};

togglePlayPause.addEventListener("click", (_): void => {
  // if (!audioSound.paused) {
  //   audioSound.pause();
  //   togglePlayPause.innerHTML = playSvg;
  // } else {
  //   audioSound.play();
  //   togglePlayPause.innerHTML = pauseSvg;
  // }
  // console.log(audioSound.paused);
  if (audioSound.paused) {
    drink();
    start();
    togglePlayPause.innerHTML = pauseSvg;
  } else console.log("ฟังไป");
});
