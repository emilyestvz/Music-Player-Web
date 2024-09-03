/*Animação cursor*/
const cursor = document.querySelectorAll('.cursor');

window.addEventListener('mousemove', (event) => {

    let x = event.pageX;
    let y = event.pageY;

    cursor.forEach(event1 => {
        event1.style.left = `${x}px`;
        event1.style.top = `${y}px`;
    })
})

/*Funcionamento do player*/
const image = document.getElementById('cover'),
title = document.getElementById('musica-titulo'),
artist = document.getElementById('musica-artista'),
currentTimeEl = document.getElementById('hora-atual'),
durationEl = document.getElementById('duracao'),
progress = document.getElementById('progresso'),
playerProgress = document.getElementById('player-progresso'),
prevBtn = document.getElementById('prev'),
nextBtn = document.getElementById('next'),
playBtn = document.getElementById('play'),
background = document.getElementById('bg-img');

const music = new Audio();
const songs = [
    {
        path:'assets/music/2.mp3',
        displayName: 'Linger (The Cranberries Cover)',
        cover: 'assets/royel.jpg',
        artist: 'Royel Otis',
    },
    {
        path:'assets/music/1.mp3',
        displayName: 'Déjame Dejarte Atrás',
        cover: 'assets/paula-prieto.jpg',
        artist: 'Paula Prieto',
    },
    {
        path:'assets/music/3.mp3',
        displayName: 'No Air',
        cover: 'assets/jordin.jpg',
        artist: 'Jordin Sparks ft. Chris Brown',
    },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay(){
    if(isPlaying){
        pauseMusic()
    } else{
        playMusic()
    }
}

function playMusic(){
    isPlaying = true;
    //alterar o ícone do botão de reprodução
    playBtn.classList.replace('fa-play', 'fa-pause');
    //definir o título do botão de Pause
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic(){
    isPlaying = false;
    //alterar o ícone do botão de reprodução
    playBtn.classList.replace('fa-pause', 'fa-play');
    //definir o título do botão de Play
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(event) {
    const width = playerProgress.clientWidth;
    const clickX = event.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);

