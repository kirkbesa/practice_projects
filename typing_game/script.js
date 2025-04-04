const sampleWords = [
    'apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon', 
    'mango', 'nectarine', 'orange', 'papaya', 'quince', 'raspberry', 'strawberry', 'tangerine', 'ugli', 'vanilla',
    'watermelon', 'xigua', 'yellow', 'zucchini', 'airplane', 'boat', 'car', 'dog', 'elephant', 'fish',
    'giraffe', 'house', 'ice', 'jaguar', 'kite', 'lion', 'monkey', 'night', 'octopus', 'parrot',
    'quilt', 'rabbit', 'snake', 'turtle', 'umbrella', 'vulture', 'whale', 'xylophone', 'yacht', 'zebra',
    'book', 'cup', 'door', 'egg', 'furniture', 'glove', 'hat', 'insect', 'jug', 'key',
    'lamp', 'mirror', 'needle', 'oven', 'pen', 'quill', 'ring', 'scissors', 'table', 'umbrella',
    'vase', 'watch', 'x-ray', 'yarn', 'zipper', 'acorn', 'barn', 'clay', 'diamond', 'elephant',
    'forest', 'grapevine', 'hill', 'island', 'jungle', 'kiwi', 'leaf', 'mountain', 'nest', 'oak',
    'pond', 'quarry', 'river', 'stone', 'tree', 'underbrush', 'volcano', 'wheat', 'xylophone', 'yellowstone',
    'zoo', 'actor', 'baker', 'carpenter', 'dentist', 'engineer', 'farmer', 'gardener', 'hairdresser', 'illustrator',
    'judge', 'kitchen', 'librarian', 'musician', 'nurse', 'optician', 'photographer', 'questioner', 'researcher', 'sculptor',
    'teacher', 'usher', 'veterinarian', 'welder', 'xenologist', 'yoga', 'zoologist', 'apricot', 'blueberry', 'cantaloupe',
    'doughnut', 'edamame', 'fettuccine', 'ginger', 'huckleberry', 'italian', 'jalapeno', 'kiwifruit', 'litchi', 'melon'
];

const target = document.getElementById('target');

function generateWords(quantity) {
    const words = [];
    for (let i = 0; i < quantity; i++) {
        words.push(sampleWords[Math.floor((Math.random()*sampleWords.length))]);
    }
    return words;
}

function convertArrayToChars(arr) {
    let charArray = [];

    arr.forEach((word, index) => {
        
        word.split('').forEach((char) => {
            charArray.push(char);
        })

        if (index !== arr.length - 1) {
            charArray.push(' ');
        }

    })

    return charArray;
}

function displayWords(wordList) {
    target.replaceChildren();

    const wordsDisplay = document.createElement('p');
    wordList.forEach((letter, index) => {
        const charDisplay = document.createElement('span');
        charDisplay.innerHTML = letter;
        charDisplay.classList.add('char');

        if (index === 0 ) {
            updateCharStatus(charDisplay, 'current');
        }
        
        wordsDisplay.appendChild(charDisplay);
    })
    
    target.appendChild(wordsDisplay);

    return wordsDisplay;
}

function updateCharStatus(char, status) {
    char.classList.remove('current', 'wrong', 'correct');
    if (status === 'current') {
        char.classList.add('current');
    } else if (status === 'wrong') {
        char.classList.add('wrong');
    } else if (status === 'correct') {
        char.classList.add('correct');
    }
}

function validateKeyDown(keyPressed) {
    totalKeyPresses++;

    const listOfAllChars = document.querySelectorAll('.char');
    currentLetter = listOfAllChars[currentlyChecking];

    if (keyPressed === currentLetter.innerText) {
        updateCharStatus(currentLetter, 'correct');
        currentlyChecking++;
        if (currentlyChecking === listOfAllChars.length) {
            resetGame();
        } else {
            updateCharStatus(listOfAllChars[currentlyChecking], 'current');
        }
    } else {
        wrongPresses++;
        updateCharStatus(currentLetter, 'wrong');
    }

    calculateAccuracy();
}

function handleKeyDown(event) {
    if (event.key === 'Enter') {
        resetGame();
    } else {
        validateKeyDown(event.key);
    }
}

function calculateAccuracy() {
    const accuracy = document.querySelector('.accuracy');

    computedAccuracy = 100 - ((wrongPresses/totalKeyPresses) * 100);
    if (computedAccuracy > 90) {
        accuracy.style.color = 'green';
    } else if (computedAccuracy > 80) {
        accuracy.style.color = 'orange';
    } else if (computedAccuracy > 0) {
        accuracy.style.color = 'red';
    }

    if (!computedAccuracy) {
        accuracy.innerText = '0.00%';
        accuracy.color = 'black';
    } else {
        accuracy.innerText = computedAccuracy.toFixed(2) + '%';
    }
}

function startGame() {
    let generatedWords = convertArrayToChars(generateWords(wordQuantity));
    displayWords(generatedWords);
};

function resetGame() {
    generatedWords = convertArrayToChars(generateWords(wordQuantity));
    displayWords(generatedWords);
    currentlyChecking = 0;
    totalKeyPresses = 0;
    wrongPresses = 0;
    accuracy = 0.00;
    calculateAccuracy();
};

let totalKeyPresses = 0;
let wrongPresses = 0;
let accuracy = 0.00;
let currentlyChecking = 0;
let wordQuantity = 10;

startGame();

document.addEventListener('keydown', handleKeyDown);