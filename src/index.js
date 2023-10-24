import './index.scss'
const data = [
    { id: 1, icon: 'sun', bg: 'summer', sound: 'summer'},
    { id: 2, icon: 'cloud-rain', bg: 'rainy', sound: 'rain'},
    { id: 3, icon: 'cloud-snow', bg: 'winter', sound: 'winter'},
]
const root = document.getElementById('app');

const block  = document.createElement('div');
block.className = 'weather-block'
root.append(block);

let vol = -1;


function createContent(item) {
    const div = document.createElement('div')
    div.classList.add('weather-block-item')
    div.addEventListener('click', () => runSound(item))
    div.style.backgroundImage = 'url(\'./assets/' + item.bg + '-bg.jpg\')';
    const icon = document.createElement('img')
    icon.setAttribute('src', './assets/icons/' + item.icon + '.svg')
    div.append(icon);

    block.append(div)
}

data.forEach(createContent)

const volume = document.createElement('input')
volume.setAttribute('type', 'range')
volume.setAttribute('min', '0');
volume.setAttribute('max', '100');
volume.setAttribute('value', '100')
volume.addEventListener('input', () => changeVolume())

root.append(volume);

function runSound(item) {
    const body = document.getElementById('body');
    body.style.backgroundImage ='url(\'./assets/' + item.bg + '-bg.jpg\')';
    const isAudioExist = document.getElementsByTagName('audio');
    if (isAudioExist.length !== 0) { 
        isAudioExist[0].remove()
    }
    const audio = document.createElement('audio');

    const source = document.createElement('source');
    audio.setAttribute('loop', true);
    audio.id = 'audio';
    source.setAttribute('src', `./assets/sounds/${item.sound}.mp3`);
    source.setAttribute('type', 'audio/mpeg');
    if (vol > -1) {
        audio.volume = vol
    }
    audio.append(source);
    block.append(audio)
    audio.play();
}

function changeVolume() {
    const newVolume = volume.value;
    const audio = document.getElementById('audio')
    vol = newVolume/100;
    if (audio) {
        audio.volume = newVolume/100;
    }

}