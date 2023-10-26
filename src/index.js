import './index.scss'
import { data, seasonIcons } from './data';

let VOL = -1;
let isPaused = false

const root = document.getElementById('app');
const weatherBlock  = document.createElement('div');
weatherBlock.className = 'weather-block'

const volumeChanger = document.createElement('input')
volumeChanger.setAttribute('type', 'range')
volumeChanger.setAttribute('min', '0');
volumeChanger.setAttribute('max', '100');
volumeChanger.setAttribute('value', '100')
volumeChanger.addEventListener('input', () => changeVolume())

root.append(weatherBlock);
root.append(volumeChanger);

function createContent(item) {
    const div = document.createElement('div')
    div.classList.add('weather-block-item')
    div.id = item.sound
    div.addEventListener('click', () => runSound(item))
    div.style.backgroundImage = 'url(\'./assets/' + item.bg + '-bg.jpg\')';
    const icon = document.createElement('img')
    icon.setAttribute('src', './assets/icons/' + item.icon + '.svg')
    div.append(icon);
    weatherBlock.append(div)
}

function runSound(item) {
    const body = document.getElementById('body');
    body.style.backgroundImage ='url(\'./assets/' + item.bg + '-bg.jpg\')';
    const isAudioExist = document.getElementById('audio');

    if (isAudioExist) { 
        if (isAudioExist.getAttribute('name') === item.sound) {
            if (isPaused) {
                isAudioExist.play();
                isPaused = false;
                changeIcon(item.sound, 'pause')
            } else {
                isAudioExist.pause();
                isPaused = true;
                changeIcon(item.sound, item.icon)
            }
        } else {
            changeIcon(isAudioExist.getAttribute('name'), seasonIcons[isAudioExist.getAttribute('name')])
            isPaused = false;
            isAudioExist.remove();
            createAudioEl(item.sound);
            changeIcon(item.sound, 'pause')
        }
       
    } else {
        createAudioEl(item.sound);
        changeIcon(item.sound, 'pause')
    }
    
}

function changeVolume() {
    const newVolume = volumeChanger.value;
    const audio = document.getElementById('audio')
    VOL = newVolume/100;
    if (audio) {
        audio.volume = newVolume/100;
    }

}

function changeIcon(sound, icon) {
    const season = document.getElementById(sound)
    season.removeChild(season.firstChild)
    const img = document.createElement('img')
    img.setAttribute('src', './assets/icons/' + icon +'.svg')
    season.append(img);
}

function createAudioEl(sound) {
    const audio = document.createElement('audio');
    const source = document.createElement('source');
    audio.setAttribute('loop', true);
    audio.id = 'audio';
    audio.setAttribute('name', sound);
    source.setAttribute('src', `./assets/sounds/${sound}.mp3`);
    source.setAttribute('type', 'audio/mpeg');
    if (VOL > -1) {
        audio.volume = VOL
    }
    audio.append(source);
    weatherBlock.append(audio)
    audio.play();
}

data.forEach(createContent)