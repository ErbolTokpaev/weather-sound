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

function runSound(item) {
    const body = document.getElementById('body');
    body.style.backgroundImage ='url(\'./assets/' + item.bg + '-bg.jpg\')';
    const isAudioExist = document.getElementsByTagName('audio');
    if (isAudioExist.length !== 0) { 
        isAudioExist[0].remove()
    }
    const audio = document.createElement('audio');

    const source = document.createElement('source');
    audio.setAttribute('loop', true)
    source.setAttribute('src', `./assets/sounds/${item.sound}.mp3`);
    source.setAttribute('type', 'audio/mpeg');
    audio.append(source);
    block.append(audio)
    audio.play();
}