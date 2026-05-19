const openGateBtn = document.getElementById('open-gate-btn');
const gateContainer = document.getElementById('gate-container');
const bgMusic = document.getElementById('bg-music');

// --- GATE ANIMATION & AUDIO TRACK TIME HOOK ---
openGateBtn.addEventListener('click', () => {
    // Left & Right Gate Split Trigger active hoga
    gateContainer.classList.add('open');

    // Darkhaast song hook: Direct main bridge line se start karne ke liye time configure kiya hai (48th second)
    bgMusic.currentTime = 48; 
    bgMusic.volume = 0.6;
    bgMusic.play().catch(e => console.log("Audio block bypass log."));
});

// --- CANVAS SCRATCH ENGINE ---
const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 190;

// Premium Gold Coat Layer on Canvas Cover
ctx.fillStyle = '#26221a';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = '#d4af37';
ctx.lineWidth = 2;
ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

ctx.fillStyle = '#e5c158';
ctx.font = 'bold 14px Montserrat';
ctx.textAlign = 'center';
ctx.fillText('Scratch to Reveal Card', canvas.width / 2, canvas.height / 2 + 5);

let drawing = false;

function draw(e) {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
}

canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchstart', (e) => { drawing = true; draw(e); });
canvas.addEventListener('touchend', () => drawing = false);
canvas.addEventListener('touchmove', draw);

// --- WEDDING COUNTDOWN TRIGGER ---
const weddingDate = new Date("November 20, 2026 11:00:00").getTime();

setInterval(() => {
    const delta = weddingDate - new Date().getTime();
    if (delta <= 0) return;

    const d = Math.floor(delta / (1000 * 60 * 60 * 24));
    const h = Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((delta % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = d < 10 ? '0' + d : d;
    document.getElementById('hours').innerText = h < 10 ? '0' + h : h;
    document.getElementById('minutes').innerText = m < 10 ? '0' + m : m;
    document.getElementById('seconds').innerText = s < 10 ? '0' + s : s;
}, 1000);
