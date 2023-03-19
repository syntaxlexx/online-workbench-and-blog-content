const words = 'Proactively fabricate process manufacture results via prospective relationships Competently formulate intermittent models via parallel services Conveniently brand corporate strategic theme areas via best of breed infrastructures Holistic enable'
    .toLowerCase()
    .split(' ');
const wordsCount = words.length;
const gameTime = 30 * 1000; // 30s
window.timer = null;
window.gameStart = null

function addClass(el, name) {
    el.className += ' ' + name;
}

function removeClass(el, name) {
    el.className = el.className.replace(name, '')
}

function randomWord() {
    const randomIndex = Math.ceil(Math.random() * wordsCount);
    return words[randomIndex - 1]
}

function newGame() {
    document.getElementById('words').innerHTML = '';
    for (let i = 0; i < 200; i++) {
        document.getElementById('words').innerHTML += formatWord(randomWord());
    }

    addClass(document.querySelector('.word'), 'current')
    addClass(document.querySelector('.letter'), 'current')
    removeClass(document.getElementById('game'), 'over')
    moveCursor()
    document.getElementById('info').innerHTML  = (gameTime / 1000) + '';
    window.timer = null;
}

function moveCursor() {
    const nextLetter = document.querySelector('.letter.current')
    const nextWord = document.querySelector('.word.current')
    const cursor = document.getElementById('cursor')
    cursor.style.top = (nextLetter || nextWord).getBoundingClientRect().top + 2 + 'px'
    cursor.style.left = (nextLetter || nextWord).getBoundingClientRect()[nextLetter ? 'left' : 'right'] + 'px'
}

function getWpm() {
    const words = [...document.querySelectorAll('.word')]
    const lastTypedWord = document.querySelector('.word.current')
    const lastTypedWordIndex = words.indexOf(lastTypedWord)
    const typedWords = words.slice(0, lastTypedWordIndex)
    const correctWords = typedWords.filter(word => {
        const letters = [...word.children]
        const incorrectLetters = letters.filter(letter => letter.className.includes('incorrect'))
        const correctLetters = letters.filter(letter => letter.className.includes('correct'))
        return incorrectLetters.length === 0 && correctLetters.length === letters.length
    })

    // get word per gameTimer, multiply by 60s
    return correctWords.length / gameTime * 60000;
}
function gameOver() {
    clearInterval(window.timer)
    addClass(document.getElementById('game'), 'over')
    // words pre min
    document.getElementById('info').innerHTML = `WPM: ${getWpm()}`
}

function formatWord(word) {
    return `<div class="word"><span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>`
}

document.getElementById('game').addEventListener('keyup', e => {
    const { key } = e;
    const currentWord = document.querySelector('.word.current')
    const currentLetter = document.querySelector('.letter.current')
    const expected = currentLetter?.innerHTML || ' ';
    const isLetter = key.length === 1 && key !== ' ';
    const isSpace = key === ' ';
    const isBackspace = key === 'Backspace'
    const isFirstLetter = currentLetter === currentWord.firstChild;

    if(document.querySelector('#game.over')) {
        return ;
    }

    // also check if is letter tp prevent starting timer when CTRL+R is pressed (or another combination)
    if(! window.timer && isLetter) {
        window.timer = setInterval(() => {
            if((! window.gameStart)) {
                window.gameStart = (new Date()).getTime();
            }

            const currentTime = (new Date().getTime())
            const msPassed = currentTime - window.gameStart;
            const sPassed = Math.round(msPassed / 1000);
            const sLeft = (gameTime/ 1000) - sPassed;
            if(sLeft <= 0) {
                gameOver()
                return ;
            }
            document.getElementById('info').innerHTML = sLeft.toString();
        }, 1000)
    };

    if (isLetter) {
        if (currentLetter) {
            addClass(currentLetter, key === expected ? 'correct' : 'incorrect')
            removeClass(currentLetter, 'current')
            if (currentLetter.nextSibling) {
                addClass(currentLetter.nextSibling, 'current')
            }
        } else {
            // end of the word
            const incorrectLetter = document.createElement('span')
            incorrectLetter.innerHTML = key;
            incorrectLetter.className = 'letter incorrect extra'
            currentLetter.appendChild(incorrectLetter)
        }
    }

    if (isSpace) {
        if (expected !== ' ') {
            const lettersToInvalidate = [ ...document.querySelectorAll('.word.current .letter:not(.correct)') ]
            lettersToInvalidate.forEach(letter => {
                addClass(letter, 'incorrect')
            })
        }
        removeClass(currentWord, 'current')
        addClass(currentWord.nextSibling, 'current')

        if (currentLetter) {
            removeClass(currentLetter, 'current')
        }
        addClass(currentWord.nextSibling.firstChild, 'current')
    }

    // if backspace, remove letter
    if(isBackspace) {
        if(currentLetter && isFirstLetter) {
            // make prev word current, last letter current
            removeClass(currentWord, 'current')
            addClass(currentWord.previousSibling, 'current')
            removeClass(currentLetter, 'current')
            addClass(currentWord.previousSibling.lastChild, 'current')
            removeClass(currentWord.previousSibling.lastChild, 'incorrect')
            removeClass(currentWord.previousSibling.lastChild, 'correct')
        }

        if(currentLetter && !isFirstLetter) {
            // move back 1 letter, invalidate letter
            removeClass(currentLetter, 'current')
            addClass(currentLetter.previousSibling, 'current')
            removeClass(currentLetter.previousSibling, 'correct')
            removeClass(currentLetter.previousSibling, 'incorrect')
        }

        if(!currentLetter) {
            // we're expecting space or backspace' +
            addClass(currentWord.lastChild, 'current')
            removeClass(currentWord.lastChild, 'incorrect')
            removeClass(currentWord.lastChild, 'correct')
        }
    }

    // move lines/words
    if(currentWord.getBoundingClientRect().top > 250) {
        const words = document.getElementById('words')
        const margin = parseInt(words.style.marginTop || '0px')
        words.style.marginTop = (margin - 35) + 'px'
    }

    // move our cursor
    moveCursor()
})

document.getElementById('newGameButton').addEventListener('click', () => {
    gameOver();
    newGame();
})

window.onresize = () => {
    moveCursor()
}

newGame()
