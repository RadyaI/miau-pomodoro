let timerDisplay = document.getElementById('timer');
let startButton = document.getElementById('start');
let resetButton = document.getElementById('reset');
let toggleThemeButton = document.getElementById('toggleTheme');
let alarmSound = document.getElementById('alarmSound');
let catImage = document.getElementById('catImage');
let hbd = document.getElementById('hbd');

let timeLeft = 25 * 60;
let timerId = null;
let catImages = ["asset/cat1.jpeg", "asset/cat2.jpeg", "asset/cat3.jpeg"];
let currentCatIndex = 0;
let now = new Date().toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long"
});

if(now === "08 Mei") {
    hbd.classList.remove("hide");
    document.body.classList.add("birthday-mode");
    showPopupMessage("Selamat Ulang Tahun 🎉 Semoga makin semangat belajar yaa!");
    document.title = "🎂 Happy Birthday!";
}


function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function showPopupMessage(message) {
    if (Notification.permission === "granted") {
        new Notification("Haiii kamu 👋", {
            body: message,
            icon: "asset/cat1.jpeg"
        });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification("Haiii kamu 👋", {
                    body: message,
                    icon: "asset/cat1.jpeg"
                });
            }
        });
    }
}

function setPreset(minutes) {
    timeLeft = minutes * 60;
    updateTimer();
}

function startTimer() {
    let minutesInput = document.getElementById('minutesInput').value;
    document.getElementById("minutesInput").value = ''

    if (minutesInput) {
        timeLeft = parseInt(minutesInput) * 60;
    }

    if (timerId === null) {
        updateTimer();

        timerId = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimer();
            } else {
                clearInterval(timerId);
                timerId = null;
                alarmSound.play();
                showPopupMessage("Waktunya habis! Istirahat dulu yaaa 🌸");
                changeCatImage();
            }
        }, 1000);
        document.getElementById('minutesInput').value = '';
    }
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = 25 * 60;
    updateTimer();
}

function startShortBreak() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = 5 * 60;
    updateTimer();
}

function startLongBreak() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = 15 * 60;
    updateTimer();
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    toggleThemeButton.textContent = document.body.classList.contains('dark-mode') ? "☀️ Light Mode" : "🌙 Dark Mode";
}

function changeCatImage() {
    currentCatIndex = (currentCatIndex + 1) % catImages.length;
    catImage.src = catImages[currentCatIndex];

    catImage.classList.add('animate');
    setTimeout(() => {
        catImage.classList.remove('animate');
    }, 500);
}

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
toggleThemeButton.addEventListener('click', toggleTheme);
document.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        startTimer()
    }
})

updateTimer();
