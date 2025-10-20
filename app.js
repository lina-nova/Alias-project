let allWords = JSON.parse(localStorage.getItem('allWords')) || [];

let currentWordIndex = 0;
let roundNumber = 1;
let currentTeamNumber = 1;

let team1Score = 0;
let team2Score = 0;

const roundDuration = 60;
let remainingTime = roundDuration;
let roundLastWordIndex = allWords.length - 1;

let intervalId;

const roundResults = [];
let isGamePaused = false;
let isRoundInProgress = false;

const allowSettings = false;

const saveWordsToLocalStorage = () => {
    localStorage.setItem('allWords', JSON.stringify(allWords));
};

const stopTimer = () => {
    clearInterval(intervalId);
    intervalId = 0;
};

const showWelcomePage = () => {
    const root = document.getElementById('root');
    root.innerHTML = `
        <div class="page1-container">
            <h1>АЛІАС</h1>
            <h2>ГРА В СЛОВА</h2>
            <div class="button-container">
                <button id="start-game-button" class="page1-button">НОВА ГРА</button>
                ${isGamePaused ? '<button id="continue-game-button" class="page1-button">ПРОДОВЖИТИ</button>' : ''} 
                ${allowSettings && !isGamePaused ? '<button id="settings-button" class="page1-button">НАЛАШТУВАННЯ</button>' : ''}
            </div>
        </div>
    `;

    document.getElementById('start-game-button').addEventListener('click', () => {
        isGamePaused = false;
        resetGameState();
        showRoundPage();
      });
  
    if (isGamePaused) {
        document.getElementById('continue-game-button').addEventListener('click', () => {
            isGamePaused = false;
            if (isRoundInProgress) {
                showRoundPage();
            } else {
                showRoundResultPage();
            }
        });
    } else if (allowSettings) {
        document.getElementById('settings-button').addEventListener('click', showSettingsPage);
    }
};
  
const resetGameState = () => {
    currentWordIndex = 0;
    roundNumber = 1;
    currentTeamNumber = 1;
    team1Score = 0;
    team2Score = 0;
    remainingTime = roundDuration;
    roundResults.length = 0;
  };
  
const showSettingsPage = () => {
      const root = document.getElementById('root');
      root.innerHTML = `
          <div class="page5-container">
              <h1 class="settings-header">Редагувати список слів</h1>
              <textarea 
                  id="word-list-textarea" 
                  maxlength="2000"
                  class="words-textarea"
                  placeholder="Введіть слова через кому"
              >${allWords.join(', ')}</textarea>
              <footer>
                  <div class="footer-buttons">
                      <button class="footer-button menu-button" id="back-button">МЕНЮ</button>
                  </div>
              </footer>
          </div>
      `;
  
      document.getElementById('back-button').addEventListener('click', () => {
          const newWords = document.getElementById('word-list-textarea').value
              .split(',')
              .map(word => word.trim())
              .filter(word => word !== "");
          allWords.length = 0;
          allWords.push(...newWords);
          saveWordsToLocalStorage();
          showWelcomePage();
        });
};

const showRoundPage = () => {
    roundLastWordIndex = allWords.length - 1;
    const root = document.getElementById('root');
    root.innerHTML = `
        <div class="page2-container">
            <header class="round-header">
                <div class="header-info">
                    <span>${roundNumber} РАУНД</span>
                    <span id="timer">${remainingTime}</span>
                    <span>${currentTeamNumber} КОМАНДА</span>
                </div>
                <div class="progress-bar">
                    <div id="progressBar" class="progress"></div>
                </div>
            </header>
            <main class="page-scroll-container">
              <div class="page-content">
                  <div class="card">
                      <div class="card-border"></div>
                      <span id="word-container"></span>
                  </div>
                  <div class="controls">
                      <div class="button cross" id="not-guessed-word-button">
                          <i class="fas fa-times"></i> 
                      </div>
                      <div class="button check" id="correct-word-button">
                          <i class="fas fa-check"></i> 
                      </div>
                  </div>
              </div>
            </main>
            <footer>
                <div class="footer-buttons">
                    <div class="footer-button menu-button" id="menu-button">МЕНЮ</div>
                    <div id="next-round-button" class="footer-button continue-button">ПРОДОВЖИТИ</div>
                </div>
            </footer>
        </div>
    `;
  
    startTimer();
    updateWord();
  
    document.getElementById('correct-word-button').addEventListener('click', guessCurrentWord);
    document.getElementById('not-guessed-word-button').addEventListener('click', markAsNotGuessed);
    document.getElementById('next-round-button').addEventListener('click', showRoundResultPage);
  };
  
