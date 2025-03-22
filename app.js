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
            <a href="/newgame" class="page1-button">НОВА ГРА</a>
        </div>
    `
}

showWelcomePage();