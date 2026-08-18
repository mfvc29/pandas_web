/* ============================================================
   app.js — Carta kawaii para Yesi
============================================================ */

/* ── PARTICLES ── */
const EMOJIS     = ['🌸','💕','✨','🎀','🤎','⭐','💫','🌷','🎵','🍓'];
const pContainer = document.getElementById('particles');

function createParticle() {
  const el = document.createElement('div');
  el.className = 'particle';
  el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
  el.style.left              = Math.random() * 100 + 'vw';
  el.style.fontSize          = (0.8 + Math.random() * 1.1) + 'rem';
  el.style.animationDuration = (7 + Math.random() * 11) + 's';
  el.style.animationDelay    = Math.random() * 5 + 's';
  pContainer.appendChild(el);
  setTimeout(() => el.remove(), 20000);
}

for (let i = 0; i < 12; i++) setTimeout(createParticle, i * 350);
setInterval(createParticle, 2200);

/* ── TICKER LOOP ── */
const ticker = document.getElementById('ticker');
ticker.innerHTML += ticker.innerHTML;

/* ── MUSIC PLAYER ── */
const audio         = document.getElementById('bgMusic');
const playerWrapper = document.getElementById('playerWrapper');
const badge         = document.getElementById('playPauseBadge');
const soundWave     = document.getElementById('soundWave');
const hint          = document.getElementById('musicHint');
const START_SECOND  = 9;
let   isPlaying     = false;

/* Autoplay desde segundo 9 */
audio.addEventListener('canplaythrough', () => {
  audio.currentTime = START_SECOND;
  audio.play()
    .then(() => { isPlaying = true; updateUI(); })
    .catch(() => {
      /* Autoplay bloqueado por el navegador — el usuario toca el panda */
      if (hint) hint.style.display = 'block';
    });
}, { once: true });

window.toggleMusic = function () {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
  } else {
    if (audio.currentTime === 0) audio.currentTime = START_SECOND;
    audio.play();
    isPlaying = true;
    if (hint) hint.style.display = 'none';
  }
  updateUI();
};

function updateUI() {
  badge.innerHTML = isPlaying ? '&#9646;&#9646;' : '&#9654;';
  playerWrapper.classList.toggle('playing', isPlaying);
  soundWave.classList.toggle('paused', !isPlaying);
}

audio.addEventListener('ended', () => { isPlaying = false; updateUI(); });

/* ── 3D CARD TILT ── */
const card = document.getElementById('mainCard');

card.addEventListener('mousemove', e => {
  const r = card.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width  - 0.5;
  const y = (e.clientY - r.top)  / r.height - 0.5;
  card.style.transform = `rotateY(${x * 7}deg) rotateX(${-y * 5}deg) scale(1.01)`;
});

card.addEventListener('mouseleave', () => { card.style.transform = ''; });
