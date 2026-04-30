// Variables globales
let niveauActuel = 1;
let vies = 3;
let xp = 0;
let score = 0;
const XP_PAR_NIVEAU = 100;

// Elements DOM
const titreScreen = document.getElementById('titre-screen');
const hudElement = document.getElementById('hud');
const gameContainer = document.getElementById('game-container');
const gameoverScreen = document.getElementById('gameover');
const victoireScreen = document.getElementById('victoire-screen');
const evolutionScreen = document.getElementById('evolution-screen');

//  cacher tt les ecrans d'un coup 
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
    const pourcentage = (xp / XP_PAR_NIVEAU) * 100;
    document.getElementById('xp-fill').style.width = pourcentage + '%';
    document.getElementById('xp-texte').textContent = `${xp} / ${XP_PAR_NIVEAU} XP`;
}

//  mise a jour scor affiché dans le HUD
function mettreAJourScore() {
    document.getElementById('score-texte').textContent = score;
}

//  mise à jour badge de niv dans le hud
function mettreAJourNiveau() {
    document.getElementById('niveau-texte').textContent = `Niveau ${niveauActuel}`;
}

// j'ajoute de l'XP au joueur et je vérifie si level up
function gagnerXP(montant) {
    xp += montant;
    // jverifie que le joueur a assez de xp pour monter de niveau
    if (xp >= XP_PAR_NIVEAU) {
        xp = 0;
        niveauActuel++;
        if (niveauActuel > 5) {
            lancerVictoire();
            return;
        }
        changerTheme(niveauActuel);
        mettreAJourNiveau();
        lancerEvolution(niveauActuel);
    }
    mettreAJourXP();
}

// retrait 1 vie au joueur 
function perdreVie() {
    vies--;

    // J'appelle l'animation de hit sur le perso
    persoHit();

    // Je mets à jour l'affichage
    mettreAJourVies();

    // Je vérifie si le joueur a perdu toutes ses vies
    if (vies <= 0) {
        lancerGameOver();
    }
}

// j'aj des points au score
function gagnerScore(points) {
    score += points;
    mettreAJourScore();
}

// lancement game over 
function lancerGameOver() {
    afficherEcran(gameoverScreen);
    document.getElementById('gameover-score').textContent = `Score final : ${score}`;
    document.getElementById('gameover-niveau').textContent = `Niveau atteint : ${niveauActuel}`;
}

// lancement ecran de victoire 
function lancerVictoire() {
    afficherEcran(victoireScreen);
    document.getElementById('victoire-score').textContent = `Score : ${score}`;
}

// reinisialisation de tt le jeux
function reinitialiserJeu() {
    niveauActuel = 1;
    vies = 3;
    xp = 0;
    score = 0;
    // jremet le théme 1 + remet a jour les infos + perso nv1
    changerTheme(1);
    mettreAJourVies();
    mettreAJourXP();
    mettreAJourScore();
    mettreAJourNiveau();
    changerNiveau(1);
}

// DEMARage du jeu quand j'appuie sur START
document.getElementById('start-btn').addEventListener('click', () => {
    // Je cache le titre et j'affiche le hud + perso + jeu
    titreScreen.classList.add('hidden');
    hudElement.classList.remove('hidden');
    persoContainer.classList.remove('hidden');
    gameContainer.classList.remove('hidden');

    // Je lance les mises à jour initiales + lance le quiz //
    mettreAJourVies();
    mettreAJourXP();
    mettreAJourScore();
    mettreAJourNiveau();
    lancerQuiz();
});

// bouton restart du gameover//
document.getElementById('restart-btn').addEventListener('click', () => {
    reinitialiserJeu();
    afficherEcran(gameContainer);
    hudElement.classList.remove('hidden');
    persoContainer.classList.remove('hidden');
    lancerQuiz();
});

// bouton restart victoire //
document.getElementById('victoire-restart-btn').addEventListener('click', () => {
    reinitialiserJeu();
    afficherEcran(gameContainer);
    hudElement.classList.remove('hidden');
    persoContainer.classList.remove('hidden');
    lancerQuiz();
});

// demar avec théme level 1
changerTheme(niveauActuel);
