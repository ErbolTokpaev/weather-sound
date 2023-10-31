import './index.scss';
import data from './data';

let VOL = -1;
let isPaused = false;

interface IWeather {
  sound: string,
  bg: string,
  icon: string,
}

const root = document.getElementById('app');
const weatherBlock = document.createElement('div');
const volumeChanger = document.createElement('input');
weatherBlock.className = 'weather-block';
volumeChanger.setAttribute('type', 'range');
volumeChanger.setAttribute('min', '0');
volumeChanger.setAttribute('max', '100');
volumeChanger.setAttribute('value', '100');

function changeIcon(sound: string, icon: string) {
  const season = document.getElementById(sound)!;
  const child = season.firstChild!;
  season.removeChild(child);
  const img = document.createElement('img');
  img.setAttribute('src', `./assets/icons/${icon}.svg`);
  season.append(img);
}

function createAudioEl(sound: string) {
  const audio = document.createElement('audio');
  const source = document.createElement('source');
  audio.setAttribute('loop', 'true');
  audio.id = 'audio';
  audio.setAttribute('name', sound);
  source.setAttribute('src', `./assets/sounds/${sound}.mp3`);
  source.setAttribute('type', 'audio/mpeg');
  if (VOL > -1) {
    audio.volume = VOL;
  }
  audio.append(source);
  weatherBlock.append(audio);
  audio.play();
}

function runSound(item: IWeather) {
  const body = document.getElementById('body');
  body!.style.backgroundImage = `url('./assets/${item.bg}-bg.jpg')`;
  const isAudioExist = <HTMLAudioElement> document.getElementById('audio')!;

  if (isAudioExist) {
    if (isAudioExist.getAttribute('name') === item.sound) {
      if (isPaused) {
        isAudioExist.play();
        isPaused = false;
        changeIcon(item.sound, 'pause');
      } else {
        isAudioExist.pause();
        isPaused = true;
        changeIcon(item.sound, item.icon);
      }
    } else {
      const findSeason = isAudioExist.getAttribute('name')!;
      changeIcon(findSeason, data.find((el) => el.sound === findSeason)?.icon!);
      isPaused = false;
      isAudioExist.remove();
      createAudioEl(item.sound);
      changeIcon(item.sound, 'pause');
    }
  } else {
    createAudioEl(item.sound);
    changeIcon(item.sound, 'pause');
  }
}

function createContent(item: IWeather) {
  const div = document.createElement('div');
  div.classList.add('weather-block-item');
  div.id = item.sound;
  div.addEventListener('click', () => runSound(item));
  div.style.backgroundImage = `url('./assets/${item.bg}-bg.jpg')`;
  const icon = document.createElement('img');
  icon.setAttribute('src', `./assets/icons/${item.icon}.svg`);
  div.append(icon);
  weatherBlock.append(div);
}
function changeVolume() {
  const newVolume:number = +volumeChanger.value;
  const audio = <HTMLAudioElement>document.getElementById('audio');
  VOL = newVolume / 100;
  if (audio) {
    audio.volume = newVolume / 100;
  }
}

data.forEach(createContent);

volumeChanger.addEventListener('input', () => changeVolume());

root!.append(weatherBlock);
root!.append(volumeChanger);
