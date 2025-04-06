const allWords = ['МАШИНА', 'КІТ', 'СОБАКА', 'КОМП’ЮТЕР', 'СТІЛ', 'СТІЛЕЦЬ'];
let currentWordIndex = 0;

let roundNumber = 1; 
let currentTeamNumber = 1; 

let team1Score = 0; 
let team2Score = 0; 

const roundResults = [];

const showWelcomePage = () => {
    const root = document.getElementById('root');
    root.innerHTML = `
        <div class="page1-container">
            <h1>АЛІАС</h1>
            <h2>ГРА В СЛОВА</h2>
            <button id="start-game-button" class="page1-button">НОВА ГРА</button>
        </div>
    `;

    document.getElementById('start-game-button').addEventListener('click', showRoundPage);
};

const showRoundPage = () => {
    const root = document.getElementById('root');
    root.innerHTML = `
        <div class="page2-container">
            <header class="round-header">
                <div class="header-info">
                    <span><span id="round-number"></span> РАУНД</span>
                    <span id="timer">38</span>
                    <span><span id="team-number"></span> КОМАНДА</span>
                </div>
                <div class="progress-bar">
                    <div id="progressBar" class="progress"></div>
                </div>
            </header>
            <main>
                <div class="card">
                    <div class="card-border"></div>
                    <span id="word-container"></span>
                </div>
            </main>
            <div class="controls">
                <div class="button cross" id="not-guessed-word-button">
                    <i class="fas fa-times"></i> 
                </div>
                <div class="button check" id="correct-word-button">
                    <i class="fas fa-check"></i> 
                </div>
            </div>
            <footer>
                <div class="footer-buttons">
                    <div class="footer-button menu-button">МЕНЮ</div>
                    <div id="next-round-button" class="footer-button continue-button">ПРОДОВЖИТИ</div>
                </div>
            </footer>
        </div>
    `;

    document.getElementById('round-number').innerText = roundNumber;
    document.getElementById('team-number').innerText = currentTeamNumber;
    updateWord();

    document.getElementById('correct-word-button').addEventListener('click', guessCurrentWord);
    document.getElementById('not-guessed-word-button').addEventListener('click', markAsNotGuessed); 
    document.getElementById('next-round-button').addEventListener('click', showRoundResultPage);
};

const updateWord = () => {
    const wordContainer = document.getElementById('word-container');
    if (currentWordIndex < allWords.length) {
        wordContainer.innerText = allWords[currentWordIndex];
    } else {
        showRoundResultPage(); 
    }
};

const guessCurrentWord = () => {
    roundResults.push({ word: allWords[currentWordIndex], guessed: true });
    if (currentTeamNumber === 1) {
        team1Score++; 
    } else {
        team2Score++;  
    }
    currentWordIndex++; 
    updateWord();
};

const markAsNotGuessed = () => {
    roundResults.push({ word: allWords[currentWordIndex], guessed: false });
    currentWordIndex++; 
    updateWord();
};

const showRoundResultPage = () => {
    const root = document.getElementById('root');

    root.innerHTML = `
        <div class="page3-container">
            <h1>РЕЗУЛЬТАТИ РАУНДУ</h1>
            <div class="score">
                <span class="score-label">КІЛЬКІСТЬ НАБРАНИХ БАЛІВ ЗА <span id="round-number">${roundNumber}</span> РАУНД:</span>
                <span id="score-number">${team1Score}</span>
            </div>
            <div class="list" id="round-result-words"></div>
            <footer>
                <div class="footer-buttons">
                    <button class="footer-button menu-button">МЕНЮ</button>
                    <button id="continue-button" class="footer-button continue-button">ПРОДОВЖИТИ</button>
                </div>
            </footer>
        </div>
    `;

    const resultContainer = document.getElementById('round-result-words');

    roundResults.forEach(({ word, guessed }) => {
        const wordDiv = document.createElement('div');
        wordDiv.className = guessed ? 'item green' : 'item red'; 
        wordDiv.innerText = word;
        resultContainer.appendChild(wordDiv);
    });

    document.getElementById('continue-button').addEventListener('click', showGameResultPage);
};

const showGameResultPage = () => {
    const root = document.getElementById('root');
    root.innerHTML = `
        <div class="page4-container">
            <div class="header">РЕЗУЛЬТАТИ ГРИ</div>
            <div class="team">
                <div class="team-name">1 КОМАНДА</div>
                <div class="team-score">${team1Score}</div>
            </div>
            <div class="team">
                <div class="team-name">2 КОМАНДА</div>
                <div class="team-score">${team2Score}</div>
            </div>
            <footer>
                <div class="footer-buttons">
                    <button class="footer-button menu-button">МЕНЮ</button>
                </div>
            </footer>
        </div>
    `;
};

showWelcomePage();
