const accordions = document.querySelectorAll('.accordion');
const answers = document.querySelectorAll('.answer');

accordions.forEach((accordion, index) => {
    accordion.addEventListener('click', () => {
        const isOpen = answers[index].classList.contains('open');

        answers.forEach(answer => {
            answer.classList.remove('open');
            answer.classList.add('closed');
        });

        if (!isOpen) {
            toggleCorrespondingAnswer(answers[index]);
        }
    })
});

function toggleCorrespondingAnswer(answer) {
    answer.classList.toggle('open');
    answer.classList.toggle('closed');
}