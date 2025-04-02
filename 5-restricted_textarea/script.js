const textArea = document.getElementById('userInput');
const count = document.querySelector('.current-char-count');

const charDisplay = document.querySelector('.character-count');
const textAreaContainer = document.querySelector('.textarea-container');

textArea.addEventListener('input', () => {
    length = textArea.value.length;
    if (length >= textArea.maxLength) {
        textAreaContainer.style.borderColor = 'red';
        textArea.style.color = 'red';
        charDisplay.style.color = 'red';
        charDisplay.style.fontWeight = '600';
        count.innerHTML = textArea.value.length;
    } else {
        textAreaContainer.style.borderColor = 'black';
        textArea.style.color = 'black';
        charDisplay.style.color = 'black';
        charDisplay.style.fontWeight = '300';
        count.innerHTML = textArea.value.length;
    }
})