// Elements
const evolutionScreen = document.getElementById('evolution-screen');
const evolutionTitre = document.getElementById('evolution-titre');
const evoImgAvant = document.getElementById('evo-img-avant');
const evoImgApres = document.getElementById('evo-img-apres');
const evoLabelAvant = document.getElementById('evo-label-avant');
const evoLabelApres = document.getElementById('evo-label-apres');
const evoDescription = document.getElementById('evo-description');
const evoContinueBtn = document.getElementById('evo-continue-btn');

// Textes par niveau
const EVOLUTION_TEXTES = {
    2: "Tu commences à chauffer... 🔥",
    3: "Les bugs tremblent devant toi ! ⚡",
    4: "Tu es presque inarrêtable... 💀",
    5: "FORME ULTIME DÉBLOQUÉE ! 🐰👑"
};

// Lancer écran évolution
function lancerEvolution(niveau) {
    // Images avant / après
    evoImgAvant.src = EVOLUTIONS[niveau - 1];
    evoImgApres.src = EVOLUTIONS[niveau];

    // Labels
    evoLabelAvant.textContent = `LVL ${niveau - 1}`;
    evoLabelApres.textContent = `LVL ${niveau}`;

    // Titre + description
    evolutionTitre.textContent = `✨ NIVEAU ${niveau} DÉBLOQUÉ ! ✨`;
    evoDescription.textContent = EVOLUTION_TEXTES[niveau];

    // Afficher l'écran
    afficherEcran(evolutionScreen);

    // Mettre à jour le perso
    changerNiveau(niveau);
}

// Bouton continuer
evoContinueBtn.addEventListener('click', () => {
    afficherEcran(gameContainer);
    lancerVague();
});
