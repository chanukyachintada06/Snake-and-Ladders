const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

const COLORS = ["#ff4757", "#2ed573", "#1e90ff", "#ffa502"];
let players = [];
let playerNames = []; 
let turn = 0;
let isAnimating = false;

const SNAKES = { 17: 7, 54: 34, 62: 19, 98: 79 };
const LADDERS = { 3: 38, 24: 33, 42: 93, 72: 84 };

const snakeImg = new Image();
snakeImg.src = 'snake.png'; 
const ladderImg = new Image();
ladderImg.src = 'ladder.png';

function showNameInputs(count) {
    const container = document.getElementById("name-inputs-container");
    container.innerHTML = ""; 
    for (let i = 1; i <= count; i++) {
        container.innerHTML += `<input type="text" id="p${i}-name" class="player-input" placeholder="Player ${i} Name" maxlength="12">`;
    }
    document.getElementById("selection-step").style.display = "none";
    document.getElementById("names-step").style.display = "block";
}

function startGame() {
    const inputs = document.querySelectorAll(".player-input");
    playerNames = [];
    inputs.forEach((input, index) => {
        let name = input.value.trim();
        playerNames.push(name || `Player ${index + 1}`);
    });
    players = Array(playerNames.length).fill(1);
    document.getElementById("setup-overlay").style.display = "none";
    document.getElementById("roll-btn").disabled = false;
    turn = 0; 
    updateUI();
    drawBoard();
}

function getCoords(pos) {
    let p = pos - 1;
    let row = Math.floor(p / 10);
    let col = p % 10;
    if (row % 2 !== 0) col = 9 - col;
    return { x: col * 60 + 30, y: 600 - (row * 60 + 30) };
}

async function handleRoll() {
    if (isAnimating) return;
    isAnimating = true;
    const diceEl = document.getElementById("dice");
    diceEl.classList.add("rolling");
    await new Promise(r => setTimeout(r, 600));
    let roll = Math.floor(Math.random() * 6) + 1;
    diceEl.classList.remove("rolling");
    diceEl.innerText = roll;
    await movePlayer(turn, roll);
    if (players[turn] === 100) {
        triggerWin(turn); 
    } else {
        turn = (turn + 1) % players.length;
        updateUI();
        isAnimating = false;
    }
}

async function movePlayer(playerIdx, steps) {
    for (let i = 0; i < steps; i++) {
        if (players[playerIdx] < 100) {
            players[playerIdx]++;
            drawBoard();
            await new Promise(r => setTimeout(r, 200)); 
        }
    }
    let pos = players[playerIdx];
    if (SNAKES[pos] || LADDERS[pos]) {
        await new Promise(r => setTimeout(r, 500)); 
        players[playerIdx] = SNAKES[pos] || LADDERS[pos];
        drawBoard();
    }
}

function drawBoard() {
    ctx.clearRect(0, 0, 600, 600);
    for (let i = 1; i <= 100; i++) {
        let { x, y } = getCoords(i);
        ctx.strokeStyle = "#ddd";
        ctx.strokeRect(x - 30, y - 30, 60, 60);
        ctx.fillStyle = "#999";
        ctx.font = "12px Arial";
        ctx.fillText(i, x - 25, y - 15);
    }
    for (let l in LADDERS) drawAsset(l, LADDERS[l], ladderImg, 40, false);
    for (let s in SNAKES) drawAsset(s, SNAKES[s], snakeImg, 55, true);
    players.forEach((p, i) => {
        let { x, y } = getCoords(p);
        const offsets = [[-8, -8], [8, -8], [-8, 8], [8, 8]];
        ctx.beginPath();
        ctx.arc(x + offsets[i][0], y + offsets[i][1], 12, 0, Math.PI * 2);
        ctx.fillStyle = COLORS[i];
        ctx.fill();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.stroke();
    });
}

function drawAsset(start, end, img, width, isSnake) {
    let a = getCoords(start);
    let b = getCoords(end);
    let dist = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
    let angle = Math.atan2(b.y - a.y, b.x - a.x);
    ctx.save();
    ctx.translate(a.x, a.y);
    if (isSnake) {
        ctx.rotate(angle - Math.PI / 2); 
        ctx.drawImage(img, -width / 2, 0, width, dist); 
    } else {
        ctx.rotate(angle + Math.PI / 2);
        ctx.drawImage(img, -width / 2, 0, width, -dist); 
    }
    ctx.restore();
}

function updateUI() {
    const indicator = document.getElementById("turn-indicator");
    const currentPlayerName = playerNames[turn] || `Player ${turn + 1}`;
    indicator.innerText = `${currentPlayerName}'s Turn`;
    indicator.style.color = COLORS[turn];
    const playerList = document.getElementById("player-list");
    if(playerList) {
        playerList.innerHTML = playerNames.map((name, i) => `
            <div class="p-stat" style="border-left: 5px solid ${COLORS[i]};">
                ${name}: Square ${players[i]}
            </div>
        `).join("");
    }
}

function triggerWin(winnerIndex) {
    const overlay = document.getElementById("win-overlay");
    const text = document.getElementById("winner-text");
    text.innerText = `${playerNames[winnerIndex].toUpperCase()} WINS! 🏆`;
    text.style.color = COLORS[winnerIndex];
    overlay.style.display = "flex";
    for (let i = 0; i < 100; i++) createConfetti();
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    const colors = ['#ff4757', '#2ed573', '#1e90ff', '#ffa502', '#ffffff'];
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
}

snakeImg.onload = ladderImg.onload = () => drawBoard();

function tuneCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    
    ctx.scale(dpr * (rect.width / 600), dpr * (rect.height / 600));
}

tuneCanvas();
const rollBtn = document.getElementById("roll-btn");

rollBtn.addEventListener('pointerdown', (e) => {
    if (!isAnimating && !rollBtn.disabled) {
        handleRoll();
    }

});
