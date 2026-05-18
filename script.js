// --- 1. SCRATCH CARD MECHANISM ---
const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 300;
canvas.height = 180;

// Fill canvas with a golden/grey cover layer
ctx.fillStyle = '#7a683c'; 
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Add text instruction on the cover layer
ctx.fillStyle = '#ffffff';
ctx.font = '16px Poppins';
ctx.textAlign = 'center';
ctx.fillText('Scratch Here to Reveal', canvas.width / 2, canvas.height / 2 + 5);

let isDrawing = false;

function scratch(e) {
    if (!isDrawing) return;
    
    // Get correct coordinates for mouse or touch
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.globalCompositeOperation = 'destination-out'; // This cuts a hole in the canvas
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2); // 20 is brush size
    ctx.fill();
}

// Event Listeners for Desktop & Mobile
canvas.addEventListener('mousedown', () => isDrawing = true);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mousemove', scratch);

canvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); });
canvas.addEventListener('touchend', () => isDrawing = false);
canvas.addEventListener('touchmove', scratch);


// --- 2. COUNTDOWN TIMER ---
// Set your target wedding date here
const weddingDate = new Date("November 20, 2026 11:00:00").getTime();

const timerInterval = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

    if (distance < 0) {
        clearInterval(timerInterval);
        document.getElementById("countdown").innerHTML = "<h3>The Celebration Has Begun! 🎉</h3>";
    }
}, 1000);

