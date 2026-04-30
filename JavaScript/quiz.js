const questions = [
    {
        question: "Qu'est-ce que 'typeof null' retourne en JavaScript ?",
        reponses: ["null", "undefined", "object", "string"],
        bonne: 2,
        xp: 20
    },
    {
        question: "Quelle méthode ajoute un élément à la fin d'un tableau ?",
        reponses: ["push()", "pop()", "shift()", "splice()"],
        bonne: 0,
        xp: 15
    },
    {
        question: "C'est quoi une fonction fléchée ?",
        reponses: ["function foo()", "foo => ()", "() => {}", "→ function"],
        bonne: 2,
        xp: 15
    },
    {
        question: "Quel sélecteur CSS cible les éléments avec la classe 'kawaii' ?",
        reponses: ["#kawaii", ".kawaii", "*kawaii", "kawaii"],
        bonne: 1,
        xp: 10
    },
    {
        question: "Que fait 'display: flex' ?",
        reponses: ["Cache l'élément", "Active flexbox", "Centre le texte", "Ajoute une bordure"],
        bonne: 1,
        xp: 10
    },
    {
        question: "Qu'est-ce que le DOM ?",
        reponses: ["Un langage", "Une base de données", "La structure HTML en objet JS", "Un framework"],
        bonne: 2,
        xp: 20
    },
    {
        question: "Quelle balise HTML pour un lien ?",
        reponses: ["<link>", "<a>", "<href>", "<url>"],
        bonne: 1,
        xp: 10
    },
    {
        question: "Que retourne '1' + 1 en JS ?",
        reponses: ["2", "11", "'11'", "Erreur"],
        bonne: 2,
        xp: 20
    },
    {
        question: "C'est quoi 'localStorage' ?",
        reponses: ["Un serveur", "Stockage local navigateur", "Une variable globale", "Une API"],
        bonne: 1,
        xp: 15
    },
    {
        question: "Que fait 'event.preventDefault()' ?",
        reponses: ["Supprime l'event", "Bloque le comportement par défaut", "Recharge la page", "Cache un élément"],
        bonne: 1,
        xp: 20
    }
];


let questionActuelle = 0;
let timerInterval = null;
let tempsRestant = 15;
const TEMPS_MAX = 15;

//lancement quiz 
function lancerQuiz() {
    questionActuelle = 0;
    afficherQuestion();
}

function afficherQuestion() {
    // Si toutes les questions sont finies
    if (questionActuelle >= questions.length) {
        finQuiz();
        return;
    }

    const q = questions[questionActuelle];

    // Numéro question
    document.getElementById('numero-question').textContent = 
        `Question ${questionActuelle + 1} / ${questions.length}`;

    // Texte question
    document.getElementById('question').textContent = q.question;

    // Réponses
    const reponsesDiv = document.getElementById('reponses');
    reponsesDiv.innerHTML = '';

    q.reponses.forEach((rep, index) => {
        const btn = document.createElement('button');
        btn.textContent = rep;
        btn.addEventListener('click', () => choisirReponse(index));
        reponsesDiv.appendChild(btn);
    });

    // Cacher feedback
    const feedback = document.getElementById('feedback');
    feedback.className = 'hidden';
    feedback.textContent = '';

    // Lancer timer
    lancerTimer();
}

// Timer
function lancerTimer() {
    clearInterval(timerInterval);
    tempsRestant = TEMPS_MAX;
    const fill = document.getElementById('timer-fill');
    fill.style.width = '100%';
    fill.style.background = '#c2185b';

    timerInterval = setInterval(() => {
        tempsRestant -= 0.1;
        const pourcent = (tempsRestant / TEMPS_MAX) * 100;
        fill.style.width = pourcent + '%';

        // Rouge si urgent
        if (tempsRestant <= 5) {
            fill.style.background = '#ff0000';
        }

        // Temps écoulé
        if (tempsRestant <= 0) {
            clearInterval(timerInterval);
            tempsEcoule();
        }
    }, 100);
}

// Temps écoulé sans réponse
function tempsEcoule() {
    bloquerReponses();
    afficherFeedback(false, "⏰ Trop lent ! -1 vie");
    perdreVie();
    setTimeout(() => {
        questionActuelle++;
        afficherQuestion();
    }, 2000);
}

// Joueur choisit une réponse
function choisirReponse(index) {
    clearInterval(timerInterval);
    bloquerReponses();

    const q = questions[questionActuelle];
    const bonne = index === q.bonne;

    // Colorer boutons
    const boutons = document.querySelectorAll('#reponses button');
    boutons[q.bonne].style.background = '#00c864';
    boutons[q.bonne].style.color = 'white';

    if (!bonne) {
        boutons[index].style.background = '#ff0032';
        boutons[index].style.color = 'white';
    }

    if (bonne) {
        afficherFeedback(true, `✅ Bonne réponse ! +${q.xp} XP`);
       gagnerXP(q.xp);
        gagnerScore(10);  
    } else {
        afficherFeedback(false, "❌ Mauvaise réponse ! -1 vie");
        perdreVie();
    }

    setTimeout(() => {
        questionActuelle++;
        afficherQuestion();
    }, 2000);
}

// Bloque tous les boutons réponses
function bloquerReponses() {
    document.querySelectorAll('#reponses button').forEach(btn => {
        btn.disabled = true;
    });
}

// Affiche le feedback correct/incorrect
function afficherFeedback(correct, texte) {
    const feedback = document.getElementById('feedback');
    feedback.textContent = texte;
    feedback.className = correct ? 'correct' : 'incorrect';
}

// Fin de toutes les questions
function finQuiz() {
    // Si niveau 5 → boss fight
    if (niveauActuel === 5) {
        lancerBoss();
    } else {
        // Relancer avec nouvelles questions mélangées
        questionActuelle = 0;
        afficherQuestion();
    }
}