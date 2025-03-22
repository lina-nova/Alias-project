const myElement = 4;
let anotherElement = 5;

const myFunction = () => {
    console.log('Hello worlds');
}

const showWelcomePage = () => {
    const root = document.getElementById('root');
    root.innerHTML = `
        <div class="page1-container">
            <h1>АЛІАС</h1>
            <h2>ГРА В СЛОВА</h2>
            <button id="start-game-button" class="page1-button">НОВА ГРА</button>
        </div>
    `

    const startGameButton = document.getElementById('start-game-button')
    startGameButton.addEventListener('click', showRoundPage)
}

const showRoundPage = () => {
    const root = document.getElementById('root');
    root.innerHTML = `
        <div class="page2-container">
            <header class="round-header">
              <div class="header-info">
                <span>
                    <span id="round-number"></span> РАУНД
                </span>
                <span id="timer">38</span>
                <span>
                    <span id="team-number"></span> КОМАНДА
                </span>
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
              <div class="button cross">
                <i class="fas fa-times"></i>
              </div>
              <div class="button check" id="correct-word-button">
                <i class="fas fa-check"></i>
              </div>
            </div>
            <footer>
              <div class="footer-buttons">
                <div class="footer-button">МЕНЮ</div>
                <div class="footer-button">ПРОДОВЖИТИ</div>
              </div>
            </footer>
        </div>
    `

    const roundNumberElement = document.getElementById('round-number');
    roundNumberElement.innerText = roundNumber;

    const teamNumberElement = document.getElementById('team-number');
    teamNumberElement.innerText = currentTeamNumber;

    const wordContainer = document.getElementById('word-container');
    const currentWord = allWords[currentWordIndex];
    wordContainer.innerHTML = currentWord;

    const correctWordButton = document.getElementById('correct-word-button');
    correctWordButton.addEventListener('click', guessCurrentWord);
}

const guessCurrentWord = () => {
    const currentWord = allWords[currentWordIndex];
    guessedWords.push(currentWord);
    currentWordIndex = currentWordIndex + 1;
    if (currentTeamNumber === 1) {
        team1Score = team1Score + 1;
    }
    if (currentTeamNumber === 2) {
        team2Score = team2Score + 1;
    }

    const wordContainer = document.getElementById('word-container');
    const nextWord = allWords[currentWordIndex];
    wordContainer.innerHTML = nextWord;
}

const allWords = ['МАШИНА', 'КІТ', 'СОБАКА', 'КОМПЬЮТЕР'];
let currentWordIndex = 0;

let roundNumber = 1;
let currentTeamNumber = 1;

let team1Score = 0;
let team2Score = 0;

const guessedWords = [];
const skippedWords = [];

showWelcomePage();