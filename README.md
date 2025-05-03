import zipfile
import os

# 作業ディレクトリ
base_dir = "/mnt/data/mission-board"

# ディレクトリ構造を作成
os.makedirs(base_dir, exist_ok=True)
os.makedirs(os.path.join(base_dir, "audio"), exist_ok=True)
os.makedirs(os.path.join(base_dir, "icons"), exist_ok=True)

# index.html
index_html = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>AgentH Mission Board</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Welcome, Agent-028</h1>
    <p id="countdown">D-XX</p>
    <input type="text" id="missionInput" placeholder="Enter your mission">
    <button onclick="addMission()">Add Mission</button>
    <ul id="missionList"></ul>
    <button onclick="toggleBGM()">Toggle BGM</button>
    <audio id="bgm" loop>
        <source src="audio/mission.mp3" type="audio/mpeg">
    </audio>
    <script src="script.js"></script>
</body>
</html>
"""

# style.css
style_css = """body {
    background-color: #000;
    color: #0f0;
    font-family: 'Courier New', Courier, monospace;
    padding: 20px;
}
button {
    background-color: #f00;
    color: #fff;
    border: none;
    padding: 10px;
    margin-top: 10px;
}
"""

# script.js
script_js = """const testDate = new Date('2025-05-20');
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
"""

# ファイルの保存
with open(os.path.join(base_dir, "index.html"), "w") as f:
    f.write(index_html)
with open(os.path.join(base_dir, "style.css"), "w") as f:
    f.write(style_css)
with open(os.path.join(base_dir, "script.js"), "w") as f:
    f.write(script_js)

# ZIPファイル作成
zip_path = "/mnt/data/AgentH_mission_board.zip"
with zipfile.ZipFile(zip_path, "w") as zipf:
    for foldername, subfolders, filenames in os.walk(base_dir):
        for filename in filenames:
            filepath = os.path.join(foldername, filename)
            zipf.write(filepath, arcname=os.path.relpath(filepath, base_dir))

zip_path# mission-board