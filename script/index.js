let activeMoles = []; // Variabile globale per tenere traccia delle talpe attive

/*
    ____  ____  _____   ________________  ___    __    ______
   / __ \/ __ \/  _/ | / / ____/  _/ __ \/   |  / /   / ____/
  / /_/ / /_/ // //  |/ / /    / // /_/ / /| | / /   / __/   
 / ____/ _, _// // /|  / /____/ // ____/ ___ |/ /___/ /___   
/_/   /_/ |_/___/_/ |_/\____/___/_/   /_/  |_/_____/_____/   
                                                             
*/
function main() {
    let tableInput = parseInt(document.getElementById('tableInput').value);
    let vel = parseInt(document.getElementById('vel').value);
    let settingsDiv = document.getElementById('settings');

    // primo controllo
    if (isNaN(tableInput) || tableInput < 3 || tableInput > 5 || isNaN(vel) || vel < 1500 || vel > 2000) {
        alert('Valore non valido! Riprova!');
        return;
    }    
    
    // nascondo i settings
    settingsDiv.classList.add('hidden');
    
    // Imposto il cursore personalizzato (martello) /non va!!!!/
    // document.body.style.cursor = "url('../hammer.png'), auto"; 

    // inizio a creare la tabella
    creaTabella(tableInput);

    // genero la talpa
    let moleCount = 3;
    newMole(vel, tableInput, moleCount);

    // gioco effettivo
    game();
}

/*
  _________    ____  ________    __    ___ 
 /_  __/   |  / __ )/ ____/ /   / /   /   |
  / / / /| | / __  / __/ / /   / /   / /| |
 / / / ___ |/ /_/ / /___/ /___/ /___/ ___ |
/_/ /_/  |_/_____/_____/_____/_____/_/  |_|                                          
*/
function creaTabella(tableInput) {
    let table = document.getElementById('gameBoard');
    let x = 0;
    let y = 0;

    for (let i = 0; i < tableInput; i++) {
        // crea una nuova riga
        const newTr = document.createElement('tr');
        x++;
        y = 0;
        for (let j = 0; j < tableInput; j++) {
            // crea una nuova cella
            const newTd = document.createElement('td');
            newTd.classList.add('cell');
            const newBtn = document.createElement('button');
            // assegno un nuovo id
            newBtn.id = `${x}-${y}`;
            // assegno pure la classe
            newBtn.classList.add('btn-cell');
            // aggiungo il btn alla cella
            newTd.appendChild(newBtn);
            // aggiungo la cella alla riga
            newTr.appendChild(newTd);
            y++;
        }

        // aggiungo la riga alla tabella
        table.appendChild(newTr);
    }
    return;
}

/*
   ______________  __________ 
  / ____/  _/ __ \/ ____/ __ \
 / / __ / // / / / /   / / / / 
/ /_/ // // /_/ / /___/ /_/ / 
\____/___/\____/\____/\____/                               
*/
function game() {
    let score = 0; // Inizializza il punteggio

    // Trova tutti i bottoni generati nella tabella
    const buttons = document.querySelectorAll('.btn-cell');

    // Aggiunge un listener a ogni bottone
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Controlla se il bottone è una talpa attiva (cioè presente nell'array activeMoles)
            const moleId = button.id;
            if (activeMoles.includes(moleId)) {
                // Se la talpa è stata "colpita", rimuovila dall'array activeMoles
                const index = activeMoles.indexOf(moleId);
                if (index !== -1) {
                    activeMoles.splice(index, 1); // Rimuove la talpa dall'array
                }

                // Rimuove l'evidenziazione della talpa
                button.classList.remove('active-mole');

                // Aggiungi 2 punti
                score += 2;
                console.log('Talpa eliminata! +2 punti!');
            } else {
                // Se il bottone non è una talpa, togli 1 punto
                score -= 1;
                console.log('Errore! -1 punto!');
            }

            // Aggiorna il punteggio nell'interfaccia (se hai un elemento con id 'score')
            const scoreDisplay = document.getElementById('score');
            if (scoreDisplay) {
                scoreDisplay.textContent = `Punteggio: ${score}`;  // Mostra il punteggio aggiornato
            }
        });
    });
}

/*
   _____________   ____________  ___ 
  / ____/ ____/ | / / ____/ __ \/   |
 / / __/ __/ /  |/ / __/ / /_/ / /| |
/ /_/ / /___/ /|  / /___/ _, _/ ___ |
\____/_____/_/ |_/_____/_/ |_/_/  |_|                                     
*/
function newMole(vel, tableInput, moleCount) {
    setInterval(() => {
        // Rimuovi l'evidenziazione dalle talpe attive precedenti
        activeMoles.forEach(moleId => {
            const moleButton = document.getElementById(moleId);
            if (moleButton) {
                moleButton.classList.remove('active-mole');
            }
        });

        // Resetta l'array delle talpe attive
        activeMoles = [];

        // Funzione per generare talpe con un ritardo
        const generateMoleWithDelay = (index) => {
            if (index < moleCount) {
                const x = Math.floor(Math.random() * tableInput) + 1; // Da 1 a tableInput
                const y = Math.floor(Math.random() * tableInput);     // Da 0 a (tableInput - 1)
                const moleId = `${x}-${y}`;

                // Assicurati che non ci siano duplicati
                if (!activeMoles.includes(moleId)) {
                    activeMoles.push(moleId);

                    // Evidenzia la nuova talpa
                    const moleButton = document.getElementById(moleId);
                    if (moleButton) {
                        moleButton.classList.add('active-mole');
                    }
                } else {
                    // Se c'è un duplicato, tenta di rigenerarla
                    generateMoleWithDelay(index);
                    return;
                }

                // Chiamata ricorsiva per la talpa successiva con ritardo
                setTimeout(() => generateMoleWithDelay(index + 1), 300); // 300ms di ritardo
            }
        };

        // Inizia la generazione delle talpe con ritardo
        generateMoleWithDelay(0);
        
    }, vel);
}
