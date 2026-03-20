const messages = [
  "Initializing butterflies… 🦋",
  "Calibrating heart rate… 💓",
  "Downloading courage… 📥",
  "Consulting the stars… ⭐",
  "Gathering dumplings… 🥟",
  "Fluffing pillows of charm… 🛏️",
  "Warming up the smile… 😊",
  "Double-checking feelings… 🔍",
  "Asking the moon for advice… 🌙",
  "Almost done being nervous… 😅",
  "Ready. (I think.) 🤞",
];

let currentPct = 0;
const bar = document.getElementById('bar');
const pctText = document.getElementById('pct-text');
const msgText = document.getElementById('msg-text');
const continueBtn = document.getElementById('continue-btn');

let msgIndex = 0;

function nextMessage() {
  msgText.style.opacity = 0;
  setTimeout(() => {
    msgText.textContent = messages[msgIndex % messages.length];
    msgText.style.opacity = 1;
    msgIndex++;
  }, 300);
}

nextMessage();

function tick() {
  if (currentPct >= 100) {
    bar.style.width = '100%';
    pctText.textContent = '100%';
    msgText.style.opacity = 0;
    setTimeout(() => {
      msgText.textContent = "Done! 🎊";
      msgText.style.opacity = 1;
    }, 300);
    continueBtn.style.display = 'inline-block';
    return;
  }

  // Random increment — slow at first, burst in middle, slow at end
  let inc;
  if (currentPct < 20)       inc = Math.random() * 3 + 0.5;
  else if (currentPct < 70)  inc = Math.random() * 5 + 1;
  else if (currentPct < 90)  inc = Math.random() * 2 + 0.3;
  else                       inc = Math.random() * 0.8 + 0.1;

  currentPct = Math.min(currentPct + inc, 100);
  bar.style.width = currentPct + '%';
  pctText.textContent = Math.floor(currentPct) + '%';

  // Change message every ~15%
  if (Math.floor(currentPct) % 9 === 0 && msgIndex < messages.length) {
    nextMessage();
  }

  const delay = 120 + Math.random() * 200;
  setTimeout(tick, delay);
}

setTimeout(tick, 600);

function showMessage() {
  const loadingScreen = document.getElementById('loading-screen');
  const messageScreen = document.getElementById('message-screen');
  loadingScreen.style.opacity = 0;
  setTimeout(() => {
    loadingScreen.style.display = 'none';
    messageScreen.style.display = 'block';
  }, 500);
}

function showYes() {
  const messageScreen = document.getElementById('message-screen');
  const yesScreen = document.getElementById('yes-screen');
  messageScreen.style.display = 'none';
  yesScreen.style.display = 'block';
  launchConfetti();
}

// "No" button runs away on hover/tap
let noMoveCount = 0;
function runAway(btn) {
  noMoveCount++;
  const card = document.querySelector('.card');
  const cardRect = card.getBoundingClientRect();
  const btnRect = btn.getBoundingClientRect();

  const maxX = card.offsetWidth  - btn.offsetWidth  - 8;
  const maxY = card.offsetHeight - btn.offsetHeight - 8;

  const rx = Math.floor(Math.random() * maxX);
  const ry = Math.floor(Math.random() * maxY);

  btn.style.position = 'absolute';
  btn.style.left = rx + 'px';
  btn.style.top  = ry + 'px';
  btn.style.width = 'auto';
  btn.style.margin = '0';

  if (noMoveCount >= 5) {
    btn.textContent = 'Fine. No. 😒';
    btn.onmouseover = null;
    btn.onclick = showNo;
  }
}

function showNo() {
  const messageScreen = document.getElementById('message-screen');
  const noScreen = document.getElementById('no-screen');
  messageScreen.style.display = 'none';
  noScreen.style.display = 'block';
}

// Confetti
const COLORS = ['#f48fb1','#e91e63','#f06292','#fce4ec','#f8bbd0','#c4b5fd'];

function launchConfetti() {
  const container = document.getElementById('confetti');
  for (let i = 0; i < 80; i++) {
    const el = document.createElement('div');
    el.className = 'confetto';
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top  = '-12px';
    el.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
    el.style.width  = (8 + Math.random() * 8) + 'px';
    el.style.height = (8 + Math.random() * 8) + 'px';
    el.style.animationDuration = (1.5 + Math.random() * 2) + 's';
    el.style.animationDelay   = (Math.random() * 0.8) + 's';
    container.appendChild(el);
  }
  setTimeout(() => container.innerHTML = '', 4000);
}
