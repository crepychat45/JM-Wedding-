// DOM Element Triggers
const openBtn = document.getElementById('open-btn');
const envelopeWrapper = document.getElementById('envelope-wrapper');
const appDashboard = document.getElementById('app-dashboard');
const bgMusic = document.getElementById('bg-music');

// --- STEP 1: INITIALIZE & OPEN WEB-APP DIALOGUE ---
openBtn.addEventListener('click', () => {
    // Envelope component moves up like video sequence
    envelopeWrapper.classList.add('slide-up');
    
    // Remove hidden display layer from dashboard
    appDashboard.classList.remove('hidden');

    // Safe Activation of Background Audio Track
    bgMusic.volume = 0.6;
    bgMusic.play().catch(error => {
        console.log("Browser policy blocked audio autoplay. Playing on next interaction.");
    });
});

// --- STEP 2: PREMIUM SCRATCH LAYER MANAGEMENT ---
const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 320;
canvas.height = 190;

// Apply high-contrast premium outer mask layer
ctx.fillStyle = '#26221a';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Add elegant inner borders on canvas element
ctx.strokeStyle = '#d4af37';
ctx.lineWidth = 2;
ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

// Add descriptive text instructions inside cover layer
ctx.fillStyle = '#e5c158';
ctx.font = 'bold 14px Montserrat';
ctx.textAlign = 'center';
ctx.fillText('Scratch to Reveal Card', canvas.width / 2, canvas.height / 2 + 5);

let drawingState = false;

function handleScratch(event) {
    if (!drawingState) return;

    const bounds = canvas.getBoundingClientRect();
    const inputX = (event.clientX || event.touches[0].clientX) - bounds.left;
    const inputY = (event.clientY || event.touches[0].clientY) - bounds.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(inputX, inputY, 24, 0, Math.PI * 2); // 24px optimal brush footprint
    ctx.fill();
}

// Attach Desktop & Smart Mobile Interactions
canvas.addEventListener('mousedown', () => drawingState = true);
canvas.addEventListener('mouseup', () => drawingState = false);
canvas.addEventListener('mousemove', handleScratch);

canvas.addEventListener('touchstart', (e) => { drawingState = true; handleScratch(e); });
canvas.addEventListener('touchend', () => drawingState = false);
canvas.addEventListener('touchmove', handleScratch);


// --- STEP 3: LIVE EVENT COUNTDOWN MODULE ---
const targetEventDate = new Date("November 20, 2026 11:00:00").getTime();

const runCountdown = () => {
    const activeTime = new Date().getTime();
    const timelineDelta = targetEventDate - activeTime;

    if (timelineDelta <= 0) {
        document.getElementById('countdown-timer').innerHTML = "<p style='color:#d4af37'>The Celebrations Have Commenced!</p>";
        return;
    }

    const d = Math.floor(timelineDelta / (1000 * 60 * 60 * 24));
    const h = Math.floor((timelineDelta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((timelineDelta % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((timelineDelta % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = d < 10 ? '0' + d : d;
    document.getElementById('hours').innerText = h < 10 ? '0' + h : h;
    document.getElementById('minutes').innerText = m < 10 ? '0' + m : m;
    document.getElementById('seconds').innerText = s < 10 ? '0' + s : s;
};

setInterval(runCountdown, 1000);
