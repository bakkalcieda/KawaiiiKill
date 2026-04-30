let bossHP = 100;
let bossHPMax = 100;
let joueurHP = 3; // = tes vies
let bossPhase = 1;

const BOSS_DIALOGUES = {
    attaque: [
        "Tu croyais pouvoir me battre ? 😈",
        "Ton code est aussi nul que toi ! 💀",
        "ERREUR 404 : talent introuvable ! 🔥",
        "Je suis l'IA ultime, tu n'es qu'un bug ! ⚡"
    ],
    degats: [
        "Impossible... je suis inarrêtable ! 😤",
        "Un coup de chance, c'est tout ! 😠",
        "Tu vas le regretter ! 💢",
        "Aïe... mais je suis loin d'être vaincu ! 😡"
    ],
    phase2: "PHASE 2 ACTIVÉE... tu m'as énervé ! 🔴💀",
    mort: "Non... impossible... je suis une IA... je... reviendrai... 💀"
};

function lancerBoss() {
    // Reset variables
    bossHP = 100;
    bossHPMax = 100;
    bossPhase = 1;

    // Afficher l'écran boss
    cacherTousLesEcrans();
    document.getElementById('boss-screen').classList.remove('hidden');
    hudElement.classList.remove('hidden');

    // Mettre à jour la barre HP boss
    mettreAJourHPBoss();

    // Dialogue d'intro
    bossParler("Alors... tu as survécu jusqu'ici ? Impressionnant. Mais c'est ici que ça s'arrête ! 😈");

    // Lancer les questions boss
    questionBossActuelle = 0;
    afficherQuestionBoss();
}


const questionsBoss = [
    {
        question: "Que fait 'Array.from({length: 3}, (_, i) => i)' ?",
        reponses: ["[1,2,3]", "[0,1,2]", "[undefined x3]", "Erreur"],
        bonne: 1,
        degats: 25
    },
    {
        question: "C'est quoi la différence entre '==' et '===' ?",
        reponses: [
            "Aucune différence",
            "=== vérifie type ET valeur",
            "== est plus strict",
            "=== ne marche qu'avec les strings"
        ],
        bonne: 1,
        degats: 25
    },
    {
        question: "Que retourne 'Promise.all([p1, p2])' si p2 échoue ?",
        reponses: [
            "Le résultat de p1",
            "undefined",
            "Une promesse rejetée",
            "null"
        ],
        bonne: 2,
        degats: 25
    },
    {
        question: "Que fait 'Object.freeze(obj)' ?",
        reponses: [
            "Supprime l'objet",
            "Empêche toute modification",
            "Clone l'objet",
            "Vide l'objet"
        ],
        bonne: 1,
        degats: 25
    }
];

let questionBossActuelle = 0;
let timerBossInterval = null;
let tempsBoss = 20;
const TEMPS_BOSS_MAX = 20;

function afficherQuestionBoss() {
    if (questionBossActuelle >= questionsBoss.length) {
        // Toutes les questions passées, le boss contre-attaque fort
        bossContreAttaque(30);
        return;
    }

    const q = questionsBoss[questionBossActuelle];

    document.getElementById('boss-question-texte').textContent = q.question;

    const reponsesDiv = document.getElementById('boss-reponses');
    reponsesDiv.innerHTML = '';

    q.reponses.forEach((rep, index) => {
        const btn = document.createElement('button');
        btn.textContent = rep;
        btn.addEventListener('click', () => choisirReponseBoss(index));
        reponsesDiv.appendChild(btn);
    });

    // Timer boss (20 secondes)
    lancerTimerBoss();
}

function lancerTimerBoss() {
    clearInterval(timerBossInterval);
    tempsBoss = TEMPS_BOSS_MAX;

    const fill = document.getElementById('boss-timer-fill');
    if (fill) fill.style.width = '100%';

    timerBossInterval = setInterval(() => {
        tempsBoss -= 0.1;
        const pourcent = (tempsBoss / TEMPS_BOSS_MAX) * 100;
        if (fill) fill.style.width = pourcent + '%';

        if (tempsBoss <= 0) {
            clearInterval(timerBossInterval);
            // Temps écoulé = le boss attaque
            bloquerReponsesBoss();
            bossParler("Trop lent ! Tu mérites ça ! 😈");
            bossContreAttaque(20);
        }
    }, 100);
}

