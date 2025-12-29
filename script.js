document.addEventListener("DOMContentLoaded",() =>{

    let playlist = [
        {
            title: "Love Mix",
            src: "smashup1.mp3",
            img: "smash_1.jpg"
        },
        {
            title: "Love Mashup",
            src: "Romantic_2025.mp3",
            img: "smash.1.jpg"
        },
        {
            title: "Punjabi Mix",
            src: "Punjabi.mp3",
            img: "Punjabi-Mix.jpg"
        }
    ];

    let current = 0;

    let progress = document.getElementById("progress");
    let song = document.getElementById("song");
    let ctrlIcon = document.getElementById("ctrlIcon");

    let title = document.getElementById("songTitle");
    let songImg = document.getElementById("songImg");

    let prevBtn = document.getElementById("prevBtn");
    let nextBtn = document.getElementById("nextBtn");

    let interval;

    function loadSong(index) {
        song.src = playlist[index].src;
        title.textContent = playlist[index].title;
        songImg.src = playlist[index].img;
        song.load();
        
    }

    function playSong() {
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
        songImg.classList.add("glow");
    }

    function pauseSong() {
        song.pause();
        ctrlIcon.classList.add("fa-play");
        ctrlIcon.classList.remove("fa-pause");
        songImg.classList.remove("glow");
    }

    function playPause() {
        if (ctrlIcon.classList.contains("fa-pause")) {
            pauseSong();
        } else {
            playSong();
        }
    }

    song.onloadedmetadata = function(){
        progress.max = song.duration;
        progress.value = song.currentTime;
    };

song.onplay = () =>{
    clearInterval(interval);
    interval = setInterval(()=>{
        progress.value = song.currentTime;
    },150);
};

song.onpause =() => clearInterval(interval);

progress.onchange = function () {
        song.currentTime = progress.value;
        playSong();
    };

    nextBtn.addEventListener("click", () => {
        current++;
        if (current >= playlist.length) current = 0;
        loadSong(current);
    });

    prevBtn.addEventListener("click", () => {
        current--;
        if (current < 0) current = playlist.length - 1;
        loadSong(current);
    });

    song.onended = () => {
        current++;
        if (current >= playlist.length) current = 0;
        loadSong(current);
    };

    loadSong(current);

    ctrlIcon.addEventListener("click", playPause);
});