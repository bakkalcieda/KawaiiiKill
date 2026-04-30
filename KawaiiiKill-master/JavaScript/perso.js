const persoImg = document.getElementById('perso-img');
const persoContainer = document.getElementById('perso-container');

// Images par niveau
const EVOLUTIONS = {
    1: "images/Level1.jpg",
    2: "images/Level2.jpg",
    3: "images/Level3.jpg",
    4: "images/Level4.jpg",
    5: "images/Level5.jpg"
};

// Phrases au click
const phrases = [
    "Je vais tout casser ! 💀",
    "Tu peux le faire ! 🌸",
    "Focus ! 🎯",
    "J'ai soif de victoire 🐰",
    "Aucun bug ne me résiste ! ⚡"
];

// Créer bulle
const bubble = document.createElement('div');
bubble.id = 'perso-bubble';
persoContainer.appendChild(bubble);

let bubbleTimer = null;

// Click → bulle + shake JS
persoImg.addEventListener('click', () => {
    // Bulle
    bubble.textContent = phrases[Math.floor(Math.random() * phrases.length)];
    bubble.classList.add('visible');
    
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(() => {
        bubble.classList.remove('visible');
    }, 2000);
    
    // Shake via JS setInterval
    let angle = 0;
    let count = 0;
    const shake = setInterval(() => {
        angle = (angle === 8) ? -8 : 8;
        persoImg.style.transform = `rotate(${angle}deg)`;
        count++;
        if (count >= 6) {
            clearInterval(shake);
            persoImg.style.transform = '';
        }
    }, 60);
});

// Changer niveau
function changerNiveau(niveau) {
    persoImg.src = EVOLUTIONS[niveau];
    document.getElementById('perso-niveau-badge').textContent = `LVL ${niveau}`;
    
    // Changer glow
    persoImg.className = `glow-${niveau}`;
    
    // Flash blanc via JS
    persoImg.style.filter = 'brightness(5)';
    setTimeout(() => { persoImg.style.filter = ''; }, 300);
}

// Hit (perd une vie)
function persoHit() {
    persoImg.style.filter = 'drop-shadow(0 0 20px red) brightness(2)';
    setTimeout(() => { persoImg.style.filter = ''; }, 500);
}