const startTimer = () => {
    const timerElement = document.getElementById('timer');
    const progressBar = document.getElementById('progressBar');
  
    progressBar.style.width = '100%';
    progressBar.style.transition = `width ${roundDuration}s linear`;
  
    intervalId = setInterval(() => {
        remainingTime--;
        timerElement.innerText = remainingTime;
  
        if (remainingTime <= 0) {
            stopTimer();
            roundLastWordIndex = currentWordIndex;
        }
    }, 1000);
  
    setTimeout(() => {
        progressBar.style.width = '0%';
    }, 10);
  };
  
const updateWord = () => {
    const wordContainer = document.getElementById('word-container');
    if (currentWordIndex <= roundLastWordIndex) {
        wordContainer.innerText = allWords[currentWordIndex];
    } else {
        showRoundResultPage();
    }
  };
  
const guessCurrentWord = () => {
    if (currentWordIndex <= roundLastWordIndex) {
        roundResults.push({ word: allWords[currentWordIndex], guessed: true });
        if (currentTeamNumber === 1) {
            team1Score++;
        } else {
            team2Score++;
        }
        currentWordIndex++;
        updateWord();
    }
  };
  
const markAsNotGuessed = () => {
    if (currentWordIndex <= roundLastWordIndex) {
        roundResults.push({ word: allWords[currentWordIndex], guessed: false });
  
        if (currentTeamNumber === 1) {
            team1Score--;
        } else {
            team2Score--;
        }
  
        currentWordIndex++;
        updateWord();
    }
  };
  
const showRoundResultPage = () => {
    stopTimer();
  
const root = document.getElementById('root');
    root.innerHTML = `
        <div class="page3-container">
          <main class="page-scroll-container">
              <div class="page-content">
                  <h1>РЕЗУЛЬТАТИ РАУНДУ</h1>
                  <div class="score">
                      <span class="score-label">КІЛЬКІСТЬ НАБРАНИХ БАЛІВ:</span>
                      <span id="score-number">${currentTeamNumber === 1 ? team1Score : team2Score}</span>
                  </div>
                  <div class="list" id="round-result-words"></div>
              </div>
          </main>
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
  
    document.getElementById('continue-button').addEventListener('click', startNextRound);
  };
  
const startNextRound = () => {
    roundResults.length = 0;
    currentTeamNumber = currentTeamNumber === 1 ? 2 : 1;
    roundNumber++;
    remainingTime = roundDuration;
  
    if (currentWordIndex >= allWords.length) {
        showGameResultPage();
    } else {
        showRoundPage();
    }
  };
  
const showGameResultPage = () => {
    const root = document.getElementById('root');
    root.innerHTML = `
        <div class="page4-container">
            <header class="header">РЕЗУЛЬТАТИ ГРИ</header>
            <main class="page-scroll-container">
              <div class="page-content">
                  <div class="team">
                      <div class="team-name">1 КОМАНДА</div>
                      <div class="team-score">${team1Score}</div>
                  </div>
                  <div class="team">
                      <div class="team-name">2 КОМАНДА</div>
                      <div class="team-score">${team2Score}</div>
                  </div>
              </div>
            </main>
            <footer>
                <div class="footer-buttons">
                    <button id="end-game-button" class="end-game-btn">ЗАВЕРШИТИ ГРУ</button>
                </div>
            </footer>
        </div>
    `;
  
    document.getElementById('end-game-button').addEventListener('click', () => {
        resetGameState(); // Скидання стану гри для нового запуску
        showWelcomePage(); // Повернення до домашньої сторінки
    });
  };

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('menu-button')) {
        const roundInProgress = intervalId !== 0;
        stopTimer();
        isGamePaused = true;
        isRoundInProgress = roundInProgress;
        showWelcomePage();
    }
  });

async function loadGameData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        const { words: wordsDataset } = data;
        const gameId = window.location.search.match(/id=(\d+)/)[1];
        const randomizedList = randomizeList(wordsDataset[gameId]);
        allWords = randomizedList;
    } catch (error) {
        const errorMessage = error.toString();
        document.getElementById('root').innerHTML = errorMessage;
        throw error;
    }
}

function randomizeList(array) {
    // Alternative: assign random key, then sort by it
    // This creates a shallow copy, does not mutate original array
    return array
        .map(item => ({ item, sortKey: Math.random() }))
        .sort((a, b) => a.sortKey - b.sortKey)
        .map(({ item }) => item);
}

loadGameData().then(showWelcomePage);
