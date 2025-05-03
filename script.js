const testDate = new Date('2025-05-20');
const countdownEl = document.getElementById('countdown');

function updateCountdown() {
    const now = new Date();
    const diff = Math.ceil((testDate - now) / (1000 * 60 * 60 * 24));
    countdownEl.textContent = `D-${diff}`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

function addMission() {
    const input = document.getElementById('missionInput');
    const text = input.value;
    if (!text) return;
    const li = document.createElement('li');
    li.textContent = `Mission: ${text}`;
    li.onclick = () => {
        li.style.textDecoration = 'line-through';
        li.textContent += ' — Mission Complete';
        document.body.style.backgroundColor = '#300';
        setTimeout(() => { document.body.style.backgroundColor = '#000'; }, 300);
    };
    document.getElementById('missionList').appendChild(li);
    input.value = '';
}

function toggleBGM() {
    const bgm = document.getElementById('bgm');
    if (bgm.paused) {
        bgm.play();
    } else {
        bgm.pause();
    }
}
