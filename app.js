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
                <span>1 РАУНД</span>
                <span id="timer">38</span>
                <span>1 КОМАНДА</span>
              </div>
              <div class="progress-bar">
                <div id="progressBar" class="progress"></div>
              </div>
            </header>
            <main>
              <div class="card">
                <div class="card-border"></div>
                <span>МАШИНА</span>
              </div>
            </main>
            <div class="controls">
              <div class="button cross">
                <i class="fas fa-times"></i>
              </div>
              <div class="button check">
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
}

showWelcomePage();