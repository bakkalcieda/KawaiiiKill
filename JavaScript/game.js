// Je stocke le niveau actuel du joueur
let niveauActuel = 1;

// Je stocke les vies (3 au départ)
let vies = 3;

// Je stocke l'XP actuelle et l'XP nécessaire pour level up
let xp = 0;
let xpMax = 100;

// Je stocke le score total
let score = 0;

// Je récupère tous les écrans dont j'ai besoin
const titreScreen = document.getElementById('titre-screen');
const gameContainer = document.getElementById('game-container');
const hudElement = document.getElementById('hud');
const persoContainer = document.getElementById('perso-container');
const gameoverScreen = document.getElementById('gameover');
const victoireScreen = document.getElementById('victoire-screen');
const evolutionScreen = document.getElementById('evolution-screen');
//  cacher tt les ecrand d'un coup 
function cacherTousLesEcrans() {
    titreScreen.classList.add('hidden');
    gameContainer.classList.add('hidden');
    gameoverScreen.classList.add('hidden');
    victoireScreen.classList.add('hidden');
    evolutionScreen.classList.add('hidden');
}
//  affichage écran précis 
function afficherEcran(ecran) {
    cacherTousLesEcrans();
    ecran.classList.remove('hidden');
}

//  changement du théme en fonction du niveau
function changerTheme(niveau) {
    document.body.className = `level-${niveau}`;
}
// -----------------------
//  mise a jour affichage des vies dans le hud
function mettreAJourVies() {
    // Je récupère tous les coeurs
    const coeurs = document.querySelectorAll('.coeur');
    // Je parcours chaque coeur avec forEach
    coeurs.forEach((coeur, index) => {
        // Si le coeur est "en vie" je l'affiche normal, sinon je le grise
        if (index < vies) {
            coeur.textContent = '❤️';
            coeur.style.opacity = '1';
        } else {
            coeur.textContent = '🖤';
            coeur.style.opacity = '0.4';
        }
    });
}
// ----------------------
//  mise a jour de la barre xp dans le hud
function mettreAJourXP() {
    const pourcentage = (xp / xpMax) * 100;
    document.getElementById('xp-fill').style.width = pourcentage + '%';
    document.getElementById('xp-texte').textContent = `${xp} / ${xpMax} XP`;   
}
//  mise a jour scor affiché dans le HUD
function mettreAJourScore() {
    document.getElementById('score-texte').textContent = score;
}
//  mise à jour badge de niv dans lehud
function mettreAJourNiveau() {
    document.getElementById('niveau-texte').textContent = `Niveau ${niveauActuel}`;
}