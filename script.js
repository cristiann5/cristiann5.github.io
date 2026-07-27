// Seleziona lo span e imposta il suo contenuto al corrente anno
document.getElementById("current-year").textContent = new Date().getFullYear();

const canvas = document.getElementById('snow');
const ctx = canvas.getContext('2d');

// Ridimensiona il canvas a schermo intero
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Configurazione dei puntini
const numFlakes = 50; // Quanti puntini vuoi sullo schermo
const flakes = [];

for (let i = 0; i < numFlakes; i++) {
    flakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1, // Dimensione (da 1 a 3 pixel)
        d: Math.random() * numFlakes // Velocità di oscillazione
    });
}

// Disegna e muove i puntini
function drawFlakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; // Colore bianco semi-trasparente
    ctx.beginPath();
    
    for (let i = 0; i < numFlakes; i++) {
        const f = flakes[i];
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
        
        // Aggiorna la posizione per farli scendere
        f.y += Math.random() * 1 + 0.5; // Velocità di caduta verso il basso
        f.x += Math.sin(f.d) * 0.2; // Leggero movimento oscillatorio laterale
        
        // Se il puntino esce dal fondo, rinasce in alto
        if (f.y > canvas.height) {
            flakes[i] = { x: Math.random() * canvas.width, y: 0, r: f.r, d: f.d };
        }
    }
    ctx.fill();
    requestAnimationFrame(drawFlakes);
}

drawFlakes();
