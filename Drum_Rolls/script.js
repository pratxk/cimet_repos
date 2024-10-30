let rightDiv = document.getElementById('right');

let soundArrar = [
    {
        sound: "crash",
        soundImage: './assets/crash.png',
        soundUrl: './assets/crash.mp3',
        accessKey: "c"
    },
    {
        sound: "Kick",
        soundImage: './assets/kick.png',
        soundUrl: './assets/kick.mp3',
        accessKey: "k"
    },
    {
        sound: "Snare",
        soundImage: './assets/snare.png',
        soundUrl: './assets/snare.mp3',
        accessKey: "s"
    },
    {
        sound: "tom",
        soundImage: './assets/tom.png',
        soundUrl: './assets/tom.mp3',
        accessKey: "t"
    },
]

let soundFiles = {};

function displayData(arr) {
    arr.forEach((ele) => {
        let box = document.createElement('div');
        box.setAttribute('class', 'box');
        let image = document.createElement('img');
        image.src = ele.soundImage;

        let soundFile = document.createElement('audio');
        soundFile.setAttribute('class','key');
        soundFile.src = ele.soundUrl;
        box.accessKey = ele.accessKey;
        box.append(image);
        box.addEventListener('click', () => {
            soundFile.play();
        })
        rightDiv.append(box);

        soundFiles[ele.accessKey] = soundFile;
    })
}

displayData(soundArrar)

// Add keydown event listener to the document
document.addEventListener('keydown', (e) => {
    if (soundFiles[e.key]) {
        soundFiles[e.key].play();
    }
})