function choisirReponseBoss(index) {
    clearInterval(timerBossInterval);
    bloquerReponsesBoss();

    const q = questionsBoss[questionBossActuelle];
    const bonne = index === q.bonne;

    // Colorier boutons
    const boutons = document.querySelectorAll('#boss-reponses button');
    boutons[q.bonne].style.background = '#00c864';
    boutons[q.bonne].style.color = 'white';

    if (!bonne) {
        boutons[index].style.background = '#ff0032';
        boutons[index].style.color = 'white';
    }

    if (bonne) {
        // Joueur attaque le boss !
        const degats = q.degats;
        bossParler(dialogueAleatoire(BOSS_DIALOGUES.degats));
        attackerBoss(degats);
        gagnerScore(50);
    } else {
        // Boss contre-attaque
        bossParler(dialogueAleatoire(BOSS_DIALOGUES.attaque));
        bossContreAttaque(15);
    }

    setTimeout(() => {
        questionBossActuelle++;
        if (bossHP > 0 && vies > 0) {
            afficherQuestionBoss();
        }
    }, 2000);
}

function bloquerReponsesBoss() {
    document.querySelectorAll('#boss-reponses button').forEach(btn => {
        btn.disabled = true;
    });
}

//------------------------------------------------------------------
//--------------- attaquer boss --------
function attackerBoss(degats) {
    bossHP -= degats;
    if (bossHP < 0) bossHP = 0;

    // Animation boss touché
    bossTouche();
    mettreAJourHPBoss();

    // Phase 2 si boss < 50%
    if (bossHP <= 50 && bossPhase === 1) {
        bossPhase = 2;
        activerPhase2();
    }

    // Boss mort ?
    if (bossHP <= 0) {
        setTimeout(() => bossDefaite(), 1000);
    }
}

//---------------------------------------------------------
function bossContreAttaque(degats) {
    perdreVie();
    
    // Animation
    document.getElementById('boss-img').style.filter = 'drop-shadow(0 0 30px red) brightness(2)';
    setTimeout(() => {
        document.getElementById('boss-img').style.filter = '';
    }, 500);
}

function activerPhase2() {
    bossParler(BOSS_DIALOGUES.phase2);

    // Flash rouge sur tout l'écran
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed; top: 0; left: 0;
        width: 100%; height: 100%;
        background: red; opacity: 0.4;
        z-index: 9999; pointer-events: none;
    `;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 600);

    // Boss image change (si tu as une image phase 2)
    document.getElementById('boss-img').style.filter = 'hue-rotate(180deg) brightness(1.5)';
}

//-----------------------------------
// defaite boss
function bossDefaite() {
    clearInterval(timerBossInterval);
    bossParler(BOSS_DIALOGUES.mort);

    setTimeout(() => {
        lancerVictoire();
    }, 2000);
}

//----------------------------------------------------
function mettreAJourHPBoss() {
    const pourcent = (bossHP / bossHPMax) * 100;
    const fill = document.getElementById('boss-hp-fill');
    fill.style.width = pourcent + '%';

    // Couleur selon HP
    if (pourcent > 60) fill.style.background = '#00c864';
    else if (pourcent > 30) fill.style.background = '#ff9800';
    else fill.style.background = '#ff0032';

    document.getElementById('boss-hp-texte').textContent = `${Math.max(0, bossHP)} / ${bossHPMax}`;
}

//---------------------------
function bossParler(texte) {
    const dialogue = document.getElementById('boss-dialogue');
    const texteEl = document.getElementById('boss-texte');
    texteEl.textContent = texte;
    dialogue.style.animation = 'none';
    dialogue.offsetHeight; // reflow
    dialogue.style.animation = '';
}

//----------------
function bossTouche() {
    const bossImg = document.getElementById('boss-img');
    bossImg.style.transform = 'translateX(20px)';
    setTimeout(() => bossImg.style.transform = 'translateX(-20px)', 100);
    setTimeout(() => bossImg.style.transform = 'translateX(10px)', 200);
    setTimeout(() => bossImg.style.transform = '', 300);
}

function dialogueAleatoire(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}